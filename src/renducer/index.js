import { combineReducers } from 'redux'
import theme from './theme/index'

/**
 * 合并reducer 
 */
const index = combineReducers({
    theme
})

export default index