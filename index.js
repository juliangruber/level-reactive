var liveStream = require('level-live-stream');
var through = require('through');
var reactive = require('reactive-component');

module.exports = function (db, el, obj, options) {
  if (!db.createLiveStream) liveStream.install(db);

  var cache = {};

  reactive.subscribe(function (obj, prop, fn) {
    var key = obj.key || prop;
    if (cache[key]) return cache[key].stream.on('data', fn);

    cache[key] = {};
    cache[key].stream =
      db.createLiveStream({ start: key, end: key })
        .on('data', function (obj) {
          cache[key].value = obj.value;
          fn();
        });
  });

  reactive.get(function (obj, prop) {
    var cached = cache[obj.key || prop]
    if (!cached) return '';
    var value = cached.value;
    return value[prop]
      ? value[prop]
      : value;
  });

  var view = reactive(el, obj, options);

  view.bind('db-each', function (el, group) {
    el.removeAttribute('db-each');
    var container = el.parentNode;
    container.removeChild(el);

    db.createLiveStream({ start: group + '!', end: group + '!~' })
      .pipe(through(function (obj) {
        var clone = el.cloneNode(true);
        reactive(clone, obj);
        container.appendChild(clone);
      }));
  });

  return view;
}

