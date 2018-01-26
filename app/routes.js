/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route, Switch } from 'react-router';

import App from './containers/App';
import Menu from './components/Menu/Menu';
import ParametersContainer from './containers/ParametersContainer';

const Application = () => (
    <App>
        <Switch>
            <Route path="/" component={Menu} />
            <Route path="/parameters" component={ParametersContainer} />
        </Switch>
    </App>
);

export default Application;
