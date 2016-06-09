var demoSrtJson = require('./example_output/norman_door_human_transcription.json')
var srtJsonToWordLineJson = require('./srtJsonToWordLinesJson.js').convertTowordsLines;


var res = srtJsonToWordLineJson(demoSrtJson)
console.log(JSON.stringify(res))
