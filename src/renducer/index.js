import { combineReducers } from 'redux'
import theme from './theme/index'
import popular from './popular/index'
import trending from './trending/index'

/**
 * 合并reducer 
 */
const index = combineReducers({
    theme,
    popular,
    trending
})

export default index