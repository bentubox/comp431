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

  it('should set articles', (done) => {
    const articles = [
      {_id: 0, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "afdsfdas"},
      {_id: 1, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "sdfsfdsf"},
      {_id: 2, author: "bnt1", comments: [], date: "2017-03-23T02:57:45.242Z", text: "tsdvsdgb"}
    ]
    const articleMessage = { type: Actions.LOAD_ARTICLES, articles}
    const oldState = { otherdata: "stuff"}

    expect(Reducer(oldState, articleMessage).articles).to.have.length(3)
    done()
  })

  it('should set search keyword', (done) => {
    const keyword = "KEYWORD"
    const oldState = { otherdata: "stuff"}
    const searchMessage = { type: Actions.SEARCH, keyword}
    expect(Reducer(oldState, searchMessage).searchCrit).to.be.eql(keyword)
    done()
  })

  it('should filter displayed articles based on search keyword', (done) => {
    // Filtering not handled by reducer.
    done()
  })
})