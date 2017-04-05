import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { register } from './authActions'

const Register = ({regUser}) => {
    let nameInput, displayNameInput, emailInput, phoneInput, dobInput, zipInput, passwordInput, passwordConfirmInput
    return (<span>
        <form id="RegistrationForm" method="GET" action="#">
            <h1>NEW USER REGISTRATION</h1>
            <p>Account Name*: <input type="text" id="accname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required ref={ (node) => nameInput = node }/></p>
            <p>Display Name: <input type="text" id="name" placeholder="Display Name" ref={ (node) => displayNameInput = node }/></p>
            <p>Email Address*: <input type="email" id="email" placeholder="name@host" required ref={ (node) => emailInput = node }/></p>
            <p>Phone Number*: <input type="phone" id="phone" placeholder="###-###-####" pattern="\d{3}-\d{3}-\d{4}|\d{10}" required ref={ (node) => phoneInput = node }/></p>
            <p>Date of Birth*: <input type="date" id="dob" required ref={ (node) => dobInput = node }/></p>
            <p>Zip Code*: <input type="text" id="zip" placeholder="#####" pattern="\d{5}" required ref={ (node) => zipInput = node }/></p>
            <p>Password*: <input type="password" id="password0" placeholder="Password" required ref={ (node) => passwordInput = node }/></p>
            <p>Password Confirmation*: <input type="password" id="password1" placeholder="Confirm Password" required ref={ (node) => passwordConfirmInput = node }/></p>
            <input type="hidden" id="timestamp" value="" />
            <p>*required field</p>
            <input type="button" id="regbtn" value="Create Account" onClick={ () => regUser(nameInput, displayNameInput, emailInput, phoneInput, dobInput, zipInput, passwordInput, passwordConfirmInput) } />
            <input type="reset" value="Clear Form" />
        </form>
    </span>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        regUser: (nameInput, displayNameInput, emailInput, phoneInput, dobInput, zipInput, passwordInput, passwordConfirmInput) => {
            var regFields = {
                username: nameInput.value,
                displayname: displayNameInput.value,
                email: email.value,
                phone: phone.value,
                dob: dob.value,
                zip: zip.value,
                password: passwordInput.value,
                passwordconfirm: passwordConfirmInput.value
            }
            register(regFields)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const RegisterContainer = connect(
    null,
    mapDispatchToProps
)(Register)

export default RegisterContainer