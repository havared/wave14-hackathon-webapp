const http = require('http')
const port = 3000
const fs = require('fs')
const bodyParser = require('body-parser');
let green = require('./api/green.js');
let black = require('./api/black.js');


const requestHandler = (request, response) => {
  if(request.url === "/green"){
    green.sendResponse(request,response);
  }

  else if(request.url === "/black"){
    black.sendResponse(request,response);
  }
  else if(request.url === "/add" && request.method === "POST"){
    green.insertData(request);
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("Success" + '\n');
    response.end();
  }
  else{
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write("nothing as such" + '\n');
    response.end();
  }
}

const server = http.createServer(requestHandler)
server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
