import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

import Headline from './headline'
import { addFollower, removeFollower} from './mainActions'
import { updateStatus } from '../profile/profileActions'

const Sidebar = ({user, updateStatus, addFollower, removeFollower}) => {
    return(<span>
        <div id="sidebar">
            <div id="userHeadline">
                <form id="statusUpdate" method="GET" action="#" >
                    <Headline user={ user }/>
                    <input type="text" id="newStatus" placeholder="New Status" />
                    <input type="reset" id="updateStatusButton" value="UPDATE" onClick={ updateStatus }/>
                </form>
            </div>
            <div id="followers">
                {user.followers.map(follower => 
                    <div id="follower" key={follower.id}>
                        <Headline user={ follower }/>
                        <button id="removeFollower" onClick={ () => {removeFollower(follower.id)} } >Unfollow</button>
                    </div>
                )}
            </div>
            <form id= "newFollower" method="GET" action="#">
                <input type="text" id="followerNameInput" placeholder="New Follower Name"/>
                <input type="reset" id="addFollowerButton" value="+" onClick={ addFollower } />
            </form>
        </div>
    </span>)
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStatus: () => {
            updateStatus(document.getElementById("newStatus").value)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        removeFollower: (id) => {
           removeFollower(id)(fn => fn((action) => {
                dispatch(action)
            }))
        },
        addFollower: () => {
            addFollower(document.getElementById("followerNameInput").value)(fn => fn((action) => {
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