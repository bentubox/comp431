import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import { addArticle } from './mainActions'

const Post = ({user, addArticle}) => {
    let textInput, imageInput
    return(<span>
        <form id="post" method="GET" action="#">
            <textarea id="postArticle" rows={8} cols={100} overflow="scroll" placeholder="Say dumb stuff to your friends." ref={ (node) => textInput = node }></textarea>
            <input type="file" id="postPic" accept="image/*" ref={ (node) => imageInput = node }/> 
            <div id="postButtons">
                <input type="button" value="SHARE" onClick={ () => { addArticle(textInput, imageInput)} } />
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
        addArticle: (textInput, imageInput) => {
            const fd = new FormData()
            fd.append('text', textInput.value)
			if (imageInput.files.length > 0){
				fd.append('image', imageInput.files[0])
			}
            addArticle(fd)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const PostContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post)

export default PostContainer