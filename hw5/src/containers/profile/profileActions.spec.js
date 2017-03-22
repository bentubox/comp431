import { expect, assert } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as DispatchActions from '../../actions'
import * as ProfActions from './profileActions'

// Validate profile actions.
describe( 'Validate profile actions', () => {
  let Action, actions
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    Action = require('./profileActions').default
    actions = require('./profileActions')
    global.fetch = fetch
  })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  })
  
    it('should fetch profile information for the user', (done) => {
        const username = "user"
        const headline = "HEADLINE"
        const avatar = "picURL"
        const following = ["follower0", "follower1", "follower2"]
        const email = "EMAIL"
        const zipcode = "ZIPCODE"
        const dob = 100

        mock(`${DispatchActions.url}/headlines/:${username}?`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { headlines: [{username, headline}] }
        })
        mock(`${DispatchActions.url}/avatars/:${username}?`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { avatars: [{username, avatar}] }
        })
        mock(`${DispatchActions.url}/following/:${username}?`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { username, following }
        })
        mock(`${DispatchActions.url}/email/:${username}?`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { username, email }
        })
        mock(`${DispatchActions.url}/zipcode/:${username}?`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { username, zipcode }
        })
        mock(`${DispatchActions.url}/dob`, {
            method: 'GET',
            headers: {'Content-Type':'application/json'},
            json: { username, dob }
        })

        const actionsToCount = [
            DispatchActions.UPDATE_STATUS,
            DispatchActions.UPDATE_AVATAR,
            DispatchActions.LOAD_FOLLOWERS,
            DispatchActions.UPDATE_EMAIL,
            DispatchActions.UPDATE_ZIPCODE,
            DispatchActions.UPDATE_DOB
        ]

        ProfActions.loadProfile(username)(
        fn => fn((action) => {
            try{
                expect(action.type).to.not.eql(DispatchActions.ERROR)
                if(actionsToCount.indexOf(action.type) >= 0){
                    actionsToCount.splice(actionsToCount.indexOf(action.type), 1)
                }
                switch(action.type){
                    case DispatchActions.UPDATE_STATUS:
                        expect(action.status).to.be.eql(headline)
                        break
                    case DispatchActions.UPDATE_AVATAR:
                        expect(action.pic).to.be.eql(avatar)
                        break
                    case DispatchActions.LOAD_FOLLOWERS:
                        expect(action.followers).to.be.eql(following)
                        break
                    case DispatchActions.UPDATE_EMAIL:
                        expect(action.email).to.be.eql(email)
                        break
                    case DispatchActions.UPDATE_ZIPCODE:
                        expect(action.zip).to.be.eql(zipcode)
                        break
                    case DispatchActions.UPDATE_DOB:
                        expect(action.dob).to.be.eql(dob)
                        break                 
                }
            } catch(e){
                done(e)
            }
        }))
        done()
    })

    it('should update headline', (done) => {
        const username = "user"
        const headline = "NEW HEADLINE"

        mock(`${DispatchActions.url}/headline`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            json: { username, headline }
        })

        ProfActions.updateStatus(headline)(
            fn => fn((action) => {
                try{
                    expect(action.type).to.not.eql(DispatchActions.ERROR)
                    if (action.type === DispatchActions.UPDATE_STATUS){
                        expect(action.status).to.eql(headline)
                        done()
                    }
                } catch(e){
                    done(e)
                }
            })
        )
    })
})