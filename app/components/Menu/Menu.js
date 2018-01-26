// @flow
import React, { Component } from 'react';
import { Menu } from 'antd';

import type { History } from '../../../internals/flow/History.js';

type Props = {
    history: History,
};

export default class HomePage extends Component<Props> {
    props: Props;

    handleClick = ({ key }: { key: string }) => {
        this.props.history.push(key);
    };

    render() {
        return (
            <Menu onClick={this.handleClick} style={{ width: 256 }} mode="inline">
                <Menu.Item key={'/parameters'}>Parameters</Menu.Item>
                <Menu.Item key={'/templates'}>Templates</Menu.Item>
                <Menu.Item key={'/stats'}>Stats</Menu.Item>
                <Menu.Item key={'/send'}>Send</Menu.Item>
            </Menu>
        );
    }
}
