import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

export default class App extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
        return <Layout>{this.props.children}</Layout>;
    }
}
