import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { ConnectedRouter } from 'react-router-redux'
import { combineReducers } from 'redux'
import { Router, IndexRoute, Route, withRouter, applyRouterMiddleware } from 'react-router'
import { history, initialState, enhancers, middleware } from './store'
import { createStore, applyMiddleware, compose } from 'redux'

import registerServiceWorker from './registerServiceWorker'
import App from './app'
import reducers from './modules'

import './lib/flex'
import 'sanitize.css/sanitize.css'

const target = document.querySelector('#root')

const token = localStorage.getItem('token')
const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' })

networkInterface.use([{
    applyMiddleware(req, next) {
        if (!req.options.headers) {
            req.options.headers = {}  // Create the header object if needed.
        }

        // Get the authentication token from local storage if it exists
        req.options.headers.token = token ? token : null
        next()
    }
}])

const client = new ApolloClient({
    networkInterface
})

const store = createStore(
    combineReducers({
        apollo: client.reducer(),
        ...reducers
    }),
    initialState, // initial state
    compose(
        applyMiddleware(client.middleware(), ...middleware),
        // If you are using the devToolsExtension, you can add it here also
        window.devToolsExtension ? window.devToolsExtension() : f => f,
        ...enhancers
    )
)

render(
    <ApolloProvider store={store} client={client}>
        <App />
    </ApolloProvider>,
    target
)

registerServiceWorker()