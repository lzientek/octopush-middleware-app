/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Redirect, Route } from 'react-router';

import App from './containers/App';
import ContentRoute from './components/ContentRoute/ContentRoute';
import Menu from './components/Menu/Menu';
import ParametersContainer from './containers/ParametersContainer';
import SendContainer from './containers/Send/SendContainer';
import TemplateContainer from './containers/Templates/TemplateContainer';
import TemplateListContainer from './containers/Templates/TemplateListContainer';
import UserContainer from './containers/Users/UserContainer';
import UserListContainer from './containers/Users/UserListContainer';

const Application = () => (
    <App>
        <Route path="/" component={Menu} />
        <Route exact path="/" render={() => <Redirect to="/parameters" />} />
        <ContentRoute path="/parameters" component={ParametersContainer} />
        <ContentRoute path="/templates" component={TemplateListContainer} />
        <ContentRoute exact path="/template" component={TemplateContainer} />
        <ContentRoute path="/template/:id" component={TemplateContainer} />
        <ContentRoute path="/send/:id" component={SendContainer} />
        <ContentRoute exact path="/users" component={UserListContainer} />
        <ContentRoute exact path="/user" component={UserContainer} />
        <ContentRoute path="/user/:id" component={UserContainer} />
    </App>
);

export default Application;
