import React from 'react'
import {connect} from 'react-redux'

import LoginContainer from './login'
import RegisterContainer from './register'

import { autoLogIn } from './authActions'

const Landing = ({redirectOnLoad}) => {
    redirectOnLoad()
    return (<span >
        <LoginContainer />
        <RegisterContainer />
    </span>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirectOnLoad: () => {
           console.log("LOADING")
           autoLogIn()(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const LandingContainer = connect(
    null,
    mapDispatchToProps
)(Landing)

export default LandingContainer