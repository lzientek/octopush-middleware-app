import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';

import { getSettings, setSettings } from '../actions/settings';

const FormItem = Form.Item;

export class ParametersContainer extends Component {
    static propTypes = {
        settings: PropTypes.shape({
            url: PropTypes.string,
            apiKey: PropTypes.string,
            apiSecret: PropTypes.string,
            adminPassword: PropTypes.string,
        }),
        saveSettings: PropTypes.func,
        getSettings: PropTypes.func,
    };

    state = {
        url: '',
        apiKey: '',
        apiSecret: '',
        adminPassword: '',
        ...this.props.settings,
        displayHiddenFields: false,
    };

    componentDidMount() {
        this.props.getSettings();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.settings !== nextProps.settings) {
            this.setState({
                ...nextProps.settings,
            });
        }
    }

    handleSubmit = e => {
        const { url, apiKey, apiSecret, adminPassword } = this.state;

        e.preventDefault();
        this.props.saveSettings({
            url,
            apiKey,
            apiSecret,
            adminPassword,
        });
    };

    onChecked = ({ target: { checked, name } }) => {
        this.setState({ [name]: checked });
    };

    onChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    render() {
        const { url, apiKey, apiSecret, adminPassword, displayHiddenFields } = this.state;

        return [
            <h2 key="1">Parameters</h2>,
            <Form key="2" onSubmit={this.handleSubmit}>
                <FormItem>
                    <Checkbox
                        checked={displayHiddenFields}
                        onChange={this.onChecked}
                        name="displayHiddenFields">
                        Display password fields
                    </Checkbox>
                </FormItem>
                <FormItem label="Url">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Url"
                        value={url}
                        name="url"
                    />
                </FormItem>
                <FormItem label="Admin Password">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type={displayHiddenFields ? 'text' : 'password'}
                        placeholder="Admin Password"
                        value={adminPassword}
                        name="adminPassword"
                    />
                </FormItem>
                <FormItem label="Api Key">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type={displayHiddenFields ? 'text' : 'password'}
                        placeholder="Api Key"
                        value={apiKey}
                        name="apiKey"
                    />
                </FormItem>
                <FormItem label="Api Secret">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type={displayHiddenFields ? 'text' : 'password'}
                        placeholder="Api Secret"
                        value={apiSecret}
                        name="apiSecret"
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </FormItem>
            </Form>,
        ];
    }
}

const mapStateToProps = ({ settings: { settings } }) => ({
    settings,
});

const mapDispatchToProps = dispatch => ({
    getSettings: bindActionCreators(getSettings, dispatch),
    saveSettings: bindActionCreators(setSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ParametersContainer);
