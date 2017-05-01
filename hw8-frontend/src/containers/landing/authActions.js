import * as Actions from '../../actions'
import * as ProfileActions from '../profile/profileActions'

// Landing page actions.
// Perform verification before sending POST request. Dispatch change page action and update state upon response.
const logIn = (username, password) => (dispatch) => {
    if (username.length) {
        if (password.length){
            Actions.resource('POST', 'login', { username, password })
            .then( (response) => {
                if (response.result === "success"){                       
                    ProfileActions.loadProfile(response.username)((action) => {
                        dispatch(action)
                    })
                    dispatch(Actions.dispatchLogin(response.username, password))
                    dispatch(Actions.toMain())
                    dispatch(Actions.reportSuccess(`Logged in as ${response.username}!`))
                } else{
                    dispatch(Actions.reportError(`Login for ${response.username} was denied by server with result: ${response.result}!`))
                }
            }).catch( (err) => {
                dispatch(Actions.reportError(`Could not log in as ${username}! ERROR: ${err.message}`))
            })
        } else {
            dispatch(Actions.reportError('Login Password must not be blank!'))
        }
    } else {
        dispatch(Actions.reportError('Login Username must not be blank!'))
    }
}

const googleLogIn = (username, password) => (dispatch) => {
    Actions.resource('GET', 'auth/google')
    .then( (response) => {
        if (response.result === "success"){                       
            ProfileActions.loadProfile(response.username)((action) => {
                dispatch(action)
            })
            dispatch(Actions.dispatchLogin(response.username))
            dispatch(Actions.toMain())
            dispatch(Actions.reportSuccess(`Returning as ${response.username}!`))
        }
    })
}

// Login without need for password if session is active.
const autoLogIn = () => (dispatch) => {
    Actions.resource('GET', 'autologin')
    .then( (response) => {
        if (response.result === "success"){                       
            ProfileActions.loadProfile(response.username)((action) => {
                dispatch(action)
            })
            dispatch(Actions.dispatchLogin(response.username))
            dispatch(Actions.toMain())
            dispatch(Actions.reportSuccess(`Returning as ${response.username}!`))
        }
    })
}

// Perform verification before sending POST request. Update state upon response.
const register = (regFields) => (dispatch) => {
    var error = false
    // Check date of birth.
    const dob = regFields.dob.split("-")
    const today = new Date()
    const yearDiff = today.getFullYear() - dob[0]
    const monthDiff = today.getMonth() - dob[1]
    const dayDiff = today.getDate() - dob[2]

    if(yearDiff < 18){
        dispatch(Actions.reportError('Must be over the age of 18 to register!'))
        error = true
    } else if(yearDiff == 18){
        if(monthDiff < 0){
            dispatch(Actions.reportError('Must be over the age of 18 to register!'))
            error = true
        } else if(monthDiff == 0){
            if(dayDiff < 0){
                dispatch(Actions.reportError('Must be over the age of 18 to register!'))
                error = true
            }
        }
    }

    // Check password matching.
    if(regFields.password != regFields.passwordconfirm){
        dispatch(Actions.reportError('Passwords do not match!'))
        error = true
    }

    if (!error){
        const dobMillis = new Date(dob[0, dob[1], dob[2]])
        Actions.resource('POST', 'register', 
        { username: regFields.username,
            email: regFields.email,
            dob: dobMillis,
            zipcode: regFields.zip,
            password: regFields.password
        }).then( (response) => {
            if (response.result === "success"){
                dispatch(Actions.dispatchRegister({
                    user: 
                    {   
                        username: response.username,
                        displayname: regFields.displayname,
                        email: regFields.email,
                        phone: regFields.phone,
                        dob: dobMillis,
                        zip: regFields.zip,
                        password: regFields.password
                    }
                }))
                dispatch(Actions.reportSuccess(`Registered new user ${response.username}!`))
            } else{
                dispatch(Actions.reportError(`Registration for ${response.username} was denied by server with result: ${response.result}!`))
            }
        }).catch( (err) => {
            console.log(err)
            dispatch(Actions.reportError(`Could not register ${regFields.username}! ERROR: ${err.message}`))
        })
    }
}

// Clear user field in state and dispatch change page action. 
const logOut = () => (dispatch) => {
    Actions.resource('PUT', 'logout')
    .then( (response) => {
        if (response === "OK"){
            dispatch(Actions.dispatchLogout())
        } else{
            dispatch(Actions.reportError(`Logout denied by server with result: ${response}! Session will be terminated.`))
            dispatch(Actions.toLanding())
        }
        dispatch(Actions.toLanding())
        dispatch(Actions.reportSuccess(`Logged out successfully!`))
    }).catch( (err) => {
        dispatch(Actions.reportError(`Problem logging out! Session will be terminated. ERROR: ${err.message}`))
        dispatch(Actions.toLanding())
    })
}

export { logIn, googleLogIn, autoLogIn, register, logOut }