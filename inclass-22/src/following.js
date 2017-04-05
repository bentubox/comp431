const profile = { 
            username: 'Dummy',
            following: [
               'Jimmy',
               'Timmy',
               'Kimmy'
            ]
        }

const following = [ 
    profile,
    { 
        username: 'Jimmy',
        following: [
            'Dummy',
            'Timmy',
            'Kimmy'
        ]
    },
    { 
        username: 'Timmy',
        following: [
            'Kimmy'
        ]
    },
    { 
        username: 'Kimmy',
        following: [
            'Jimmy',
            'Timmy'
        ]
    }
]

const getFollowing = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    if (!req.user) {
        req.user = 'Dummy'
    }

    const requestedUser = req.params.user ? req.params.user : req.user
    const user = following.find(({ username }) => {
        return username === requestedUser
    })
    
    if (!user){
        res.sendStatus(404)
        return
    }

    res.send({ username: user.username, following: user.following })
}

const addFollowing = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    profile.following.push(req.params.user)
    res.send({ username: profile.username, following: profile.following })
}

const removeFollowing = (req, res) => {
    console.log('Payload received:', req.body)
    console.log('Parameters received:', req.params)
    profile.following = profile.following.filter((element) => {
        return element !== req.params.user
    })
    res.send({ username: profile.username, following: profile.following })
}

module.exports = (app) => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', addFollowing)
    app.delete('/following/:user', removeFollowing)
}