const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Test of backend headline functionality for user profiles', ()=> {
    it('should retrieve the headline for the default user', (done) => {
        const profile = {
            username:"Dummy",
            headline: 'Default Headline',
        }

        fetch(url("/headlines"), { method: 'GET' })
		.then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			expect(body.headlines).to.have.length(1)
            expect(body.headlines[0].username).to.eql(profile.username)
            expect(body.headlines[0]).to.have.property("headline")
		}).then(done).catch(done)
    })

    it('should retrieve the proper headline from memory for specified users', (done) => {
        const profile = {
            username:"Dummy",
            headline: 'Default Headline',
        }

        const userBase = [
            profile,
            {
                username: 'Jimmy',
                headline: 'Headline0',
            },
            {
                username: 'Timmy',
                headline: 'Headline1',
            },
            {
                username: 'Kimmy',
                headline: 'Headline2',
            }
        ]
        fetch(url(`/headlines/${userBase[1].username},${userBase[2].username},${userBase[3].username}`), { method: 'GET' })
		.then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			expect(body.headlines).to.have.length(3)
            body.headlines.forEach(function(element) {
                switch(element.username){
                    case userBase[0].username:
                        assert.fail(true, true, "Retrieved headline for wwrong user!"); 
                        break;
                    case userBase[1].username:
                        expect(element.headline).to.eql(userBase[1].headline)
                        break;
                    case userBase[2].username:
                    expect(element.headline).to.eql(userBase[2].headline)
                        break;
                    case userBase[3].username:
                    expect(element.headline).to.eql(userBase[3].headline)
                        break;
                }
            }, this);
		}).then(done).catch(done)
    })

    it('should update the headline in memory for the default user', (done) => {
        const profile = {
            username:"Dummy",
            headline: 'Default Headline',
        }

        const newHeadline = "New Headline"

        fetch(url("/headline"), 
            {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({headline: newHeadline}) 
            }
        ).then( r => {
			expect(r.status).to.eql(200)
			return r.json()
		})
		.then( (body) => {
			expect(body.headline).to.eql(newHeadline)
            fetch(url("/headlines"), { method: 'GET' })
            .then( r2 => {
                expect(r2.status).to.eql(200)
                return r2.json()
            })
            .then( (body2) => {
                expect(body2.headlines).to.have.length(1)
                expect(body2.headlines[0].username).to.eql(profile.username)
                expect(body2.headlines[0].headline).to.eql(newHeadline)
            }).then(done).catch(done)
		}).then(done).catch(done)
    })
})