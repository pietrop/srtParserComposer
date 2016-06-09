/*
* converts racctional timecodes to seconds 00:05:16,570 or 00:05:16.570.
* Decided to use seconds because that is what the HTML5 Video API uses
* http://www.w3schools.com/tags/av_prop_currenttime.asp
* these are fractional timecodes such as the once that are used in srt
* 00:05:16,570
https://developers.google.com/youtube/2.0/developers_guide_protocol_captions#Supported_Caption_File_Formats
HH:MM:SS.FS
HH – Hours (00, 01, etc.)
MM – Minutes (00-59)
SS – Seconds (00-59)
FS – Fractional seconds (.000-.999)

* used https://www.tools4noobs.com/online_tools/hh_mm_ss_to_seconds/
to doublecheck results.
However not sure about fractional seconds converison .
*/
function fractionalTimecodeToSeconds(tc){
    //parses fractional timecode  string into array from 00:05:16,570 to [ '00', '05', '16,570' ]
    var tcAr = tc.split(":")//

    var hours =   parseInt(tcAr[0]) *60*60;
    var minutes = parseInt(tcAr[1]) * 60;
    var seconds = parseInt(tcAr[2].split(",")[0]);
    //adding condition to handle factional seconds both with , or . separator from timecodes  00:05:16,570 or 00:05:16.570
    //secondsAndFractionalSeconds eg '16,570'
    var secondsAndFractionalSeconds = tcAr[2];

    if(secondsAndFractionalSeconds.includes(',')){
      var factionalSeconds = parseFloat("0."+ secondsAndFractionalSeconds.split(",")[1]);
    }else if(secondsAndFractionalSeconds.includes('.')){
      var factionalSeconds = parseFloat("0."+ secondsAndFractionalSeconds.split(".")[1]);
    }

    var tcInSeconds =  hours + minutes + seconds+ factionalSeconds;

      return tcInSeconds;
}

module.exports.fractionalTimecodeToSeconds = fractionalTimecodeToSeconds;
