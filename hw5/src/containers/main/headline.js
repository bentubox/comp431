import React, { PropTypes } from 'react'
import {connect} from 'react-redux'

const Headline = ({user}) => {
    console.log("DRAW HEADLINE", user)
    return(<span>
        <div>
			<img id="profilepic" src={user.pic}/>
            <p id="headerName">{user.displayname}</p>
            <p id="headerStatus">"{user.status}"</p>
		</div>
    </span>)
}

export default Headline