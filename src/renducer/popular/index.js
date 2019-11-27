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
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state,
                [ action.storeName ]: { // 动态的设置store，和动态获取store(storeKey不固定)
                    ...[ action.storeName ],
                    items: action.items,
                    isLoading: false
                }
            }
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [ action.storeName ]: {
                    ...[ action.storeName ],
                    isLoading: true
                }
            }
        case Types.LOAD_POPULAR_FATL:
            return {
                ...state,
                [ action.storeName ]: {
                    ...[ action.storeName ],
                    isLoading: false
                }
            }
        default:
            return state
    }
}