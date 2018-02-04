import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerActions, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import rootSaga from '../saga';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, router, sagaMiddleware];

let enhancer;
if (process.env.NODE_ENV !== 'test') {
    const actionCreators = {
        ...routerActions,
    };
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              actionCreators,
          })
        : compose;
    enhancer = composeEnhancers(applyMiddleware(...middleware));
} else {
    enhancer = applyMiddleware(...middleware);
}

const configureStore = (initialState = {}) => {
    const store = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga);
    return store;
};

export default { configureStore, history };
