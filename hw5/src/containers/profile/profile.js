import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { viewMain, updateProfile } from './profileActions'

const Profile = ({ user, status, error, viewMain, updateProfile }) => {

    return (<span>
        <h1>PROFILE</h1>
		<a onClick={ viewMain }>HOME</a>
		<div>
			<input type="file" id="picUpload" accept="image/*" />
			<img id="profilepic" src={user.pic} />
		
		</div>
        <div id="display">
			<div id="name">
				<div id="fieldName">Display Name: </div>
				<div id="oldName">{user.displayname}</div>
				<input type="text" id="newName" rows="1" cols="24" placeholder="New Name" />
			</div>
			<div id="email">
				<div id="fieldEmail">Email: </div>
				<div id="oldEmail">{user.email}</div>
				<input type="email" id="newEmail" rows="1" cols="24" placeholder="New Email" />
			</div>
			<div id="phone">
				<div id="fieldPhone">Phone Number: </div>
				<div id="oldPhone">{user.phone}</div>
				<input type="phone" id="newPhone" rows="1" cols="16" placeholder="New Phone" pattern="\d{3}-\d{3}-\d{4}|\d{10}" />
			</div>
			<div id="dob">
				<div id="fieldDOB">Date of Birth: </div>
				<div id="oldDOB">{new Date(user.dob).toLocaleDateString()}</div>
				<input type="date" id="newDOB" hidden/>
			</div>
			<div id="zip">
				<div id="fieldZip">Zipcode: </div>
				<div id="oldZip">{user.zip}</div>
				<input type="text" id="newZip" rows="1" cols="5" placeholder="New Zipcode" pattern="\d{5}" />
			</div>
			<div id="password">
				<div id="fieldPassword">Password: </div>
				<input type="password" id="newPassword" rows="1" cols="24" placeholder="New Password" />
				<input type="password" id="newPasswordConfirm" rows="1" cols="24" placeholder="Confirm Password" />
			</div>
		</div>
		<div id="info">
			<p><font color={error ? "red" : "lime"}>{status} </font></p>
		</div>
		<div id="buttons">
			<button type="submit" id="update" onClick={ updateProfile }>UPDATE PROFILE</button>
		</div>
    </span>)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		status: state.message,
		error: state.error
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        viewMain: () => {viewMain()(fn => fn((action) => {
                dispatch(action)
            }))},
		updateProfile: () => {
			var newFields = {
				displayname: document.getElementById("newName").value,
				email: document.getElementById("newEmail").value,
				phone: document.getElementById("newPhone").value,
				zip: document.getElementById("newZip").value,
				password: document.getElementById("newPassword").value,
				passwordConfirm: document.getElementById("newPasswordConfirm").value
			}
			updateProfile(newFields)(fn => fn((action) => {
                dispatch(action)
            }))
		}
    }
}

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

export default ProfileContainer