require('./styles.css')

import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'

import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './containers/app'

const logger = createLogger()

render(
    <Provider store={createStore(Reducer, applyMiddleware(logger))}>
        <App />
    </Provider>,
    document.getElementById('app')
)