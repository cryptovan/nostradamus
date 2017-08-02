import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

export const Container = () => {
    return <div className="footer">
    </div>
}

Container.displayName = 'footer/Container'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push(page)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)