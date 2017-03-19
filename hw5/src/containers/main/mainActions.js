export const UPDATE_STATUS = 'UPDATE_STATUS'
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const POST_ARTICLE = 'POST_ARTICLE'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const POST_COMMENT = 'POST_COMMENT'
export const SEARCH = 'SEARCH'

export const MainActionTypes = {
    UPDATE_STATUS: 'UPDATE_STATUS',
    REMOVE_FOLLOWER: 'REMOVE_FOLLOWER',
    ADD_FOLLOWER: 'ADD_FOLLOWER',
    POST_ARTICLE: 'POST_ARTICLE',
    EDIT_ARTICLE: 'EDIT_ARTICLE',
    POST_COMMENT: 'POST_COMMENT',
    SEARCH: 'SEARCH'
}

var followerId = 3
var articleId = 8

import { ERROR } from '../../actions'

// Action for updating user status.
export const updateStatus = (text) => {
    if (text.length) {
        return { type: UPDATE_STATUS, status: text }
    }
    return { type: ERROR, message: "No status entered for update!"}
} 

// Action for removing follower from user.
export const removeFollower = (id) => {
    return { type: REMOVE_FOLLOWER, id: id }
}

// Action for adding follower to user.
export const addFollower = (name, id) => {
    if(name.length){
        return { type: ADD_FOLLOWER, id: followerId++, displayname: name }
    }
    return { type: ERROR, message: "Error adding new follower!"}
}

// Action for adding a new Article.
export const addArticle = (author, time, text) => {
    if (text.length){
        return { type: POST_ARTICLE, id: articleId++, author: author, time: time, text: text }
    }
}

// TODO: Add actions for editing articles and adding comments.

// Action for changing article search criteria.
export const filterArticles = (criteria) => {
    return { type: SEARCH, criteria: criteria}
}