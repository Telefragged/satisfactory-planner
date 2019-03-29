import * as React from 'react';
import _ from 'lodash';

type State = {
    maxOverclock: number;
    overclockEnabled: boolean;
}

type SelectMaxOverclockAction = {
    type: 'selectMaxOverclock';
    value: number;
}

type ToggleOverclockAction = {
    type: 'toggleOverclock';
}

type Action = SelectMaxOverclockAction | ToggleOverclockAction;

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'selectMaxOverclock':
            return { ...state, maxOverclock: action.value };
        case 'toggleOverclock':
            return { ...state, overclockEnabled: !state.overclockEnabled };
        default:
            return state;
    }
}

interface OverclockSelectorProps {
    onChange?: ((type: number | undefined) => void);
}

export const OverclockSelector: React.FunctionComponent<OverclockSelectorProps> = (props) => {

    const { onChange } = props;

    const [state, dispatch] = React.useReducer(reducer, { maxOverclock: 1, overclockEnabled: false });

    const selectAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value =
            Number.isNaN(event.currentTarget.valueAsNumber)
                ? 1
                : Math.max(Math.min(event.currentTarget.valueAsNumber, 2.5), 0.01);


        if (onChange !== undefined && state.overclockEnabled) {
            onChange(value);
        }

        dispatch({ type: 'selectMaxOverclock', value: value });
    };

    const toggleOverclocking = (event: React.MouseEvent<HTMLButtonElement>) => {

        const newState = !state.overclockEnabled;

        if (onChange !== undefined) {
            if (newState) {
                onChange(state.maxOverclock);
            } else {
                onChange(undefined);
            }
        }

        dispatch({ type: 'toggleOverclock' });
    }

    return (
        <>
            <input
                disabled={!state.overclockEnabled}
                type='number'
                min={0.01}
                max={2.5}
                step={0.1}
                value={state.maxOverclock}
                onChange={selectAmount} />
            <input
                disabled={!state.overclockEnabled}
                type='range'
                min={0.01}
                max={2.5}
                step={0.01}
                value={state.maxOverclock}
                onChange={selectAmount} />
            <button onClick={toggleOverclocking}>{state.overclockEnabled ? "Disable" : "Enable"}</button>
        </>)
};
