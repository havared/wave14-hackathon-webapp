const http = require('http')
const fs = require('fs')

exports.sendResponse = function(request,response){
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
  })
}
