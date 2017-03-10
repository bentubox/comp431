const profile = {
        headline: 'Default Headline',
        email: 'default@email.com',
        zipcode: 00000,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Antonin_Hudecek_14.1.1872-11.8.1941_-_Leto_-_Paseka.jpg'
    }

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    res.send({ username: req.user, headline: profile.headline})
}
const setHeadline = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.headline = req.body.headline
    res.send({ username: req.user, headline: profile.headline})
}
const getEmail = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    res.send({ username: req.user, email: profile.email})
}
const setEmail = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.email = req.body.email
    res.send({ username: req.user, email: profile.email})
}
const getZipcode = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    res.send({ username: req.user, zipcode: profile.zipcode})
}
const setZipcode = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.zipcode = req.body.zipcode
    res.send({ username: req.user, zipcode: profile.zipcode})
}
const getAvatar = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    res.send({ username: req.user, avatar: profile.avatar})
}
const setAvatar = (req, res) => {
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.avatar = req.body.image
    res.send({ username: req.user, avatar: profile.avatar})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headline/:user?', getHeadline)
     app.put('/headline', setHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', setEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', setZipcode)
     app.get('/avatar/:user?', getAvatar)
     app.put('/avatar', setAvatar)
}
