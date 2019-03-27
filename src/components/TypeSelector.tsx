import * as React from 'react';
import _ from 'lodash';
import { OutputType, outputTypes } from '../types';

interface State {
    selectedType?: OutputType;
}

interface Action {
    type: 'selectType';
    value?: OutputType;
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectType':
            return {...state, selectedType: action.value as OutputType | undefined};
        default:
            return state;
    }
}

interface TypeSelectorProps {
    onChange?: ((type: OutputType | undefined) => void);
}

export const TypeSelector: React.FunctionComponent<TypeSelectorProps> = (props) => {

    const {onChange} = props;

    const [state, dispatch] = React.useReducer(reducer, {});

    const selectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = outputTypes.find(type => type.name === event.currentTarget.value);

        if(onChange !== undefined) {
            onChange(newType)
        }

        dispatch({type: 'selectType', value: newType});
    };

    return (<>
        <select
            onChange={(event) => selectType(event)}
            value={state.selectedType !== undefined ? state.selectedType.name : undefined}>
            <option value={undefined}>Select a thing</option>
            {outputTypes.map(type => <option value={type.name} key={type.name}>{type.name}</option>)}
        </select>
    </>)
};
