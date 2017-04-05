import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import NavContainer from './nav'
import SidebarContainer from './sidebar'
import PostContainer from './post'
import SortedDeck from './deck'

const Main = ({status, error}) => {
    return (<span>
        <p id="statusMain"><font color={error ? "red" : "lime"}>{status} </font></p>
        <h1>MAIN</h1>
        <NavContainer />
        <SidebarContainer />
        <PostContainer />
        <SortedDeck />     
    </span>)
}

const mapStateToProps = (state) => {
    return {
        status: state.message,
        error: state.error
    }
}

const MainContainer = connect(
    mapStateToProps,
    null
)(Main)

export default MainContainer