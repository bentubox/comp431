import * as Actions from './actions'

const Reducer = (state = {
    location: "LANDING",
    message: ""
}, action) => {
    switch (action.type) {
        case Actions.CHANGE_PAGE:
            return {...state, location: action.location}
        case Actions.ERROR:
            return { ...state, message: action.message }
        default:
            return state
    }
}

export default Reducer