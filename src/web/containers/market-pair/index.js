import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import * as ActionCreators from '../../modules/market'
import AdvancedLayout from '../../components/advanced-layout'

import OrderDepth from '../../components/order-depth'
import OrderDepthChart from '../../components/order-depth-chart'
import OrderEntry from '../../components/order-entry'
import OrderBook from '../../components/order-book'
import TradeHistory from '../../components/trade-history'
import AccountSelector from '../../components/account-selector'

const OrderAction = { BID: 'bid', ASK: 'ask' }

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
`)((props) => (
    <AdvancedLayout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <OrderDepth side={OrderAction.ASK} depth={props.askDepth} subscribe={props.subscribeOrderDepth} />
                        <OrderDepth side={OrderAction.BID} depth={props.bidDepth} subscribe={props.subscribeOrderDepth} />
                    </div>
                    <div className="col-lg-7 main">
                        <div className="row">
                            <div className="col-lg-9">
                                <OrderEntry account={props.selectedAccount} submitOrder={props.submitOrder} />
                            </div>
                            <div className="col-lg-3">
                                <AccountSelector selected={props.selectedAccount} accounts={props.accounts}
                                    changeAccount={props.changeAccount} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <OrderDepthChart bidDepth={props.bidDepth} askDepth={props.askDepth} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <TradeHistory trades={props.trades} subscribe={props.subscribeTradeHistory} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <OrderBook orders={props.orders} account={props.selectedAccount}
                            subscribe={props.subscribeOrderBook} />
                    </div>
                </div>
            </div>

            
            <div>
                <div>
                    Graph 
                </div>
                <div>
                    <h1>{props.data.token && props.data.token.name} ({props.data.token && props.data.token.code})</h1>
                    <ul>
                        <li>
                            <div>LAST</div>
                            <div>
                                <span>$0.29</span>
                                <span>B 0.00006898</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h1>Trading</h1>
                <div>
                    Buy Ripple
                </div>
                <div>
                    Sell Ripple
                </div>
            </div>

            <div>
                <h1>Order Book</h1>
                <div>
                    Bids
                </div>
                <div>
                    Asks
                </div>
            </div>

            <div>
                <h1>Open Orders</h1>

                Orders here
            </div>

            <div>
                <h1>Market History</h1>

                table here
            </div>

            <div>
                <h1>My Order History</h1>
            </div>
    </AdvancedLayout>
))

Container.displayName = 'market-pair/Container'

Container.propTypes = {
    bidDepth: React.PropTypes.object.isRequired,
    askDepth: React.PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    pair: ownProps.match.params.pair,
    code: ownProps.match.params.pair.split('-')[1],
    orders: state.orderBook,
    bidDepth: state.orderDepth.bid,
    askDepth: state.orderDepth.ask,
    selectedAccount: state.account.selected,
    accounts: state.account.available,
    trades: state.trades
})

const mapDispatchToProps = dispatch => ({
        subscribeOrderBook: account => dispatch(ActionCreators.subscribeOrderBook(account)),
        subscribeOrderDepth: () => dispatch(ActionCreators.subscribeOrderDepth()),
        subscribeTradeHistory: () => dispatch(ActionCreators.subscribeTradeHistory()),
        changeAccount: account => dispatch(ActionCreators.changeAccount(account)),
        submitOrder: order => ActionCreators.submitOrder(order)
    })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
