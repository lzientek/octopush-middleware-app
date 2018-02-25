import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import { connect } from 'react-redux';

import { getTemplates } from '../../actions/templates';

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
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        this.props.getTemplates();
    }

    createNewTemplate = () => {
        this.props.history.push('/template');
    };

    render() {
        const { templates } = this.props;

        return [
            <h2 key="1">Templates</h2>,
            <Button key="2" type="primary" htmlType="button" onClick={this.createNewTemplate}>
                Ajouter un template
            </Button>,
            <div key="3">
                {templates.map(template => <div key={template.id}>{template.title}</div>)}
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
