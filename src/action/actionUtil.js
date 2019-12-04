/**
 *
 * 处理下拉刷新的数据
 * @param {*} actionType
 * @param {*} dispatch
 * @param {*} storeName
 * @param {*} data
 * @param {*} pageSize
 */
export function handleData(actionType, dispatch, storeName, data, pageSize) {
    let fixItems = []
    if(data && data.data) {
        if(Array.isArray(data.data)) {
            fixItems = data.data
        }else if(Array.isArray(data.data.items)) {
            fixItems = data.data.items
        }
    }
    dispatch({
        type: actionType,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据
        // items: data && data.data && data.data.items,
        items: fixItems,
        storeName,
        pageIndex: 1,
        pageSize
    })
}