import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

const Card = ({ article, editArticle, addComment }) => {
    return(<span>
        <p id="articleInfo">Posted by { article.author } at { new Date(article.timestamp).toUTCString() }</p>
        <div id="articlebuttons">
            <button id="editButton" onClick={ editArticle }>EDIT</button>
            <button id="commentButton" onClick={ addComment }>Comment</button>
        </div>
        <img id="articlePic" src={ article.pic }/>
        <p id="articleText">{ article.text }</p>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        
    }
}

// TODO: Add buton functionality.
const mapDispatchToProps = (dispatch) => {
    return {
        editArticle: () => {

        },
        addComment: () => {

        }
    }
}

const CardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Card)

export default CardContainer