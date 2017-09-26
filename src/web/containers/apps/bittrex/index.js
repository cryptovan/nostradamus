import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin, notification, message } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import AdvancedLayout from '../../../components/advanced-layout'


const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const getClampedPrice = (up, down, width) => {
    const min = up > down ? up : down
    const max = up + down

    return {
        up: up / max * width,
        down: down / max * width
    }
}

const getClampedVolume = (up, down, width) => {
    const min = up > down ? up : down
    const max = up + down

    return {
        up: up / max * width,
        down: down / max * width
    }
}



class Container extends React.Component {
    volumes = {}

    constructor() {
        super()

        this.marketFrameRef = null

        this.state = {
            tokens: []
        }

        this.parseTokens = this.parseTokens.bind(this)

        setInterval(this.parseTokens, 1000)
    }

    getTokenData() {
        const visibleSummaries = this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="foreach: visibleSummaries"] tr')
        if (!visibleSummaries || visibleSummaries.length === 0) return []

        const tokens = [...visibleSummaries].map((rowItem) => {
            const symbol = rowItem.querySelectorAll('[data-bind*="text: marketName"]')[0].innerText.replace('BTC-', '')
            const volume = parseInt(rowItem.querySelectorAll('[data-bind*="text: baseVolume()"]')[0].innerText, 10)
            const price = parseFloat(parseFloat(rowItem.querySelectorAll('[data-bind*="text: displayLast()"]')[0].innerText).toFixed(8))

            if (!(symbol in this.volumes))
                this.volumes[symbol] = {
                    volumeHistory: [],
                    priceHistory: []
                }

            let token = this.volumes[symbol]

            token.symbol = symbol
            token.price = price
            token.volume = volume
            token.pair = 'BTC'
            token.price1m = { up: 0, down: 0 }
            token.price15m = { up: 0, down: 0 }
            token.price1h = { up: 0, down: 0 }
            token.price3h = { up: 0, down: 0 }
            token.price6h = { up: 0, down: 0 }
            token.volume1m = { up: 0, down: 0 }
            token.volume15m = { up: 0, down: 0 }
            token.volume1h = { up: 0, down: 0 }
            token.volume3h = { up: 0, down: 0 }
            token.volume6h = { up: 0, down: 0 }

            {
                // Add volume if it changed
                if (!token.priceHistory.length || price != token.priceHistory[token.priceHistory.length - 1]) {
                    token.priceHistory.push(price)
                } else if (price == token.priceHistory[token.priceHistory.length - 1]) {
                    token.priceHistory.push(price)
                }

                token.priceHistory = token.priceHistory.slice(6 * 60 * 60 * -1) // Slice off the last hour of the data 

                let prevVal = 0
                for (let i = token.priceHistory.length - 1; i > 0; i--) {
                    const val = token.priceHistory[i]

                    if (i === token.priceHistory.length - 1) prevVal = val

                    const diff = parseFloat((val - prevVal).toFixed(8))

                    if (i >= token.priceHistory.length - 60)
                        token.price1m = {
                            up: token.price1m.up += diff > 0 ? diff : 0,
                            down: token.price1m.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.priceHistory.length - 60 * 15)
                        token.price15m = {
                            up: token.price15m.up += diff > 0 ? diff : 0,
                            down: token.price15m.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.priceHistory.length - 1 * 60 * 60)
                        token.price1h = {
                            up: token.price1h.up += diff > 0 ? diff : 0,
                            down: token.price1h.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.priceHistory.length - 6 * 60 * 60)
                        token.price3h = {
                            up: token.price3h.up += diff > 0 ? diff : 0,
                            down: token.price3h.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.priceHistory.length - 6 * 60 * 60)
                        token.price6h = {
                            up: token.price6h.up += diff > 0 ? diff : 0,
                            down: token.price6h.down -= diff < 0 ? diff : 0
                        }

                    prevVal = val
                }
            }

            {
                // Add volume if it changed
                if (!token.volumeHistory.length || volume != token.volumeHistory[token.volumeHistory.length - 1]) {
                    token.volumeHistory.push(volume)
                } else if (volume == token.volumeHistory[token.volumeHistory.length - 1]) {
                    token.volumeHistory.push(volume)
                }

                token.volumeHistory = token.volumeHistory.slice(6 * 60 * 60 * -1) // Slice off the last hour of the data 

                let prevVal = 0
                for (let i = token.volumeHistory.length - 1; i > 0; i--) {
                    const val = token.volumeHistory[i]

                    if (i === token.volumeHistory.length - 1) prevVal = val

                    const diff = val - prevVal

                    if (i >= token.volumeHistory.length - 60)
                        token.volume1m = {
                            up: token.volume1m.up += diff > 0 ? diff : 0,
                            down: token.volume1m.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.volumeHistory.length - 60 * 15)
                        token.volume15m = {
                            up: token.volume15m.up += diff > 0 ? diff : 0,
                            down: token.volume15m.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.volumeHistory.length - 1 * 60 * 60)
                        token.volume1h = {
                            up: token.volume1h.up += diff > 0 ? diff : 0,
                            down: token.volume1h.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.volumeHistory.length - 6 * 60 * 60)
                        token.volume3h = {
                            up: token.volume3h.up += diff > 0 ? diff : 0,
                            down: token.volume3h.down -= diff < 0 ? diff : 0
                        }

                    if (i >= token.volumeHistory.length - 6 * 60 * 60)
                        token.volume6h = {
                            up: token.volume6h.up += diff > 0 ? diff : 0,
                            down: token.volume6h.down -= diff < 0 ? diff : 0
                        }

                    prevVal = val
                }
            }

            this.volumes[symbol] = token

            if (token.volume1m.up > 50) {
                notification.warning({
                    message: 'Volume',
                    description: 'Volume increase on ' + token.symbol + ': ' + token.volume1m.up
                })
            }

            return token
        })

        return tokens
    }

    parseTokens() {
        if (!this.marketFrameRef || !this.marketFrameRef.contentDocument) return

        if (!this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: nextPage"]').length) return

        let tokens = []

        setTimeout(() => {
            tokens = [...tokens, ...this.getTokenData()]
            this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: nextPage"]')[0].click()

            setTimeout(() => {
                tokens = [...tokens, ...this.getTokenData()]
                this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: nextPage"]')[0].click()

                setTimeout(() => {
                    tokens = [...tokens, ...this.getTokenData()]
                    this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: nextPage"]')[0].click()

                    setTimeout(() => {
                        tokens = [...tokens, ...this.getTokenData()]
                        this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: previousPage"]')[0].click()

                        setTimeout(() => {
                            this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: previousPage"]')[0].click()

                            setTimeout(() => {
                                this.marketFrameRef.contentDocument.querySelectorAll('[data-bind="with: btcTable"] [data-bind="click: previousPage"]')[0].click()

                                setTimeout(() => {
                                    console.log(tokens)
                                    this.setState({
                                        tokens
                                    })
                                }, 500)
                            }, 500)
                        }, 500)
                    }, 500)
                }, 500)
            }, 500)
        }, 500)
    }

    render() {
        const columns = [
            {
                title: 'Symbol',
                dataIndex: 'symbol',
                key: 'symbol',
                sorter: (a, b) => a.symbol.length - b.symbol.length,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                sorter: (a, b) => a.price - b.price,
            },
            {
                title: 'Price (1M)',
                dataIndex: 'price1m',
                key: 'price1m',
                sorter: (a, b) => ((a.price1m.up - a.price1m.down) / a.price * 100) - ((b.price1m.up - b.price1m.down) / b.price * 100),
                render: (value, record) => <div className="marker"><span className="marker-total">{((value.up - value.down) / record.price * 100).toFixed(2)}%</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedPrice(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{(value.up / record.price * 100).toFixed(2)}%</span><span className="marker-down">{(value.down / record.price * 100).toFixed(2)}%</span><span className="marker-bar down" style={{ width: getClampedPrice(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Price (15M)',
                dataIndex: 'price15m',
                key: 'price15m',
                sorter: (a, b) => ((a.price15m.up - a.price15m.down) / a.price * 100) - ((b.price15m.up - b.price15m.down) / b.price * 100),
                render: (value, record) => <div className="marker"><span className="marker-total">{((value.up - value.down) / record.price * 100).toFixed(2)}%</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedPrice(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{(value.up / record.price * 100).toFixed(2)}%</span><span className="marker-down">{(value.down / record.price * 100).toFixed(2)}%</span><span className="marker-bar down" style={{ width: getClampedPrice(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Price (1H)',
                dataIndex: 'price1h',
                key: 'price1h',
                sorter: (a, b) => ((a.price1h.up - a.price1h.down) / a.price * 100) - ((b.price1h.up - b.price1h.down) / b.price * 100),
                render: (value, record) => <div className="marker"><span className="marker-total">{((value.up - value.down) / record.price * 100).toFixed(2)}%</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedPrice(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{(value.up / record.price * 100).toFixed(2)}%</span><span className="marker-down">{(value.down / record.price * 100).toFixed(2)}%</span><span className="marker-bar down" style={{ width: getClampedPrice(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Price (3H)',
                dataIndex: 'price3h',
                key: 'price3h',
                sorter: (a, b) => ((a.price3h.up - a.price3h.down) / a.price * 100) - ((b.price3h.up - b.price3h.down) / b.price * 100),
                render: (value, record) => <div className="marker"><span className="marker-total">{((value.up - value.down) / record.price * 100).toFixed(2)}%</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedPrice(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{(value.up / record.price * 100).toFixed(2)}%</span><span className="marker-down">{(value.down / record.price * 100).toFixed(2)}%</span><span className="marker-bar down" style={{ width: getClampedPrice(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Price (6H)',
                dataIndex: 'price6h',
                key: 'price6h',
                sorter: (a, b) => ((a.price6h.up - a.price6h.down) / a.price * 100) - ((b.price6h.up - b.price6h.down) / b.price * 100),
                render: (value, record) => <div className="marker"><span className="marker-total">{((value.up - value.down) / record.price * 100).toFixed(2)}%</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedPrice(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{(value.up / record.price * 100).toFixed(2)}%</span><span className="marker-down">{(value.down / record.price * 100).toFixed(2)}%</span><span className="marker-bar down" style={{ width: getClampedPrice(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Volume',
                dataIndex: 'volume',
                key: 'volume',
                sorter: (a, b) => a.volume - b.volume,
            },
            {
                title: 'Volume (1M)',
                dataIndex: 'volume1m',
                key: 'volume1m',
                sorter: (a, b) => (a.volume1m.up - a.volume1m.down) - (b.volume1m.up - b.volume1m.down),
                render: (value) => <div className="marker"><span className="marker-total">{value.up - value.down}</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedVolume(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{value.up}</span><span className="marker-down">{value.down}</span><span className="marker-bar down" style={{ width: getClampedVolume(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Volume (15M)',
                dataIndex: 'volume15m',
                key: 'volume15m',
                sorter: (a, b) => (a.volume15m.up - a.volume15m.down) - (b.volume15m.up - b.volume15m.down),
                render: (value) => <div className="marker"><span className="marker-total">{value.up - value.down}</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedVolume(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{value.up}</span><span className="marker-down">{value.down}</span><span className="marker-bar down" style={{ width: getClampedVolume(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Volume (1H)',
                dataIndex: 'volume1h',
                key: 'volume1h',
                sorter: (a, b) => (a.volume1h.up - a.volume1h.down) - (b.volume1h.up - b.volume1h.down),
                render: (value) => <div className="marker"><span className="marker-total">{value.up - value.down}</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedVolume(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{value.up}</span><span className="marker-down">{value.down}</span><span className="marker-bar down" style={{ width: getClampedVolume(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Volume (3H)',
                dataIndex: 'volume3h',
                key: 'volume3h',
                sorter: (a, b) => (a.volume3h.up - a.volume3h.down) - (b.volume3h.up - b.volume3h.down),
                render: (value) => <div className="marker"><span className="marker-total">{value.up - value.down}</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedVolume(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{value.up}</span><span className="marker-down">{value.down}</span><span className="marker-bar down" style={{ width: getClampedVolume(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Volume (6H)',
                dataIndex: 'volume6h',
                key: 'volume6h',
                sorter: (a, b) => (a.volume6h.up - a.volume6h.down) - (b.volume6h.up - b.volume6h.down),
                render: (value) => <div className="marker"><span className="marker-total">{value.up - value.down}</span> <div className="marker-bars"><span className="marker-bar up" style={{ width: getClampedVolume(value.up, value.down, 30).up }}>&nbsp;</span><span className="marker-up">{value.up}</span><span className="marker-down">{value.down}</span><span className="marker-bar down" style={{ width: getClampedVolume(value.up, value.down, 30).down }}>&nbsp;</span></div></div>
            },
            {
                title: 'Pair',
                dataIndex: 'pair',
                key: 'pair',
                sorter: (a, b) => a.pair.length - b.pair.length,
            },
        ]

        return (
            <AdvancedLayout className="Page">
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/apps">Apps</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Bittrex Enhanced</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ 'padding': '10px', 'marginTop': '10px' }}>
                    <Spin spinning={!this.state.tokens}>
                        <Table
                            rowKey={record => record.symbol}
                            columns={columns}
                            dataSource={this.state.tokens}
                            pagination={{ defaultPageSize: 10 }}
                            locale={{
                                filterConfirm: 'OK',
                                filterReset: 'Reset',
                                emptyText: 'No Data'
                            }}
                        />
                    </Spin>
                    <div style={{visibility: 'hidden'}}>
                        <br />
                        <iframe src="https://bittrex.com/Home/Markets" width="0" height="0" ref={(ref) => this.marketFrameRef = ref}></iframe>
                    </div>
                </Content>
            </AdvancedLayout>
        )
    }
}

Container.displayName = 'apps/bittrex/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
