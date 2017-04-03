import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { logOut } from '../landing/authActions'
import { filterArticles, viewProfile } from './mainActions'

const Nav = ({viewProfile, logOut, filterArticles}) => {
    let textInput
    return (<span>
        <div id="navButtons">
            <a onClick={ viewProfile }>MY PROFILE</a>
            <a onClick={ logOut }>LOG OUT</a>
        </div>
        <div id="pageFilter">
             <form method="GET" action="#">
                Filter Page:
                <input type="search" id="filterInput" placeholder="Filter Articles" ref={ (node) => textInput = node }/>
                <input type="button" value="SEARCH" onClick={ () => filterArticles(textInput) }/>
            </form>  
        </div>
    </span>)
}


const mapDispatchToProps = (dispatch) => {
    return {
        viewProfile: () => {
            viewProfile()(fn => fn((action) => {
                dispatch(action)
            }))},
        logOut: () => {
            logOut()(fn => fn((action) => {
                dispatch(action)
            }))},
        filterArticles: (textInput) => {
            filterArticles(textInput.value)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const NavContainer = connect(
    null,
    mapDispatchToProps
)(Nav)

export default NavContainer