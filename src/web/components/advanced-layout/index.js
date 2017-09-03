import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Collapse } from 'antd'

import SplitPane from 'react-split-pane/lib/SplitPane'
import ConnectionPanel from '../connection-panel'
import PeerConnector from '../peer-connector'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout
const Panel = Collapse.Panel

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export default class AdvancedLayout extends React.Component {
    state = {
        collapsed: false,
        pane1Height: 0
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        return (
            <Layout {...this.props} className="advanced-layout">
                
                <SplitPane split="vertical" minSize={300}>
                    <div>
                        <SplitPane defaultSize="20%" split="horizontal" pane1Style={{ background: '#444' }} pane2Style={{ background: '#eee' }}>
                            <div>
                                A
                            </div>
                            <div>
                                <SplitPane
                                    split="horizontal"
                                    size={this.state.pane1Height}
                                    pane1Style={{ background: '#aaa4ba' }}
                                    pane2Style={{ background: '#000' }}
                                    ref={(ref) => this.pane1 = ref}
                                >
                                    <Collapse
                                        bordered={false}
                                        defaultActiveKey={['1']}
                                        ref={(ref) => this.collapse1 = ref}
                                        onChange={() => setTimeout(() => this.setState({ pane1Height: ReactDOM.findDOMNode(this.collapse1).clientHeight }), 300)}
                                        style={{display: 'table'}}
                                    >
                                        <Panel header="This is panel header 1" key="1" >
                                            <p>{text}</p>
                                        </Panel>
                                        <Panel header="This is panel header 2" key="2">
                                            <p>{text}</p>
                                        </Panel>
                                        <Panel header="This is panel header 3" key="3">
                                            <p>{text}</p>
                                        </Panel>
                                    </Collapse>
                                    <div>
                                        <SplitPane split="horizontal" defaultSize="50%">
                                            <div>
                                                        C
                                            </div>
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
                                                    <Menu.Item key="8" style={{display: "none"}}>
                                                        <Icon
                                                            className="trigger"
                                                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                                            onClick={this.toggle}
                                                        />
                                                    </Menu.Item>
                                                </Menu>
                                            </Sider>
                                        </SplitPane>
                                    </div>
                                </SplitPane>
                            </div>
                        </SplitPane>
                    </div>
                    <SplitPane split="horizontal" minSize={65}>
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
                                <Menu.Item key="5"><Link to="/market">Market</Link></Menu.Item>
                            </Menu>
                        </Header>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {this.props.children}

                            <Content style={{ 'padding': '10px' }}>
                                <ConnectionPanel />
                                <PeerConnector />
                            </Content>
                        </Layout>
                    </SplitPane>
                </SplitPane>
            </Layout>
        )
    }
}