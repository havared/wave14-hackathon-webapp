const fs = require('fs')

exports.insertData = function(req,res){
  var jsonObj = req.body;
  var fileObj = null;
  let data = fs.readFileSync("./data/file1.json").toString();
  fileJsonObj = JSON.parse(data);
  for(let each in jsonObj){
    fileJsonObj['doors'][0][each] = jsonObj[each];
  }
  fs.writeFile('./data/file1.json', JSON.stringify(fileJsonObj,null,2),'utf-8');
  res.end('done');
}

findGreen = function(id){
  return new Promise(function(resolve, reject){
    fs.readFile('./data/file1.json', 'utf8', function (err, data) {
      if (err) reject('nothing');
      var jsonData = JSON.parse(data);
      jsonData = jsonData['doors'];
      for (var i = 0; i < jsonData.length; ++i) {
        if(jsonData[i].id == id){
          resolve(jsonData[i]);
        }
      }
      resolve(null);
    });
  })
}

findBlack = function(id){
  return new Promise(function(resolve, reject){
    fs.readFile('./data/file2.json', 'utf8', function (err, data) {
      if (err) reject('nothing');
      var jsonData = JSON.parse(data);
      jsonData = jsonData['doors'];
      for (var i = 0; i < jsonData.length; ++i) {
        if(jsonData[i].id == id){
          resolve(jsonData[i]);
        }
      }
      resolve(null);
    });
  })
}

exports.find = function(req,res){
  var allPromises = [findGreen(req.params.id), findBlack(req.params.id)];
  Promise.all(allPromises).then(function(data){
    res.json(data);
  }).catch(function(urls){
    console.log(urls)
  })
}
