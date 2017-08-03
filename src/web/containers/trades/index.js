import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'

import BasicLayout from '../../components/basic-layout'

import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


class Container extends React.Component {
    componentDidMount() {
        getData().then(data => {
            this.setState({ data })
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <BasicLayout className="Page">
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Trade View</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: 0, margin: 0 }}>
                    <TypeChooser>
                        {type => <Chart type={type} data={this.state.data} />}
                    </TypeChooser>
                </Content>
            </BasicLayout>
        )
    }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
