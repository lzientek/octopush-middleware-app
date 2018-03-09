import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, List } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTemplates } from '../../actions/templates';

import style from './template.css';

export class TemplateListContainer extends Component {
    static propTypes = {
        templates: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                user_id: PropTypes.string,
                title: PropTypes.string,
                content: PropTypes.string,
                language: PropTypes.string,
                sms_sender: PropTypes.string,
                sms_type: PropTypes.string,
            }),
        ),
        getTemplates: PropTypes.func,
    };

    componentDidMount() {
        this.props.getTemplates();
    }

    render() {
        const { templates } = this.props;

        return [
            <h2 key="1">
                Templates
                <Link className={style.right} key="2" to={'/template'}>
                    <Button type="primary" htmlType="button">
                        Ajouter un template
                    </Button>
                </Link>
            </h2>,
            <div key="2">
                <List
                    loading={!templates}
                    itemLayout="horizontal"
                    dataSource={templates || []}
                    renderItem={template => (
                        <List.Item
                            actions={[
                                <Link key="0" to={`/template/${template.id}`}>
                                    Edit
                                </Link>,
                            ]}>
                            <List.Item.Meta
                                title={
                                    <Link to={`/template/${template.id}`}>{template.title}</Link>
                                }
                                description={`Updated ${moment(
                                    template.updated_at,
                                ).fromNow()} | Created ${moment(template.created_at).fromNow()}`}
                            />
                        </List.Item>
                    )}
                />
            </div>,
        ];
    }
}

const mapStateToProps = ({ templates: { templates } }) => ({
    templates,
});

const mapDispatchToProps = dispatch => ({
    getTemplates: bindActionCreators(getTemplates, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateListContainer);
