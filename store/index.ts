import { useMemo } from 'react';
import { createStore, applyMiddleware, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from './reducers';

let store: Store<State, any>;

function initStore(preloadedState: State): Store<State, any> {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware)),
    )
}

export const initializeStore = (preloadedState?: State) => {
    let _store = store ?? initStore(preloadedState);

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current index
        store = undefined
    }

    if (typeof window === 'undefined') return _store
    // Create the index once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState: State) {
    return useMemo(() => initializeStore(initialState), [initialState])
}

export type State = ReturnType<typeof rootReducer>;
