/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles/:"), {method: 'GET'})
		.then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			expect(body.articles).to.have.length.above(2)
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url("/article"), 
			{ 
				method: 'POST', credentials: 'include', 
				headers: {
      				'Content-Type': 'application/json'
				},
				body: JSON.stringify({text: "article1"})
			}
		).then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (b) => {
			expect(b).to.have.property("id")
			expect(b.text).to.eql("article1")
			fetch(url("/article"), 
				{ 
					method: 'POST', credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({text: "article2"})
				}
			).then( ( r2 => {
				expect(r2.status).to.eql(200)
				return r2.json()
			})).then( (b2) => {
				expect(b2.id).to.eql(b.id + 1)
				expect(b2.text).to.eql("article2")
			})
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url("/articles/:"), {method: 'GET'})
		.then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			const id = Math.floor((body.articles.length - 1) * Math.random())
			fetch(url(`/articles/:${id}`), {method: 'GET'})
			.then( (r2) => {
				expect(r2.status).to.eql(200)
				return r2.json()
			})
			.then( (body2) => {
				expect(body2).to.have.length(1)
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/:"), {method: 'GET'})
		.then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			fetch(url(`/articles/:${body.articles.length + 1}`), {method: 'GET'})
			.then( (r2) => {
				expect(r2.status).to.eql(200)
				return r2.json()
			})
			.then( (body2) => {
				expect(body2).to.be.empty
			})
		})
		.then(done)
		.catch(done)
	}, 200)
});
