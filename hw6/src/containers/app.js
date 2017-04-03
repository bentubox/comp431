import React from 'react'
import {connect} from 'react-redux'

import MainContainer from './main/main'
import ProfileContainer from './profile/profile'
import Landing from './landing/landing'

export const Pages = {
    MAIN_PAGE: "MAIN_PAGE",
    PROFILE_PAGE: "PROFILE_PAGE",
    LANDING: "LANDING"
}

// Component renders different page depending on location state variable.
const variableComponent = ({location}) => {
    if (location == Pages.MAIN_PAGE) {
    	return <MainContainer />
    } else if (location == Pages.PROFILE_PAGE) {
	    return <ProfileContainer />
    } else {
	    return <Landing />
    }
}

const mapStateToProps = (state) => {
    return { location: state.location, message: state.message }
}

const VariableComponent = connect(
    mapStateToProps,
    null
)(variableComponent)

const App = ({location}) => (
  <div>
    <VariableComponent />
  </div>
)

export default App