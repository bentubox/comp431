import { Pages } from './containers/app'

// Action Types
export const ActionTypes = {
    UPDATE_TEXT: 'UPDATE_TEXT', 
    CHANGE_PAGE: 'CHANGE_PAGE',
    LOG_IN: 'LOG_IN',
    REGISTER: 'REGISTER',
    LOG_OUT: 'LOG_OUT',
    UPDATE_USER: 'UPDATE_USER'
}

// Server Communication
const url = 'https://webdev-dummy.herokuapp.com'
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
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

// Test action for reference,
export const updateText = (text) => {
    if (text.length > 5) {
        return { type: UPDATE_TEXT, text }
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}

// Landing page actions.
// Perform verification before dispatching change page action.
export const logIn = (username, password) => {
    if (username.length) {
        if (password.length){
            return {type: LOG_IN, location: Pages.MAIN_PAGE, username: username, password: password}
        } else{
            return { type: ERROR, message: 'Login Password must not be blank!'}
        }
    } else{
        return { type: ERROR, message: 'Login Username must not be blank!'}
    }
}

// Perform verification before dispatching change page action.
export const register = (regFields) => {
    // Check date of birth.
    var dob = regFields.dob.split("-")
    var today = new Date()
    var yearDiff = today.getFullYear() - dob[0]
    var monthDiff = today.getMonth() - dob[1]
    var dayDiff = today.getDate() - dob[2]

    if(yearDiff < 18){
        return { type: ERROR, message: 'Must be over the age of 18 to register!'}
    } else if(yearDiff == 18){
        if(monthDiff < 0){
            return { type: ERROR, message: 'Must be over the age of 18 to register!'}
        } else if(monthDiff == 0){
            if(dayDiff < 0){
                return { type: ERROR, message: 'Must be over the age of 18 to register!'}
            }
        }
    }

    // Check password matching.
    var pass1 = regFields.password;
    var pass2 = regFields.passwordconfirm;
    if(pass1 != pass2){
        return { type: ERROR, message: 'Passwords do not match!'}
    }
    return {type: REGISTER, location: Pages.MAIN_PAGE, user: {
        username: regFields.username,
        displayname: regFields.displayname,
        email: regFields.email,
        phone: regFields.phone,
        dob: regFields.dob,
        zip: regFields.zip,
        password: regFields.password
    }}
}

// Main page actions.
// Dispatch change page action. Clear user field in state.
export const logOut = () => {
    return { type: LOG_OUT, location: Pages.LANDING }
}

// Dispatch change page action.
export const toProfile = () => {
    return { type: CHANGE_PAGE, location: Pages.PROFILE_PAGE } 
}

// Profile page actions.
// Dispatch change page action.
export const toMain = () => {
    return { type: CHANGE_PAGE, location: Pages.MAIN_PAGE }    
}

// Perform form verification before dispatching user update action.
export const updateProfile = (oldFields, newFields) => {
    var pattern
    var updateName = oldFields.displayname
    // Verify name field.
	if(newFields.displayname.length != 0){
        pattern = new RegExp("^[^<>]+$")
        if (pattern.test(newFields.displayname)) {
            updateName = newFields.displayname
        } else{
            return { type: ERROR, message: 'Invalid name for name change!'}
        }
    }

    var updateEmail = oldFields.email
    // Verify email.
    if(newFields.email.length != 0){
	    pattern = new RegExp("^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+$|^[a-zA-Z0-9_]+@[a-zA-Z0-9_]+$")
        if (pattern.test(newFields.email)) {
            updateEmail = newFields.email
        } else{
            return { type: ERROR, message: 'Invalid email for email change!'}
        }
    }

    var updatePhone = oldFields.phone
    // Verify phone number.
    if(newFields.phone.length != 0){
	    pattern = pattern = new RegExp("^[0-9]{10}$|^[0-9]{3}-[0-9]{3}-[0-9]{4}$")
        if (pattern.test(newFields.phone)) {
            updatePhone = newFields.phone
        } else{
            return { type: ERROR, message: 'Invalid phone number for phone number change!'}
        }
    }

    var updateZip = oldFields.zip
    // Verify zip code.
    if(newFields.zip.length != 0){
	    pattern = new RegExp("^[0-9_]{5}$")
        if (pattern.test(newFields.zip)) {
            updateZip = newFields.zip
        } else{
            return { type: ERROR, message: 'Invalid zip code for zip code change!'}
        }
    }

    return {type: UPDATE_USER, displayname: updateName, email: updateEmail, phone: updatePhone, zip: updateZip}
}