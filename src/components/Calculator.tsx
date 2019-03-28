import * as React from 'react';
import _ from 'lodash';
import { OutputType, deduceProducer } from '../types';

interface CalculatorSettings {
    maxOverclock?: number;
}

export interface CalculatorProps extends CalculatorSettings {
    selectedType: OutputType;
    amount: number;
}

type CalculateResult = {
    type: OutputType;
    producerInfo: { overclock: number, amount: number };
}

type NonSharedNode = {
    kind: 'nonShared'
    type: OutputType;
    numManufacturers: number;
    overclock?: number;
    childNodes: Node[];
}

type SharedNode = {
    kind: 'shared';
    type: OutputType;
    percentOfTotal: number;
}

type Node = NonSharedNode | SharedNode;

function calculateResults(type: OutputType, amount: number): CalculateResult[] {
    const children = type.inputTypes.flatMap(t => calculateResults(t.type, (t.amount / type.outputAmount) * amount));

    const producerInfo = { overclock: 1, amount: amount / type.productionRate };

    return [{ type, producerInfo }].concat(children);
}

function getSharedResults(results: CalculateResult[]) {
    const shared = _.pickBy(
        _.countBy(results, x => x.type.name),
        (v, _) => v >= 2);

    const sharedResults =
        _.keys(shared).map(name =>
            results
                .filter(result => result.type.name === name)
                .reduce((acc, cur) => {
                    const producerInfo = { ...acc.producerInfo, amount: acc.producerInfo.amount + cur.producerInfo.amount }
                    return { ...acc, producerInfo };
                }));

    return sharedResults;
}

function applySettings(results: CalculateResult[], settings: CalculatorSettings): [CalculateResult[], number | undefined] {
    const applyOverclock
        : (results: CalculateResult[], maxOverclock: number) => [CalculateResult[], number] =
        (results, maxOverclock) => {
            const sortedResults = _.sortBy(results, (result => [deduceProducer(result.type).powerConsumption, result.producerInfo.amount]));

            const optimizedResult = sortedResults.reduce(([acc, numCores], cur) => {

                const numCoresPerProducer = (overclockAmount: number) => {
                    if (overclockAmount <= 1) return 0;
                    if (overclockAmount <= 1.5) return 1;
                    if (overclockAmount <= 2) return 2;

                    return 3;
                }

                const producerAmount = cur.producerInfo.amount;

                const targetProducers = Math.ceil(producerAmount / Math.min(maxOverclock, producerAmount));

                const overclockAmount = producerAmount / targetProducers;

                const producerInfo = { overclock: overclockAmount, amount: targetProducers };

                const neededCores = numCoresPerProducer(overclockAmount) * targetProducers;

                return [acc.concat({ ...cur, producerInfo }), numCores + neededCores] as [CalculateResult[], number];
            }, [[], 0] as [CalculateResult[], number]);

            return optimizedResult;
        }

    return settings.maxOverclock ? applyOverclock(results, settings.maxOverclock) : [results, undefined];
}

function calculateOutput(type: OutputType, amount: number, results: CalculateResult[], sharedResults: CalculateResult[]): Node {
    const childNodes = type.inputTypes.map(x => calculateOutput(x.type, (x.amount / type.outputAmount) * amount, results, sharedResults));

    const sharedResult = sharedResults.find(result => result.type.name === type.name);

    if(sharedResult) {
        return {
            kind: 'shared',
            type,
            percentOfTotal: (amount /
                (sharedResult.type.productionRate * sharedResult.producerInfo.overclock * sharedResult.producerInfo.amount))};
    }

    const result = results.find(result => result.type.name === type.name);

    if (!result) throw Error();

    const numManufacturers = result.producerInfo.amount;

    const overclock = result.producerInfo.overclock !== 1 ? result.producerInfo.overclock : undefined;

    return { kind: 'nonShared', type, numManufacturers, overclock, childNodes };
}

const renderNode = (node: Node, depth?: number): React.ReactNode => {
    const realDepth = depth || 0;
    switch (node.kind) {
        case 'nonShared':
            const outputAmount = node.numManufacturers * (node.type.productionRate * (node.overclock ? node.overclock : 1));
            return <>
                <p style={{ paddingLeft: realDepth * 20 }}>
                    {node.type.name}: {_.round(node.numManufacturers, 2)} {deduceProducer(node.type).name}(s) {_.round(outputAmount, 2)}/min {node.overclock ? `${_.round(node.overclock * 100, 2)}% overclock` : ""}
                </p>
                {node.childNodes.map(node => renderNode(node, realDepth + 1))}
            </>
        case 'shared':
            return <p style={{paddingLeft: realDepth * 20}}>{node.type.name}: {_.round(node.percentOfTotal * 100, 2)}%</p>
    };
}

export class Calculator extends React.Component<CalculatorProps, {}> {
    render() {
        const {selectedType, amount} = this.props;

        const results = calculateResults(selectedType, amount)

        const sharedResults = getSharedResults(results);

        const combinedResults = _.differenceBy(results, sharedResults, result => result.type.name);

        const [optimizedResult, numCores] = applySettings(combinedResults, this.props);

        const outputNode = calculateOutput(this.props.selectedType, this.props.amount, optimizedResult, sharedResults);

        const power = 
            optimizedResult.reduce((acc, cur) =>
                acc
                + deduceProducer(cur.type).powerConsumption * Math.pow(cur.producerInfo.overclock, 1.6) * cur.producerInfo.amount, 0);

        return <>
            {renderNode(outputNode)}
            {numCores && numCores > 0 ? <p>Total cores: {numCores}</p> : <></>}
            {<p>Total power: {power}MW</p>}
            {/* <p>Shared values</p>
            {shared.map(node => renderNode(node))} } */}
        </>
    }
}
