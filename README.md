# level-reactive

Reactive templating for data stored in a LevelDB.

**If you primarily display lists of data stored in LevelDBs,
[level-list](https://github.com/juliangruber/level-list) is a way nicer abstraction
and has [builtin support](https://github.com/juliangruber/level-list/blob/master/example/reactive.js)
for reactive templates.**

## Usage

Given this data stored in a leveldb:

```
user = juliangruber
messages!1 = oh hai
messages!2 = what's up
messages!3 = rad!
```

And this html template:

```html
<div>
  <p db-key="user"></p>
  <div db-each="messages">
    <p data-text="body"></p>
  </div>
</div>
```

Tie them together by calling `reactive` on your db, template and view object.

```js
var reactive = require('level-reactive');
var domify = require('domify');
var MemDB = require('memdb');
var tmpl = '<div>\n<p db-key=...';

var db = MemDB();

function UserView (user) {
  this.user = user;
  this.el = domify(tmpl);
  reactive(db, this.el, user, this);
}

var view = new UserView({});
document.body.appendChild(view.el);
```

And the resulting DOM will be:

```html
<div>
  <p db-key="user">juliangruber</p>
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

## API

### reactive(db, el, obj[, options])

Except for the first argument the same as
[component/reactive](https://github.com/component/reactive).

This will install
[level-live-stream](https://github.com/dominictarr/level-live-stream) on the
`source`, if you didn't already do that.

## TODO

* Clean up templates.
* Handle delete events in live streams.

## Installation

With [npm](https://npmjs.org) do:

```
npm install level-reactive
```

Then bundle for the browser with
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
