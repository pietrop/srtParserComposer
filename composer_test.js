var fs = require('fs');
var srtJson = './example_output/norman_door_human_transcription.json';
var srtComposer = require('./composer.js');
var srtJsonContent = JSON.parse(fs.readFileSync(srtJson).toString());

// console.log(srtJsonContent)


srtComposer.createSrtContent(srtJsonContent, function(srtString){
  console.log(srtString)
})


var JsonToSrtTest = './example_output/composer_test_srt_from_json.srt';

srtComposer.createSrtFile(JsonToSrtTest,srtJsonContent, function(resSrtFilePath){
  console.log(resSrtFilePath)
})
