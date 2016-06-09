# srt parser and composer
A couple of modules to parse and generate srt files. No external dependencies needed.

  - an srt file or srt string (content of an srt file) to json
  - an srt file or srt string to plain text
  - an srt file or srt string to json with lines and word level timings
  - create srt file from json
  - parse an srt file into a csv file.

## Usage

Install `npm install srt_parser_composer`

require

```javascript
var srtParser  = require('srt_parser_composer').parser;
var srtComposer  = require('srt_parser_composer').composer;
var srtToCsv  = require('srt_parser_composer').srtToCsv;
```

or

```javascript
var srt  = require('srt_parser_composer');
```

## Parser
Give an `srt` file it returns json or a plain text of all the lines.

### Srt file
See exampel in [`nroman_door_manual_transcription.srt`](./example/nroman_door_manual_transcription.srt)

```srt
1
00:00:00,160 --> 00:00:04,890
There’s this door on the 10th floor I just
hate so much.

2
00:00:04,890 --> 00:00:05,798
Goddammit!

3
00:00:05,799 --> 00:00:11,629
Do you ever get this door wrong? “pretty
regularly.”

4
00:00:11,629 --> 00:00:12,000
How often? “like 30% of the time.”
```

### Srt lines vs file lines
In the code comments I refer both to srt lines and file lines, so I thought I'd clarify.

#### Srt flines
```
1
00:00:00,160 --> 00:00:04,890
There’s this door on the 10th floor I just
hate so much.
```

#### File lines
While in terms of file lines the following are all considered individual lines.
```
1
```

```
00:00:00,160 --> 00:00:04,890
```

```
There’s this door on the 10th floor I just
```

```
hate so much.
```

### The srt parser has four possible outputs - srt parser
The parser has 6 main functions,

they both take in an srt file (file path/name) as input `parseSrtFileToJson` returns a json and `parseSrtFileToText` returns plain text without timecodes.

You can also parse the content of an srt file, what I refer to as an `srt string` directly to plain text or json using using `parseSrtContentToJson` and `parseSrtContentToText`


### `parseSrtFileToJson`
`parseSrtFileToJson` returns a json like the one below.

and can be used as follows.

```javascript
//var parser = require("srt_parser_composer");
var srtParser  = require('srt_parser_composer').parser;
var srtFile = './example/nroman_door_manual_transcription.srt'

srtParser.parseSrtFileToJson(srtFile, function(res){
  console.log(JSON.stringify(res))
});
```


##### Example json output

[`example_output/norman_door_human_transcription.json`](./example_output/norman_door_human_transcription.json)

```json
  {
    "id": "1",
    "startTime": "00:00:00,160",
    "endTime": "00:00:04,890",
    "text": "There’s this door on the 10th floor I just\nhate so much.\n"
  },
  {
    "id": "3",
    "startTime": "00:00:05,799",
    "endTime": "00:00:11,629",
    "text": "Goddammit!\nDo you ever get this door wrong? “pretty\n"
  },
  {
    "text": "regularly.”\nHow often? “like 30% of the time.”\n",
    "id": "4",
    "startTime": "00:00:11,629",
    "endTime": "00:00:12,000"
  },
  {
    "id": "6",
    "startTime": "00:00:14,290",
    "endTime": "00:00:16,869",
    "text": "Have you seen people misuse it?\nAll the time. Every day. Constantly.\n"
  },
  {
    "id": "8",
    "startTime": "00:00:17,500",
    "endTime": "00:00:18,350",
    "text": "I hate this door.\nMe too Kelsey.\n"
  },
...
]
```

#### srt to word accurate time

With [a bit of math](./srtJsonToWordLinesJson.js) the [parser](./parser/js) can also change the granualrity of the timecodes from srt line levels to word level accuracy.

The timecodes are converted from fractional seconds of srt `HH:MM:SS,ms` (eg `00:00:17,500`) to seconds.

Seconds have been chose because that's what's supported by the HTML5 Video API for attribute such as [`video.currentTime`](http://www.w3schools.com/tags/av_prop_currenttime.asp).

The lines of the srt are preserved in the new data structure by generating an array of arrays containing words objects.

such as the following

#### Example output

Output looks something like this

```json
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

See [`./example_outputsrtJsonToWordLineJson_sample.json`](./example_outputsrtJsonToWordLineJson_sample.json) for example file.

### `parseSrtFileToJsonWordsLines`

```javascript
var parser = require('./parser.js');

var srtFile = './example/nroman_door_manual_transcription.srt'
srtParser.parseSrtFileToJsonWordsLines(srtFile, function(res){
  console.log(res)
});
```


### `parseSrtContentToJsonWordsLines`

```javascript
var parser = require('./parser.js');
//second use case
var srtStringContent = fs.readFileSync(srtFile).toString();

srtParser.parseSrtContentToJsonWordsLines(srtStringContent, function(res){
  console.log(res)
});
```


### `parseSrtFileToText`

while `parseSrtFileToText` returns a plain text like the one below and can be used like so.

```javascript
var fs = require('fs');
var srtParser  = require('srt_parser_composer').parser;
var srtFile = './example/nroman_door_manual_transcription.srt'

srtParser.parseSrtFileToText(srtFile, function(res){
  console.log(res)
});
```

#### Plain text output Example

```
There’s this door on the 10th floor I just
hate so much.
Goddammit!
Do you ever get this door wrong? “pretty
regularly.”
How often? “like 30% of the time.”
Have you seen people misuse it?
All the time. Every day. Constantly.
I hate this door.
Me too Kelsey.
```


### working with srt string
I was had a use case of a speech to text API that returned an srt file. but rather then returning the file, It was returning a string with the content of the srt file.

So for flexibility, you can also parse the content of an srt file, what I refer to as an `srt string` directly to plain text or json using.

`parseSrtContentToJson` and `parseSrtContentToText`.

And they give the same output as their file opening counterpart described above.
Only difference they take in the content of the srt as a string rather then file path/name of the srt file.

### Examples
You can find an example `srt` in the example folder. And some example of the output int he `example_output` folder.

you can run following command in terminal to try the example

```bash
node parser_test.js
```


## Composer
Give an `srt json` it returns an srt file either as a string content of the srt or as a path to where the srt file as been written to disk.

For example of `srt json` specs see [`example_output/norman_door_human_transcription.json`](./example_output/norman_door_human_transcription.json)

### Usage

```javascript
var fs = require('fs');
var srtComposer  = require('srt_parser_composer').composer;

var srtJson = './example_output/norman_door_human_transcription.json';
var srtJsonContent = JSON.parse(fs.readFileSync(srtJson).toString());

//creating srt string from json
srtComposer.createSrtContent(srtJsonContent, function(srtString){
  console.log(srtString)
})

//creating srt file from json
var JsonToSrtTest = './example_output/composer_test_srt_from_json.srt';

srtComposer.createSrtFile(JsonToSrtTest,srtJsonContent, function(resSrtFilePath){
  console.log(resSrtFilePath)
})
```




## Srt file to CSV
Sometimes you want to share an srt and get some feedback on it.
A google spreadsheet is generally the most effective. With this module you can convert your srt to a csv file, so that it can be uploaded to google spreadsheet, or some other use case.

[./example_output/demo_test.csv](./example_output/demo_test.csv)

| n  | In | Out | Text |
| ------------- | ------------- | ------------- | ------------- |
| 1  | 00:00:00,160  | 00:00:04,890   |There’s this door on the 10th floor I just hate so much.   |   
| 2  | 00:00:04,890  | 00:00:05,798   |Goddammit!                                                 |   
| 3  |  00:00:05,799 | 00:00:11,629   |Do you ever get this door wrong? “pretty regularly.”       |   
| 4  | 00:00:11,629  | 00:00:12,000   |How often? “like 30% of the time.”                         |    

### Usage
Takes in file path/name of the srt file, the desired name/path for the csv file, and the callback returns the csv file name you specified once it's done writing to disk.

```javascript
var srtToCsv  = require('srt_parser_composer').srtToCsv;

var demoCsvFile = './example_output/demo_test.csv'

srtToCsv(srtFile, demoCsvFile, function(resCsvPathFileName){
  console.log(resCsvPathFileName);
})
```

## Examples
You can run the example with

```bash
node index_test.js
```


<!--  
## CSV to srt
I haven't implemented this as there is an issue with the parsing of the csv and the comma present in the timecodes.
could use an external library,but wanted to keep these modules dependency free for now, to make them more stable on the long run.
Also don't have a use case for it where you'd need to go from a csv to an srt right now.
-->


<!--
## code overview

The script has a main function `parseSrtContent` that takes in an srt file and returns a json like the one seen above to the callback.

`parseSrtToText` uses `parseSrtToText` to iterate over the "srt json" and return the text as a string.

 `parseSrtContent` opens up the file.
 splits it into an array of file lines.
  defines the components of the srt line as regex variables (line counter, timecodes, text).

  then iterates over the file lines array

  and for each line checks agains the srt components regex previously defined

  if it matches then creates a srt line object where it saves the attribute.

  The tricky part is how to save the second file line of the text without overwritightin the text. so the workaround is that because we know there can be at most two lines but there were never be more then two. it checks if that `.text` attribute already exists, and if it does it means we are on the second line and it appends the text of the second line.
  if it doesn't then we are on the first line and it can be created.
  line breaks`"\n"` are added to preserve initial srt internal line division/carriage return for srt lines

then reached the second line it adds it to the array of srt lines objects results.

And when the loop is finished this is returned to the callback.
  -->


<!-- ## TODO
- [ ] refactor with overloading so that srt can be either a string or a file path.  
- [ ] srt word level with lines to srt json, and to srt file-->
