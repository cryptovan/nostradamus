import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Collapse, Tabs, Spin, Table } from 'antd'
import Terminal from 'terminal-in-react'

import SplitPane from 'react-split-pane/lib/SplitPane'
import ConnectionPanel from '../connection-panel'
import PeerConnector from '../peer-connector'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
const Panel = Collapse.Panel
const TabPane = Tabs.TabPane

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const liveNewsData = {
    items: [
        {
            status: 'unread',
            time: '08:03:00',
            title: 'Adacel to Supply ATC Training System'
        },
        {
            status: 'unread',
            time: '08:03:00',
            title: 'Adacel to Supply ATC Training System'
        },
        {
            status: 'unread',
            time: '08:03:00',
            title: 'Adacel to Supply ATC Training System'
        },
        {
            status: 'unread',
            time: '08:03:00',
            title: 'Adacel to Supply ATC Training System'
        }
    ]
}

const LiveNews = ({ data }) => {
    const columns = [
        {
            title: '',
            dataIndex: 'status',
            key: 'status',
            render: (value, record) => <span>.</span>
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            width: 90,
            render: (value, record) => <span><Link to={`/news/${record.permalink}`}>{record.time}</Link></span>
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (value, record) => <span><Link to={`/news/${record.permalink}`}>{record.title}</Link></span>
        },
    ]

    return (
        <Spin spinning={!data.items}>
            <Table
                columns={columns}
                dataSource={data.items}
                pagination={false}
                locale={{
                    filterConfirm: 'OK',
                    filterReset: 'Reset',
                    emptyText: 'No Data'
                }}
            />
        </Spin>
    )
}

export default class AdvancedLayout extends React.Component {
    state = {
        collapsed: false,
        pane1Height: 0,
        pane2Height: 0
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    componentDidMount() {
        this.setState({ pane1Height: ReactDOM.findDOMNode(this.collapse1).clientHeight })
        this.setState({ pane2Height: ReactDOM.findDOMNode(this.pane2).clientHeight - ReactDOM.findDOMNode(this.collapse2).clientHeight })
    }

    render() {
        return (
            <Layout {...this.props} className="advanced-layout">
                
                <SplitPane
                    split="vertical"
                    pane1Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                    pane2Style={{ background: 'rgba(0, 0, 0, 0)' }}
                    minSize={300}
                >
                    <div>
                        <SplitPane
                            defaultSize={65}
                            split="horizontal"
                            pane1Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                            pane2Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                        >
                            <div>
                                Nostrodamus
                            </div>
                            <div>
                                <SplitPane
                                    split="horizontal"
                                    size={this.state.pane1Height}
                                    pane1Style={{ background: 'rgba(0, 0, 0, 0.99)' }}
                                    pane2Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                                    ref={(ref) => this.pane1 = ref}
                                >
                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={['1']}
                                        ref={(ref) => this.collapse1 = ref}
                                        onChange={() => setTimeout(() => this.setState({ pane1Height: ReactDOM.findDOMNode(this.collapse1).clientHeight }), 300)}
                                        style={{display: 'table'}}
                                    >
                                        <Panel header="Account Info" key="1" disabled>
                                            <p>{text}</p>
                                        </Panel>
                                        <Panel header="Live News" key="2" className="live-news">
                                            <LiveNews data={liveNewsData} />
                                        </Panel>
                                        <Panel header="Time Zone Map" key="3">
                                            <p>{text}</p>
                                        </Panel>
                                    </Collapse>
                                    <div>
                                        <SplitPane split="horizontal" defaultSize="50%">
                                            <div style={{width: '100%'}}>
                                                <Sider
                                                    width="100%"
                                                    trigger={null}
                                                    collapsible
                                                    collapsed={this.state.collapsed}
                                                >
                                                    <Menu
                                                        theme="dark"
                                                        mode="inline"
                                                        defaultSelectedKeys={['1']}
                                                        style={{ height: '100%', borderRight: 0 }}
                                                    >
                                                        <Menu.Item key="1">
                                                            <Icon type="desktop" />
                                                            <span>Dashboard</span>
                                                        </Menu.Item>
                                                        <SubMenu
                                                            key="sub5"
                                                            title={<span><Icon type="user" /><span>Accounts</span></span>}
                                                        >
                                                            <Menu.Item key="30">Default</Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu key="sub1" title={<span><Icon type="laptop" /><span>Apps</span></span>}>
                                                            <Menu.Item key="3"><Link to="/apps/bittrex">Bittrex Enhanced</Link></Menu.Item>
                                                            <Menu.Item key="4"><Link to="/apps/etherdelta">EtherDelta Enhanced</Link></Menu.Item>
                                                            <Menu.Item key="5"><Link to="/apps/coinmarketcap">CoinMarketCap Enhanced</Link></Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu key="sub2" title={<span><Icon type="pie-chart" /><span>Market</span></span>}>
                                                            <Menu.Item key="5">Tokens</Menu.Item>
                                                            <Menu.Item key="6">Orders</Menu.Item>
                                                            <Menu.Item key="7">Wallets</Menu.Item>
                                                        </SubMenu>
                                                        <SubMenu key="sub3" title={<span><Icon type="notification" /><span>Help</span></span>}>
                                                            <Menu.Item key="9">News</Menu.Item>
                                                            <Menu.Item key="10">Site Status</Menu.Item>
                                                            <Menu.Item key="11">About</Menu.Item>
                                                            <Menu.Item key="12">Privacy Policy</Menu.Item>
                                                            <Menu.Item key="12">Cookie Policy</Menu.Item>
                                                            <Menu.Item key="12">Terms and Conditions</Menu.Item>
                                                            <Menu.Item key="12">Documentation</Menu.Item>
                                                            <Menu.Item key="12">Fees</Menu.Item>
                                                            <Menu.Item key="12">Support</Menu.Item>
                                                            <Menu.Item key="12">Contact Us</Menu.Item>
                                                        </SubMenu>
                                                        <Menu.Item key="8" style={{ display: "none" }}>
                                                            <Icon
                                                                className="trigger"
                                                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                                                onClick={this.toggle}
                                                            />
                                                        </Menu.Item>
                                                        <Menu.Item key="2">
                                                            <Icon type="user" />
                                                            <span>Sign Out</span>
                                                        </Menu.Item>
                                                    </Menu>
                                                </Sider>
                                            </div>
                                            <div> D</div>
                                        </SplitPane>
                                    </div>
                                </SplitPane>
                            </div>
                        </SplitPane>
                    </div>
                    <SplitPane
                        split="horizontal"
                        minSize={65}
                        pane1Style={{ background: 'rgba(0, 0, 0, 0.99)' }}
                        pane2Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                    >
                        <Header className="header titlebar">
                            <div className="logo" />
                            <Menu
                                theme="dark"
                                mode="horizontal"
                                defaultSelectedKeys={['1']}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/apps">Apps</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/market">Market</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/trends">Trends</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/accounts">Accounts</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/balances">Balances</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/trades">Trade View</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/monitor">Monitor</Link></Menu.Item>
                            </Menu>
                        </Header>
                        <SplitPane
                            split="horizontal"
                            size={this.state.pane2Height}
                            pane1Style={{ background: 'rgba(0, 0, 0, 0.3)', overflowY: 'auto' }}
                            pane2Style={{ background: 'rgba(0, 0, 0, 0.3)' }}
                            ref={(ref) => this.pane2 = ref}
                        >
                            <Layout style={{ padding: '0' }}>
                                <Content style={{ 'padding': '10px', 'marginTop': '0' }}>

                                    <Tabs defaultActiveKey="1" size="small">
                                        <TabPane tab="Trade" key="1">
                                            {this.props.children}
                                        </TabPane>
                                        <TabPane tab="Monitor" key="2">

                                        </TabPane>
                                        <TabPane tab="Analyze" key="4">

                                        </TabPane>
                                        <TabPane tab="Scan" key="5">

                                        </TabPane>
                                        <TabPane tab="Charts" key="6">

                                        </TabPane>
                                        <TabPane tab="Tools" key="7">

                                        </TabPane>
                                        <TabPane tab="Connection" key="8">
                                            <ConnectionPanel />
                                            <PeerConnector />
                                        </TabPane>
                                        <TabPane
                                            tab="Help"
                                            key="9"
                                            style={{
                                            }}
                                        >
                                            <Terminal
                                                color='#fff'
                                                backgroundColor='rgba(0, 0, 0, 0)'
                                                barColor='black'
                                                hideTopBar={true}
                                                allowTabs={false}
                                                style={{ fontWeight: "bold", fontSize: "1em" }}
                                                commands={{
                                                    'open-google': () => window.open('https://www.google.com/', '_blank'),
                                                    showmsg: this.showMsg,
                                                    popup: () => alert('Terminal in React')
                                                }}
                                                descriptions={{
                                                    'open-google': 'opens google.com',
                                                    showmsg: 'shows a message',
                                                    alert: 'alert', popup: 'alert'
                                                }}
                                                msg='Send your command'
                                            />
                                        </TabPane>
                                    </Tabs>
                                </Content>
                            </Layout>
                            <div>
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={['1']}
                                    ref={(ref) => this.collapse2 = ref}
                                    onChange={() => setTimeout(() => this.setState({ pane2Height: ReactDOM.findDOMNode(this.pane2).clientHeight - ReactDOM.findDOMNode(this.collapse2).clientHeight }), 300)}
                                    style={{ display: 'table' }}
                                >
                                    <Panel header="Footer" key="1">
                                        <p>{text}</p>
                                    </Panel>
                                </Collapse>
                            </div>
                        </SplitPane>
                    </SplitPane>
                </SplitPane>
            </Layout>
        )
    }
}