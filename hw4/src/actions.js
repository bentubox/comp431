import { Pages } from './containers/app'

export const UPDATE_TEXT = 'UPDATE_TEXT'
export const CHANGE_PAGE = 'CHANGE_PAGE'
export const ERROR = 'ERROR'

export const ActionTypes = {
    UPDATE_TEXT: 'UPDATE_TEXT', 
    CHANGE_PAGE: 'CHANGE_PAGE'
}

export const updateText = (text) => {
    if (text.length > 5) {
        return { type: UPDATE_TEXT, text }
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}

export const logIn = (username, password) => {
    if (username.length ) {
        if (password.length){
            return {type: CHANGE_PAGE, location: Pages.MAIN_PAGE}
        } else{
            return { type: ERROR, message: 'Login Password must not be blank!'}
        }
    } else{
        return { type: ERROR, message: 'Login Username must not be blank!'}
    }
}

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
    if(pass1 !== pass2){
        return { type: ERROR, message: 'Passwords do not match!'}
    }
    return {type: CHANGE_PAGE, location: Pages.MAIN_PAGE}
}

export const logOut = () => {
    return { type: CHANGE_PAGE, location: Pages.LANDING }
}

export const toProfile = () => {
    return { type: CHANGE_PAGE, location: Pages.PROFILE_PAGE } 
}

export const toMain = () => {
    return { type: CHANGE_PAGE, location: Pages.MAIN_PAGE }    
}