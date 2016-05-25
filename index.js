var parser = require('./parser.js');
var composer = require('./composer.js');

var csvComposer = require('./csv_composer.js');

function srtToCsv(srtFile, newCsvFile, cb){
  parser.parseSrtFileToJson(srtFile, function(srtJson){
    // console.log(JSON.stringify(srtJson))
    csvComposer.toCsvFile(newCsvFile, srtJson, function(res){
      console.log(res)
    })
  });
}


module.exports.parser =  parser;

module.exports.composer =  composer;

module.exports.srtToCsv = srtToCsv;
