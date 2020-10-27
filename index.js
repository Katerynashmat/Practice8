const fs = require('fs')
const path = require('path')
const port = process.env.PORT || 3000

var express = require("express");
var app = express();
const bodyParser = require('body-parser')
app.use(express.static('public'));
const db = require('./queries');

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

app.get('/users', db.getTable)
app.get('/users/:id', db.getStudentById)

app.get('*', (request, response) => {
  console.log(request.path);
  let filePath = path.join(__dirname, 'front-end', request.url === '/' ? 'practice3.html' : request.url)
  const ext = path.extname(filePath);
  let contentType = 'text/html'

  switch(ext){
    case '.css': 
      contentType = 'text/css'
      break;
    case '.js':
      contentType = 'text/javascript'
      break;
    default:
      contentType = 'text/html'
  }

  if(!ext){
    filePath += '.html';
  }
  fs.readFile(filePath, (err, data) =>{
    if(err){
      throw err;
    }

    response.header({"Content-Type": contentType});
    response.end(data);
  })
});

var server = app.listen(port, function () {
  console.log("Server started at port:  ", port);
});