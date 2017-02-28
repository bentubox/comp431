import React, { PropTypes } from 'react'

const Profile = () => {

    return (<span>
        <h1>PROFILE</h1>
        <button onClick={ toMain }>MAIN</button>
        <div id="display">
		<div id="name">
			<div id="fieldName">Display Name: </div>
			<div id="oldName">Bob Evans</div>
			<input type="text" id="newName" rows="1" cols="24" placeholder="New Name" />
		</div>
		<div id="email">
			<div id="fieldEmail">Email: </div>
			<div id="oldEmail">bobe@yabba.org</div>
			<input type="email" id="newEmail" rows="1" cols="24" placeholder="New Email" />
		</div>
		<div id="phone">
			<div id="fieldPhone">Phone Number: </div>
			<div id="oldPhone">800-800-8000</div>
			<input type="phone" id="newPhone" rows="1" cols="16" placeholder="New Phone" pattern="\d{3}-\d{3}-\d{4}|\d{10}" />
		</div>
		<div id="zip">
			<div id="fieldZip">Zipcode: </div>
			<div id="oldZip">80000</div>
			<input type="text" id="newZip" rows="1" cols="5" placeholder="New Zipcode" pattern="\d{5}" />
		</div>
		<div id="password">
			<div id="fieldPassword">Password: </div>
			<div id="oldPassword" style="display: none">lolpassword</div>
			<div id="hidePassword">&#8226&#8226&#8226&#8226&#8226&#8226&#8226&#8226&#8226&#8226&#8226</div>
			<input type="password" id="newPassword" rows="1" cols="24" placeholder="New Password" />
			<input type="password" id="newPasswordConfirm" rows="1" cols="24" placeholder="Confirm Password" />s
		</div>
	</div>
	<div id="info">
		<div id="infoName"></div>
		<div id="infoEmail"></div>
		<div id="infoPhone"></div>
		<div id="infoZip"></div>
		<div id="infoPassword"></div>
	</div>
	<div id="buttons">
		<button type="button" id="update" onclick="updateInfo()">UPDATE</button>
	</div>
    </span>)
}

const mapDispatchToProps = (dispatch) => {
    return {
        toMain: () => {dispatch(toMain())},
    }
}

const ProfileContainer = connect(
    null,
    mapDispatchToProps
)(Profile)

export default ProfileContainer