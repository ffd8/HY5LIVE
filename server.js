let tPort = process.env.PORT || 5555
if(process.argv.slice(2).length > 0){
    tPort = process.argv.slice(2)[0]
}

var express = require('express')
, app = express()
, server = require('http').createServer(app)
, port = tPort

// handle call
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.use(express.static('./'))

const listener = server.listen(port, function() {
    console.log('HY5 is LIVE! visit » http://localhost:' + listener.address().port)
});