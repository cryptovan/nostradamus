import React from 'react'
import Header from '../header'
import Footer from '../footer'

export default (props) => (
    <div {...props}>
        <Header />
            {props.children}
        <Footer />
    </div>
)