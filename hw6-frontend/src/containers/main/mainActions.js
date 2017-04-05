import * as Actions from '../../actions'

// Navigate to profile page.
const viewProfile = () => (dispatch) => {
    dispatch(Actions.toProfile())
    dispatch(Actions.reportSuccess('Loaded profile!'))
}

// Action for removing follower from user.
const removeFollower = (id) => (dispatch) => {
    Actions.resource('DELETE', `following/${id}`)
    .then( (response) => {
        dispatch(Actions.dispatchRemoveFollower(id))
        dispatch(Actions.reportSuccess(`Removed follower!`))
        loadArticles(response.username)((action) => {
            dispatch(action)
        })
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not remove follower ${id}! ERROR: ${err.message}`))
    })
}

// Action for adding follower to user.
const addFollower = (id) => (dispatch) => {
    if(id.length){
        Actions.resource('PUT', `following/${id}`)
        .then( (response) => {
            const follower = {id: id}
            Promise.all([
                Actions.resource('GET', `headlines/${id}?`).then( (rh) => {
                    follower.status = rh.headlines[0].headline
                }).catch( (err) => {
                    dispatch(Actions.reportError(`Could not get new follower info for ${id}! ERROR: ${err.message}`))
                }),
                Actions.resource('GET', `avatars/${id}?`).then( (ra) => {
                    follower.pic = ra.avatars[0].avatar
                }).catch( (err) => {
                    dispatch(Actions.reportError(`Could not get follower avatar for ${id}! ERROR: ${err.message}`))
                })
            ]).then( () => {
                // Update state if follower count increases.
                dispatch(Actions.dispatchAddFollower(follower))
                dispatch(Actions.reportSuccess(`Added new follower ${response.username}!`))
                loadArticles(response.username)((action) => {
                    dispatch(action)
                })
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not add follower ${id}! ERROR: ${err.message}`))
        })
    }
}

// Action for loading articles from server.
const loadArticles = (user) => (dispatch) => {
    Actions.resource('GET', `articles/${user.id}*?`)
    .then( (response) => {
        dispatch(Actions.dispatchLoadArticles(response.articles))
    }).catch((err) => {
        dispatch(Actions.reportError(`Error loading articles! ERROR: ${err.message}`))
    })
}

// Action for adding a new Article.
const addArticle = (fd) => (dispatch) => {
    if (fd.get('text').length){
        const options =  {
            method: 'POST',
            credentials: 'include',
            body: fd
        }
        return fetch(`${Actions.url}/article`, options)
        .then(r => {
        if (r.status === 200) {
            return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
        } else {
            throw new Error(r.statusText)
        }
        }).then( (body) => {
            const articles = body.articles[0]
            dispatch(Actions.reportSuccess('Added new article!'))
            loadArticles(articles.author)((action) => {
                dispatch(action)
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not add article! ERROR: ${err.message}`))
        })
    }
}

const startEditArticle = (articleId) => (dispatch) => {
    dispatch(Actions.dispatchEditArticle(articleId))
}

const editArticle = (id, text) => (dispatch) => {
    if (text.length){
        Actions.resource('PUT', `articles/${id}`, {text: text})
        .then( (response) => {
            dispatch(Actions.reportSuccess('Edited article!'))
            loadArticles(response.articles[0].author)((action) => {
                dispatch(action)
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not edit this article! ERROR: ${err.message}`))
        })
    }
}

const cancelEdit = (articleId) => (dispatch) => {
    dispatch(Actions.dispatchCancelEdit(articleId))
}

const addComment = (articleId) => (dispatch) => {
    dispatch(Actions.dispatchAddComment(articleId))
}

const cancelComment = (articleId) => (dispatch) => {
    dispatch(Actions.dispatchCancelComment(articleId))
}

const postComment = (articleId, text) => (dispatch) => {
    if (text.length){
        Actions.resource('PUT', `articles/${articleId}`, {text: text, commentId: -1})
        .then( (response) => {
            dispatch(Actions.reportSuccess('Added comment!'))
            loadArticles(response.articles[0].author)((action) => {
                dispatch(action)
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not comment on this article! ERROR: ${err.message}`))
        })
    }
}

const startEditComment = (commentId) => (dispatch) => {
    dispatch(Actions.dispatchEditComment(commentId))
}

const editComment = (articleId, commentId, text) => (dispatch) => {
    if (text.length){
        Actions.resource('PUT', `articles/${articleId}`, {text: text, commentId: commentId})
        .then( (response) => {
            dispatch(Actions.reportSuccess('Edited comment!'))
            loadArticles(response.articles[0].author)((action) => {
                dispatch(action)
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not edit this comment! ERROR: ${err.message}`))
        })
    }
}

const cancelEditComment = (commentId) => (dispatch) => {
    dispatch(Actions.dispatchCancelEditComment(commentId))
}


// Action for changing article search criteria.
const filterArticles = (criteria) => (dispatch) => {
    dispatch(Actions.dispatchFilterArticles(criteria))
    dispatch(Actions.reportSuccess('Updated article search criteria!'))
}

export { viewProfile, removeFollower, addFollower, loadArticles, addArticle, startEditArticle, editArticle, 
    cancelEdit, addComment, cancelComment, postComment, startEditComment, editComment, cancelEditComment, filterArticles}