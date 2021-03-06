const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     if (req.method == "GET"){
        if (req.url == "/articles"){
            // GET articles
            const payload = { articles: [ 
                { id:1, author: "Scott", body: "A post" },
                { id:2, author: "Ben", body: "kill me" },
                { id:3, author: "Ben", body: "please" }
            ]}
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(payload))
        } else if (req.url == "/"){
            // GET
            const payload = { 'hello': 'world' }
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.end(JSON.stringify(payload))
        }
     } else if(req.method == "POST"){
        if (req.url == "/login"){
            // POST login
            if(req.payload !== 'undefined' && req.headers['content-type'] == "application/json"){
                const objectBody = JSON.parse(req.body)
                const payload = { username: objectBody.username, result: "Success!" }
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
            }
        } else if (req.url == "/logout") {
            // POST logout
            const payload = "Ok"
            res.setHeader('Content-Type', 'text/html')
            res.statusCode = 200
            res.end(JSON.stringify(payload))
        }
     } else{
        const payload = "Bad Request!"
        res.setHeader('Content-Type', 'text/html')
        res.statusCode = 400
        res.end(JSON.stringify(payload))
     }
    
}