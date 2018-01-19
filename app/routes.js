/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import CounterPage from './containers/CounterPage';
import HomePage from './containers/HomePage';

const Application = () => (
    <App>
        <Switch>
            <Route path="/counter" component={CounterPage} />
            <Route path="/" component={HomePage} />
        </Switch>
    </App>
);

export default Application;
