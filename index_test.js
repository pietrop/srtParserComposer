var fs = require('fs');
var srtParser  = require('./index.js').parser;
var srtComposer  = require('./index.js').composer;

console.log("************* Parser ********************\n\n\n\n")
/**
* Testing Parser
*/

var srtFile = './example/nroman_door_manual_transcription.srt'
console.log("Test parseSrtFileToJson\n")
srtParser.parseSrtFileToJson(srtFile, function(res){
  console.log(JSON.stringify(res))
});

console.log("*****************************************\n\n")
console.log("Test parseSrtFileToText\n")
srtParser.parseSrtFileToText(srtFile, function(res){
  console.log(res)
});

/**
* Testing parsing from srt string (content of the file)
*/


var srtStringContent = fs.readFileSync(srtFile).toString();

console.log("*****************************************\n\n")
console.log("Test parseSrtContentToJson\n")
srtParser.parseSrtContentToJson(srtStringContent, function(res){
  console.log(JSON.stringify(res))
});

console.log("*****************************************\n\n")
console.log("Test parseSrtContentToText")
srtParser.parseSrtContentToText(srtStringContent, function(res){
  console.log(res)
});

console.log("************* Composer ********************\n\n\n\n")
/**
* Testing Composer
*/
var srtJson = './example_output/norman_door_human_transcription.json';
var srtJsonContent = JSON.parse(fs.readFileSync(srtJson).toString());

// console.log(srtJsonContent)

console.log("Test createSrtContent")
srtComposer.createSrtContent(srtJsonContent, function(srtString){
  console.log(srtString)
})


var JsonToSrtTest = './example_output/composer_test_srt_from_json.srt';
console.log("*****************************************\n\n")
console.log("Test createSrtFile\n")
srtComposer.createSrtFile(JsonToSrtTest,srtJsonContent, function(resSrtFilePath){
  console.log(resSrtFilePath)
})
