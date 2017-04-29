import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'

import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as mainActions from './mainActions'
import * as DispatchActions from '../../actions'
import SortedDeck from './deck'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import { Reducer } from '../../reducers'

let Action, actions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('./mainActions').default
  actions = require('./mainActions')
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

// Validate article actions.
describe( 'Validate article actions', () => {
    it('should fetch articles', (done) => {
      const user = "USER"
      const articles = [
        {_id: 0, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "afdsfdas"},
        {_id: 1, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "sdfsfdsf"},
        {_id: 2, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "tsdvsdgb"}
      ]

      mock(`${DispatchActions.url}/articles/${user}*?`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { articles }
      })
      
      mainActions.loadArticles({id: user})(
        fn => fn((action) => {
          try{
            expect(action.type).to.not.eql(DispatchActions.ERROR)
            if (action.type === DispatchActions.LOAD_ARTICLES){
              expect(action.articles).to.have.length(3)
              done()
            }
          } catch(e){
            done(e)
          }
        })
      )
    })

    it('should update the search keyword', (done) => {
      const criteria = "CRITERIA"
      mainActions.filterArticles(criteria)(
        fn => fn((action) => {
          try{
            expect(action.type).to.not.eql(DispatchActions.ERROR)
            if (action.type === DispatchActions.SEARCH){
              expect(action.keyword).to.eql(criteria)
              done()
            }
          } catch(e){
            done(e)
          }
        })
      )
    })
})

// Validate Article View components.
describe( 'Validate article view components', () => {
    it('should render articles', (done) => {
      const articles = [
        {_id: 0, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "afdsfdas"},
        {_id: 1, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "sdfsfdsf"},
        {_id: 2, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "tsdvsdgb"}
      ]
      
      const logger = createLogger()    
      const component = TestUtils.renderIntoDocument(
        <Provider store={createStore(Reducer, applyMiddleware(logger))}>
          <SortedDeck articles={articles}/>
        </Provider>
      )

        const deck = findDOMNode(component).children[0]
        done()
    })

    it('should dispatch actions to create new articles', (done) => {
      done()
    })
})