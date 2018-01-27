// @flow
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import rootSaga from '../saga';

import type { counterStateType } from '../reducers/counter';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

function configureStore(initialState?: counterStateType) {
    sagaMiddleware.run(rootSaga);

    return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
