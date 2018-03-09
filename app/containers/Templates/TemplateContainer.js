import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Breadcrumb, Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

import { createTemplate, showTemplate, updateTemplate } from '../../actions/templates';

const Template = PropTypes.shape({
    id: PropTypes.string,
    user_id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    language: PropTypes.string,
    sms_sender: PropTypes.string,
    sms_type: PropTypes.string,
});

export class TemplateContainer extends Component {
    static propTypes = {
        template: Template,
        createdTemplate: Template,
        updatedTemplate: Template,
        updateTemplate: PropTypes.func,
        createTemplate: PropTypes.func,
        showTemplate: PropTypes.func,
        match: PropTypes.shape({ params: PropTypes.object }),
    };
    state = {
        id: null,
        title: '',
        content: '',
        language: '',
        sms_sender: '',
        sms_type: '',
    };
    templateId = true;

    componentDidMount() {
        this.templateId = this.props.match.params.id;
        this.templateId && this.props.showTemplate(this.templateId);
    }

    componentWillReceiveProps({ template, createdTemplate, updatedTemplate }) {
        if (template && template !== this.props.template) {
            this.setState(template);
        }
        if (createdTemplate && createdTemplate !== this.props.createdTemplate) {
            this.templateId = createdTemplate.id;
            this.setState(createdTemplate);
        }
        if (updatedTemplate && updatedTemplate !== this.props.updatedTemplate) {
            this.setState(updatedTemplate);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { createTemplate, updateTemplate } = this.props;

        if (this.templateId) {
            updateTemplate(this.templateId, this.state);
        } else {
            createTemplate(this.state);
        }
    };

    onChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value });
    };

    render() {
        const { state: { id, title, content, language, sms_sender, sms_type } } = this;

        return [
            <Breadcrumb key="0">
                <Breadcrumb.Item>
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={'/templates'}>Templates</Link>
                </Breadcrumb.Item>
            </Breadcrumb>,
            <h2 key="1">{id ? 'Edit' : 'New'} template</h2>,
            <Form key="2" onSubmit={this.handleSubmit}>
                <FormItem label="Title">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="tag-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Title"
                        value={title}
                        name="title"
                    />
                </FormItem>
                <FormItem label="SMS Content">
                    <Input.TextArea
                        onChange={this.onChange}
                        placeholder="SMS Content"
                        value={content}
                        autosize={{ minRows: 3, maxRows: 6 }}
                        name="content"
                    />
                </FormItem>
                <FormItem label="Language">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Language"
                        value={language}
                        name="language"
                    />
                </FormItem>
                <FormItem label="Sender Name">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="notification" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Sender name"
                        value={sms_sender}
                        name="sms_sender"
                    />
                </FormItem>
                <FormItem label="Sms type">
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="star-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Sms type"
                        value={sms_type}
                        name="sms_type"
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

const mapStateToProps = ({ templates: { template, createdTemplate, updatedTemplate } }) => ({
    template,
    createdTemplate,
    updatedTemplate,
});

const mapDispatchToProps = dispatch => ({
    updateTemplate: bindActionCreators(updateTemplate, dispatch),
    createTemplate: bindActionCreators(createTemplate, dispatch),
    showTemplate: bindActionCreators(showTemplate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContainer);
