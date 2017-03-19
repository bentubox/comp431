import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as pageActions from './actions'

let Action, actions
beforeEach(() => {
  if (mockery.enable) {
	mockery.enable({warnOnUnregistered: false, useCleanCache:true})
	mockery.registerMock('node-fetch', fetch)
	require('node-fetch')
  }
  Action = require('./actions').default
  actions = require('./actions')
})

afterEach(() => {
  if (mockery.enable) {
	mockery.deregisterMock('node-fetch')
	mockery.disable()
  }
})

it('should initialize state', (done) => {

})

it('should state success', (done) => {

})

it('should state error', (done) => {

})

it('should set articles', (done) => {

})

it('should set search keyword', (done) => {

})

it('should filter displayed articles based on search keyword', (done) => {

})