import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import ConnectionPanel from '../connection-panel'
import PeerConnector from '../peer-connector'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

export default class BasicLayout extends React.Component {
    state = {
        collapsed: true,
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        return (
            <Layout {...this.props}>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/trends">Trends</Link></Menu.Item>
                        <Menu.Item key="3"><Link to="/trades">Trade View</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/monitor">Monitor</Link></Menu.Item>
                        <Menu.Item key="5"><Link to="/tokens">Tokens</Link></Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider
                        width={200}
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
                                <Icon type="pie-chart" />
                                <span>Option 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type="desktop" />
                                <span>Option 2</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub5"
                                title={<span><Icon type="user" /><span>User</span></span>}
                            >
                                <Menu.Item key="30">Tom</Menu.Item>
                                <Menu.Item key="40">Bill</Menu.Item>
                                <Menu.Item key="50">Alex</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={<span><Icon type="team" /><span>Team</span></span>}
                            >
                                <Menu.Item key="13">Team 1</Menu.Item>
                                <Menu.Item key="14">Team 2</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub1" title={<span><Icon type="user" /><span>Team</span></span>}>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop" /><span>Team</span></span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification" /><span>Team</span></span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="8">
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {this.props.children}
                        
                        <Content style={{ 'padding': '10px' }}>
                            <ConnectionPanel />
                            <PeerConnector />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}