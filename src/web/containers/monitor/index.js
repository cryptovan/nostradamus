import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin, message } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import AdvancedLayout from '../../components/advanced-layout'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


class Container extends React.Component {
    notifications = []

    constructor() {
        super()

        this.frameRef = null
        this.monitoredKeywords = [
            'rebranding',
            'burning'
        ]

        this.notifications = []

        this.monitor = this.monitor.bind(this)

        this.monitorLinkCurrent = 0
        this.monitorLinks = [
            {
                link: 'https://www.reddit.com/r/Bitcoin/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/BitcoinMarkets/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/btc/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/ethereum/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/CryptoCurrency/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/ethtrader/new/',
                token: null
            },
            {
                link: 'https://www.reddit.com/r/Lisk/new/',
                token: 'LSK'
            },
            {
                link: 'https://www.reddit.com/r/ArkEcosystem/new/',
                token: 'ARK'
            },
            {
                link: 'https://www.reddit.com/r/NavCoin/new/',
                token: 'NAV'
            },
            {
                link: 'https://www.reddit.com/r/vergecurrency/new/',
                token: 'XVG'
            }
        ]

        this.state = {
            notifications: []
        }

        let interval = setInterval(() => {
            if (!this.frameRef || !this.frameRef.contentDocument) return
            
            this.monitor()

            clearInterval(interval)
        }, 500)
    }

    getEntryData() {
        const entries = this.frameRef.contentDocument.querySelectorAll('.entry a.title')
        if (!entries || entries.length === 0) return []
        
        return [...entries]
    }

    parseLinkNotifications(monitorLink) {
        const entries = this.getEntryData()

        const findNotification = (info) => (notification) => {
            return notification.info == info
        }

        entries.map((rowItem) => {
            const entry = {
                info: rowItem.innerText
            }

            // Skip if already exists
            if (this.notifications.find(findNotification(entry.info)))
                return

            let keyword = null
            if (entry.info.toLowerCase().indexOf('rebranding') !== -1) {
                keyword = 'rebranding'
            }

            if (entry.info.toLowerCase().indexOf('burning') !== -1) {
                keyword = 'burning'
            }

            if (entry.info.toLowerCase().indexOf('undervalued') !== -1) {
                keyword = 'undervalued'
            }

            if (entry.info.toLowerCase().indexOf('pumping') !== -1) {
                keyword = 'pumping'
            }

            if (entry.info.toLowerCase().indexOf('hack') !== -1) {
                keyword = 'hack'
            }

            if (entry.info.toLowerCase().indexOf('crash') !== -1) {
                keyword = 'crash'
            }

            if (entry.info.toLowerCase().indexOf('scam') !== -1) {
                keyword = 'scam'
            }
            
            if (!keyword) return

            this.notifications.push({
                keyword,
                token: monitorLink.token,
                info: entry.info,
                link: rowItem.href,
                date: new Date()
            })

            this.setState({
                notifications: this.notifications
            })
        })
    }

    monitor() {
        const monitorLink = this.monitorLinks[this.monitorLinkCurrent]

        console.log('Checking: ' + monitorLink.link)

        this.frameRef.src = monitorLink.link

        const interval = setInterval(() => {
            if (!this.frameRef || !this.frameRef.contentDocument) return
            
            this.parseLinkNotifications(monitorLink)
            
            clearInterval(interval)

            setTimeout(this.monitor, 4000)
        }, 500)
        
        this.monitorLinkCurrent++

        if (this.monitorLinkCurrent > this.monitorLinks.length - 1)
            this.monitorLinkCurrent = 0
    }

    render() {
        const columns = [
            {
                title: 'Keyword',
                dataIndex: 'keyword',
                key: 'keyword',
                sorter: (a, b) => a.keyword.length - b.keyword.length,
            },
            {
                title: 'Toke',
                dataIndex: 'token',
                key: 'token',
                sorter: (a, b) => a.token.length - b.token.length,
            },
            {
                title: 'Info',
                dataIndex: 'info',
                key: 'info',
                render: (value, record) => <Link to={record.link}>{record.info}</Link>
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: (value, record) => value.toString()
            }
        ]

        return (
            <AdvancedLayout>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/monitor">Monitor</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: 0, margin: 0 }}>
                    <Spin spinning={!this.state.notifications}>
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            dataSource={this.state.notifications}
                            pagination={false}
                            locale={{
                                filterConfirm: 'OK',
                                filterReset: 'Reset',
                                emptyText: 'No Data'
                            }}
                        />
                    </Spin>

                    <div style={{ visibility: 'hidden' }}>
                        <br />
                        <iframe src="https://www.reddit.com/r/Bitcoin/rising/" width="0" height="0" ref={(ref) => this.frameRef = ref} name="browser-page-disable-x-frame-options" sandbox="allow-scripts allow-same-origin"></iframe>
                    </div>
                </Content>
            </AdvancedLayout>
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
