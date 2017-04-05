const profile = {
        username:"Dummy",
        headline: 'Default Headline',
        email: 'default@email.com',
        dob: 100,
        zipcode: 00000,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Antonin_Hudecek_14.1.1872-11.8.1941_-_Leto_-_Paseka.jpg'
    }

const userBase = [
    profile,
    {
        username: 'Jimmy',
        headline: 'Headline0',
        email: 'email@domain.com',
        dob: 101,
        zipcode: 00000,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Richmond_2015_UCI_%2821361289840%29.jpg'
    },
    {
        username: 'Timmy',
        headline: 'Headline1',
        email: 'lol@wat.com',
        dob: 200,
        zipcode: 00000,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Sternotomis_amabilis_kolbei_%2810841645574%29.jpg'
    },
    {
        username: 'Kimmy',
        headline: 'Headline2',
        email: 'kill@me.com',
        dob: 120,
        zipcode: 00000,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/be/One_of_the_many_decrepit_churches_out_here.jpg'
    }
]

const images = []

const index = (req, res) => {
     res.send("Hi.")
}

const getHeadlines = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }

    // List of requested usernames.
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    const results = []
    // Populate result array with user objects from memory.
    users.forEach(function(element) {
      const user = userBase.find(({ username }) => {
            return username === element
        })
        if(user){
            results.push( { username : user.username, headline: user.headline })  
        }
    }, this);
    console.log(results)
    res.send({ headlines: results })
}
const updateHeadline = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }

    profile.headline = req.body.headline
    res.send({ username: req.user, headline: profile.headline})
}

const getEmail = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }
    const requestedUser = req.params.user ? req.params.user : req.user
    const user = userBase.find(({ username }) => {
        return username === requestedUser
    })
    if (!user) {
        res.sendStatus(404)
        return
    }  
    res.send({ username: user.username, email: user.email })
}
const updateEmail = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.email = req.body.email
    res.send({ username: req.user, email: profile.email})
}

const getDOB = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }
    const requestedUser = req.params.user ? req.params.user : req.user
    const user = userBase.find(({ username }) => {
        return username === requestedUser
    })
    if (!user) {
        res.sendStatus(404)
        return
    }  
    res.send({ username: user.username, dob: user.dob })
}

const getZipcode = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }
    const requestedUser = req.params.user ? req.params.user : req.user
    const user = userBase.find(({ username }) => {
        return username === requestedUser
    })
    if (!user) {
        res.sendStatus(404)
        return
    }
    res.send({ username: user.username, zipcode: user.zipcode})
}
const updateZipcode = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }
    profile.zipcode = req.body.zipcode
    res.send({ username: req.user, zipcode: profile.zipcode})
}

const getAvatars = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }
     // List of requested avatars.
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    const results = []
    // Populate result array with user objects from memory.
    users.forEach(function(element) {
      const user = userBase.find(({ username }) => {
        return username === element
      })
        if(user){
            results.push( { username : user.username, avatar: user.avatar })
        }
    }, this);

    res.send({ headlines: results })
}
const updateAvatar = (req, res) => {
    console.log('Payload received:', req.body)
    if (!req.user) {
        req.user = 'Dummy'
    }
    res.send({ username: req.user, avatar: profile.avatar})
}

module.exports = (app) => {
    app.get('', index)

    app.get('/headlines/:users*?', getHeadlines)
    app.put('/headline', updateHeadline)

    app.get('/email/:user?', getEmail)
    app.put('/email', updateEmail)

    app.get('/dob', getDOB)
    
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', updateZipcode)

    app.get('/avatars/:users?*', getAvatars)
    app.put('/avatar', updateAvatar)
}