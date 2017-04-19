import * as Actions from './actions'

const nullUser = {pic: "/images/profile/LouisianaJack.png", status: "", followers: []}
export const initialState = {
    location: "LANDING",
    user: nullUser,
    message: "",
    error: false,
    searchCrit: "",
    articles: [],
    editArticleArray: [],
    addCommentArray: [],
    editCommentArray: []
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CHANGE_PAGE:
            return Object.assign({}, {...state,
                location: action.location,
            })
        case Actions.LOG_IN:
            return Object.assign({}, {...state,
                user: {
                    ...state.user,
                    username: action.username
                },
            })
        case Actions.LOG_OUT:
            return Object.assign({}, {...state,
                user: nullUser,
                searchCrit: ""
            })
        case Actions.REGISTER:
            // New users are not currently maintained.
            return Object.assign({}, {...state })
        case Actions.UPDATE_STATUS:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    status: action.status
                }
            })
        case Actions.UPDATE_AVATAR:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    pic: action.pic
                }
            })
        case Actions.LOAD_FOLLOWERS:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    followers: [].concat(action.followers)
                }
            })
        case Actions.UPDATE_DOB:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    dob: action.dob
                }
            })
        case Actions.UPDATE_EMAIL:
            return Object.assign({}, {...state,
                user: {
                    ...state.user,
                    email: action.email,
                },
            })
        case Actions.UPDATE_ZIPCODE:
            return Object.assign({}, {...state,
                user: {
                    ...state.user,
                    zip: action.zip,
                },
            })
        case Actions.UPDATE_PASSWORD:
            return Object.assign({}, {...state,
                user: {
                    ...state.user,
                    password: action.password,
                },
            })
        case Actions.REMOVE_FOLLOWER:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    followers: state.user.followers.filter(({username}) => { return (username != action.username) })
                }
            })
        case Actions.ADD_FOLLOWER:
            return Object.assign({}, {
                ...state,
                user: {
                    ...state.user,
                    followers: [...state.user.followers,
                        action.follower
                    ]
                }
            })
        case Actions.LOAD_ARTICLES:
            return Object.assign({}, {
                ...state,
                articles: [].concat(action.articles)
            })
        case Actions.EDIT_ARTICLE:
            return Object.assign({}, {
                ...state,
                editArticleArray: [...state.editArticleArray, action.articleId]
            })
         case Actions.CANCEL_EDIT:
            return Object.assign({}, {
                ...state,
                editArticleArray: state.editArticleArray.filter((id) => { return (id != action.articleId) })
            })   
        case Actions.ADD_COMMENT:
            return Object.assign({}, {
                ...state,
                addCommentArray:[...state.addCommentArray, action.articleId]
            })
        case Actions.EDIT_COMMENT:
            return Object.assign({}, {
                ...state,
                editCommentArray: [...state.editCommentArray, action.commentId]
            })
        case Actions.CANCEL_EDIT_COMMENT:
            return Object.assign({}, {
                ...state,
                editCommentArray: state.editCommentArray.filter((id) => { return (id != action.commentId) })
            })
        case Actions.CANCEL_COMMENT:
            return Object.assign({}, {
                ...state,
                addCommentArray: state.addCommentArray.filter((id) => { return (id != action.articleId) })
            })
        case Actions.SEARCH:
            return Object.assign({}, {
                ...state,
                searchCrit: action.keyword
            })
        case Actions.ERROR:
            return Object.assign({}, { ...state, message: action.message, error: true })
        case Actions.SUCCESS:
            return Object.assign({}, { ...state, message: action.message, error: false })
        default:
            return Object.assign({}, state)
    }
}

export { Reducer }