import * as Actions from '../../actions'
import * as MainActions from '../main/mainActions'

// Profile page actions.
const viewMain = () => (dispatch) => {
    dispatch(Actions.toMain())
    dispatch(Actions.reportSuccess('Loaded main page!'))
}

// Perform form verification before dispatching user update action.
const updateProfile = (newFields, fd) => (dispatch) => {
    var pattern
    // Verify name field.
    if(newFields.displayname.length != 0){
        pattern = new RegExp("^[^<>]+$")
        if (pattern.test(newFields.displayname)) {
            // Name update not supported.
            dispatch(Actions.reportError('Name change not supported!'))
        } else{
            dispatch(Actions.reportError('Invalid name for name change!'))
        }
    }

    // Verify email.
    if(newFields.email.length != 0){
        pattern = new RegExp("^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$|^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+$")
        if (pattern.test(newFields.email)) {
            Actions.resource('PUT', 'email', {email: newFields.email}).then( (response) => {
                dispatch(Actions.updateField("EMAIL", response.email))
                dispatch(Actions.reportSuccess(`Email updated to ${response.email}!`))
            }).catch( (err) => {
                dispatch(Actions.reportError(`Email was not updated successfully! ERROR: ${err.message}`))
            })
        } else{
            dispatch(Actions.reportError('Invalid email for email change!'))
        }
    }

    // Verify phone number.
    if(newFields.phone.length != 0){
        pattern = new RegExp("^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$")
        if (pattern.test(newFields.phone)) {
            // Phone number update not supported.
            dispatch(Actions.reportError('Phone number change not supported!'))
        } else{
            dispatch(Actions.reportError('Invalid phone number for phone number change!'))
        }
    }

    // Verify zip code.
    if(newFields.zip.length != 0){
        pattern = new RegExp("^[0-9_]{5}$")
        if (pattern.test(newFields.zip)) {
            Actions.resource('PUT', 'zipcode', {zipcode: newFields.zip}).then( (response) => {
                dispatch(Actions.updateField("ZIPCODE", response.zipcode))
                dispatch(Actions.reportSuccess(`Zipcode updated to ${response.zipcode}!`))
            }).catch( (err) => {
                dispatch(Actions.reportError(`Zipcode was not updated successfully! ERROR: ${err.message}`))
            })
        } else{
            dispatch(Actions.reportError('Invalid zip code for zip code change!'))
        }
    }

    // Verify Password.
    if (newFields.password.length != 0 && newFields.passwordConfirm.length != 0){
        if (newFields.password === newFields.passwordConfirm) {
            Actions.resource('PUT', 'password', {password: newFields.password}).then( (response) => {
                // Server does not support password update. Only nonpersistent local update is performed.
                dispatch(Actions.updateField("PASSWORD", newFields.password))
                dispatch(Actions.reportSuccess(`Message from server for password change: ${response.message}`))
            }).catch( (err) => {
                dispatch(Actions.reportError(`Password was not updated successfully! ERROR: ${err.message}`))
            })
        } else{
            dispatch(Actions.reportError('Passwords do not match!'))
        }		
    }

    // Upload image.
    if (fd){
        const options =  {
            method: 'PUT',
            credentials: 'include',
            body: fd
        }
        return fetch(`${Actions.url}/avatar`, options)
        .then(r => {
        if (r.status === 200) {
            return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
        } else {
            throw new Error(r.statusText)
        }
        }).then( (body) => {
            dispatch(Actions.updateField("AVATAR", body.avatar))
        }).catch( (err) => {
            dispatch(Actions.reportError(`Could not load new avatar for user! ERROR: ${err.message}`))
        })
    }
}

// Load profile information for user.
const loadProfile = (username) => (dispatch) => {
    // Retrieve user information from server.
    Actions.resource('GET', `headlines/${username}?`).then( (r) => {
        dispatch(Actions.updateField("STATUS", r.headlines[0].headline))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load status for user! ERROR: ${err.message}!`))
        dispatch(Actions.updateField("STATUS",  ""))
    }),
    Actions.resource('GET', `avatars/${username}?`).then( (r) => {
        dispatch(Actions.updateField("AVATAR", r.avatars[0].avatar))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load avatar for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("AVATAR",  ""))
    }),
    Actions.resource('GET', `following/${username}?`).then( (r) => {
        // Load info for followers as well.
        const followers = r.following.map((id) => {
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
            })
        })
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load followers for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("FOLLOWERS",  ""))
    }),
    Actions.resource('GET', `email/${username}?`).then( (r) => {
        dispatch(Actions.updateField("EMAIL", r.email))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load email for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("EMAIL", ""))
    }),
    Actions.resource('GET', `zipcode/${username}?`).then( (r) => {
        dispatch(Actions.updateField("ZIPCODE", r.zipcode))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load zipcode for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("ZIPCODE", ""))
    }),
    Actions.resource('GET', 'dob').then( (r) => {
        dispatch(Actions.updateField("DOB", r.dob))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load date of birth for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("DOB", ""))
    })
    // Load articles.
    MainActions.loadArticles()((action) => {
        dispatch(action)
    })
}

// Action for updating user status.
const updateStatus = (text) => (dispatch) => {
    if (text.length) {
        Actions.resource('PUT', 'headline', { headline: text }).then( (response) => {
            dispatch(Actions.updateField("STATUS", response.headline))
            dispatch(Actions.reportSuccess(`Status for ${response.username} updated to ${response.headline}!`))
        }).catch( (err) => {
            dispatch(Actions.reportError(`Status was not updated successfully! ERROR:${err.message}`))
        })
    } else{
            dispatch(Actions.reportError('No status entered for update!'))
    }
}

export { viewMain, updateProfile, loadProfile, updateStatus }