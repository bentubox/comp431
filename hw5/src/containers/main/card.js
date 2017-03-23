import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

const Card = ({ article, editArticle, addComment }) => {
    return(<span>
        <p id="articleInfo">Posted by { article.author } at { new Date(article.date).toUTCString() }</p>
        <img id="articlePic" src={ article.pic }/>
        <p id="articleText">{ article.text }</p>
        <div id="articlebuttons">
            <button id="editButton" onClick={ editArticle }>EDIT</button>
            <button id="commentButton" onClick={ addComment }>Comment</button>
        </div>
        <div>
            <p>Comments</p>
            {article.comments.map(comment => 
                <div key={ comment.commentId } className="comment">
                    {comment.text}
                </div>
            )}
        </div>
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