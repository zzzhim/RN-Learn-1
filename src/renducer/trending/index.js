import Types from "../../action/types"
const dafaultState = {}
/**
 * popular: {
 *      java: {
 *          items: [],
 *          isLoading: false
 *      },
 *      ios: {
 *          items: [],
 *          isLoading: false
 *      },
 *      ......
 * }
 * @param {*} [state=dafaultState]
 * @param {*} action
 * @returns 
 */
export default function onAction(state = dafaultState, action) {
    switch(action.type) {
        case Types.TRENDING_REFRESH_SUCCESS: // 下拉刷新成功
            return {
                ...state,
                [ action.storeName ]: { // 动态的设置store，和动态获取store(storeKey不固定)
                    ...state[ action.storeName ],
                    items: action.items, // 原始数据
                    projectModes: action.projectModes, // 分页数据
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.TRENDING_REFRESH: // 下拉刷新
            return {
                ...state,
                [ action.storeName ]: {
                    ...state[ action.storeName ],
                    isLoading: true,
                    hideLoadingMore: true
                }
            }
        case Types.TRENDING_REFRESH_FATL: // 下拉刷新失败
            return {
                ...state,
                [ action.storeName ]: {
                    ...state[ action.storeName ],
                    isLoading: false
                }
            }
        case Types.TRENDING_LOAD_MORE_SUCCESS: // 上拉加载更多成功
            return {
                ...state,
                [ action.storeName ]: {
                    ...state[ action.storeName ],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.TRENDING_LOAD_MORE_FAIL: // 上拉加载更多失败
            return {
                ...state,
                [ action.storeName ]: {
                    ...state[ action.storeName ],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex
                }
            }
        default:
            return state
    }
}