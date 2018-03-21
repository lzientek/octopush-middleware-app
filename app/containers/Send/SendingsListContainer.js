import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Collapse, Spin, Table } from 'antd';
import { connect } from 'react-redux';
const Panel = Collapse.Panel;
import { getSendings, getTemplates } from '../../actions/templates';

export class SendingsListContainer extends Component {
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
        sendings: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                sms_recipients: PropTypes.string,
                sms_sender: PropTypes.string,
                created_at: PropTypes.string,
            }),
        ),
        getTemplates: PropTypes.func,
        getSendings: PropTypes.func,
    };
    columns = [
        {
            title: 'Sms Recipients',
            dataIndex: 'sms_recipients',
            key: 'sms_recipients',
        },
        {
            title: 'Sms Sender',
            dataIndex: 'sms_sender',
            key: 'sms_sender',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];
    state = { loading: true };

    componentDidMount() {
        this.props.getTemplates();
    }

    componentWillReceiveProps({ sendings }) {
        if (this.props.sendings !== sendings) {
            this.setState({ loading: false });
        }
    }
    loadSendings = id => {
        if (id) {
            this.props.getSendings(id);
            this.setState({ loading: true });
        }
    };
    render() {
        const { props: { templates, sendings }, state: { loading }, loadSendings } = this;

        return [
            <h2 key="1">Templates last sendings</h2>,
            <div key="2">
                <Collapse accordion onChange={loadSendings}>
                    {templates.map(template => (
                        <Panel key={template.id} header={template.title}>
                            {loading ? (
                                <Spin />
                            ) : (
                                <Table dataSource={sendings} columns={this.columns} />
                            )}
                        </Panel>
                    ))}
                </Collapse>
            </div>,
        ];
    }
}

const mapStateToProps = ({ templates: { templates, sendings } }) => ({
    templates,
    sendings,
});

const mapDispatchToProps = dispatch => ({
    getTemplates: bindActionCreators(getTemplates, dispatch),
    getSendings: bindActionCreators(getSendings, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendingsListContainer);
