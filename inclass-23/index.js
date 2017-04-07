const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({ secret: 'secret'}))
app.use(passport.initialize())
app.use(passport.session())

require('./auth')(app, passport)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
