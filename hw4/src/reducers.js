import * as Actions from './actions'
import * as MainActions from './containers/main/mainActions'

const followers = require('../dist/data/followers.json')
const initialUser = followers.initialUser
const defaultPics = followers.pictures
const defaultStatuses = followers.statuses

const initialArticles = require('../dist/data/articles.json')
const articles = initialArticles.initialArticles

const Reducer = (state = {
    location: "LANDING",
    user: {},
    message: "",
    error: false,
    articles: articles,
    searchCrit: ""
}, action) => {
    switch (action.type) {
        case Actions.CHANGE_PAGE:
            return {...state, location: action.location, message: `Changed page to ${action.location}!`, error: false}
        case Actions.LOG_IN:
            return {...state,
                location: action.location,
                user: {...state.user, ...initialUser, username: action.username, password: action.password, status: `Default status: Returning user!`, followers: followers.initialFollowers},
                message: `Logged in as ${action.username}!`,
                error: false
            }
        case Actions.LOG_OUT:
            return {...state,
                location: action.location, 
                user: {},
                message: `User logged out!`,
                error: false,
                searchCrit: ""
            }
        case Actions.REGISTER:
            return {...state,
                location: action.location,
                user: {...state.user, ...action.user, pic: initialUser.pic, status: `Default status: New User!`, followers: followers.initialFollowers},
                message: `Registered new user ${action.user.username}!`,
                pic: "/images/profile/LouisianaJack.png",
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
        case MainActions.UPDATE_STATUS:
            return {
                ...state,
                user: {
                    ...state.user,
                    status: action.status
                }
            }
        case MainActions.REMOVE_FOLLOWER:
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: state.user.followers.filter(({id}) => { return (id != action.id) })
                }
            }
        case MainActions.ADD_FOLLOWER:
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
        case MainActions.POST_ARTICLE:
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
        case MainActions.SEARCH:
            return {
                ...state,
                searchCrit: action.criteria
            }
        case Actions.ERROR:
            return { ...state, message: action.message, error: true }
        default:
            return state
    }
}

export default Reducer