import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import NavContainer from './nav'
import SidebarContainer from './sidebar'
import PostContainer from './post'
import SortedDeck from './deck'

const Main = ({articles, postArticle}) => {

    return (<span>
        <h1>MAIN</h1>
        <NavContainer />
        {/*<SidebarContainer />*/}
        <PostContainer />
        <SortedDeck />     
    </span>)
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postArticle: () => {
            dispatch(postArticle())
        }
    }
}

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default MainContainer