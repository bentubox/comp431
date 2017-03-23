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
    const id = parseInt(req.params.id.substr(1))
    if(isNaN(id)){
        res.send(articleBank)
    } else if (id < articleID){
        res.send([articleBank.articles[id]])
    } else{
        res.send({})
    }
}

module.exports = (app) => {
	app.get('/articles/:id', getArticles)
    app.post('/article', postArticle)
}