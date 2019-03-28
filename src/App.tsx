import React from 'react';
import './App.css';
import { OutputType } from './types';
import { Calculator } from './components/Calculator';
import { TypeSelector } from './components/TypeSelector';
import { AmountSelector } from './components/AmountSelector'

interface State {
    selectedType?: OutputType;
    amount?: number;
};

type selectTypeAction = {
    type: 'selectType';
    value: OutputType | undefined;
}

type selectAmountAction = {
    type: 'selectAmount';
    value: number | undefined;
}

type Action = selectTypeAction | selectAmountAction;

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectType':
            return { ...state, selectedType: action.value};
        case 'selectAmount':
            return { ...state, amount: action.value};
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
                <AmountSelector onChange={amount => dispatch({type: 'selectAmount', value: amount})}/>
            </div>
            {state.selectedType !== undefined && state.amount !== undefined
                ? <Calculator selectedType={state.selectedType} amount={state.amount} />
                : <p>Select a type pls</p>}
        </div>
    );
}

export default App;
