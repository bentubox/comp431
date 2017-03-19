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

it('resource should be a resource', (done) => {
    mock('https://webdev-dummy.herokuapp.com', {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { mock: "MOCK" }
    })

    console.log(resource('GET', '', { }))
})

it('resource should give http error', (done) => {
    mock('lolnope', {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { mock: "MOCK" }
    })

    console.log(resource('GET', '', { }))
})

it('resource should be postable', (done) => {

})

it('should update error message', (done) => {

})

it('should update success message', (done) => {

})

it('should navigate to landing page', (done) => {

})

it('should navigate to main page', (done) => {

})

it('should navigate to profile page', (done) => {

})