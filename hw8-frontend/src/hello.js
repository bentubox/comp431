import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateText } from './actions'

export const Hello = ({ text, message, update }) => {
    let input;

    const _update = () => {
        if (input && input.value) {
            update(input.value)
            input.value = ''
        }
    }

    return (<span>
        <input type="text" placeholder="Write something" ref={(node) => input = node} />
        <button onClick={_update}>Update Text</button>
        <br/>
        { text }
        <br/>
        <b>{message}</b>
    </span>)
}

Hello.propTypes = {
    text: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    update: PropTypes.func.isRequired,
}

export default connect(
    (state) => ({ text: state.text, message: state.message }),
    (dispatch) => ({ update: (text) => dispatch(updateText(text)) })
)(Hello)
