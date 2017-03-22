import Actions from '../../actions'

var followerId = 3
var articleId = 8

// Action for removing follower from user.
const removeFollower = (id) => {
    return { type: REMOVE_FOLLOWER, id: id }
}

// Action for adding follower to user.
const addFollower = (name, id) => {
    if(name.length){
        return { type: ADD_FOLLOWER, id: followerId++, displayname: name }
    }
    return { type: Actions.ERROR, message: "Error adding new follower!"}
}

// Action for adding a new Article.
const addArticle = (author, time, text) => {
    if (text.length){
        return { type: POST_ARTICLE, id: articleId++, author: author, time: time, text: text }
    }
}

// TODO: Add actions for editing articles and adding comments.

// Action for changing article search criteria.
const filterArticles = (criteria) => {
    return { type: SEARCH, criteria: criteria}
}

export { removeFollower, addFollower, addArticle, filterArticles}