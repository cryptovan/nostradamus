import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


export const Container = () => {
    const connections = [
        {
            id: 'cforozg1n8czbyb9',
            messages: [
                {
                    data: 'hey you'
                }
            ]
        }
    ]

    return <div></div>

    // return (
    //     <div className="connection-panel">
    //         {connections && connections.map(({ id, messages }) => (
    //             <div class="connection active" id={id}>
    //                 <h1>Peer <strong>{id}</strong></h1>
    //                 <div class="messages">
    //                     <em>Peer connected.</em>
    //                     {messages && messages.map(({ data }) => (
    //                         <div>
    //                             <span class="you">You: </span>{data}
    //                         </div>
    //                     ))}
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // )
}

Container.displayName = 'connection-panel/Container'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: (page) => push(page)
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Container)