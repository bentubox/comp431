import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { logIn } from './authActions'

const Login = ({ status, error, login }) => {
    return (<span>
        <p id="status"><font color={error ? "red" : "lime"}>{status} </font></p>
        <form id="LoginForm" method="GET" action="#">
            <h1>LOGIN</h1>
            <p>Account Name*: <input type="text" id="usrname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required /></p>
            <p>Password*: <input type="password" id="password" placeholder="Password" required /></p>
            <input type="button" value="LOGIN" onClick={ login }/>
        </form>
    </span>)
}

const mapStateToProps = (state) => {
    return {status: state.message, error: state.error}
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            logIn(document.getElementById("usrname").value, document.getElementById("password").value)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginContainer