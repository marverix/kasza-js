/* Kasza.js v1.0.2 | (c) Marek Sierociński and other contributors | https://github.com/marverix/i18njs/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['kasza-js'] = factory());
}(this, (function () { 'use strict';

  var Kasza;

  Kasza = {
    _storage: {},
    _ttlTimers: {},
    _config: {
      debug: false,
      inNode: false
    },
    config: null,
    setup: function(config) {
      this.config = Object.assign({}, this._config, config);
      return this.config.inNode = (typeof module !== "undefined" && module !== null ? module.exports : void 0) != null;
    },
    _debug: function(msg) {
      if (!this.config.debug) {
        return;
      }
      if (typeof this.config.debug === 'function') {
        return this.config.debug(msg);
      } else {
        msg = '💾 Cache Service: ' + msg;
        if (this.config.inNode) {
          return console.log("\x1b[36m" + msg + "\x1b[0m");
        } else {
          return console.log("%c " + msg, 'color: #87b5c4;');
        }
      }
    },
    set: function(id, value, ttl) {
      if (this.isStored(id)) {
        this._debug("Updating " + id);
      } else {
        this._debug("Setting " + id);
      }
      this._storage[id] = value;
      if ((ttl != null) && ttl > 0) {
        this._setTTL(id, ttl);
      }
    },
    get: function(id) {
      return this._storage[id];
    },
    remove: function(id) {
      this._debug("Removing " + id);
      return delete this._storage[id];
    },
    isStored: function(id) {
      return this._storage[id] != null;
    },
    _setTTL: function(id, ttl) {
      this._debug("Setting TTL of " + id + " to " + ttl);
      if (this._ttlTimers[id] != null) {
        clearTimeout(this._ttlTimers[id]);
      }
      (function(_this) {
        return (function(id, ttl) {
          return _this._ttlTimers[id] = setTimeout(function() {
            _this.remove(id);
            return delete _this._ttlTimers[id];
          }, ttl);
        });
      })(this)(id, ttl);
    },
    truncate: function() {
      var id, ref, timer;
      ref = this._ttlTimers;
      for (id in ref) {
        timer = ref[id];
        clearTimeout(timer);
      }
      this._ttlTimers = {};
      this._storage = {};
    }
  };

  Kasza.setup();

  var Kasza$1 = Kasza;

  return Kasza$1;

})));
