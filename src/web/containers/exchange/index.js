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

function Container() {
    return (
        <BasicLayout className="Page">
            <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/exchanges">Exchanges</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Bittrex</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ padding: 0, margin: 0 }}>

            </Content>
        </BasicLayout>
    )
}

Container.displayName = 'exchange/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
