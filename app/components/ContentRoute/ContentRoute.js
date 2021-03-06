//

import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router';

const ContentRoute = ({ component: NestedComponent, ...props }) => (
    <Route
        {...props}
        render={props => (
            <Layout.Content style={{padding: 10}}>
                <NestedComponent {...props} />
            </Layout.Content>
        )}
    />
);

export default ContentRoute;
