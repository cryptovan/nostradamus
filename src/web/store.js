import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createBrowserHistory from 'history/createBrowserHistory'

export const history = createBrowserHistory()


//export const history = browserHistory
export const initialState = {}
export const enhancers = []
export const middleware = [
    thunk,
    routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

export const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)
