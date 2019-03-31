import * as React from 'react';
import _ from 'lodash';
import { OutputType } from '../types';

interface State {
    selectedAmount?: number;
}

interface Action {
    type: 'selectType';
    value?: number;
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectType':
            return {...state, selectedType: action.value as OutputType | undefined};
        default:
            return state;
    }
}

interface AmountSelectorProps {
    onChange?: ((type: number | undefined) => void);
    step?: number;
}

export const AmountSelector: React.FunctionComponent<AmountSelectorProps> = (props) => {

    const {onChange} = props;

    const [state, dispatch] = React.useReducer(reducer, {});

    const selectAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value =
            Number.isNaN(event.currentTarget.valueAsNumber)
            || event.currentTarget.valueAsNumber <= 0
                ? undefined
                : event.currentTarget.valueAsNumber;

        if(onChange !== undefined) {
            onChange(value);
        }

        dispatch({type: 'selectType', value: value});
    };

    return (<input value={state.selectedAmount} min={0} step={props.step} type="number" onChange={selectAmount}></input>)
};
