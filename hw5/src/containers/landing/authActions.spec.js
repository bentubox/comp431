import { expect, assert } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as DispatchActions from '../../actions'
import * as AuthActions from './authActions'

// Validate authentication.
describe( 'Validate authentication', () => {
    let Action, actions
    beforeEach(() => {
        if (mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
        }
        Action = require('./authActions').default
        actions = require('./authActions')
        global.fetch = fetch
    })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  })
  
  it('should log in a user', (done) => {
      const username = "user"
      const password = "password"

      mock(`${DispatchActions.url}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: { username, result: "success"}
      })

      AuthActions.logIn(username, password)(
        fn => fn((action) => {
          try{
            expect(action.type).to.not.eql(DispatchActions.ERROR)
            if (action.type === DispatchActions.LOG_IN){
              expect(action.username).to.eql(username)
              done()
            }
          } catch(e){
            done(e)
          }
        })
      )
  })
  
  it('should not log in an invalid user',  (done) => {
      const username = "badUser"
      const password = "badPassword"

      mock(`${DispatchActions.url}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: { username, result: "invalid user"}
      })

      AuthActions.logIn(username, password)(
        fn => fn((action) => {
          try{
             expect(action.type).to.eql(DispatchActions.ERROR)
             done()
          } catch(e){
            done(e)
          }
        })
      )
  })

  it('should log out a user', (done) => {
     mock(`${DispatchActions.url}/logout`, {
        method: 'PUT',
        headers: {'Content-Type':'text/plain; charset=utf-8'},
        text: "OK"
      })

      AuthActions.logOut()(
        fn => fn((action) => {
          try{
            expect(action.type).to.not.eql(DispatchActions.ERROR)
            if (action.type === DispatchActions.LOG_OUT){
              done()
            }
          } catch(e) {
            done(e)
          }
        })
      )
  })
})