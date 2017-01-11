const http = require('http')
const fs = require('fs')
const qs = require('querystring')

exports.sendResponse = function(request,response){
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
  })
}

exports.insertData = function(req){
  var body='';
  var jsonObj = null;
  var fileObj = null;
  req.on('data', function (data) {
      body +=data;
  });
  req.on('end',function(){
      jsonObj = JSON.parse(body);
      fs.readFile("./data/file1.json", function (err, data) {
        if(err){
        }else{
          fileObj = JSON.parse(data);
          fileObj['Key'] = 'value';
        }
      });
      var stream = fs.createWriteStream("./data/file1.json");
      stream.once('open', function(fd) {
        stream.write(fileObj);
        stream.end();
      });
  });
}
