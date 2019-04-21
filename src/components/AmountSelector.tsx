import * as React from 'react';
import _ from 'lodash';

interface AmountSelectorProps {
    onChange?: ((type: number) => void);
    step?: number;
}

export const AmountSelector: React.FunctionComponent<AmountSelectorProps> = (props) => {

    const {onChange} = props;

    const [selectedAmount, setSelectedAmount] = React.useState(0)

    const selectAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value = event.currentTarget.valueAsNumber;

        const checkedValue = isNaN(value) || value < 0 ? 0 : value;

        if(onChange !== undefined) {
            onChange(checkedValue);
        }

        setSelectedAmount(checkedValue);
    };

    return (<input value={selectedAmount} min={0} step={props.step} type="number" onChange={selectAmount}></input>)
};
