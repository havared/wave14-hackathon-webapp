const fs = require('fs')

module.exports.insertData = function(req,res){
  var jsonObj = req.body;
  var fileObj = null;
  var greenJsonObj = null;
  
   fs.readFile("./data/file1.json", 'utf-8',function (err, data) {
   if(err){
     res.end('Error');
   }
   else
   {
     greenJsonObj = JSON.parse(data);
     greenJsonObj['doors'][greenJsonObj['doors'].length] = jsonObj;
     fs.writeFile('./data/file1.json', JSON.stringify(greenJsonObj,null,2),'utf-8', function(error){
       if(error){
         res.end('Error');
       }
       else
       {
         res.end('File has been written');
       }
     });
   }
 });
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

module.exports.find = function(req,res){
  var allPromises = [findGreen(req.params.id), findBlack(req.params.id)];
  Promise.all(allPromises).then(function(data){
    res.json(data);
  }).catch(function(urls){
    console.log(urls)
  })
}
