/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Redirect, Route } from 'react-router';

import App from './containers/App';
import ContentRoute from './components/ContentRoute/ContentRoute';
import Menu from './components/Menu/Menu';
import ParametersContainer from './containers/ParametersContainer';

const Application = () => (
    <App>
        <Route path="/" component={Menu} />
        <Route exact path="/" render={() => <Redirect to="/parameters" />} />
        <ContentRoute path="/parameters" component={ParametersContainer} />
    </App>
);

export default Application;
