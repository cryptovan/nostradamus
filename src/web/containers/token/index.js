import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Layout, Menu, Table, Badge, Breadcrumb, Dropdown, Icon, Spin } from 'antd'
import { WhiteSpace } from 'antd-mobile'
import CalendarHeatmap from 'react-calendar-heatmap'

import BasicLayout from '../../components/basic-layout'

import './index.css'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


const randomValues = [{ "date": "2017-09-04T05:26:06.817Z", "count": 2 }, { "date": "2017-09-03T05:26:06.817Z", "count": 2 }, { "date": "2017-09-02T05:26:06.817Z", "count": 2 }, { "date": "2017-09-01T05:26:06.817Z", "count": 2 }, { "date": "2017-08-31T05:26:06.817Z", "count": 3 }, { "date": "2017-08-30T05:26:06.817Z", "count": 2 }, { "date": "2017-08-29T05:26:06.817Z", "count": 1 }, { "date": "2017-08-28T05:26:06.817Z", "count": 3 }, { "date": "2017-08-27T05:26:06.817Z", "count": 1 }, { "date": "2017-08-26T05:26:06.817Z", "count": 1 }, { "date": "2017-08-25T05:26:06.817Z", "count": 3 }, { "date": "2017-08-24T05:26:06.817Z", "count": 1 }, { "date": "2017-08-23T05:26:06.817Z", "count": 2 }, { "date": "2017-08-22T05:26:06.817Z", "count": 2 }, { "date": "2017-08-21T05:26:06.817Z", "count": 1 }, { "date": "2017-08-20T05:26:06.817Z", "count": 1 }, { "date": "2017-08-19T05:26:06.817Z", "count": 1 }, { "date": "2017-08-18T05:26:06.817Z", "count": 2 }, { "date": "2017-08-17T05:26:06.817Z", "count": 2 }, { "date": "2017-08-16T05:26:06.817Z", "count": 1 }, { "date": "2017-08-15T05:26:06.817Z", "count": 2 }, { "date": "2017-08-14T05:26:06.817Z", "count": 1 }, { "date": "2017-08-13T05:26:06.817Z", "count": 1 }, { "date": "2017-08-12T05:26:06.817Z", "count": 1 }, { "date": "2017-08-11T05:26:06.817Z", "count": 1 }, { "date": "2017-08-10T05:26:06.817Z", "count": 3 }, { "date": "2017-08-09T05:26:06.817Z", "count": 1 }, { "date": "2017-08-08T05:26:06.817Z", "count": 1 }, { "date": "2017-08-07T05:26:06.817Z", "count": 2 }, { "date": "2017-08-06T05:26:06.817Z", "count": 1 }, { "date": "2017-08-05T05:26:06.817Z", "count": 3 }, { "date": "2017-08-04T05:26:06.817Z", "count": 3 }, { "date": "2017-08-03T05:26:06.817Z", "count": 1 }, { "date": "2017-08-02T05:26:06.817Z", "count": 1 }, { "date": "2017-08-01T05:26:06.817Z", "count": 3 }, { "date": "2017-07-31T05:26:06.817Z", "count": 1 }, { "date": "2017-07-30T05:26:06.817Z", "count": 1 }, { "date": "2017-07-29T05:26:06.817Z", "count": 2 }, { "date": "2017-07-28T05:26:06.817Z", "count": 3 }, { "date": "2017-07-27T05:26:06.817Z", "count": 3 }, { "date": "2017-07-26T05:26:06.817Z", "count": 3 }, { "date": "2017-07-25T05:26:06.817Z", "count": 2 }, { "date": "2017-07-24T05:26:06.817Z", "count": 3 }, { "date": "2017-07-23T05:26:06.817Z", "count": 2 }, { "date": "2017-07-22T05:26:06.817Z", "count": 2 }, { "date": "2017-07-21T05:26:06.817Z", "count": 3 }, { "date": "2017-07-20T05:26:06.817Z", "count": 3 }, { "date": "2017-07-19T05:26:06.817Z", "count": 1 }, { "date": "2017-07-18T05:26:06.817Z", "count": 2 }, { "date": "2017-07-17T05:26:06.817Z", "count": 1 }, { "date": "2017-07-16T05:26:06.817Z", "count": 2 }, { "date": "2017-07-15T05:26:06.817Z", "count": 1 }, { "date": "2017-07-14T05:26:06.817Z", "count": 3 }, { "date": "2017-07-13T05:26:06.817Z", "count": 2 }, { "date": "2017-07-12T05:26:06.817Z", "count": 1 }, { "date": "2017-07-11T05:26:06.817Z", "count": 2 }, { "date": "2017-07-10T05:26:06.817Z", "count": 2 }, { "date": "2017-07-09T05:26:06.817Z", "count": 1 }, { "date": "2017-07-08T05:26:06.817Z", "count": 3 }, { "date": "2017-07-07T05:26:06.817Z", "count": 3 }, { "date": "2017-07-06T05:26:06.817Z", "count": 3 }, { "date": "2017-07-05T05:26:06.817Z", "count": 1 }, { "date": "2017-07-04T05:26:06.817Z", "count": 2 }, { "date": "2017-07-03T05:26:06.817Z", "count": 1 }, { "date": "2017-07-02T05:26:06.817Z", "count": 3 }, { "date": "2017-07-01T05:26:06.817Z", "count": 1 }, { "date": "2017-06-30T05:26:06.817Z", "count": 2 }, { "date": "2017-06-29T05:26:06.817Z", "count": 2 }, { "date": "2017-06-28T05:26:06.817Z", "count": 3 }, { "date": "2017-06-27T05:26:06.817Z", "count": 3 }, { "date": "2017-06-26T05:26:06.817Z", "count": 3 }, { "date": "2017-06-25T05:26:06.817Z", "count": 2 }, { "date": "2017-06-24T05:26:06.817Z", "count": 2 }, { "date": "2017-06-23T05:26:06.817Z", "count": 1 }, { "date": "2017-06-22T05:26:06.817Z", "count": 2 }, { "date": "2017-06-21T05:26:06.817Z", "count": 1 }, { "date": "2017-06-20T05:26:06.817Z", "count": 1 }, { "date": "2017-06-19T05:26:06.817Z", "count": 2 }, { "date": "2017-06-18T05:26:06.817Z", "count": 1 }, { "date": "2017-06-17T05:26:06.817Z", "count": 2 }, { "date": "2017-06-16T05:26:06.817Z", "count": 3 }, { "date": "2017-06-15T05:26:06.817Z", "count": 2 }, { "date": "2017-06-14T05:26:06.817Z", "count": 1 }, { "date": "2017-06-13T05:26:06.817Z", "count": 3 }, { "date": "2017-06-12T05:26:06.817Z", "count": 3 }, { "date": "2017-06-11T05:26:06.817Z", "count": 1 }, { "date": "2017-06-10T05:26:06.817Z", "count": 2 }, { "date": "2017-06-09T05:26:06.817Z", "count": 1 }, { "date": "2017-06-08T05:26:06.817Z", "count": 3 }, { "date": "2017-06-07T05:26:06.817Z", "count": 1 }, { "date": "2017-06-06T05:26:06.817Z", "count": 1 }, { "date": "2017-06-05T05:26:06.817Z", "count": 1 }, { "date": "2017-06-04T05:26:06.817Z", "count": 1 }, { "date": "2017-06-03T05:26:06.817Z", "count": 2 }, { "date": "2017-06-02T05:26:06.817Z", "count": 2 }, { "date": "2017-06-01T05:26:06.817Z", "count": 3 }, { "date": "2017-05-31T05:26:06.817Z", "count": 3 }, { "date": "2017-05-30T05:26:06.817Z", "count": 1 }, { "date": "2017-05-29T05:26:06.817Z", "count": 1 }, { "date": "2017-05-28T05:26:06.817Z", "count": 3 }, { "date": "2017-05-27T05:26:06.817Z", "count": 3 }, { "date": "2017-05-26T05:26:06.817Z", "count": 3 }, { "date": "2017-05-25T05:26:06.817Z", "count": 2 }, { "date": "2017-05-24T05:26:06.817Z", "count": 1 }, { "date": "2017-05-23T05:26:06.817Z", "count": 1 }, { "date": "2017-05-22T05:26:06.817Z", "count": 1 }, { "date": "2017-05-21T05:26:06.817Z", "count": 2 }, { "date": "2017-05-20T05:26:06.817Z", "count": 2 }, { "date": "2017-05-19T05:26:06.817Z", "count": 2 }, { "date": "2017-05-18T05:26:06.817Z", "count": 1 }, { "date": "2017-05-17T05:26:06.817Z", "count": 3 }, { "date": "2017-05-16T05:26:06.817Z", "count": 1 }, { "date": "2017-05-15T05:26:06.817Z", "count": 2 }, { "date": "2017-05-14T05:26:06.817Z", "count": 1 }, { "date": "2017-05-13T05:26:06.817Z", "count": 3 }, { "date": "2017-05-12T05:26:06.817Z", "count": 1 }, { "date": "2017-05-11T05:26:06.817Z", "count": 3 }, { "date": "2017-05-10T05:26:06.817Z", "count": 2 }, { "date": "2017-05-09T05:26:06.817Z", "count": 1 }, { "date": "2017-05-08T05:26:06.817Z", "count": 3 }, { "date": "2017-05-07T05:26:06.817Z", "count": 3 }, { "date": "2017-05-06T05:26:06.817Z", "count": 2 }, { "date": "2017-05-05T05:26:06.817Z", "count": 1 }, { "date": "2017-05-04T05:26:06.817Z", "count": 1 }, { "date": "2017-05-03T05:26:06.817Z", "count": 2 }, { "date": "2017-05-02T05:26:06.817Z", "count": 2 }, { "date": "2017-05-01T05:26:06.817Z", "count": 3 }, { "date": "2017-04-30T05:26:06.817Z", "count": 3 }, { "date": "2017-04-29T05:26:06.817Z", "count": 1 }, { "date": "2017-04-28T05:26:06.817Z", "count": 2 }, { "date": "2017-04-27T05:26:06.817Z", "count": 3 }, { "date": "2017-04-26T05:26:06.817Z", "count": 1 }, { "date": "2017-04-25T05:26:06.817Z", "count": 2 }, { "date": "2017-04-24T05:26:06.817Z", "count": 1 }, { "date": "2017-04-23T05:26:06.817Z", "count": 2 }, { "date": "2017-04-22T05:26:06.817Z", "count": 2 }, { "date": "2017-04-21T05:26:06.817Z", "count": 1 }, { "date": "2017-04-20T05:26:06.817Z", "count": 1 }, { "date": "2017-04-19T05:26:06.817Z", "count": 3 }, { "date": "2017-04-18T05:26:06.817Z", "count": 1 }, { "date": "2017-04-17T05:26:06.817Z", "count": 1 }, { "date": "2017-04-16T05:26:06.817Z", "count": 1 }, { "date": "2017-04-15T05:26:06.817Z", "count": 2 }, { "date": "2017-04-14T05:26:06.817Z", "count": 1 }, { "date": "2017-04-13T05:26:06.817Z", "count": 1 }, { "date": "2017-04-12T05:26:06.817Z", "count": 2 }, { "date": "2017-04-11T05:26:06.817Z", "count": 3 }, { "date": "2017-04-10T05:26:06.817Z", "count": 2 }, { "date": "2017-04-09T05:26:06.817Z", "count": 2 }, { "date": "2017-04-08T05:26:06.817Z", "count": 2 }, { "date": "2017-04-07T05:26:06.817Z", "count": 3 }, { "date": "2017-04-06T05:26:06.817Z", "count": 3 }, { "date": "2017-04-05T05:26:06.817Z", "count": 1 }, { "date": "2017-04-04T05:26:06.817Z", "count": 1 }, { "date": "2017-04-03T05:26:06.817Z", "count": 3 }, { "date": "2017-04-02T05:26:06.817Z", "count": 2 }, { "date": "2017-04-01T05:26:06.817Z", "count": 3 }, { "date": "2017-03-31T05:26:06.817Z", "count": 2 }, { "date": "2017-03-30T05:26:06.817Z", "count": 1 }, { "date": "2017-03-29T05:26:06.817Z", "count": 2 }, { "date": "2017-03-28T05:26:06.817Z", "count": 1 }, { "date": "2017-03-27T05:26:06.817Z", "count": 3 }, { "date": "2017-03-26T05:26:06.817Z", "count": 2 }, { "date": "2017-03-25T05:26:06.817Z", "count": 3 }, { "date": "2017-03-24T05:26:06.817Z", "count": 3 }, { "date": "2017-03-23T05:26:06.817Z", "count": 1 }, { "date": "2017-03-22T05:26:06.817Z", "count": 2 }, { "date": "2017-03-21T05:26:06.817Z", "count": 2 }, { "date": "2017-03-20T05:26:06.817Z", "count": 1 }, { "date": "2017-03-19T05:26:06.817Z", "count": 3 }, { "date": "2017-03-18T05:26:06.817Z", "count": 1 }, { "date": "2017-03-17T05:26:06.817Z", "count": 1 }, { "date": "2017-03-16T05:26:06.817Z", "count": 1 }, { "date": "2017-03-15T05:26:06.817Z", "count": 3 }, { "date": "2017-03-14T05:26:06.817Z", "count": 3 }, { "date": "2017-03-13T05:26:06.817Z", "count": 1 }, { "date": "2017-03-12T06:26:06.817Z", "count": 2 }, { "date": "2017-03-11T06:26:06.817Z", "count": 3 }, { "date": "2017-03-10T06:26:06.817Z", "count": 3 }, { "date": "2017-03-09T06:26:06.817Z", "count": 3 }, { "date": "2017-03-08T06:26:06.817Z", "count": 3 }, { "date": "2017-03-07T06:26:06.817Z", "count": 3 }, { "date": "2017-03-06T06:26:06.817Z", "count": 3 }, { "date": "2017-03-05T06:26:06.817Z", "count": 2 }, { "date": "2017-03-04T06:26:06.817Z", "count": 1 }, { "date": "2017-03-03T06:26:06.817Z", "count": 1 }, { "date": "2017-03-02T06:26:06.817Z", "count": 1 }, { "date": "2017-03-01T06:26:06.817Z", "count": 3 }, { "date": "2017-02-28T06:26:06.817Z", "count": 1 }, { "date": "2017-02-27T06:26:06.817Z", "count": 3 }, { "date": "2017-02-26T06:26:06.817Z", "count": 2 }, { "date": "2017-02-25T06:26:06.817Z", "count": 1 }, { "date": "2017-02-24T06:26:06.817Z", "count": 2 }, { "date": "2017-02-23T06:26:06.817Z", "count": 2 }, { "date": "2017-02-22T06:26:06.817Z", "count": 1 }, { "date": "2017-02-21T06:26:06.817Z", "count": 1 }, { "date": "2017-02-20T06:26:06.817Z", "count": 2 }, { "date": "2017-02-19T06:26:06.817Z", "count": 1 }, { "date": "2017-02-18T06:26:06.817Z", "count": 2 }, { "date": "2017-02-17T06:26:06.817Z", "count": 2 }]

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
`)(({ data, mutate }) => (
    <BasicLayout>
        <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/tokens">Tokens</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{data.token && data.token.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ padding: 0, margin: 0 }}>
            {data.token && data.token.name}
            {data.token && data.token.code}
            <div style={{width: 200}}>
                <CalendarHeatmap
                    numDays={100}
                    values={randomValues}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty'
                        }
                        return `color-scale-${value.count}`
                    }}
                />
            </div>
        </Content>
    </BasicLayout>
))

Container.displayName = 'token/Container'

const mapStateToProps = (state, ownProps) => ({
    code: ownProps.match.params.tokenCode
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
