import * as Actions from './actions'

const nullUser = {pic: "/images/profile/LouisianaJack.png", status: "", followers: []}
export const initialState = {
    location: "LANDING",
    user: nullUser,
    message: "",
    error: false,
    searchCrit: "",
    articles: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CHANGE_PAGE:
            return {...state,
                location: action.location,
            }
        case Actions.LOG_IN:
            return {...state,
                user: {
                    ...state.user,
                    username: action.username,
                    password: action.password,
                },
            }
        case Actions.LOG_OUT:
            return {...state,
                user: nullUser,
                searchCrit: ""
            }
        case Actions.REGISTER:
            return {...state,
                user: {...state.user, ...action.user},
            }
        case Actions.UPDATE_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
                    status: action.status
                }
            }
        case Actions.UPDATE_AVATAR:
            return {
                ...state,
                user: {
                    ...state.user,
                    pic: action.pic
                }
            }
        case Actions.LOAD_FOLLOWERS:
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: action.followers
                }
            }
        case Actions.UPDATE_DOB:
            return {
                ...state,
                user: {
                    ...state.user,
                    dob: action.dob
                }
            }
        case Actions.UPDATE_EMAIL:
            return {...state,
                user: {
                    ...state.user,
                    email: action.email,
                },
            }
        case Actions.UPDATE_ZIPCODE:
            return {...state,
                user: {
                    ...state.user,
                    zipcode: action.zip,
                },
            }
        case Actions.UPDATE_PASSWORD:
            return {...state,
                user: {
                    ...state.user,
                    password: action.password,
                },
            }
        case Actions.REMOVE_FOLLOWER:
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: state.user.followers.filter(({id}) => { return (id != action.id) })
                }
            }
        case Actions.ADD_FOLLOWER:
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers,
                        {   id: action.id,
                            displayname: action.displayname,
                            pic: defaultPics[Math.floor(Math.random()*defaultPics.length)],
                            status: defaultStatuses[Math.floor(Math.random()*defaultStatuses.length)]
                        }]
                }
            }
        case Actions.POST_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, { 
                    id: action.id,
                    author: action.author,
                    timestamp: action.time,
                    text: action.text,
                    pic: ""
                }]
            }
        case Actions.SEARCH:
            return {
                ...state,
                searchCrit: action.criteria
            }
        case Actions.ERROR:
            return { ...state, message: action.message, error: true }
        case Actions.SUCCESS:
            return { ...state, message: action.message, error: false }
        default:
        return state
    }
}

export { Reducer }