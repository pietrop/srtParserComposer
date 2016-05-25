
/*
*  Srt JSON to CSV content or csv file.
*
*/
var fs = require('fs')

/*
* Takes in file path/name, srt json
* optional callback, that returns content of a csv file
*/
function createCsvContent(srtJsonContent, cb){
  var lines = "N, In, Out, Text\n";
  for(var i=0; i< srtJsonContent.length; i++){
    srtLineO = srtJsonContent[i];
    lines+=srtLineO.id+",";
    //need to surround timecodes with "\"" escaped " to escape the , for the milliseconds
    lines+="\""+srtLineO.startTime+"\""+","+"\""+srtLineO.endTime+"\""+",";
    // removing line breaks and and removing " as they disrup csv.
    //wrapping text in escaped " to  escape any , for the csv.
    // adding carriage return \n to signal end of line in csv
    //TODO: could not find a way to preserve line break within srt lines to allow round trip from csv back to srt file in same format.
    lines+="\""+srtLineO.text.split("\n").join(" ").split("\"").join("")+"\""+"\n";
  }

  if(cb){cb(lines)}
}

/*
* Takes in file path/name, srt json
* optional callback, that returns name/destination of csv
*/
function createCsvFile(newfile, srtJsonContent, cb){
    createCsvContent(srtJsonContent, function(csvContent){
      fs.writeFileSync(newfile,csvContent);
       if(cb){cb(newfile)};
    })

}

//TESTS

module.exports.toCsvContent = createCsvContent;

module.exports.toCsvFile =createCsvFile
