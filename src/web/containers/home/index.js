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
        }
    }
`)(({ data, mutate }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (value) => <span><Link to="/tokens/btc">{value}</Link></span>
        },
        {
            title: 'Market Cap',
            dataIndex: 'marketCap',
            key: 'marketCap',
            sorter: (a, b) => a.marketCap - b.marketCap,
        },
        {
            title: 'Price',
            dataIndex: 'priceUsd',
            key: 'priceUsd',
            sorter: (a, b) => a.priceUsd - b.priceUsd
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
            sorter: (a, b) => a.change24h - b.change24h
        },
        {
            title: 'Change 7D',
            dataIndex: 'change7d',
            key: 'change7d',
            render: (value) => `${value}%`,
            sorter: (a, b) => a.change7d - b.change7d
        },
        {
            title: 'Change 1M',
            dataIndex: 'change1m',
            key: 'change1m',
            sorter: (a, b) => a.change1m - b.change1m
        },
        {
            title: 'Change 3M',
            dataIndex: 'change3m',
            key: 'change3m',
            sorter: (a, b) => a.change3m - b.change3m
        },
        {
            title: 'Change 6M',
            dataIndex: 'change6m',
            key: 'change6m',
            sorter: (a, b) => a.change6m - b.change6m
        },
        {
            title: 'Change 1Y',
            dataIndex: 'change1y',
            key: 'change1y',
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
    query ExchangeQuery {
        exchanges {
            name
            tokens {
                code
            }
        }
    }
`)(({ mutate }) => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: 'Status',
            key: 'state',
            render: () => <span><Badge status="success" />Finished</span>
        },
        {
            title: 'Upgrade Status',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
            sorter: (a, b) => a.upgradeNum - b.upgradeNum
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
                <span className={'table-operation'}>
                    <a href="#">Pause</a>
                    <span className="ant-divider" />
                    <a href="#">Stop</a>
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

    const data = []
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        })
    }

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
        />
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
            render: (value) => <span><Link to="/exchanges/bittrex">{value}</Link></span>
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
            />
        </Spin>
    )
})


function Container() {
    return (
        <BasicLayout className="Page">
            <Content style={{ padding: 0, margin: 0 }}>
                <Exchanges />
                <WhiteSpace />
                <Tokens />
                <WhiteSpace />
                <Trends />
                <WhiteSpace />
            </Content>
        </BasicLayout>
    )
}

Container.displayName = 'home/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
