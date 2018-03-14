import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';

import { getSettings } from '../../actions/settings';
const { Sider } = Layout;

export class MenuSider extends Component {
    static propTypes = {
        settings: PropTypes.shape({
            apiKey: PropTypes.string,
            apiSecret: PropTypes.string,
            userName: PropTypes.string,
            userPassword: PropTypes.string,
            adminPassword: PropTypes.string,
        }),
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        getSettings: PropTypes.func,
    };

    componentDidMount() {
        this.props.getSettings();
    }

    handleClick = ({ key }) => {
        this.props.history.push(key);
    };

    render() {
        return (
            <Sider>
                <Menu onClick={this.handleClick} style={{ width: 200 }} mode="inline">
                    <Menu.Item key={'/parameters'}>Parameters</Menu.Item>
                    <Menu.Item key={'/templates'}>Templates</Menu.Item>
                    <Menu.Item key={'/stats'}>Stats</Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = ({ settings: { settings } }) => ({
    settings,
});

const mapDispatchToProps = dispatch => ({
    getSettings: bindActionCreators(getSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuSider);
