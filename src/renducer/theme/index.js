import Types from "../../action/types"

const dafaultState = {
    theme: 'red'
}
export default function onAction(state = dafaultState, action) {
    switch(action.type) {
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}