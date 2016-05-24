var parser = require('./index.js');
var srtFile = './example/nroman_door_manual_transcription.srt'


parser.parseSrtToJson(srtFile, function(res){
  console.log(JSON.stringify(res))
});


parser.parseSrtToText(srtFile, function(res){
  console.log(res)
});
