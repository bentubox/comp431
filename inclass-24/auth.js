const md5 = require('md5')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// Cookie id for authentication.
const cooKey = 'sid'

// Array of users. Holds username, salt, and hash data for users.
const users = []

// Map of session IDs to usernames.
var sessions = 0
const sessionUser = {}

const hi = (req, res) => {
    res.send('Hi')
}

const fail = (req, res) => {
    // res.send(users)
    res.send('FAIL')
}

const profile = (req, res) => {
    console.log('User received:', req.user)
    res.status(`Logged in`).send(req.user)
}

const isLoggedIn = (req, res, next) => {
    const sid = req.cookies[cooKey]
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/')
    }
}

const logoutUser = (req, res) => {
    console.log('Payload received:', req.body)
    req.logout()
    req.redirect('/')
}

module.exports = (app, passport) => {
    passport.serializeUser( (user, done) => {
        users[user.id] = user
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        const user = users[id]
        done(null, user)
    })

    passport.use( new GoogleStrategy({
        clientID: '982294091723-leqims6rp5f6dp6q9o7934niqigg8r5i.apps.googleusercontent.com',
        clientSecret: 'rzb--EWdCJlfEzwCsVhQo9hx',
        callbackURL: 'http://localhost:3000/callback'
    }, (token, refreshToken, profile, done) => {
        process.nextTick( () => {
            return done(null, profile)
        })
    }))

    app.get('/', hi)
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }))
    app.get('/logout', isLoggedIn, logoutUser)
    app.get('/profile', isLoggedIn, profile)
    app.get('/fail', fail)
    app.get('/callback', passport.authenticate('google', {
        successRedirect: '/profile', failureRedirect: '/fail'
    }))
}