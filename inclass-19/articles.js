var articleID = 2
const articleBank = {
        "articles": [
            { "id": 0, "author": "Ben", "text": 'lol here is some text' },
            { "id": 1, "author": "Ben", "text": 'another article' },
            { "id": 2, "author": "Ben", "text": 'what am i doing' } 
        ]
    }

const postArticle = (req, res) => {
     console.log('Payload received:', req.body)
    //  const objectBody = JSON.parse(req.body)
     const newArticle = { "id": ++articleID, "text": req.body.text}
     res.send(newArticle)
     articleBank.articles.push(newArticle)
}

const getArticles = (req, res) => {
    const _id = parseInt(req.params.id)
    if(isNaN(_id)){
        res.send(articleBank)
    } else {
        const _articles = articleBank.articles.filter(({id}) => { return id === _id })
        if (_articles.length > 0){
            res.send(_articles[0])
        } else{
            res.send({})
        }
    }
}

const hello = (req, res) => {
    res.send({ "message": "Hi there."})
}

const stub = (req, res) => {
    res.send({ "message": "Not implemented." })
}

module.exports = (app) => {
	app.get('', hello)
    app.get('/articles/:id?', getArticles)
    app.post('/article', postArticle)
    app.get('/headlines/:id?', stub)
    app.put('/headline', stub)
    app.get('/email/:id?', stub)
    app.put('/email', stub)
    app.get('/zipcode/:id?', stub)
    app.put('/zipcode', stub)
    app.get('/avatars/:id?', stub)
    app.put('/avatar', stub)
}