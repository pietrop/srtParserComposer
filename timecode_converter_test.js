var tc_converter = require('./timecode_converter.js');

var a = tc_converter.fractionalTimecodeToSeconds("00:05:16,570")
var b = tc_converter.fractionalTimecodeToSeconds("00:05:16.570")
var c = tc_converter.fractionalTimecodeToSeconds("02:00:16,570")
console.log(a)
console.log(b)
console.log(c)
