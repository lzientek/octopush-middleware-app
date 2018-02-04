import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';

import { getSettings, setSettings } from '../actions/settings';

const FormItem = Form.Item;

export class ParametersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiKey: '',
            apiSecret: '',
            userName: '',
            userPassword: '',
            adminPassword: '',
            ...props.settings,
        };
    }
    handleSubmit = () => {};

    onChange = name => {
        console.log(name);
    };

    render() {
        console.log(this);
        const { apiKey, apiSecret, userName, userPassword, adminPassword } = this.state;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        value={userName}
                    />
                </FormItem>
                <FormItem>
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="User Password"
                        value={userPassword}
                    />,
                </FormItem>
                <FormItem>
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Admin Password"
                        value={adminPassword}
                    />,
                </FormItem>
                <FormItem>
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Api Key"
                        value={apiKey}
                    />
                </FormItem>
                <FormItem>
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Api Secret"
                        value={apiSecret}
                    />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </FormItem>
            </Form>
        );
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
