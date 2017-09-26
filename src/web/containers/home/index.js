import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import AdvancedLayout from '../../components/advanced-layout'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const menu = (
    <Menu>
        <Menu.Item>
            Action 1
        </Menu.Item>
        <Menu.Item>
            Action 2
        </Menu.Item>
    </Menu>
)


const Tokens = graphql(gql`
    query TokenQuery {
        tokens {
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
`)(({ data, mutate }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (value, record) => <span><Link to={`/token/${record.code}`}>{value}</Link></span>
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketCap',
            key: 'marketCap',
            sorter: (a, b) => a.marketCap - b.marketCap,
            render: (value) => `$${value.toFixed(0)}`,
        },
        {
            title: 'Price',
            dataIndex: 'priceUsd',
            key: 'priceUsd',
            sorter: (a, b) => a.priceUsd - b.priceUsd,
            render: (value) => `$${value.toFixed(2)}`,
        },
        {
            title: 'Circulating Supply',
            dataIndex: 'circulatingSupply',
            key: 'circulatingSupply',
            sorter: (a, b) => a.circulatingSupply - b.circulatingSupply
        },
        {
            title: 'Volume 24H',
            dataIndex: 'volume24h',
            key: 'volume24h',
            sorter: (a, b) => a.volume24h - b.volume24h
        },
        { 
            title: 'Change 24H',
            dataIndex: 'change24h',
            key: 'change24h',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change24h - b.change24h
        },
        {
            title: 'Change 7D',
            dataIndex: 'change7d',
            key: 'change7d',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change7d - b.change7d
        },
        {
            title: 'Change 1M',
            dataIndex: 'change1m',
            key: 'change1m',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change1m - b.change1m
        },
        {
            title: 'Change 3M',
            dataIndex: 'change3m',
            key: 'change3m',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change3m - b.change3m
        },
        {
            title: 'Change 6M',
            dataIndex: 'change6m',
            key: 'change6m',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change6m - b.change6m
        },
        {
            title: 'Change 1Y',
            dataIndex: 'change1y',
            key: 'change1y',
            render: (value) => `${value.toFixed(2)}%`,
            sorter: (a, b) => a.change1y - b.change1y
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'App', value: 'App' },
                { text: 'Platform', value: 'Platform' },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0
        },
        {
            title: 'Status',
            key: 'status',
            render: () => <span><Badge status="success" />Normal</span>
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span className={'table-operation'}>
                    <a href="#">Details</a>
                    <span className="ant-divider" />
                    <Dropdown overlay={menu}>
                        <a href="#">
                            More <Icon type="down" />
                        </a>
                    </Dropdown>
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

const Trends = graphql(gql`
    query DealsQuery {
        deals {
            date
            type
            token {
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
            exchanges {
                name
                tokenCount
                status
                newsMentions
                tokens {
                    code
                }
            }
        }
    }
`)(({ data, mutate }) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) => a.type.length - b.type.length,
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'token',
            render: (value) => value.name,
            sorter: (a, b) => a.token.length - b.token.length,
        },
        {
            title: 'Exchanges',
            dataIndex: 'exchanges',
            key: 'exchanges',
            sorter: (a, b) => a.exchanges.length - b.exchanges.length,
        },
    ]

    return (
        <Spin spinning={!data.deals}>
            <Table
                columns={columns}
                dataSource={data.deals}
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



const Exchanges = graphql(gql`
    query ExchangeQuery {
        exchanges {
            name
            tokenCount
            status
            newsMentions
            tokens {
                code
            }
        }
    }
`)(({ data, mutate }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (value) => <span><Link to="/exchange/bittrex">{value}</Link></span>
        },
        {
            title: 'Tokens',
            dataIndex: 'tokenCount',
            key: 'tokenCount',
            sorter: (a, b) => a.tokenCount - b.tokenCount
        },
        {
            title: 'Status',
            key: 'status',
            render: () => <span><Badge status="success" />Online</span>,
            filters: [
                { text: 'Online', value: 'Online' },
                { text: 'Offline', value: 'Offline' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
            title: 'News Mentions',
            dataIndex: 'newsMentions',
            key: 'newsMentions',
            sorter: (a, b) => a.newsMentions - b.newsMentions
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span className={'table-operation'}>
                    <a href="#">Details</a>
                    <span className="ant-divider" />
                    <a href="#">Holdings</a>
                    <span className="ant-divider" />
                    <Dropdown overlay={menu}>
                        <a href="#">
                            More <Icon type="down" />
                        </a>
                    </Dropdown>
                </span>
            ),
        },
    ]

    return (
        <Spin spinning={!data.exchanges}>
            <Table
                columns={columns}
                dataSource={data.exchanges}
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


const Container = () => (
    <AdvancedLayout>
        <Content style={{'padding': '10px', 'marginTop': '10px'}}>
            <h3>Exchanges</h3>
            <Exchanges />
            <WhiteSpace />
            <h3>Tokens</h3>
            <Tokens />
            <WhiteSpace />
            <h3>Trends</h3>
            <Trends />
            <WhiteSpace />
        </Content>
    </AdvancedLayout>
)

Container.displayName = 'home/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
