var fs = require('fs')
var csvComposer = require('./csv_composer.js');

var srtJson = './example_output/norman_door_human_transcription.json';
var srtJsonContentDemo = JSON.parse(fs.readFileSync(srtJson).toString());
var demoCsvDestName  = './example_output/demo_norman_csv.csv';

csvComposer.toCsvContent(srtJsonContentDemo, function(res){
  console.log(res)
})


csvComposer.toCsvFile(demoCsvDestName, srtJsonContentDemo, function(res){
  console.log(res)
})
