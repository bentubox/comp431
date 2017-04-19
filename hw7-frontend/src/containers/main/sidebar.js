import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import Headline from './headline'
import { addFollower, removeFollower} from './mainActions'
import { updateStatus } from '../profile/profileActions'

const Sidebar = ({user, followers, updateStatus, addFollower, removeFollower}) => {
    let statusInput, followerInput
    return(<span>
        <div id="sidebar">
            <div id="userHeadline">
                <form id="statusUpdate" method="GET" action="#" >
                    <Headline user={ user }/>
                    <input type="text" id="newStatus" placeholder="New Status" ref={ (node) => statusInput = node }/>
                    <input type="reset" id="updateStatusButton" value="UPDATE" onClick={ () => updateStatus(statusInput) }/>
                </form>
            </div>
            <div id="followers">
                {followers.map(follower => 
                    <div id="follower" key={follower.username}>
                        <Headline user={ follower }/>
                        <button id="removeFollower" onClick={ () => {removeFollower(follower.username)} } >Unfollow</button>
                    </div>
                )}
            </div>
            <form id= "newFollower" method="GET" action="#">
                <input type="text" id="followerNameInput" placeholder="New Follower Name" ref={ (node) => followerInput = node }/>
                <input type="reset" id="addFollowerButton" value="+" onClick={ () => addFollower(followerInput) } />
            </form>
        </div>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        followers: state.user.followers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatus: (textInput) => {
            updateStatus(textInput.value)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        removeFollower: (id) => {
           removeFollower(id)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        addFollower: (textInput) => {
            addFollower(textInput.value)(fn => fn((action) => {
                dispatch(action)
            }))
        }
    }
}

const SidebarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)

export default SidebarContainer