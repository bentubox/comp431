import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import {startEditArticle, editArticle, cancelEdit, addComment, cancelComment, postComment} from './mainActions'
import CommentContainer from './comment'

const Card = ({ username, newCommentArray, articleEditArray, article, editArticle, saveArticle, cancelEdit, addComment, cancelComment, postComment }) => {
    let articleText, commentInput
    return(<span>
        <p id="articleInfo">Posted by { article.author } at { new Date(article.date).toUTCString() }</p>
        <img id="articlePic" src={ article.pic }/>
        <p id="articleText" >{ article.text }</p>
        {articleEditArray.find((articleId) => { return articleId == article._id }) ? (
                <div>
                    <textarea id="editArticle" overflow="scroll" placeholder={ article.text } ref={ (node) => articleText = node }></textarea>
                    <div id="articlebuttons">
                        <button id="cancelEditButton" onClick={ () => cancelEdit(article._id, articleText) }>CANCEL</button>
                        <button id="saveButton" onClick={ () => saveArticle(article._id, articleText) }>SAVE</button>
                        <button id="commentButton" onClick={ () => addComment(article._id) }>Comment</button>
                    </div>
                </div>
            ) : (
                <div id="articlebuttons">
                    {article.author === username ? (
                        <button id="editButton" onClick={ () => editArticle(article._id) }>EDIT</button>
                    ) : (
                        <button id="editButton" disabled>EDIT</button>
                    )}
                   <button id="commentButton" onClick={ () => addComment(article._id) }>Comment</button>
                </div>
        )}
        {newCommentArray.find((articleId) => { return articleId == article._id }) ? (
                <div>
                    <input type="text" id="newComment" placeholder="New Comment" ref={ (node) => commentInput = node }/>
                    <button id="newCommentButton" onClick={ () => postComment(article._id, commentInput) }>POST</button>
                    <button id="cancelCommentButton" onClick={ () => cancelComment(article._id) }>CANCEL</button>
                </div>
            ) : (
                <div />
        )}
        <div>
            <p>Comments</p>
            { article.comments.map(comment => 
                <CommentContainer key={ comment.commentId } articleId={article._id} comment={comment} />
            )}
        </div>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        newCommentArray: state.addCommentArray,
        articleEditArray: state.editArticleArray
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editArticle: (id) => {
            startEditArticle(id)(fn => fn((action) => {
                    dispatch(action)
                }))
        },
        saveArticle: (id, articleText) => {
            editArticle(id, articleText.value)(fn => fn((action) => {
                    dispatch(action)
                }))
            cancelEdit(id)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        cancelEdit: (articleId, articleText, editButton) => {
            cancelEdit(articleId)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        addComment: (articleId) => {
            addComment(articleId)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        cancelComment: (articleId) => {
            cancelComment(articleId)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        postComment: (articleId, commentInput) => {
            postComment(articleId, commentInput.value)(fn => fn((action) => {
                dispatch(action)
            }))
            cancelComment(articleId)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const CardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Card)

export default CardContainer