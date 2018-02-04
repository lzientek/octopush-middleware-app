import React, { Component } from 'react';
import { Layout } from 'antd';

export default class App extends Component {
    render() {
        return <Layout>{this.props.children}</Layout>;
    }
}
