import React, { Component } from 'react';
import mustache from 'mustache';
import PropTypes from 'prop-types';
import { Alert, Breadcrumb, Button, Form, Icon, Input } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

import { sendTemplate, showTemplate } from '../../actions/templates';

const Template = PropTypes.shape({
    id: PropTypes.string,
    sms_recipients: PropTypes.string,
    sms_sender: PropTypes.string,
    sms_type: PropTypes.string,
});

export class SendContainer extends Component {
    static propTypes = {
        template: Template,
        showTemplate: PropTypes.func,
        sendTemplate: PropTypes.func,
        match: PropTypes.shape({ params: PropTypes.object }),
    };
    state = {
        sms_recipients: '',
        data: '{}',
        sms_sender: '',
        visual_text: '',
        error: '',
    };
    sms_template_id = true;

    componentDidMount() {
        this.templateId = this.props.match.params.id;
        this.templateId && this.props.showTemplate(this.templateId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.template != nextProps.template) {
            const variables = {};
            mustache
                .parse(nextProps.template.content)
                .filter(res => res[0] === 'name')
                .map(res => res[1])
                .forEach(varName => {
                    const splitted = varName.split('.');
                    let actual = variables;

                    for (let i = 0; i < splitted.length; i++) {
                        if (i + 1 === splitted.length) {
                            actual[splitted[i]] = '';
                        } else {
                            actual[splitted[i]] = actual[splitted[i]] || {};
                            actual = actual[splitted[i]];
                        }
                    }
                });

            this.setState({ data: JSON.stringify(variables) }, () =>
                this.updateSentText(nextProps.template.content),
            );
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.templateId) {
            const { sms_recipients, sms_sender, data } = this.state;
            this.props.sendTemplate(this.templateId, {
                sms_recipients,
                sms_sender,
                data: JSON.parse(data),
            });
        }
    };

    updateSentText = text => {
        try {
            const data = JSON.parse(this.state.data);
            this.setState({ visual_text: mustache.render(text, data) });
            this.setState({ error: null });
        } catch (err) {
            this.setState({ error: err.message });
        }
    };

    onChange = ({ target: { value, name } }) => {
        this.setState({ [name]: value }, () => this.updateSentText(this.props.template.content));
    };

    render() {
        const {
            state: { sms_recipients, sms_sender, data, visual_text, error },
            props: { template },
        } = this;

        return [
            <Breadcrumb key="0">
                <Breadcrumb.Item>
                    <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={'/templates'}>Templates</Link>
                </Breadcrumb.Item>
            </Breadcrumb>,
            template && <h2 key="1">Send template {template.title}</h2>,
            template && (
                <Form key="2" onSubmit={this.handleSubmit}>
                    <FormItem label="Recipient">
                        <Input
                            onChange={this.onChange}
                            prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Recipient"
                            value={sms_recipients}
                            name="sms_recipients"
                        />
                    </FormItem>
                    <FormItem label="Sender Name">
                        <Input
                            onChange={this.onChange}
                            prefix={
                                <Icon type="notification" style={{ color: 'rgba(0,0,0,.25)' }} />
                            }
                            placeholder="Sender name"
                            value={sms_sender || template.sms_sender}
                            name="sms_sender"
                        />
                    </FormItem>
                    <FormItem label="SMS Data">
                        <Input.TextArea
                            onChange={this.onChange}
                            placeholder="SMS Data (JSON)"
                            value={data}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name="data"
                        />
                    </FormItem>
                    {error && <Alert description={error} type="error" />}

                    <p>{visual_text}</p>
                    <FormItem>
                        <Button icon="message" type="primary" htmlType="submit" disabled={!!error}>
                            Send
                        </Button>
                    </FormItem>
                </Form>
            ),
        ];
    }
}

const mapStateToProps = ({ templates: { template, sentTemplate } }) => ({
    template,
    sentTemplate,
});

const mapDispatchToProps = dispatch => ({
    showTemplate: bindActionCreators(showTemplate, dispatch),
    sendTemplate: bindActionCreators(sendTemplate, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendContainer);
