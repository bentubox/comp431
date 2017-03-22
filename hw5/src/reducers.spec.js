import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import * as Actions from './actions'
import {initialState, Reducer} from './reducers'


// Validate reducer.
describe( 'Validate reducer', () => {
  it('should initialize state', (done) => {
    const newState = Reducer(undefined, Actions.NULL_ACTION)
    expect(newState).to.be.eql(initialState)
    done()
  })

  it('should state success', (done) => {
    const otherData = "OTHER"
    const oldMessage = "YOU FAILED"
    const newMessage = "YOU SUCCEED"
    const oldState0 = { otherData, error: true, oldMessage}
    const oldState1 = { otherData, message: oldMessage}
    const successMessage = { type: Actions.SUCCESS, message: newMessage}
    
    expect(Reducer(oldState0, successMessage).otherData).to.be.eql(otherData)
    expect(Reducer(oldState0, successMessage).error).to.be.eql(false)
    expect(Reducer(oldState0, successMessage).message).to.be.eql(newMessage)

    expect(Reducer(oldState1, successMessage).otherData).to.be.eql(otherData)
    expect(Reducer(oldState1, successMessage).error).to.be.eql(false)
    expect(Reducer(oldState1, successMessage).message).to.be.eql(newMessage)
    done()
  })

  it('should state error', (done) => {
    const otherData = "OTHER"
    const oldMessage = "IT IS AMBIGUOUS"
    const newMessage = "YOU FAILED"
    const oldState = { otherData, error: true, oldMessage}
    const failMessage = { type: Actions.ERROR, message: newMessage}
    
    expect(Reducer(oldState, failMessage).otherData).to.be.eql(otherData)
    expect(Reducer(oldState, failMessage).error).to.be.eql(true)
    expect(Reducer(oldState, failMessage).message).to.be.eql(newMessage)
    done()
  })

  it('should set articles')

  it('should set search keyword')

  it('should filter displayed articles based on search keyword')
})