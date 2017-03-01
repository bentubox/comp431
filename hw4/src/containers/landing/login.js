import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { logIn } from '../../actions'

const Login = ({ toMain }) => {
    return (<span>
       <form id="LoginForm" method="GET" action="#">
           <h1>LOGIN</h1>
           <p>Account Name*: <input type="text" id="usrname" placeholder="Account Name" pattern="\D[a-zA-Z/d]*" required /></p>
           <p>Password*: <input type="password" id="password" placeholder="Password" required /></p>
           <input type="button" value="LOGIN" onClick={ toMain }/>
       </form>
    </span>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        toMain: () => {
            dispatch(logIn(document.getElementById("usrname").value, document.getElementById("password").value))
        }
    }
}

const LoginContainer = connect(
    null,
    mapDispatchToProps
)(Login)

export default LoginContainer