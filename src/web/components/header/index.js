import React from 'react'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon, NavBar } from 'antd-mobile'

import logo from './logo.svg'

export const Container = ({ changePage }) => (
    <header className="header">
        <NavBar 
            mode="light"
            onLeftClick={() => { changePage('/') }}
            rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '0.32rem' }} />
            ]}
        >
            <img src={logo} className="App-logo" alt="logo" /> <Link to="/">Nostradamus</Link>
        </NavBar>
    </header>
)

Container.displayName = 'footer/Container'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push(page)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)
