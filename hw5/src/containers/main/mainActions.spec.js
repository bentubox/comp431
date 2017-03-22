import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as mainActions from './mainActions'

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
    it('should fetch articles')

    it('should update the search keyword')
})

// Validate Article View components.
describe( 'Validate article view components', () => {
    it('should render articles')

    it('should dispatch actions to create new articles')
})