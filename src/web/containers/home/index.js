// @flow

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { WhiteSpace, Button } from 'antd-mobile'
import { Link } from 'react-router-dom'

import BasicLayout from '../../components/basic-layout'

import './index.css'

const Container = (props) => (
    <BasicLayout className="Page" style={{ background: '#fff', padding: '30px', textAlign: 'center' }}>
        <br />
        <br />
        <Link to="/">Home</Link><br />
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
