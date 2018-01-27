// @flow

import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import { routerActions, routerMiddleware } from 'react-router-redux';

import rootReducer from '../reducers';
import rootSaga from '../saga';
import * as counterActions from '../actions/counter';

import type { counterStateType } from '../reducers/counter';

const history = createHashHistory();

const configureStore = (initialState?: counterStateType) => {
    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    // Thunk Middleware
    middleware.push(thunk);

    // Logging Middleware
    const logger = createLogger({
        level: 'info',
        collapsed: true,
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
        middleware.push(logger);
    }

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);
    const sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);
    // Redux DevTools Configuration
    const actionCreators = {
        ...counterActions,
        ...routerActions,
    };
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
              actionCreators,
          })
        : compose;
    /* eslint-enable no-underscore-dangle */

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const enhancer = composeEnhancers(...enhancers);

    // Create Store
    const store = createStore(rootReducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);

    if (module.hot) {
        module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers'))); // eslint-disable-line global-require
    }

    return store;
};

export default {
    configureStore,
    history,
};
