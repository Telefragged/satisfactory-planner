import * as React from 'react';
import _ from 'lodash';
import { OutputType } from '../types';

export interface CalculatorProps {
    selectedType: OutputType;
    amount: number;
}

interface CalculateResultNode {
    type: OutputType;
    numManufacturers: number;
    percentOfTotal: number;
    childNodes: CalculateResultNode[];
}

function calculateOutput(type: OutputType, amount: number): [CalculateResultNode, number] {
    const childOutput = type.inputTypes.map(x => calculateOutput(x.type, (x.amount / type.outputAmount) * amount));

    const childNodes = childOutput.map(x => x[0]);

    const numManufacturers = amount / type.productionRate;

    const power = childOutput.map(x => x[1]).reduce((acc, cur) => acc + cur, 0) + (type.producedBy.powerConsumption * Math.ceil(numManufacturers));

    return [{ type: type, numManufacturers: numManufacturers, childNodes: childNodes, percentOfTotal: 1 }, power];
}

function calculateSharedOutput(root: CalculateResultNode)
    : {shared: CalculateResultNode[], percentPopulatedRoot: CalculateResultNode} {
    const flatten = (root: CalculateResultNode) => {
        const children: CalculateResultNode[] = root.childNodes.flatMap(node => flatten(node));

        return [root].concat(children);
    };

    const populatePercents = (sharedNodes: CalculateResultNode[], root: CalculateResultNode): CalculateResultNode => {
        const childNodes = root.childNodes.map(node => populatePercents(sharedNodes, node));

        const totalNode = sharedNodes.find(x => x.type.name === root.type.name);

        const newNode =
            {...root,
                percentOfTotal: totalNode !== undefined ? root.numManufacturers / totalNode.numManufacturers : 1,
                childNodes: childNodes }

        return newNode;
    };
    
    const flattened = flatten(root);

    const counts = _.countBy(flattened, x => x.type.name);

    const sharedKeys = _.pickBy(counts, (v, k) => v >= 2);

    const shared = _.keys(sharedKeys).map(k =>
        flattened
        .filter(node => node.type.name === k)
        .reduce((acc, cur) => ({...acc, numManufacturers: acc.numManufacturers + cur.numManufacturers, childNodes: []})));

    const percentPopulatedRoot = populatePercents(shared, root);

    return {shared, percentPopulatedRoot};
}

const renderNode = (depth: number, node: CalculateResultNode): React.ReactNode => {
    const outputAmount = node.numManufacturers * node.type.productionRate;
    return <>
        <p style={{ paddingLeft: depth * 20 }}>
        {node.type.name}: {_.round(node.numManufacturers, 2)} {node.type.producedBy.name}(s) {_.round(outputAmount, 2)}/min {node.percentOfTotal !==1 ? String(_.round(node.percentOfTotal * 100, 2)) + "%" : ""}
            </p>
        {node.childNodes.map(node => renderNode(depth + 1, node))}
    </>;
}

export class Calculator extends React.Component<CalculatorProps, {}> {
    render() {
        const [outputNode, power] = calculateOutput(this.props.selectedType, this.props.amount);

        const {shared, percentPopulatedRoot: nonShared} = calculateSharedOutput(outputNode);
        return <>
            {renderNode(0, nonShared)}
            <p>Total power: {power}MW</p>
            <p>Shared values</p>
            {shared.map(node => renderNode(0, node))}
        </>
    }
}
