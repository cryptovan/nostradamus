import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import native from './native'
import account from './account'
import orderBook from './order-book'
import orderDepth from './depth'
import subscriptions from './subscriptions'
import trades from './trades'

export default {
    router,
    native,
    account,
    orderDepth,
    orderBook,
    subscriptions,
    trades
}
