import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

import BasicLayout from '../../components/basic-layout'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const Container = (props) => (
    <BasicLayout className="Page">
        <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            Content

            <br />
            <br />
            <Link to="/">Home</Link><br />
        </Content>
    </BasicLayout>
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
