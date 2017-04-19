import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import {startEditComment, editComment, cancelEditComment} from './mainActions'

const Comment = ({ username, commentEditArray, articleId, comment, editComment, cancelEdit, saveComment }) => {
    let commentText
    return(<span>
        <div className="comment">
            <p id="comment">{comment.text}</p>
            {commentEditArray.find((id) => { return id == comment._id }) ? (
                <div>
                    <textarea id="editComment" overflow="scroll" placeholder={ comment.text } ref={ (node) => commentText = node }></textarea>
                    <button id="cancelEditButton" onClick={ () => cancelEdit(comment._id) }>CANCEL</button>
                    <button id="saveButton" onClick={ () => saveComment(articleId, comment._id, commentText) }>SAVE</button>
                </div>
            ) : (
                <div>
                    {comment.author === username ? (
                        <button id="editButton" onClick={ () => editComment(comment._id) }>EDIT</button>
                    ) : (
                        <button id="editButton" disabled>EDIT</button>
                    )}
                </div>
            )}
            <p id="commentAuthor">{comment.author}</p>
        </div>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        commentEditArray: state.editCommentArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (commentId) => {
            startEditComment(commentId)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        cancelEdit: (commentId) => {
            cancelEditComment(commentId)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        saveComment: (articleId, commentId, commentText) => {
            editComment(articleId, commentId, commentText.value)(fn => fn((action) => {
                dispatch(action)
            }))
            cancelEditComment(commentId)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const CommentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comment)

export default CommentContainer