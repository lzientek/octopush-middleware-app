import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;

import { saveTemplates } from '../../actions/templates';

export class TemplateListContainer extends Component {
    static propTypes = {
        template: PropTypes.shape({
            id: PropTypes.string,
            user_id: PropTypes.string,
            title: PropTypes.string,
            content: PropTypes.string,
            language: PropTypes.string,
            sms_sender: PropTypes.string,
            sms_type: PropTypes.string,
        }),
        saveTemplate: PropTypes.func,
    };
    state = {
        title: '',
        content: '',
        language: '',
        sms_sender: '',
        sms_type: '',
    };

    render() {
        const { title, content, language, sms_sender, sms_type } = this.state;

        return [
            <h2 key="1">Parameters</h2>,
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
                    <Input
                        onChange={this.onChange}
                        prefix={<Icon type="file-text" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="SMS Content"
                        value={content}
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

const mapStateToProps = ({ templates: { templates } }) => ({
    templates,
});

const mapDispatchToProps = dispatch => ({
    saveTemplates: bindActionCreators(saveTemplates, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplateListContainer);
