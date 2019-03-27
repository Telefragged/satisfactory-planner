import React from 'react';
import './App.css';
import { OutputType } from './types';
import { Calculator } from './components/Calculator';
import { TypeSelector } from './components/TypeSelector';

interface State {
    selectedType?: OutputType;
    amount?: number;
};

interface Action {
    type: 'selectType';
    value: any;
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectType':
            return {...state, selectedType: action.value as OutputType | undefined};
        default:
            return state;
    }
}

const App = ({}) => {
    const [state, dispatch] = React.useReducer(reducer, {});

    return (
        <div className="App">
            <TypeSelector onChange={type => dispatch({type: 'selectType', value: type})}/>
            {state.selectedType !== undefined
                ? <Calculator selectedType={state.selectedType} amount={1} />
                : <p>Select a type pls</p>}
        </div>
    );
}

export default App;
