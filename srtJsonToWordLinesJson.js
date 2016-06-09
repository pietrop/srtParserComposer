/*
* Module to convert srtJson to nested array of line word objects.
Line to word timecode accuracty.
Original code modified from Popcorn srt parser.
https://github.com/mozilla/popcorn-js/blob/master/parsers/parserSRT/popcorn.parserSRT.js


output looks something like this see example_output folder for `srtJsonToWordLineJson_sample.json` example file.
```
[
  [
    {
      "start": 4.89,
      "end": 1.88,
      "text": "There’s"
    },
    {
      "start": 4.46,
      "end": 2.74,
      "text": "this"
    },
    {
      "start": 4.029999999999999,
      "end": 2.3099999999999996,
      "text": "door"
    },
    ....
  ]
  ...
]
```
*/

var demoSrtJson = require('./example_output/norman_door_human_transcription.json')
var tc_converter = require('./timecode_converter.js');

/**
* takes in a srtJson and converts it into an array of lines containing word objects with
* word level timing.
*/
function convertTowordsLines(srtJson){
  // console.log(srtJson)
var resultLines = [];
  for(var i=0; i<srtJson.length ; i++){
    var line = [];
    var srtJsonLine = srtJson[i];

    // console.log("-----")
    // console.log(srtJsonLine)
    var arOfWords= convertOneSrtLine(srtJsonLine)//cb
    // line = ;
    resultLines.push(arOfWords);
  }
  return resultLines;
}

/*
* Converts one srtJson line into array of words with accourate time attributes.
*/
function convertOneSrtLine(srtLine){//cb
  var resultWords = [];
  // console.log(srtLine)
  //WORDS
  //array of words in a line
  //TODO: add more separators for splitting text on end of words?
  // var separators = [' ', '\n'];
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
  // var words = srtLine.text.split(new RegExp(separators.join('|'), 'g'));
  var words = srtLine.text.split(" ");
  var numberOfWordsInALine = words.length;
  var numberOfLettersInALine = 0;
  //to calculate numberOfLettersInALine iterate over array of words and add up lenght of each.
  for (var j=0; j< words.length; j++){
    var oneWord = words[j];
    var numberOfLettersInOneWord =oneWord.length;
    numberOfLettersInALine +=numberOfLettersInOneWord;
  }
  // console.log(numberOfLettersInALine)

  //line duration in seconds
  var lineStartTime =  tc_converter.fractionalTimecodeToSeconds(srtLine.endTime);
  var lineEdnTime = tc_converter.fractionalTimecodeToSeconds(srtLine.startTime)
  var lineDuration = lineEdnTime - lineStartTime ;
  //Define Word level granualrity
  var averageWordDuration = lineDuration / numberOfWordsInALine;
  //word counter resets for every new line
  var wordCounter = 0;
  for(var k = 0; k< words.length; k++){
    var word = words[k];
    var wordDuration = word.length * averageWordDuration;
    var wordStartTime = lineStartTime + wordCounter * averageWordDuration;
    var wordEndTime = wordStartTime + wordDuration;
    var correspondingWord = words[wordCounter];

    //
    var wordO = createWord(wordStartTime, wordEndTime, correspondingWord)
    // console.log(wordO)
    resultWords.push(wordO)
    wordCounter+=1;
  }
  return resultWords
  // console.log(result)
}


/**
* Helper function
*/
function createWord(start, end, text){
  word = {};
  word.start = start;
  word.end = end;
  word.text = text;
  return word;
}


module.exports.convertTowordsLines =  convertTowordsLines;
