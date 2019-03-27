import * as React from 'react';
import _ from 'lodash';
import { OutputType, outputTypes } from '../types';

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
}

export const AmountSelector: React.FunctionComponent<AmountSelectorProps> = (props) => {

    const {onChange} = props;

    const [state, dispatch] = React.useReducer(reducer, {});

    const selectAmount = (event: React.ChangeEvent<HTMLInputElement>) => {

        let value = event.currentTarget.valueAsNumber;

        if(onChange !== undefined) {
            onChange(value);
        }

        dispatch({type: 'selectType', value: event.currentTarget.valueAsNumber});
    };

    return (<input value={state.selectedAmount} type="number" onChange={selectAmount}></input>)
};
