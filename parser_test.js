var fs = require('fs');
var parser = require('./parser.js');
var srtFile = './example/nroman_door_manual_transcription.srt'


/**
* Testing parsing from file
*/

parser.parseSrtFileToJson(srtFile, function(res){
  console.log(JSON.stringify(res))
});


parser.parseSrtFileToText(srtFile, function(res){
  console.log(res)
});

/**
* Testing parsing from srt string (content of the file)
*/

var srtStringContent = fs.readFileSync(srtFile).toString();

parser.parseSrtContentToJson(srtStringContent, function(res){
  console.log(JSON.stringify(res))
});


parser.parseSrtContentToText(srtStringContent, function(res){
  console.log(res)
});


parser.parseSrtContentToJsonWordsLines(srtStringContent, function(res){
  console.log(res)
});

parser.parseSrtFileToJsonWordsLines(srtFile, function(res){
  console.log(res)
});
