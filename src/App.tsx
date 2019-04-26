import React from 'react';
import './App.css';
import { OutputType, outputTypes } from './types';
import { Calculator } from './components/Calculator';
import { TypeSelector } from './components/TypeSelector';
import { AmountSelector } from './components/AmountSelector';
import { OverclockSelector } from './components/OverclockSelector';
import { RecipeSelector } from './components/RecipeSelector';
import zimaReducer from 'zima-reducer';

type State = {
    selectedType?: OutputType;
    amount?: number;
    maxOverclock?: number;
    outputTypes: OutputType[];
};

const actions = {
    selectType: (state: State, selectedType?: OutputType): State => ({ ...state, selectedType }),
    selectAmount: (state: State, amount: number): State => ({ ...state, amount: amount > 0 ? amount : undefined }),
    selectOverclock: (state: State, maxOverclock?: number): State => ({ ...state, maxOverclock }),
    changeOutputTypes: (state: State, outputTypes: OutputType[]): State => (console.log(outputTypes), {
        ...state,
        outputTypes,
        selectedType: state.selectedType ? outputTypes.find(t => t.name === state.selectedType!.name) : undefined
    })
}

const App = ({ }) => {
    const [state, dispatch] = zimaReducer(actions, { outputTypes } as State);

    return (
        <div className="App">
            <div style={{ display: 'inline-block' }}>
                <TypeSelector
                    outputTypes={state.outputTypes}
                    onChange={dispatch.selectType} />
                <AmountSelector
                    onChange={dispatch.selectAmount}
                    step={state.selectedType ? state.selectedType.selectedRecipe.productionRate : 1} />
                <OverclockSelector onChange={dispatch.selectOverclock} />
            </div>
            {state.selectedType !== undefined && state.amount !== undefined
                ? <Calculator selectedType={state.selectedType} amount={state.amount} maxOverclock={state.maxOverclock} />
                : <p>Select a type pls</p>}
            <RecipeSelector onChangeRecipe={dispatch.changeOutputTypes}></RecipeSelector>
        </div>
    );
}

export default App;
