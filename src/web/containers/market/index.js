import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin, message } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import AdvancedLayout from '../../components/advanced-layout'


const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const Tokens = graphql(gql`
    query TokenQuery($basePairCode: String!) {
        tokens(basePairCode: $basePairCode) {
            code
            name
            type
            marketCap
            priceBtc
            high24h
            low24h
            circulatingSupply
            volume24h
            change24h

            basePair {
                code
            }
        }
    }
`)(({ data, mutate }) => {
    const columns = [
        {
            title: 'Market Pair',
            dataIndex: 'basePair.code',
            key: 'basePair.code',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (value, record) => <span><Link to={`/market/${record.basePair.code.toUpperCase()}-${record.code.toUpperCase()}`}>{record.basePair.code.toUpperCase()}-{record.code.toUpperCase()}</Link></span>
        },
        {
            title: 'Currency',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length
        },
        {
            title: 'Volume',
            dataIndex: 'volume24h',
            key: 'volume24h',
            sorter: (a, b) => a.volume24h - b.volume24h
        },
        {
            title: '% Change',
            dataIndex: 'change24h',
            key: 'change24h',
            sorter: (a, b) => a.change24h - b.change24h,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: 'Latest Price',
            dataIndex: 'priceBtc',
            key: 'priceBtc',
            sorter: (a, b) => a.priceBtc - b.priceBtc,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: '24HR High',
            dataIndex: 'high24h',
            key: 'high24h',
            sorter: (a, b) => a.high24h - b.high24h,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: '24HR Low',
            dataIndex: 'low24h',
            key: 'low24h',
            sorter: (a, b) => a.low24h - b.low24h,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: '% Spread',
            dataIndex: 'spread',
            key: 'spread',
            sorter: (a, b) => a.spread - b.spread
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span className={'table-operation'}>
                    <a href="#">Details</a>
                </span>
            ),
        },
    ]

    return (
        <Spin spinning={!data.tokens}>
            <Table
                columns={columns}
                dataSource={data.tokens}
                pagination={false}
                locale={{
                    filterConfirm: 'OK',
                    filterReset: 'Reset',
                    emptyText: 'No Data'
                }}
            />
        </Spin>
    )
})


const Container = graphql(gql`
    query TokenBasePairsQuery {
        basePairs {
            code
            name
        }
    }
`)(({ data, mutate }) => (
    <AdvancedLayout>
        {data.error && message.error("Network error. Reconnecting...") && setTimeout(() => window.location.reload(), 10000) && null}
        <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/market">Market</Link></Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ 'padding': '10px', 'marginTop': '10px' }}>
            {data.basePairs && data.basePairs.map((pair) => (
                <div>
                    <h2>{pair.name}</h2>
                    <Tokens basePairCode={pair.code} />
                    <br /><br />
                </div>
            ))}
        </Content>
    </AdvancedLayout>
))

Container.displayName = 'market/Container'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
