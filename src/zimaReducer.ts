import { useReducer } from 'react';

type GetArguments<F extends Function> = F extends (...args: infer A) => any ? A : never;

type WithDispatchSignature<T, S> = { [P in keyof T]: T[P] extends (state: S, ...args: infer A) => unknown ? (...args: A) => void : never; }

type ActionReducer<S> = {
    reduce: (state: S) => S
}

function zimaReducer<S, T extends { [P in keyof T]: T[P] extends Function ? T[P] : never }>(obj: T, initialState: S): [S, WithDispatchSignature<T, S>] {
    const reducerFunction = (state: S, action: ActionReducer<S>) => action.reduce(state);

    const [state, dispatch] = useReducer(reducerFunction, initialState);

    const actionDispatcher: any = {};

    for (const k of Reflect.ownKeys(obj)) {
        const reduceFn = (obj as any)[k] as T[keyof T];
        type arguments = GetArguments<typeof reduceFn>;
        actionDispatcher[k] = (...args: arguments) => {
            const reducerObject = {
                reduce: (state: S) => reduceFn(state, ...args)
            }

            dispatch(reducerObject);
        }
    }

    return [state, actionDispatcher] as [S, WithDispatchSignature<T, S>];
}

export default zimaReducer;