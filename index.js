const port = process.env.PORT || 3000

var express = require("express");
var app = express();
app.use(express.static('public'));
const db = require('./queries')

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', db.getTable)

var server = app.listen(port, function(){
    //var port = server.address().port;
    console.log("Server started at http://localhost:", port);
});