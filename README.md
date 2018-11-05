# ConfusionJs 

[ConfusionjS](https://www.npmjs.com/package/confusionjs)  is a javascript obfuscation middleware library for nodejs.

In order to use confusionjs into your nodejs express app, install the module into project like so:

Install using npm:
```shell
$ npm install --save confusionjs
```

Install using Yarn:
```shell
$ yarn add confusionjs
```

## Usage


In Node.js Express App:
```js
// Load express
const express = require("express");
// Load Confusionjs
const confuse = require('confusionjs');

const app = express();

let options = {
    root:"./static",
    store:"confused"
    cache:true,
    debug:true,
};

app.use(confuse(options));


```

**Note:**<br>
Install [ConfusionJs](https://www.npmjs.com/package/n_) for use in the Node.js > 8

## Why ConfisionJs?

JavaScript code running in the browser is visible to anybody who wishes to see it. This can sometimes pause a security threat to your application as people with malicious intent can steal or compromise your source code.<br>
ConfusionJs limits those threats by obfuscating the javascript code so that it becomes difficult to read or decipher.
consider the following script as example:

```js
(function(){
    alert("confuse the enemy!");
})();


```
In a normal setup, the code will just be delivered as is and anybody will be able to see the code.</br>
However, Confusionjs takes the raw code and obfuscates it into a more hard  to read and decipher syntax such as the one below:

```js
var _0x4f62 = [
    'FhxUT',
    'btlxw'
];
(function (_0x30ac87, _0x346513) {
    var _0x2f9996 = function (_0x360049) {
        while (--_0x360049) {
            _0x30ac87['push'](_0x30ac87['shift']());
        }
    };
    _0x2f9996(++_0x346513);
}(_0x4f62, 0x18f));
var _0x11b1 = function (_0x11e762, _0x3fac47) {
    _0x11e762 = _0x11e762 - 0x0;
    var _0x58af7a = _0x4f62[_0x11e762];
    return _0x58af7a;
};
(function () {
    var _0x178c8d = {
        'btlxw': function (_0x110a9e, _0x35231c) {
            return _0x110a9e(_0x35231c);
        },
        'FhxUT': 'hit'
    };
    _0x178c8d[_0x11b1('0x0')](alert, _0x178c8d[_0x11b1('0x1')]);
}());


```
## options
The following options are currently accepted when instantiating confusionjs:

 * root : A string. this represents the root of your static or public folder e.g "./static" or "./public"
 
 * store: A string. a folder where to store the obfuscated  javascript files
 
 * cache: A boolean. determines wether or not confusionjs should create a new confused file everytime a js file is requested
 
 * debug: A boolean. wether to log to console any debug information e.g when a  file is cahed or served from cache


## Author

The Author of this library is [Lee M. Lwando](https://github.com/leemlwando) </br>
Other Social Links:
[Twitter](https://twitter.com/leemlwando)</br>
[Facebook](https://www.facebook.com/leem.lwando)</br>
[Email](leemlwando@gmail.com)</br>
[Mobile](+260950482560)</br>

## Contribution
Feel free to create Pull Requests -  :smile:


## License

 Copyright (c) 2018 Lee M. Lwando;
 Copyright (c) 2018 MicroTech Cloud Solutions;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


