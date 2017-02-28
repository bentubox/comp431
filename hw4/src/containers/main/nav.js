import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {toProfile, logOut} from '../../actions'

const Nav = ({toProfile, logOut}) => {

    return (<span>
        <p>
            <a onClick={ toProfile }>MY PROFILE</a>
            <a onClick={ logOut }>LOG OUT</a>
        </p>
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