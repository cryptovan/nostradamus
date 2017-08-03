import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import BasicLayout from '../../components/basic-layout'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

function Container() {
    return (
        <BasicLayout className="Page">
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Exchanges</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ padding: 0, margin: 0 }}>
                Trades
            </Content>
        </BasicLayout>
    )
}

Container.displayName = 'trades/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
