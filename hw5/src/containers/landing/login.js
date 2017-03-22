import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { logIn } from './authActions'

const Login = ({ login }) => {
    return (<span>
       <form id="LoginForm" method="GET" action="#">
           <h1>LOGIN</h1>
           <p>Account Name*: <input type="text" id="usrname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required /></p>
           <p>Password*: <input type="password" id="password" placeholder="Password" required /></p>
           <input type="button" value="LOGIN" onClick={ login }/>
       </form>
    </span>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            logIn(document.getElementById("usrname").value, document.getElementById("password").value)(dispatch)
        }
    }
}

const LoginContainer = connect(
    null,
    mapDispatchToProps
)(Login)

export default LoginContainer