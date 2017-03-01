import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { toProfile, logOut } from '../../actions'
import { filterArticles} from './mainActions'

const Nav = ({toProfile, logOut, filterArticles}) => {

    return (<span>
        <div id="navButtons">
            <a onClick={ toProfile }>MY PROFILE</a>
            <a onClick={ logOut }>LOG OUT</a>
        </div>
        <div id="pageFilter">
             <form method="GET" action="#">
                Filter Page:
                <input type="search" id="filterInput"/>
                <input type="button" value="SEARCH" onClick={ filterArticles }/>
            </form>  
        </div>
    </span>)
}


const mapDispatchToProps = (dispatch) => {
    return {
        toProfile: () => {dispatch(toProfile())},
        logOut: () => {dispatch(logOut())},
        filterArticles: () => {
            dispatch(filterArticles(document.getElementById("filterInput").value))
        }
    }
}

const NavContainer = connect(
    null,
    mapDispatchToProps
)(Nav)

export default NavContainer