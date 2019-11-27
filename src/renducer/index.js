import { combineReducers } from 'redux'
import theme from './theme/index'
import popular from './popular/index'

/**
 * 合并reducer 
 */
const index = combineReducers({
    theme,
    popular
})

export default index