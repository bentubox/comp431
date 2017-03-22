import * as Actions from '../../actions'

// Profile page actions.
// Perform form verification before dispatching user update action.
const updateProfile = (newFields) => (dispatch) => {
    var pattern
    var error = false
    // Verify name field.
    if(newFields.displayname.length != 0){
        pattern = new RegExp("^[^<>]+$")
        if (pattern.test(newFields.displayname)) {
            // Name update not supported.
        } else{
            dispatch(Actions.reportError('Invalid name for name change!'))
            error = true
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
                error = true
            })
        } else{
            dispatch(Actions.reportError('Invalid email for email change!'))
            error = true
        }
    }

    // Verify phone number.
    if(newFields.phone.length != 0){
        pattern = new RegExp("^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$")
        if (pattern.test(newFields.phone)) {
            // Phone number update not supported.
        } else{
            dispatch(Actions.reportError('Invalid phone number for phone number change!'))
            error = true
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
                error = true
            })
        } else{
            dispatch(Actions.reportError('Invalid zip code for zip code change!'))
            error = true
        }
    }

    // Verify Password.
    if (newFields.password.length != 0 && newFields.passwordConfirm.length != 0){
        if (newFields.password === newFields.passwordConfirm) {
            Actions.resource('PUT', 'password', {password: newFields.password}).then( (response) => {
                // Server does not support password update. Only nonpersistent local update is performed.
                dispatch(Actions.updateField("PASSWORD", newFields.password))
            }).catch( (err) => {
                dispatch(Actions.reportError(`Password was not updated successfully! ERROR: ${err.message}`))
                error = true
            })
        } else{
            dispatch(Actions.reportError('Passwords do not match!'))
            error = true
        }		
    }

    if (!error){
        dispatch(Actions.reportSuccess(`All editable fields have updated successsfully!`))
    }
}


// Load profile information for user.
const loadProfile = (username) => (dispatch) => {
    // Retrieve user information from server.
    var error = false
    Actions.resource('GET', `headlines/:${username}?`).then( (r) => {
        dispatch(Actions.updateField("STATUS", r.headlines[0].headline))
        dispatch(Actions.reportSuccess('Updated Status!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load status for user! ERROR: ${err.message}!`))
        dispatch(Actions.updateField("STATUS",  ""))
    })
    Actions.resource('GET', `avatars/:${username}?`).then( (r) => {
        dispatch(Actions.updateField("AVATAR", r.avatars[0].avatar))
        dispatch(Actions.reportSuccess('Updated Avatar!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load avatar for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("AVATAR",  ""))
    })
    Actions.resource('GET', `following/:${username}?`).then( (r) => {
        dispatch(Actions.updateField("FOLLOWERS", r.following))
        dispatch(Actions.reportSuccess('Updated Followers!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load followers for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("FOLLOWERS",  ""))
    })
    Actions.resource('GET', `email/:${username}?`).then( (r) => {
        dispatch(Actions.updateField("EMAIL", r.email))
        dispatch(Actions.reportSuccess('Updated Email!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load email for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("EMAIL", ""))
    })
    Actions.resource('GET', `zipcode/:${username}?`).then( (r) => {
        dispatch(Actions.updateField("ZIPCODE", r.zipcode))
        dispatch(Actions.reportSuccess('Updated Zipcode!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load zipcode for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("ZIPCODE", ""))
    })
    Actions.resource('GET', 'dob').then( (r) => {
        dispatch(Actions.updateField("DOB", r.dob))
        dispatch(Actions.reportSuccess('Updated Date of Birth!'))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Could not load date of birth for user! ERROR: ${err.message}`))
        dispatch(Actions.updateField("DOB", ""))
    })
}

// Action for updating user status.
const updateStatus = (text) => (dispatch) => {
    if (text.length) {
        Actions.resource('PUT', 'headline', { text }).then( (response) => {
            dispatch(Actions.updateField("STATUS", response.headline))
            dispatch(Actions.reportSuccess(`Status for ${response.username} updated to ${response.headline}!`))
        }).catch( (err) => {
            dispatch(Actions.reportError(`Status was not updated successfully! ERROR:${err.message}`))
        })
    } else{
            dispatch(Actions.reportError('No status entered for update!'))
    }
}


export { updateProfile, loadProfile, updateStatus }