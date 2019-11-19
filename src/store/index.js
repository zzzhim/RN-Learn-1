import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../renducer/index'

// 打印日志中间件
const logger = store => next => action => {
    if(typeof action === 'function') {
        console.log('dispatching a function')
    }else {
        console.log('dispatching', action)
    }
    const result = next(action)
    console.log('nextState', store.getState())
    return result
}

const middleware = [
    logger,
    thunk
]

/**
 * 创建 store 
 */
export default createStore(reducer, applyMiddleware(...middleware))