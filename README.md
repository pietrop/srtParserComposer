# srt parser
A quick scrip to convert srt into plain text.
Give an `srt` file it returns json or a plain text of all the lines.
No external dependencies needed.


## Srt file
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

## Srt lines vs file lines
In the comments I refer both to srt lines and file lines, so I thought I'd clarify.

### Srt flines
```
1
00:00:00,160 --> 00:00:04,890
There’s this door on the 10th floor I just
hate so much.
```

### File lines
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

## 4 outputs - srt parser
This module has 4 functions, they both take in an srt file as input.
`parseSrtFileToJson` and `parseSrtFileToText`.

## `parseSrtFileToJson`
`parseSrtFileToJson` returns a json like the one below.

and can be used as follows.

```javascript
//var parser = require("./index.js");
//var srtFile = "./example/nroman_door_manual_transcription.srt"//a path to some srt file you want to open

parseSrt(srtFile, function(res){
   console.log(JSON.stringify(res))
 });
```


#### Example json output example

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

## `parseSrtFileToText`

while `parseSrtFileToText` returns a plain text like the one below and can be used like so.

```javascript
//var parser = require("./index.js");
//var srtFile = "./example/nroman_door_manual_transcription.srt"

parseSrtToText(srtFile, function(res){
   console.log(res)
 });
```

### Plain text output Example

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


## working with srt string
I was had a use case of a speech to text API that returned an srt file. but rather then returning the file, It was returning a string with the content of the srt file.

So for flexibility, you can also parse the content of an srt file, what I refer to as an `srt string` directly to play text or json using.

`parseSrtContentToJson` and `parseSrtContentToText`.

And they give the same output as their file opening counterpart described above.
Only difference they take in the content of the srt as a string rather then file path/name of the srt file.

## Examples
You can find an example `srt` in the example folder. And some example of the output int he `example_output` folder.

you can run following command in terminal to try the example

```bash
node index_test.js
```

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
