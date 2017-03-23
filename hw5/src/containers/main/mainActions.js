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
const addArticle = (text) => (dispatch) => {
    if (text.length){
        Actions.resource('POST', 'article', {text: text})
        .then( (response) => {
            const articles = response.articles[0]
            dispatch(Actions.reportSuccess('Added new article!'))
            loadArticles(response.articles[0].author)((action) => {
                dispatch(action)
            })
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not add article! ERROR: ${err.message}`))
        })
    }
}

// TODO: Add actions for editing articles and adding comments.

// Action for changing article search criteria.
const filterArticles = (criteria) => (dispatch) => {
    dispatch(Actions.dispatchFilterArticles(criteria))
    dispatch(Actions.reportSuccess('Updated article search criteria!'))
}

export { viewProfile, removeFollower, addFollower, loadArticles, addArticle, filterArticles}