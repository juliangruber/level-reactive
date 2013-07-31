
# level-reactive

Reactive templating for data stored in a LevelDB.

## Usage

Given this data stored in a leveldb:

```json
user = juliangruber
messages!1 = oh hai
messages!2 = what's up
messages!3 = rad!
```

And this html template:

```html
<div>
  <p data-key="user"></p>
  <div data-each="messages">
    <p data-text="body"></p>
  </div>
</div>
```

Write this code to bind those two together:

```js
var levelup = require('levelup');
var leveljs = require('leveljs');

var db = levelup('my-db', { db: leveljs });
require('./reactive')(db);

function UserView (user) {
  this.user = user;
  this.el = domify('...the template...');
  reactive(this.el, user, this);

  setInterval(function () {
    db.put('user', Math.random().toString(16).slice(2));
  }, 1000);
}

var user = new UserView();
document.body.appendChild(view.el);
```

And the resulting DOM will be:

```html
<div>
  <p data-key="user">juliangruber</p>
  <div>
    <p data-text="body">oh hai</p>
    <p data-text="body">what's up</p>
    <p data-text="body">rad!</p>
  </div>
</div>
```

Update the template just by working with the database:

```js
db.put('user', 'mbalho');
db.put('messages!4', 'oh!');
```

## TODO

* Make reactive browserify compatible so it can just be required.
* Clean up templates.
* Handle delete events in live streams.
* Set up requirebin example.

## Installation

First source the standalone [reactive](https://github.com/component/reactive)
build from [https://raw.github.com/component/reactive/master/reactive.js](https://raw.github.com/component/reactive/master/reactive.js):

```js
<script src="/path/to/reactive.js"></script>
```

With [npm](https://npmjs.org) do:

```
npm install level-reactive
```

Then, bundle for the browser using
[browserify](https://github.com/substack/node-browserify).

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
