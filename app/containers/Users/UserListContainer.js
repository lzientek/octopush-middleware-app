import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, List } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUsers } from '../../actions/users';
import { setSettings } from '../../actions/settings';

import style from './user.css';

export class UserListContainer extends Component {
    static propTypes = {
        users: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                email: PropTypes.string,
                api_key: PropTypes.string,
                api_secret: PropTypes.string,
                third_part_api_key: PropTypes.string,
                created_at: PropTypes.string,
                updated_at: PropTypes.string,
            }),
        ),
        getUsers: PropTypes.func,
        saveSettings: PropTypes.func,
    };

    state = { loading: true };

    componentDidMount() {
        this.props.getUsers();
    }

    componentWillReceiveProps({ users }) {
        if (this.props.users !== users) {
            this.setState({ loading: false });
        }
    }

    useUser = user => {
        this.props.saveSettings({ apiKey: user.api_key, apiSecret: user.api_secret });
    };

    render() {
        const { props: { users }, state: { loading }, useUser } = this;

        return [
            <h2 key="1">
                Users
                <Link className={style.right} key="2" to={'/user'}>
                    <Button type="primary" htmlType="button">
                        Add an user
                    </Button>
                </Link>
            </h2>,
            <div key="2">
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={users}
                    renderItem={user => (
                        <List.Item
                            actions={[
                                <Link key="0" to={`/user/${user.id}`}>
                                    Edit
                                </Link>,
                                <Button
                                    key="1"
                                    type="default"
                                    onClick={() => useUser(user)}
                                    htmlType="button">
                                    Use user
                                </Button>,
                            ]}>
                            <List.Item.Meta
                                title={<Link to={`/user/${user.id}`}>{user.email}</Link>}
                                description={`Updated ${moment(
                                    user.updated_at,
                                ).fromNow()} | Created ${moment(user.created_at).fromNow()}`}
                            />
                        </List.Item>
                    )}
                />
            </div>,
        ];
    }
}

const mapStateToProps = ({ users: { users } }) => ({
    users,
});

const mapDispatchToProps = dispatch => ({
    getUsers: bindActionCreators(getUsers, dispatch),
    saveSettings: bindActionCreators(setSettings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);
