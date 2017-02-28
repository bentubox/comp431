import * as Actions from './actions'

const Reducer = (state = {
    location: "LANDING",
    user: {},
    message: ""
}, action) => {
    switch (action.type) {
        case Actions.CHANGE_PAGE:
            return {...state, location: action.location, message: `Changed page to ${action.location}!`, error: false}
        case Actions.LOG_IN:
            return {...state,
                location: action.location,
                user: {username: action.username, password: action.password},
                message: `Logged in as ${action.username}!`,
                error: false
            }
        case Actions.LOG_OUT:
            return {...state,
                location: action.location, 
                user: {},
                message: `User logged out!`,
                error: false
            }
        case Actions.REGISTER:
            return {...state,
                location: action.location,
                user: action.user,
                message: `Registered new user ${action.user.username}!`,
                error: false
            }
        case Actions.UPDATE_USER:
            return {...state,
                user: {
                    ...state.user,
                    displayname: action.displayname,
                    email: action.email,
                    phone: action.phone,
                    zip: action.zip
                },
                message: `Updated profile successfully!`,
                error: false
            }
        case Actions.ERROR:
            return { ...state, message: action.message, error: true }
        default:
            return state
    }
}

export default Reducer