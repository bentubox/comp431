const express = require('express')
const bodyParser = require('body-parser')

var articleID = 2
const articleBank = {
        "articles": [
            { "id": 0, "author": "Ben", "text": 'lol here is some text' },
            { "id": 1, "author": "Ben", "text": 'another article' },
            { "id": 2, "author": "Ben", "text": 'what am i doing' } 
        ]
    }

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
    //  const objectBody = JSON.parse(req.body)
     const newArticle = { "id": ++articleID, "text": req.body.text}
     res.send(newArticle)
     articleBank.articles.push(newArticle)
}

const getArticles = (req, res) => {
    res.send(articleBank)
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.get('/articles', getArticles)
app.post('/article', addArticle)
app.get('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})