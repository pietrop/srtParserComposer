/**
* srt Composer module takes in a json describing srt lines.
* and generates an srt file string or srt file.
*/

var fs = require('fs');


function createSrtContent(srtJsonContent, cb){
  var lines = "";
  for(var i=0; i< srtJsonContent.length; i++){
    srtLineO = srtJsonContent[i];
    lines+=srtLineO.id+"\n";
    lines+=srtLineO.startTime+" --> "+srtLineO.endTime+"\n";
    lines+=srtLineO.text+"\n";
  }

  if(cb){cb(lines)}
}
/**
* takes in file path/name of srt file (needs srt extension in the name)
* cotent as a json
* optional callback that returns destination file path/name of srt once it has been written to disk
*/
function createSrtFile(fileNamePath, srtJsonContent, cb){
  //converting json to string - srt
  createSrtContent(srtJsonContent, function(srtString){
    //writign file
     fs.writeFileSync(fileNamePath,srtString);
     //callback when done with name of file
     if(cb){cb(fileNamePath)};

  });
}


module.exports.createSrtContent = createSrtContent;

module.exports.createSrtFile = createSrtFile;
