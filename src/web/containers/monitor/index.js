import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import BasicLayout from '../../components/basic-layout'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


class Container extends React.Component {
    notifications = []

    constructor() {
        super()

        this.frameRef = null
    }

    render() {
        const columns = [
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                sorter: (a, b) => a.type.length - b.type.length,
            },
            {
                title: 'Info',
                dataIndex: 'info',
                key: 'info'
            }
        ]

        return (
            <BasicLayout>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/monitor">Monitor</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: 0, margin: 0 }}>
                    <Spin spinning={!this.notifications}>
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            dataSource={this.notifications}
                            pagination={false}
                            locale={{
                                filterConfirm: 'OK',
                                filterReset: 'Reset',
                                emptyText: 'No Data'
                            }}
                        />
                    </Spin>

                    <iframe src="https://www.reddit.com/r/Bitcoin/rising/" width="500" height="500" ref={(ref) => this.frameRef = ref}></iframe>
                </Content>
            </BasicLayout>
        )
    }
}

Container.displayName = 'monitor/Container'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
