var live = require('level-live-stream');
var through = require('through');

module.exports = function (db) {
  if (typeof reactive == 'undefined')
    throw new Error('requires component/reactive standalone build');

  reactive.bind('db-key', function (el, name) {
    live(db, { start: name, end: name, keys: false })
      .pipe(through(function (value) {
        if (value.type == 'put') value = value.value;
        el.innerHTML = '';
        el.appendChild(document.createTextNode(value));
      }));
  });

  reactive.bind('db-each', function (el, group) {
    el.removeAttribute('db-each');
    var container = el.parentNode;
    container.removeChild(el);

    live(db, { start: group + '!', end: group + '!~', keys: false })
      .pipe(through(function (value) {
        if (value.type == 'put') value = value.value;
        var clone = el.cloneNode(true);
        reactive(clone, value);
        container.appendChild(clone);
      }));
  });
}

