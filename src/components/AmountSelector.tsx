import * as React from 'react';
import _ from 'lodash';

interface AmountSelectorProps {
    onChange?: ((type: number | undefined) => void);
    step?: number;
}

export const AmountSelector: React.FunctionComponent<AmountSelectorProps> = (props) => {

    const {onChange} = props;

    const [selectedAmount, setSelectedAmount] = React.useState(undefined as number | undefined)

    const selectAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value =
            Number.isNaN(event.currentTarget.valueAsNumber)
            || event.currentTarget.valueAsNumber <= 0
                ? undefined
                : event.currentTarget.valueAsNumber;

        if(onChange !== undefined) {
            onChange(value);
        }

        setSelectedAmount(value);
    };

    return (<input value={selectedAmount} min={0} step={props.step} type="number" onChange={selectAmount}></input>)
};
