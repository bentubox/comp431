import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { register } from '../../actions'

const Register = ({status, toMain}) => {
    return (<span>
        <form id="RegistrationForm" onSubmit={ toMain }>
            <h1>NEW USER REGISTRATION</h1>
            
            <p>Account Name*: <input type="text" id="accname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required /></p>
            <p>Display Name: <input type="text" id="name" placeholder="Display Name" /></p>
            <p>Email Address*: <input type="email" id="email" placeholder="name@host" required /></p>
            <p>Phone Number*: <input type="phone" id="phone" placeholder="###-###-####" pattern="\d{3}-\d{3}-\d{4}|\d{10}" required /></p>
            <p>Date of Birth*: <input type="date" id="dob" required /></p>
            <p>Zip Code*: <input type="text" id="zip" placeholder="#####" pattern="\d{5}" required /></p>
            <p>Password*: <input type="password" id="password0" placeholder="Password" required /></p>
            <p>Password Confirmation*: <input type="password" id="password1" placeholder="Confirm Password" required /></p>
            <input type="hidden" id="timestamp" value="" />
            <p>*required field</p>
            <p id="status"><font color="red">{status} </font></p>
            <input type="submit" value="Create Account" />
            <input type="reset" value="Clear Form" />
        </form>
    </span>)
}

const mapStateToProps = (state) => {
    return {status: state.message}
}

const mapDispatchToProps = (dispatch) => {
    return {
        toMain: () => {
            var regFields = {
                username: document.getElementById("accname").value,
                displayname: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                dob: document.getElementById("dob").value,
                zip: document.getElementById("zip").value,
                password: document.getElementById("password0").value,
                passwordconfirm: document.getElementById("password1").value
            }
            dispatch(register(regFields))
        }
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register)

export default RegisterContainer