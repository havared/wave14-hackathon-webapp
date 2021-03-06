const http = require('http')
const port = 3000
const fs = require('fs')

const requestHandler = (request, response) => {
  if(request.url === "/green"){
   fs.readFile("./data/file1.json", function (err, data) {
     if(err){
       response.writeHead(404);
       response.write("Not Found!");
     }else{
       response.writeHead(200, {'Content-Type': 'application/json'});
       let jsonObj = JSON.parse(data);
       response.write(JSON.stringify(jsonObj));
     }
     response.end();
   });
  }

  else if(request.url === "/black"){
   fs.readFile("./data/file2.json", function (err, data) {
     if(err){
       response.writeHead(404);
       response.write("Not Found!");
     }else{
       response.writeHead(200, {'Content-Type': 'application/json'});
       let jsonObj = JSON.parse(data);
       response.write(JSON.stringify(jsonObj));
     }
    response.end();
   });
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
