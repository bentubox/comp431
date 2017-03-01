import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { addArticle } from './mainActions'

const Post = ({user, addArticle}) => {
    return(<span>
        <form id="post" method="GET" action="#">
            <textarea id="postArticle" rows={8} cols={100} overflow="scroll" placeholder="Say dumb stuff to your friends."></textarea>
            <input type="file" id="postPic" accept="image/*" /> 
            <div id="postButtons">
                <button onClick={ () => {addArticle(user.displayname)} }>SHARE</button>
                <input type="reset" value="Cancel" /> 
            </div >
        </form>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (author) => {
            dispatch(addArticle(
                author,
                new Date(),
                document.getElementById("postArticle").value
            ))
            document.getElementById("postArticle").value = ""
        }
    }
}

const PostContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

export default PostContainer