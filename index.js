const port = process.env.PORT || 3000

var express = require("express");
var app = express();
const bodyParser = require('body-parser')
app.use(express.static('public'));
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use(allowCrossDomain);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', db.getTable)
app.get('/users/:id', db.getStudentById)

var server = app.listen(port, function () {
  //var port = server.address().port;
  console.log("Server started at http://localhost:", port);
});