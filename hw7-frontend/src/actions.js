import { Pages } from './containers/app'

// Null Action.
export const NULL_ACTION = "NULL"

// General Actions.
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const ERROR = 'ERROR'
export const SUCCESS = 'SUCCESS'

// Authentication actions.
export const LOG_IN = 'LOG_IN'
export const REGISTER = 'REGISTER'
export const LOG_OUT = 'LOG_OUT'

// Profile actions.
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const UPDATE_AVATAR = 'UPDATE_AVATAR'
export const LOAD_FOLLOWERS = 'LOAD_FOLLOWERS'
export const UPDATE_EMAIL = 'UPDATE_EMAIL'
export const UPDATE_ZIPCODE =  'UPDATE_ZIPCODE'
export const UPDATE_DOB = 'UPDATE_DOB'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

// Main Page actions
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const LOAD_ARTICLES = 'LOAD_ARTICLES'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CANCEL_COMMENT = 'CANCEL_COMMENT'
export const CANCEL_EDIT_COMMENT = 'CANCEL_EDIT_COMMENT'
export const SEARCH = 'SEARCH'

// Server Communication
// const url = 'https://webdev-dummy.herokuapp.com
// const url = 'http://localhost:3000'
const url = 'https://dry-escarpment-37510.herokuapp.com'

const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)
  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        // console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

// General actions.
// Dispatch change page action. 
const toLanding = () => (dispatch) => dispatch({ type: CHANGE_PAGE, location: Pages.LANDING })

// Dispatch change page action.
const toProfile = () => (dispatch) => dispatch({ type: CHANGE_PAGE, location: Pages.PROFILE_PAGE })

// Dispatch change page action.
const toMain = () => (dispatch) => dispatch({ type: CHANGE_PAGE, location: Pages.MAIN_PAGE })

// Update error message.
const reportError = (message) => (dispatch) => dispatch({ type: ERROR, message })

// Update status message.
const reportSuccess = (message) => (dispatch) => dispatch({ type: SUCCESS, message })

export { url, resource, toLanding, toProfile, toMain, reportError, reportSuccess }

// Authentication actions
const dispatchLogin = (username) => (dispatch) => dispatch({ type: LOG_IN, username: username })

const dispatchRegister = (user) => (dispatch) => dispatch({ type: REGISTER, user: user })

const dispatchLogout = () => (dispatch) => dispatch({ type:LOG_OUT })

export { dispatchLogin, dispatchRegister, dispatchLogout}

// Profile actions.
const updateField = (field, newValue) => (dispatch) => {
  switch(field){
    case "STATUS":
      dispatch({ type: UPDATE_STATUS, status: newValue })
      break
    case "AVATAR":
      dispatch({ type: UPDATE_AVATAR, pic: newValue })
      break
    case "FOLLOWERS":
      dispatch({ type: LOAD_FOLLOWERS, followers: newValue })
      break
    case "EMAIL":
      dispatch({ type: UPDATE_EMAIL, email: newValue })
      break
    case "ZIPCODE":
      dispatch({ type: UPDATE_ZIPCODE, zip: newValue })
      break
    case "DOB":
      dispatch({ type: UPDATE_DOB, dob: newValue })
      break
    case "PASSWORD":
      dispatch({ type: UPDATE_PASSWORD, password: newValue})
      break
    default:
      dispatch({ type: ERROR, message: "Cannot update invalid field!" })
  }
}

export { updateField }

// Main Page actions.
const dispatchRemoveFollower = (username) => (dispatch) => dispatch({ type: REMOVE_FOLLOWER, username })

const dispatchAddFollower = (follower) => (dispatch) => dispatch({ type: ADD_FOLLOWER, follower })

const dispatchLoadArticles = (articles) => (dispatch) => dispatch({ type: LOAD_ARTICLES, articles })

const dispatchFilterArticles = (keyword) => (dispatch) => dispatch({ type: SEARCH, keyword })

const dispatchEditArticle = (articleId) => (dispatch) => dispatch({ type: EDIT_ARTICLE, articleId: articleId})

const dispatchCancelEdit = (articleId) => (dispatch) => dispatch({ type: CANCEL_EDIT, articleId: articleId})

const dispatchAddComment = (articleId) => (dispatch) => dispatch({ type: ADD_COMMENT, articleId: articleId})

const dispatchEditComment = (commentId) => (dispatch) => dispatch({ type: EDIT_COMMENT, commentId: commentId})

const dispatchCancelComment = (articleId) => (dispatch) => dispatch({ type: CANCEL_COMMENT, articleId: articleId})

const dispatchCancelEditComment = (commentId) => (dispatch) => dispatch({ type: CANCEL_EDIT_COMMENT, commentId: commentId })

export { dispatchRemoveFollower, dispatchAddFollower, dispatchLoadArticles, dispatchFilterArticles, dispatchEditArticle, 
  dispatchCancelEdit, dispatchAddComment, dispatchEditComment, dispatchCancelComment, dispatchCancelEditComment }