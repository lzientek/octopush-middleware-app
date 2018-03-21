import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Breadcrumb, Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

import { createUser, showUser, updateUser } from '../../actions/users';

const User = PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    api_key: PropTypes.string,
    api_secret: PropTypes.string,
    third_part_api_key: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
});

export class UserContainer extends Component {
    static propTypes = {
        user: User,
        createdUser: User,
        updatedUser: User,
        updateUser: PropTypes.func,
        createUser: PropTypes.func,
        showUser: PropTypes.func,
        match: PropTypes.shape({ params: PropTypes.object }),
    };
    state = {
        id: null,
        email: '',
        api_key: '',
        api_secret: '',
        third_part_api_key: '',
    };
    userId = true;

    componentDidMount() {
        this.userId = this.props.match.params.id;
        this.userId && this.props.showUser(this.userId);
    }

    componentWillReceiveProps({ user, createdUser, updatedUser }) {
        if (user && user !== this.props.user) {
            this.setState(user);
        }
        if (createdUser && createdUser !== this.props.createdUser) {
            this.userId = createdUser.id;
            this.setState(createdUser);
        }
        if (updatedUser && updatedUser !== this.props.updatedUser) {
            this.setState(updatedUser);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { createUser, updateUser } = this.props;

        if (this.userId) {
            updateUser(this.userId, this.state);
        } else {
            createUser(this.state);
        }
    };

    onChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    render() {
        const { state: { id, email, api_key, api_secret, third_part_api_key } } = this;

        return [
            <Breadcrumb key="0">
                <Breadcrumb.Item>
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={'/users'}>Users</Link>
                </Breadcrumb.Item>
            </Breadcrumb>,
            <h2 key="1">{id ? 'Edit' : 'New'} user</h2>,
            <Form key="2" onSubmit={this.handleSubmit}>
                <FormItem label="Email">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        value={email}
                        name="email"
                    />
                </FormItem>

                <FormItem label="Api Key">
                    <Input
                        disabled
                        prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="api_key"
                        value={api_key}
                        name="api_key"
                    />
                </FormItem>
                <FormItem label="Api Secret">
                    <Input
                        disabled
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Api Secret"
                        value={api_secret}
                        name="api_secret"
                    />
                </FormItem>
                <FormItem label="Octopush API Key">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Octopush API Key"
                        value={third_part_api_key}
                        name="third_part_api_key"
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

const mapStateToProps = ({ users: { user, createdUser, updatedUser } }) => ({
    user,
    createdUser,
    updatedUser,
});

const mapDispatchToProps = dispatch => ({
    updateUser: bindActionCreators(updateUser, dispatch),
    createUser: bindActionCreators(createUser, dispatch),
    showUser: bindActionCreators(showUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
