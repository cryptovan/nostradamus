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

const Container = graphql(gql`
    query TokenQuery($code: String!) {
        token(code: $code) {
            code
            name
            type
            marketCap
            priceUsd
            circulatingSupply
            volume24h
            change24h
            change7d
            change1m
            change3m
            change6m
            change1y
            hackCount
            hackMentions
            volatilityRank
        }
    }
`)(({ data, mutate }) => (
    <BasicLayout>
        <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/tokens">Tokens</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{data.token && data.token.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ padding: 0, margin: 0 }}>
            {data.token && data.token.name}
            {data.token && data.token.code}
        </Content>
    </BasicLayout>
))

Container.displayName = 'token/Container'

const mapStateToProps = (state, ownProps) => ({
    code: ownProps.match.params.tokenCode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
