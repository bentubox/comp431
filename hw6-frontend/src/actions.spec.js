import { expect, assert } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as pageActions from './actions'
import { Pages } from './containers/app'

describe('Validate actions', () => {
  let Action, actions
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    Action = require('./actions').default
    actions = require('./actions')
    global.fetch = fetch
  })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  })

  // Validate action dispatching.
  it('resource should be a resource', (done) => {
    const mockData = 'MOCK'
    
    mock(`${pageActions.url}/`, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        json: { mockData }
    })
    pageActions.resource('GET', '').then(
      (r) => { 
        expect(r).to.eql({mockData})
        done()
      }
    ).catch(done)
  })

  it('resource should give http error', (done) => {
    const statusCode = 418
    const statusText = 'ERROR'

    mock(`${pageActions.url}/`, {
        method: 'GET',
        headers: {'Content-Type':'text/plain; charset=utf-8'},
        status: statusCode,
        statusText: statusText
    })
   pageActions.resource('GET', '').catch(
     (r) => {
       expect(r.message).to.eql(statusText)
       done()
     }
   )
  })

  it('resource should be postable', (done) => {
    const mockData = 'MOCK'
    
    mock(`${pageActions.url}/`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: { mockData }
    })
    pageActions.resource('POST', '').then(
      (r) => { 
        expect(r).to.eql({mockData})
        done()
      }
    ).catch(done)
  })

  it('should update error message', (done) => {
    const errorMessage = "ERROR"
    
    pageActions.reportError(errorMessage)(
      (action) => {
          expect(action).to.eql({ 
            type: pageActions.ERROR, message: errorMessage
          })
          done()
      }
    )
  })

  it('should update success message', (done) => {
    const successMessage = "SUCCESS"
    pageActions.reportSuccess(successMessage)(
      (action) => {
        expect(action).to.eql({ 
          type: pageActions.SUCCESS, message: successMessage
        })
	      done()
      }
    )
  })

  it('should navigate to landing page', (done) => {
    pageActions.toLanding()(
      (action) => {
        expect(action).to.eql({ 
          type: pageActions.CHANGE_PAGE, location: Pages.LANDING
        })
	      done()
      }
    )
  })

  it('should navigate to main page', (done) => {
    pageActions.toMain()(
      (action) => {
        expect(action).to.eql({ 
          type: pageActions.CHANGE_PAGE, location: Pages.MAIN_PAGE
        })
	      done()
      }
    )
  })

  it('should navigate to profile page', (done) => {
    pageActions.toProfile()(
      (action) => {
        expect(action).to.eql({ 
          type: pageActions.CHANGE_PAGE, location: Pages.PROFILE_PAGE
        })
	      done()
      }
    )
  })
})