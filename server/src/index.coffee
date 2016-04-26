express = require('express')
cors = require('cors')
mailer = require('./mailer/index')

app = express()
port = process.env['PORT'] or 3000

app.use cors()
app.use '/mailer/', mailer

app.listen port, () ->
    console.log "Listening to port #{port}"