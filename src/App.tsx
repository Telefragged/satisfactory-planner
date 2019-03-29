import React from 'react';
import './App.css';
import { OutputType } from './types';
import { Calculator } from './components/Calculator';
import { TypeSelector } from './components/TypeSelector';
import { AmountSelector } from './components/AmountSelector';
import { OverclockSelector } from './components/OverclockSelector';

type State = {
    selectedType?: OutputType;
    amount?: number;
    maxOverclock?: number;
};

type SelectTypeAction = {
    type: 'selectType';
    value: OutputType | undefined;
}

type SelectAmountAction = {
    type: 'selectAmount';
    value: number | undefined;
}

type SelectOverclockAction = {
    type: 'selectOverclock';
    value: number | undefined;
}

type Action = SelectTypeAction | SelectAmountAction | SelectOverclockAction;

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectType':
            return { ...state, selectedType: action.value };
        case 'selectAmount':
            return { ...state, amount: action.value };
        case 'selectOverclock':
            return { ...state, maxOverclock: action.value }
        default:
            return state;
    }
}

const App = ({ }) => {
    const [state, dispatch] = React.useReducer(reducer, {});

    return (
        <div className="App">
            <div style={{ display: 'inline-block' }}>
                <TypeSelector onChange={type => dispatch({ type: 'selectType', value: type })} />
                <AmountSelector onChange={amount => dispatch({ type: 'selectAmount', value: amount })} />
                <OverclockSelector onChange={maxOverclock => dispatch({ type: 'selectOverclock', value: maxOverclock })} />
            </div>
            {state.selectedType !== undefined && state.amount !== undefined
                ? <Calculator selectedType={state.selectedType} amount={state.amount} maxOverclock={state.maxOverclock} />
                : <p>Select a type pls</p>}
        </div>
    );
}

export default App;
