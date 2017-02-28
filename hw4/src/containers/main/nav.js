import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {toProfile, logOut} from '../../actions'

const Nav = ({toProfile, logOut}) => {

    return (<span>
        <button onClick={ toProfile }>PROFILE</button>
        <button onClick={ logOut }>LOGOUT</button>
    </span>)
}


const mapDispatchToProps = (dispatch) => {
    return {
        toProfile: () => {dispatch(toProfile())},
        logOut: () => {dispatch(logOut())}
    }
}

const NavContainer = connect(
    null,
    mapDispatchToProps
)(Nav)

export default NavContainer