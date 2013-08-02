var reactive = require('..');
var domify = require('domify');
var ready = require('domready');
var fs = require('fs');
var levelup = require('levelup');
var memdown = function (l) { return new (require('memdown'))(l) };
var tmpl = fs.readFileSync(__dirname + '/template.html');

var db = levelup('db', { db: memdown });
window.db = db;

function UserView (user) {
  this.user = user;
  this.el = domify(tmpl);
  reactive(db, this.el, user, this);

  var i = 0;
  (function write () {
    db.put('user', Math.random().toString(16).slice(2));
    db.put('messages!' + i++, { body: (new Date).toString() });
    setTimeout(write, 1000);
  })();
}

var view = new UserView({});
ready(function () {
  document.body.appendChild(view.el);
});
