import Types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore'
import { handleData } from '../actionUtil'

/**
 * 获取最热数据的异步action
 * @param storeName
 * @param url
 * @param pageSize
 * @return { function(*=) } 
 */
export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName
        })
        let dataStore = new DataStore()
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular) // 异步action与数据流
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: Types.POPULAR_REFRESH_FATL,
                    storeName,
                    error
                })
            })
    }
}
/**
 *
 * 加载更多
 * @export
 * @param {*} storeName
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} [dataArray=[]]
 * @param {*} callBack
 * @return { function(*) }
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callBack) {
    return dispatch => {
        setTimeout(() => {
            if((pageIndex - 1) * pageSize >= dataArray.length) {
                if(typeof callBack === 'function') {
                    callBack('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName: storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            }else {
                let max = pageSize > dataArray.length ? dataArray.length : pageSize * pageIndex
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 200)
    }
}