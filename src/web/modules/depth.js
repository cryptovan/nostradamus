import { combineReducers } from 'redux'
import OrderAction from '../constants/order-action'

import orderDepth from './order-depth'

export default combineReducers({
    bid: orderDepth(OrderAction.BID),
    ask: orderDepth(OrderAction.ASK)
})