import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { logIn, googleLogIn } from './authActions'

const Login = ({ status, error, login, googleLogin }) => {
    let usernameInput, passwordInput
    return (<span>
        <p id="statusLanding"><font color={error ? "red" : "lime"}>{status} </font></p>
        <form id="LoginForm" method="GET" action="#">
            <h1>LOGIN</h1>
            <p>Account Name*: <input type="text" id="usrname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required ref={ (node) => usernameInput = node }/></p>
            <p>Password*: <input type="password" id="password" placeholder="Password" required ref={ (node) => passwordInput = node }/></p>
            <input type="button" id="loginbtn" value="LOGIN" onClick={ () => login(usernameInput, passwordInput) }/>
            <img id="loginGoogle" src="/images/google_button.png" onClick={ () => googleLogin() }></img>
        </form>
    </span>)
}

const mapStateToProps = (state) => {
    return {status: state.message, error: state.error}
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (usernameInput, passwordInput) => {
            logIn(usernameInput.value, passwordInput.value)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        googleLogin: () => {
            googleLogIn()(fn => fn((action) => {
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