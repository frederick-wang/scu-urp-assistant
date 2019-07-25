// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"i1Q6":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"zKeE":[function(require,module,exports) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"g31e":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"3zRh":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"g31e"}],"BxvP":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"zotD":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"BxvP"}],"wLcK":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"6MLN":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"wLcK"}],"9kxq":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"BxvP","./_global":"i1Q6"}],"R6c1":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"6MLN","./_fails":"wLcK","./_dom-create":"9kxq"}],"EKwp":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"BxvP"}],"Gfzd":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"zotD","./_ie8-dom-define":"R6c1","./_to-primitive":"EKwp","./_descriptors":"6MLN"}],"0WCH":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"akPY":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"Gfzd","./_property-desc":"0WCH","./_descriptors":"6MLN"}],"yS17":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"vSO4":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"i1Q6","./_core":"zKeE","./_ctx":"3zRh","./_hide":"akPY","./_has":"yS17"}],"ShN9":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"E5Ce":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"ShN9"}],"U72i":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"Wyka":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"E5Ce","./_defined":"U72i"}],"MpYs":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"S7IM":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"MpYs"}],"Zwq5":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"MpYs"}],"LNnS":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"Wyka","./_to-length":"S7IM","./_to-absolute-index":"Zwq5"}],"1kq3":[function(require,module,exports) {
module.exports = true;

},{}],"NB7d":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"zKeE","./_global":"i1Q6","./_library":"1kq3"}],"X6va":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"/wuY":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"NB7d","./_uid":"X6va"}],"B9Lq":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"yS17","./_to-iobject":"Wyka","./_array-includes":"LNnS","./_shared-key":"/wuY"}],"KxjL":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"knrM":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"B9Lq","./_enum-bug-keys":"KxjL"}],"z7R8":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"d/AR":[function(require,module,exports) {
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":"knrM","./_to-iobject":"Wyka","./_object-pie":"z7R8"}],"wbaH":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"vSO4","./_object-to-array":"d/AR"}],"P+rg":[function(require,module,exports) {
require('../../modules/es7.object.values');
module.exports = require('../../modules/_core').Object.values;

},{"../../modules/es7.object.values":"wbaH","../../modules/_core":"zKeE"}],"Qujq":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/values"), __esModule: true };
},{"core-js/library/fn/object/values":"P+rg"}],"lytE":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"MpYs","./_defined":"U72i"}],"gojl":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"akPY"}],"dhak":[function(require,module,exports) {
module.exports = {};

},{}],"gjjs":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"Gfzd","./_an-object":"zotD","./_object-keys":"knrM","./_descriptors":"6MLN"}],"ebIA":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"i1Q6"}],"TNJq":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"zotD","./_object-dps":"gjjs","./_enum-bug-keys":"KxjL","./_shared-key":"/wuY","./_dom-create":"9kxq","./_html":"ebIA"}],"Ug9I":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"NB7d","./_uid":"X6va","./_global":"i1Q6"}],"11Ut":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"Gfzd","./_has":"yS17","./_wks":"Ug9I"}],"b7Q2":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"TNJq","./_property-desc":"0WCH","./_set-to-string-tag":"11Ut","./_hide":"akPY","./_wks":"Ug9I"}],"mbLO":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"U72i"}],"HHE0":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"yS17","./_to-object":"mbLO","./_shared-key":"/wuY"}],"uRfg":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"1kq3","./_export":"vSO4","./_redefine":"gojl","./_hide":"akPY","./_iterators":"dhak","./_iter-create":"b7Q2","./_set-to-string-tag":"11Ut","./_object-gpo":"HHE0","./_wks":"Ug9I"}],"i+u+":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"lytE","./_iter-define":"uRfg"}],"ID6i":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"xwD+":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"OYXR":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"ID6i","./_iter-step":"xwD+","./_iterators":"dhak","./_to-iobject":"Wyka","./_iter-define":"uRfg"}],"COf8":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"OYXR","./_global":"i1Q6","./_hide":"akPY","./_iterators":"dhak","./_wks":"Ug9I"}],"ZxII":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"Ug9I"}],"nFDa":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":"i+u+","../../modules/web.dom.iterable":"COf8","../../modules/_wks-ext":"ZxII"}],"6t7t":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":"nFDa"}],"e8vu":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"X6va","./_is-object":"BxvP","./_has":"yS17","./_object-dp":"Gfzd","./_fails":"wLcK"}],"c2zY":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"i1Q6","./_core":"zKeE","./_library":"1kq3","./_wks-ext":"ZxII","./_object-dp":"Gfzd"}],"Ocr3":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"ycyv":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"knrM","./_object-gops":"Ocr3","./_object-pie":"z7R8"}],"ayXv":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"ShN9"}],"Ni5N":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"B9Lq","./_enum-bug-keys":"KxjL"}],"rMkZ":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"Wyka","./_object-gopn":"Ni5N"}],"sxPs":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"z7R8","./_property-desc":"0WCH","./_to-iobject":"Wyka","./_to-primitive":"EKwp","./_has":"yS17","./_ie8-dom-define":"R6c1","./_descriptors":"6MLN"}],"Aa2f":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"i1Q6","./_has":"yS17","./_descriptors":"6MLN","./_export":"vSO4","./_redefine":"gojl","./_meta":"e8vu","./_fails":"wLcK","./_shared":"NB7d","./_set-to-string-tag":"11Ut","./_uid":"X6va","./_wks":"Ug9I","./_wks-ext":"ZxII","./_wks-define":"c2zY","./_enum-keys":"ycyv","./_is-array":"ayXv","./_an-object":"zotD","./_is-object":"BxvP","./_to-iobject":"Wyka","./_to-primitive":"EKwp","./_property-desc":"0WCH","./_object-create":"TNJq","./_object-gopn-ext":"rMkZ","./_object-gopd":"sxPs","./_object-dp":"Gfzd","./_object-keys":"knrM","./_object-gopn":"Ni5N","./_object-pie":"z7R8","./_object-gops":"Ocr3","./_library":"1kq3","./_hide":"akPY"}],"tuDi":[function(require,module,exports) {

},{}],"c6mp":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"c2zY"}],"2mwf":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"c2zY"}],"Ky5l":[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":"Aa2f","../../modules/es6.object.to-string":"tuDi","../../modules/es7.symbol.async-iterator":"c6mp","../../modules/es7.symbol.observable":"2mwf","../../modules/_core":"zKeE"}],"ibPW":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":"Ky5l"}],"GyB/":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol/iterator":"6t7t","../core-js/symbol":"ibPW"}],"ZHvQ":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"ShN9","./_wks":"Ug9I"}],"7AqT":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"ZHvQ","./_wks":"Ug9I","./_iterators":"dhak","./_core":"zKeE"}],"ugM7":[function(require,module,exports) {
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":"zotD","./core.get-iterator-method":"7AqT","./_core":"zKeE"}],"Lvd3":[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/web.dom.iterable":"COf8","../modules/es6.string.iterator":"i+u+","../modules/core.get-iterator":"ugM7"}],"X9RM":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":"Lvd3"}],"uj5A":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_object-keys":"knrM","./_object-gops":"Ocr3","./_object-pie":"z7R8","./_to-object":"mbLO","./_iobject":"E5Ce","./_fails":"wLcK"}],"YD0x":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"vSO4","./_object-assign":"uj5A"}],"vcHl":[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":"YD0x","../../modules/_core":"zKeE"}],"gc0D":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"vcHl"}],"0nx4":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"d0NU":[function(require,module,exports) {
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"process":"0nx4"}],"bQx9":[function(require,module,exports) {
module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],"6D9y":[function(require,module,exports) {
'use strict';
module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

},{}],"dwX/":[function(require,module,exports) {
var concatMap = require('concat-map');
var balanced = require('balanced-match');

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}


},{"concat-map":"bQx9","balanced-match":"6D9y"}],"Nt/K":[function(require,module,exports) {
module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = require('path')
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = require('brace-expansion')

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

},{"path":"d0NU","brace-expansion":"dwX/"}],"By4a":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":"ZHvQ","./_wks":"Ug9I","./_iterators":"dhak","./_core":"zKeE"}],"TEgB":[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/web.dom.iterable":"COf8","../modules/es6.string.iterator":"i+u+","../modules/core.is-iterable":"By4a"}],"gkZy":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":"TEgB"}],"m8OI":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/is-iterable":"gkZy","../core-js/get-iterator":"X9RM"}],"hEIm":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"zotD"}],"af0K":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"dhak","./_wks":"Ug9I"}],"vUQk":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"Gfzd","./_property-desc":"0WCH"}],"Lli7":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"Ug9I"}],"N484":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"3zRh","./_export":"vSO4","./_to-object":"mbLO","./_iter-call":"hEIm","./_is-array-iter":"af0K","./_to-length":"S7IM","./_create-property":"vUQk","./core.get-iterator-method":"7AqT","./_iter-detect":"Lli7"}],"O35A":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":"i+u+","../../modules/es6.array.from":"N484","../../modules/_core":"zKeE"}],"VuZO":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":"O35A"}],"eunL":[function(require,module,exports) {
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 一键评教插件


var fastEvaluation = {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 1000 * 61,
  checkboxWrapperSelectors: {
    '学生评教（课堂教学）': '#ktjx-checkbox-wrapper',
    '学生评教（实验教学）': '#syjx-checkbox-wrapper',
    '学生评教（实践教学）': '#sjjx-checkbox-wrapper',
    '学生评教（实验实践）': '#sysj-checkbox-wrapper',
    '学生评教（体育教学）': '#tyjx-checkbox-wrapper',
    '研究生助教评价': '#yjs-checkbox-wrapper',
    'UIP国际课程学生评教': '#uip-checkbox-wrapper'
  },
  questionsNumberRange: {
    '学生评教（课堂教学）': [107, 108, 123, 127, 128, 129, 131],
    '学生评教（实验教学）': [82, 83, 84, 85, 86, 87, 88],
    '学生评教（实践教学）': [89, 90, 91, 92, 93, 94, 95],
    '学生评教（实验实践）': [132, 133, 134, 135, 136, 137, 138],
    '学生评教（体育教学）': [96, 97, 98, 99, 100, 101, 102],
    '研究生助教评价': [28, 29, 30, 31, 32, 33],
    'UIP国际课程学生评教': [53, 54, 55, 56, 57, 58, 59, 60, 61, 105]
  },
  templates: {
    btn: '<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此开始一键评教!</button>',
    prompt: '<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>',
    selectionModal: "\n      <div id=\"selection-modal\">\n        <style>\n          #selection-modal {\n            padding: 10px 20px;\n          }\n\n          .selection-modal-introduction>p {\n            font-size: 14px;\n            margin-bottom: 10px;\n          }\n\n          .selection-modal-introduction>p:last-child {\n            margin-bottom: 0;\n          }\n\n          .checkbox-wrapper {\n            display: flex;\n            flex-wrap: wrap;\n            margin-bottom: 10px;\n          }\n\n          .checkbox-wrapper:last-child {\n            margin-bottom: 0;\n          }\n\n          #selection-checkbox-wrapper>.checkbox {\n            padding-bottom: 7px;\n          }\n\n        </style>\n        <form id=\"selection-form\" class=\"form-horizontal\" role=\"form\">\n          <div class=\"row\">\n            <div class=\"col-xs-12\">\n              <div class=\"selection-modal-introduction\">\n                <p>\u6240\u6709\u9009\u4E2D\u7684\u8001\u5E08\u90FD\u5C06\u88AB\u4E00\u952E\u6EE1\u5206\u597D\u8BC4\uFF0C\u4E3B\u89C2\u8BC4\u4EF7\u4F1A\u4ECE25\u6761\u8BED\u53E5\u5E93\u91CC\u968F\u673A\u62BD\u53D6\u3002</p>\n                <p>\u9ED8\u8BA4\u6240\u6709\u8001\u5E08\u90FD\u662F\u9009\u4E2D\u72B6\u6001\uFF0C\u60A8\u53EA\u9700\u8981\u53D6\u6D88\u52FE\u9009\u60A8\u60F3\u624B\u52A8\u8BC4\u4EF7\u7684\u8001\u5E08\u5373\u53EF\u3002</p>\n              </div>\n              <hr>\n              <h4 class=\"lighter blue\">\u5B66\u751F\u8BC4\u6559\uFF08\u8BFE\u5802\u6559\u5B66\uFF09</h4>\n              <div id=\"ktjx-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u9A8C\u6559\u5B66\uFF09</h4>\n              <div id=\"syjx-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u8DF5\u6559\u5B66\uFF09</h4>\n              <div id=\"sjjx-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u9A8C\u5B9E\u8DF5\uFF09</h4>\n              <div id=\"sysj-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">\u5B66\u751F\u8BC4\u6559\uFF08\u4F53\u80B2\u6559\u5B66\uFF09</h4>\n              <div id=\"tyjx-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">\u7814\u7A76\u751F\u52A9\u6559\u8BC4\u4EF7</h4>\n              <div id=\"yjs-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n              <h4 class=\"lighter blue\">UIP\u56FD\u9645\u8BFE\u7A0B\u5B66\u751F\u8BC4\u6559</h4>\n              <div id=\"uip-checkbox-wrapper\" class=\"checkbox-wrapper\"></div>\n            </div>\n          </div>\n        </form>\n      </div>\n    "
  },
  comments: ['老师是很好的，平时课堂上讲课风趣又不失严谨，课下也对同学们的问题有求必应，帮助了我很多。', '老师挺不错的，对问题分析的透彻，讲课能切中要害，很喜欢老师的讲课风格。', '老师讲课很用心，给我们划定了学习目标，班里同学都学得不错，给分也好。', '老师经验很丰富，平时要求适中，注重与我们沟通交流，把知识真正的传递给了我们。', '老师讲的内容紧追时代步伐，不过时，讲课风格详实生动，大家都很喜欢。', '老师的讲课节奏安排的不错，最后大家对知识掌握的都比较好，复习也比较充分，考试情况不错。', '该课程教学目标目标清楚明白、具体，易激发兴趣，引导自主探究、合作交流、练习设计体现知识的综合运用，形式多样，分量与难度适中，学法指导得当，是一门很不错的课', '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，从情感、态度与价值观三个维度出发，符合学段教学要求、教材特点与我们实际，是一门成熟的课', '该课程能以旧引新，寻找新旧知识的关联和生长点，注重知识的发生发展过程，能找到教材特点及本课的疑点，并恰当处理，在课堂上设疑问难，引导点拨，是一门很有个性特点的课', '本门课程各种学习活动设计具体、充分注意我们学习习惯的培养，因材施教，调动我们自主学习的积极性，遵循常规但不拘泥，根据我们的差异和特点，从具体到抽象对教材进行处理，是一门很成功的课', '该课程教学过程设计完整有序，既体现知识结构，知识点，又注意突出我们活动设计，体现教学民主、培养我们良好的学习品质，课堂结构完整，密度恰当。', '该课程教学程序设计巧妙，在教学过程中能运用上新颖独特教学方法、言简意胲，引导点拨我们，我们动口、动手、动脑，主动参与教学过程，使我们的作业完善而有美感，让大家学到了很多东西。', '该课程很有艺术，教学安排清晰有序，科学规范。在教材处理上从具体到抽象，化难为易，以简驾繁突破难点。各环节有详细的练习，科学合理有效地培养我们自主，探究，创新能力的发展。', '本门课程非常成功，设计突出了以我们为本的理念、全面培养我们素养、自主合作探究学习的理念。老师配以亲切活泼的教态，能较为恰当地运用丰富的表扬手段，让我们在学习中感受到成功的快乐。', '该课程教学重难点把握准确，教学内容主次分明，抓住关键；结构合理，衔接自然紧凑，组织严密，采用有效的教学手段，引导自主探究、合作交流，成功地教我们“会学”。', '该课程结构层次清楚、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。精心设计练习，并在整个教学过程中注重我们能力的培养，是一门优秀的课。', '该课程很有创意，对教材把握透彻、挖掘深入、处理新颖，针对我们基础和我们发展性目标，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。', '老师在教学过程中，不仅重视知识要求，也注重思想教育，在课堂教学中孜孜不倦的帮助我们学习，做到对我们动之以情，爱之以诚，使我们的学习取得完美的成果。', '该课程教学设计非常巧妙，结合教材特点，我们、老师实际，一法为主，多法配合，优化组合。练习提供了我们喜闻乐见的资料，课堂练习紧扣重点，并注意在“趣”字上下功夫。', '该课程教学环节清晰、完整具体，能活化教学内容，使之生活化，课堂教学的开放性、师生关系的民主性、教学模式的多样性，培养我们良好的学习品质，体显出该老师教学能力非常强。', '该课程很有特色，创设情景，让我们在学习中、体验实践、感悟，收集、整理、筛选资料，突出体现了以人为本、以我们发展为本的教育理念。是一门很成功的课。', '本门课程很有艺术，在教材内容的基础上作了适当的必要的扩展，精心安排我们自主学习、质疑、操作实践等活动以启发式、讨论式为主。我们在完成任务的过和程中学会合作。', '该课程重点突出，目标全面、准确、具体，整体现知识与能力、方法与过程、情感态度与价值观三个维度，布局合理，设计各种教学活动，引导我们自主学习，有条理地将旧知识综合进行运用。', '该课程结构清晰、运用恰当的教学方法和手段启迪我们思维、解决重点、突出难点。根据班级实际情况，精心设计练习，并在整个教学过程中注重因材施教，是一门优秀的课。', '该课程十分有创意，教学目的明确，方法得当、语言清晰，具有感染力，习题典型，题量适当，激发我们兴趣，引导自主探究、合作交流完成任务，整个课堂效率非常高。', '本门课程对教学内容把握透彻、挖掘深入、处理新颖，在课堂教学中，对重难点言简意赅，分析透彻。对练习以思维训练为核心，落实双基，是一门非常成功的课'],
  init: function init() {
    this.$btn = window.$(this.templates.btn);
    this.$prompt = window.$(this.templates.prompt);
    window.$('#close > h4').append(this.$btn, this.$prompt);
    this.$btn.click(this.onClickBtn.bind(this));
  },
  onClickBtn: function onClickBtn(e) {
    e.preventDefault();
    var hasUnevaluatedQuestionnaire = this.collectData();

    if (hasUnevaluatedQuestionnaire) {
      this.showSelectionModal();
    } else {
      window.urp.confirm('本页上的所有教师都已经评教过了，您可以换一页再使用。', function () {});
    }
  },
  showSelectionModal: function showSelectionModal() {
    var _this = this;

    window.layer.open({
      type: 1,
      area: '90%',
      title: '请选择需要「一键好评」的老师',
      shadeClose: true,
      offset: '50px',
      btn: ['开始一键评教!'],
      content: this.templates.selectionModal,
      success: function success() {
        _this.list.forEach(function (_ref, index) {
          var name = _ref.evaluatedPeople,
              curriculum = _ref.evaluationContentContent,
              type = _ref.questionnaireName;

          if (_this.checkboxWrapperSelectors[type]) {
            var selector = _this.checkboxWrapperSelectors[type];
            window.$(selector).append('\n              <div class="checkbox">\n                <label>\n                  <input name="selection-checkbox-' + index + '" type="checkbox" class="ace ace-checkbox-2 selection-checkbox" checked>\n                  <span class="lbl">' + name + '-' + curriculum + '</span>\n                </label>\n              </div>\n            ');
          } else {
            console.log('无效的问卷名称：' + type);
          }
        });

        for (var key in _this.checkboxWrapperSelectors) {
          var selector = _this.checkboxWrapperSelectors[key];

          if (!window.$(selector).children().length) {
            window.$(selector).prev().remove();
            window.$(selector).remove();
          }
        }
      },
      yes: function yes(layerIndex) {
        _this.list = window.$('#selection-form').serializeArray().map(function (v) {
          return _this.list[Number(v.name.replace('selection-checkbox-', ''))];
        });
        window.layer.close(layerIndex);

        if (_this.list.length) {
          _this.$btn.remove();

          var _list$ = _this.list[0],
              evaluatedPeople = _list$.evaluatedPeople,
              evaluationContentContent = _list$.evaluationContentContent;

          _this.changePrompt("\u5373\u5C06\u57281\u5206\u949F\u540E\u5F00\u59CB\u8BC4\u4EF7" + evaluatedPeople + "\uFF08" + evaluationContentContent + "\uFF09\uFF0C\u8BF7\u8010\u5FC3\u7B49\u5F85\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~");

          _this.evaluate(0); // setTimeout(() => this.evaluate(0), this.evaluationInterval)

        }
      }
    });
  },
  collectData: function collectData() {
    var _this2 = this;

    var collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……');
    var items = (0, _from2.default)(document.getElementById('jxpgtbody').getElementsByTagName('button')).filter(function (item) {
      return item.innerText === '评估';
    }) // 2018-8-31 20:21:20
    // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
    // 临时这样补上，尽量不做大修改，防止出错。
    .map(function (item) {
      return item.getAttribute('onClick').replace(/evaluationResult\("|evaluation\("|"\);return false;/gi, '') + ('","' + item.parentElement.parentElement.children[3].innerText);
    });

    if (!items.length) {
      return false;
    }

    this.list = items.map(function (item) {
      return _this2.parseName(item);
    });
    window.layer.close(collectingMsgIndex);
    return true;
  },
  changePrompt: function changePrompt(str) {
    this.$prompt.text(str);
  },
  parseName: function parseName(data) {
    data = data.split('","');

    var _data = data,
        _data2 = (0, _slicedToArray3.default)(_data, 6),
        questionnaireCode = _data2[0],
        questionnaireName = _data2[1],
        evaluatedPeopleNumber = _data2[2],
        evaluatedPeople = _data2[3],
        evaluationContentNumber = _data2[4],
        evaluationContentContent = _data2[5];

    var result = {
      questionnaireCode: questionnaireCode,
      questionnaireName: questionnaireName,
      evaluatedPeopleNumber: evaluatedPeopleNumber,
      evaluatedPeople: evaluatedPeople,
      evaluationContentNumber: evaluationContentNumber,
      evaluationContentContent: evaluationContentContent
    };
    return result;
  },
  getComment: function getComment() {
    return encodeURIComponent(this.comments[Math.floor(Math.random() * this.comments.length)]);
  },
  evaluate: function evaluate(index) {
    var _this3 = this;

    var origin = window.location.origin;

    if (index >= this.list.length) {
      this.changePrompt("\u672C\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026");
      window.location.href = origin + '/student/teachingEvaluation/evaluation/index';
      return;
    }

    var _list$index = this.list[index],
        evaluatedPeopleNumber = _list$index.evaluatedPeopleNumber,
        evaluatedPeople = _list$index.evaluatedPeople,
        evaluationContentNumber = _list$index.evaluationContentNumber,
        evaluationContentContent = _list$index.evaluationContentContent,
        questionnaireCode = _list$index.questionnaireCode,
        questionnaireName = _list$index.questionnaireName;
    var tokenValue = void 0;
    var count = void 0; // this.changePrompt(
    //   `正在评价${evaluationContentContent}课程的${evaluatedPeople}老师（${index +
    //   1}/${this.list.length}）`
    // )

    window.$.ajax({
      type: 'POST',
      url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': 1
      },
      data: encodeURI('evaluatedPeople=' + evaluatedPeople + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber + '&questionnaireCode=' + questionnaireCode + '&questionnaireName=' + questionnaireName + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluationContentContent=' + evaluationContentContent),
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function toString() {
            return '';
          }
        });
      },
      error: function error(xhr) {
        window.urp.alert("\u9519\u8BEF\u4EE3\u7801[" + xhr.readyState + '-' + xhr.status + "]:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01");
      },
      success: function success(data) {
        tokenValue = data.match(/<input.+tokenValue(?:(?:.|\r|\n)+?)value="(.*?)" \/>/i)[1];
        count = data.match(/<input.+count.+value="(.*?)">/i)[1];

        if (!tokenValue || !count) {
          window.urp.confirm("\u56E0\u6559\u52A1\u7CFB\u7EDF\u4E0D\u7A33\u5B9A\uFF0C\u5F53\u524D\u6682\u65F6\u65E0\u6CD5\u8BC4\u6559\uFF0C\u8BF7\u7A0D\u7B49\u4E00\u6BB5\u65F6\u95F4\u540E\uFF0C\u5237\u65B0\u7F51\u9875\u518D\u5C1D\u8BD5\u3002\u5982\u679C\u8FD8\u662F\u65E0\u6CD5\u8BC4\u6559\uFF0C\u60A8\u53EF\u4EE5\u66F4\u6362\u6D4F\u89C8\u5668\u6216\u7535\u8111\u540E\u518D\u5C1D\u8BD5\u3002", function () {});
          return;
        }

        if (_this3.questionsNumberRange[questionnaireName]) {
          var range = _this3.questionsNumberRange[questionnaireName];
          var bodyStr = 'questionnaireCode=' + questionnaireCode + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber + '&count=' + count;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(range), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var number = _step.value;
              var numberString = ('0000000000' + number).substr(-10);
              bodyStr += '&' + numberString + '=10_1';
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          bodyStr += '&zgpj=' + _this3.getComment();

          _this3.evaluate2ndStage(index, bodyStr, evaluatedPeople, evaluationContentContent, tokenValue);
        } else {
          console.log('无效的问卷名称：' + questionnaireName);
        }
      }
    });
  },
  evaluate2ndStage: function evaluate2ndStage(index, bodyStr, evaluatedPeople, evaluationContentContent, tokenValue) {
    var _this4 = this;

    window.$.ajax({
      cache: true,
      type: 'POST',
      async: true,
      url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
      data: 'tokenValue=' + tokenValue + '&' + bodyStr,
      error: function error(xhr) {
        window.urp.alert("\u9519\u8BEF\u4EE3\u7801[" + xhr.readyState + '-' + xhr.status + "]:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01");

        _this4.changePrompt(evaluatedPeople + "\uFF08" + evaluationContentContent + "\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this4.list.length);
      },
      success: function success(data) {
        if (data['result'].indexOf('/') !== -1) {
          window.urp.alert('登陆过期，将在3秒后自动刷新页面');

          _this4.changePrompt(evaluatedPeople + "\uFF08" + evaluationContentContent + "\uFF09\u767B\u9646\u8FC7\u671F QAQ\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this4.list.length + "\uFF0C\u5C06\u57283\u79D2\u540E\u81EA\u52A8\u5237\u65B0\u9875\u9762~");

          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else if (data['result'] === 'success') {
          _this4.changePrompt(evaluatedPeople + "\uFF08" + evaluationContentContent + "\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this4.list.length + "\uFF0C\u5C06\u57281\u5206\u949F\u540E\u81EA\u52A8\u5F00\u59CB\u8BC4\u4EF7\u4E0B\u4E00\u4F4D\u8001\u5E08\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~");

          _this4.evaluate(++index); // setTimeout(() => {
          // }, this.evaluationInterval)

        } else {
          if (data['token'] !== tokenValue) {
            tokenValue = data['token'];
            setTimeout(function () {
              _this4.evaluate2ndStage(index, bodyStr, evaluatedPeople, evaluationContentContent, tokenValue);
            }, _this4.evaluationInterval);
          } else {
            window.urp.alert('保存失败');

            _this4.changePrompt(evaluatedPeople + "\uFF08" + evaluationContentContent + "\uFF09\u906D\u9047\u672A\u77E5\u9519\u8BEF QAQ\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this4.list.length + "\uFF0C\u5C06\u57281\u5206\u949F\u540E\u81EA\u52A8\u91CD\u65B0\u8BC4\u4EF7\u8FD9\u4F4D\u8001\u5E08\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~");

            setTimeout(function () {
              _this4.evaluate(index);
            }, _this4.evaluationInterval);
          }
        }
      }
    });
  }
};
module.exports = fastEvaluation;
},{"babel-runtime/core-js/get-iterator":"X9RM","babel-runtime/helpers/slicedToArray":"m8OI","babel-runtime/core-js/array/from":"VuZO"}],"EHrm":[function(require,module,exports) {
module.exports = {
  "name": "scu-urp-assistant",
  "version": "0.9.3",
  "description": "四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。",
  "main": "main.js",
  "scripts": {
    "start": "npm run transform && npm run userscript && npm run bookmarklet && rm -rf transformed/",
    "userscript": "parcel build transformed/scu-urp-assistant.user.js --no-minify --no-source-maps",
    "bookmarklet": "parcel build transformed/scu-urp-assistant-bookmarklet.js --no-minify --no-source-maps",
    "transform": "npm run transform:js && npm run transform:scss",
    "transform:js": "babel --plugins transform-runtime src --out-dir transformed",
    "transform:scss": "node-sass src/plugins/ -o transformed/plugins/ --output-style compressed"
  },
  "repository": {
    "type": "git",
    "url": "git@gitee.com:zhaoji/scu-urp-assistant.git"
  },
  "keywords": ["SCU", "四川大学"],
  "author": "Zhaoji Wang",
  "license": "Apache-2.0",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "cssnano": "^4.1.10",
    "cz-conventional-changelog": "^3.0.2",
    "eslint": "^6.1.0",
    "eslint-config-standard": "^13.0.1",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "node-sass": "^4.12.0"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "babel-runtime": "^6.26.0",
    "minimatch": "^3.0.4"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
};
},{}],"IHPy":[function(require,module,exports) {
'use strict'; // 提示信息插件

var tooltip = {
  name: 'tooltip',
  pathname: '/**',
  $loginTooltip: undefined,
  $navTooltip: undefined,
  version: require('../../package.json').version,
  init: function init() {
    if (window.location.pathname === '/login') {
      this.$loginTooltip = window.$("\n        <span class=\"sua-tooltip\" style=\"\n          position: absolute;\n          font-size: 12px;\n          top: 10px;\n          right: 15px;\n          color: #909399;\n        \">\n          SCU URP \u52A9\u624B " + this.version + '\n        </span>');
      window.$('#formContent').prepend(this.$loginTooltip);
    } else {
      this.$navTooltip = window.$("\n        <li class=\"light-orange\" style=\"text-align: center\">\n            <a href=\"#\"\n              onclick=\"javascript:window.open('https://zhaoji.wang/sichuan-university-urp-assistant/');\n            \">\n              <i class=\"ace-icon fa fa-gavel\"></i> SCU URP \u52A9\u624B " + this.version + '\n            </a>\n        </li>');
      window.$('#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul').children('li').eq(1).before(this.$navTooltip);
    }
  }
};
module.exports = tooltip;
},{"../../package.json":"EHrm"}],"BZ5J":[function(require,module,exports) {
'use strict'; // 修复兼容性插件(旧版教务系统)

var compatibilityLegacy = {
  init: function init() {
    var _this = this;

    this.topFrame.changeLeftMenu = function () {
      if (_this.bottomFrame && _this.menuFrame && _this.menuFrame.menus) {
        _this.menuFrame.menus.index = _this.topFrame.moduleNum;

        _this.menuFrame.menus.show();

        _this.menuFrame.menus.click();
      }
    };

    this.topFrame.changeLeftMenu();
  },
  task: function task() {
    if (!this.mainFrame.showModalDialog) {
      this.mainFrame.showModalDialog = this.showModalDialog;
    }
  },
  showModalDialog: function showModalDialog(arg1, arg2, arg3) {
    var w = void 0;
    var h = void 0;
    var resizable = 'no'; // 默认窗口需要可以滚动，不然课程表之类的都只能显示一半

    var scroll = 'yes';
    var status = 'no';
    var mdattrs = arg3.split(';');

    for (var i = 0; i < mdattrs.length; i++) {
      var mdattr = mdattrs[i].split(':');
      var n = mdattr[0];
      var v = mdattr[1];

      if (n) {
        n = n.trim().toLowerCase();
      }

      if (v) {
        v = v.trim().toLowerCase();
      }

      if (n === 'dialogheight') {
        h = v.replace('px', '');
      } else if (n === 'dialogwidth') {
        w = v.replace('px', '');
      } else if (n === 'resizable') {
        resizable = v;
      } else if (n === 'scroll') {
        scroll = v;
      } else if (n === 'status') {
        status = v;
      }
    }

    var left = window.screenX + window.outerWidth / 2 - w / 2;
    var top = window.screenY + window.outerHeight / 2 - h / 2;
    var targetWin = window.open(arg1, arg1, 'toolbar=no, location=no, directories=no, status=' + status + ', menubar=no, scrollbars=' + scroll + ', resizable=' + resizable + ', copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    targetWin.focus();
  }
};
module.exports = compatibilityLegacy;
},{}],"wAV6":[function(require,module,exports) {
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 一键评教插件(旧版教务系统)


var fastEvaluationLegacy = {
  list: [],
  btn: void 0,
  span: void 0,
  evaluationInterval: 500,
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Cache-Control': 'max-age=0',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Upgrade-Insecure-Requests': '1'
  },
  task: function task() {
    if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') !== -1) {
      if (this.mainFrame.document.getElementsByTagName('body').length) {
        if (this.isListPage() && !this.mainFrame.evaluationHacked) {
          this.btn = document.createElement('button');
          var node = document.createTextNode('给本页所有老师好评！');
          this.span = document.createElement('span');
          var td = document.createElement('td');
          this.btn.appendChild(node);
          td.appendChild(this.btn);
          td.appendChild(this.span);
          var tblHead = this.mainFrame.document.getElementById('tblHead');
          tblHead.getElementsByTagName('table')[0].getElementsByTagName('tr')[0].appendChild(td);
          this.mainFrame.evaluationHacked = true;
          this.btn.onclick = this.onClickBtn.bind(this);
        }
      }
    }
  },
  onClickBtn: function onClickBtn(e) {
    var _this = this;

    e.preventDefault();
    this.changePrompt('正在收集本页问卷数据……');
    var names = (0, _from2.default)(this.mainFrame.document.getElementsByTagName('img')).filter(function (item) {
      return item.getAttribute('title') === '评估';
    }).map(function (item) {
      return item.name;
    }).filter(function (item) {
      return item && item !== 'goto';
    });

    if (!names.length) {
      window.alert('本页上的所有教师都已经评教过了，您可以换一页再使用。');
      this.changePrompt('本页上的所有教师都已经评教过了，您可以换一页再使用。');
      return;
    }

    this.list = names.map(function (item) {
      return _this.parseName(item);
    });
    this.evaluate(0);
  },
  parseName: function parseName(data) {
    data = data.split('#@');

    var _data = data,
        _data2 = (0, _slicedToArray3.default)(_data, 6),
        wjbm = _data2[0],
        bpr = _data2[1],
        bprm = _data2[2],
        wjmc = _data2[3],
        pgnrm = _data2[4],
        pgnr = _data2[5];

    var oper = void 0;

    switch (wjmc) {
      case '研究生助教评价':
      case '学生评教（体育教学）':
      case '学生评教（课堂教学）':
      case '学生评教（实践教学）':
      case '学生评教（实验教学）':
        oper = 'wjShow';
        break;

      default:
        console.log('无效的问卷名称：' + wjmc);
        return;
    }

    var result = {
      wjbm: wjbm,
      bpr: bpr,
      bprm: bprm,
      wjmc: wjmc,
      pgnrm: pgnrm,
      pgnr: pgnr,
      oper: oper
    };
    return result;
  },
  getComment: function getComment() {
    var comments = ['%C0%CF%CA%A6%CA%C7%BA%DC%BA%C3%B5%C4%A3%AC%C6%BD%CA%B1%BF%CE%CC%C3%C9%CF%BD%B2%BF%CE%B7%E7%C8%A4%D3%D6%B2%BB%CA%A7%D1%CF%BD%F7%A3%AC%BF%CE%CF%C2%D2%B2%B6%D4%CD%AC%D1%A7%C3%C7%B5%C4%CE%CA%CC%E2%D3%D0%C7%F3%B1%D8%D3%A6%A3%AC%B0%EF%D6%FA%C1%CB%CE%D2%BA%DC%B6%E0%A1%A3', '%C0%CF%CA%A6%CD%A6%B2%BB%B4%ED%B5%C4%A3%AC%B6%D4%CE%CA%CC%E2%B7%D6%CE%F6%B5%C4%CD%B8%B3%B9%A3%AC%BD%B2%BF%CE%C4%DC%C7%D0%D6%D0%D2%AA%BA%A6%A3%AC%BA%DC%CF%B2%BB%B6%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%B7%E7%B8%F1%A1%A3', '%C0%CF%CA%A6%BD%B2%BF%CE%BA%DC%D3%C3%D0%C4%A3%AC%B8%F8%CE%D2%C3%C7%BB%AE%B6%A8%C1%CB%D1%A7%CF%B0%C4%BF%B1%EA%A3%AC%B0%E0%C0%EF%CD%AC%D1%A7%B6%BC%D1%A7%B5%C3%B2%BB%B4%ED%A3%AC%B8%F8%B7%D6%D2%B2%BA%C3%A1%A3', '%C0%CF%CA%A6%BE%AD%D1%E9%BA%DC%B7%E1%B8%BB%A3%AC%C6%BD%CA%B1%D2%AA%C7%F3%CA%CA%D6%D0%A3%AC%D7%A2%D6%D8%D3%EB%CE%D2%C3%C7%B9%B5%CD%A8%BD%BB%C1%F7%A3%AC%B0%D1%D6%AA%CA%B6%D5%E6%D5%FD%B5%C4%B4%AB%B5%DD%B8%F8%C1%CB%CE%D2%C3%C7%A1%A3', '%C0%CF%CA%A6%BD%B2%B5%C4%C4%DA%C8%DD%BD%F4%D7%B7%CA%B1%B4%FA%B2%BD%B7%A5%A3%AC%B2%BB%B9%FD%CA%B1%A3%AC%BD%B2%BF%CE%B7%E7%B8%F1%CF%EA%CA%B5%C9%FA%B6%AF%A3%AC%B4%F3%BC%D2%B6%BC%BA%DC%CF%B2%BB%B6%A1%A3', '%C0%CF%CA%A6%B5%C4%BD%B2%BF%CE%BD%DA%D7%E0%B0%B2%C5%C5%B5%C4%B2%BB%B4%ED%A3%AC%D7%EE%BA%F3%B4%F3%BC%D2%B6%D4%D6%AA%CA%B6%D5%C6%CE%D5%B5%C4%B6%BC%B1%C8%BD%CF%BA%C3%A3%AC%B8%B4%CF%B0%D2%B2%B1%C8%BD%CF%B3%E4%B7%D6%A3%AC%BF%BC%CA%D4%C7%E9%BF%F6%B2%BB%B4%ED%A1%A3'];
    return comments[Math.floor(Math.random() * comments.length)];
  },
  changePrompt: function changePrompt(str) {
    this.span.innerText = str;
  },
  isListPage: function isListPage() {
    if (this.mainFrame.location.pathname.indexOf('jxpgXsAction') === -1) {
      return false;
    }

    var text = '';

    if (this.mainFrame.document.getElementsByTagName('body').length) {
      text = this.mainFrame.document.getElementsByTagName('body')[0].innerHTML;
    }

    if (text.indexOf('每页显示的记录数') !== -1) {
      return true;
    }

    return false;
  },
  evaluate: function evaluate(index) {
    var _this2 = this;

    var origin = window.location.origin;

    if (index >= this.list.length) {
      var page = '1';

      if (this.mainFrame.location.search.indexOf('page=') !== -1) {
        page = this.mainFrame.location.search.match(/page=(\d+)/)[1];
      }

      this.changePrompt("\u7B2C" + page + "\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026");
      this.mainFrame.location.href = origin + '/jxpgXsAction.do?oper=listWj&page=' + page;
      return;
    }

    var item = this.list[index];
    var teacher = item.bpr;
    var teacherName = item.bprm;
    var subject = item.pgnr;
    var subjectName = item.pgnrm;
    var questionnaire = item.wjbm;
    var questionnaireName = item.wjmc;
    var oper = item.oper;
    this.changePrompt("\u6B63\u5728\u8BC4\u4EF7" + subjectName + "\u8BFE\u7A0B\u7684" + teacherName + "\u8001\u5E08\uFF08" + (index + 1) + '/' + this.list.length + "\uFF09");
    window.$.ajax({
      type: 'POST',
      url: origin + '/jxpgXsAction.do',
      headers: this.headers,
      data: encodeURI('wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject + '&oper=' + oper + '&pageSize=20&page=1&currentPage=1&pageNo='),
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader('X-Requested-With', {
          toString: function toString() {
            return '';
          }
        });
      },
      error: function error(xhr) {
        window.alert("\u9519\u8BEF\u4EE3\u7801[" + xhr.readyState + '-' + xhr.status + "]:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01");
      },
      success: function success() {
        var begin = void 0;
        var end = void 0;

        switch (questionnaireName) {
          case '研究生助教评价':
            begin = 28;
            end = 33;
            break;

          case '学生评教（课堂教学）':
            begin = 36;
            end = 42;
            break;

          case '学生评教（实验教学）':
            begin = 82;
            end = 88;
            break;

          case '学生评教（实践教学）':
            begin = 89;
            end = 95;
            break;

          case '学生评教（体育教学）':
            begin = 96;
            end = 102;
            break;

          default:
            console.log('无效的问卷名称：' + questionnaireName);
            return;
        }

        var bodyStr = 'wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject;

        for (var i = begin; i <= end; i++) {
          var num = ('0000000000' + i).substr(-10);
          bodyStr += '&' + num + '=10_1';
        }

        bodyStr += '&zgpj=' + _this2.getComment();
        window.$.ajax({
          type: 'POST',
          url: origin + '/jxpgXsAction.do?oper=wjpg',
          headers: _this2.headers,
          data: bodyStr,
          error: function error(xhr) {
            window.urp.alert("\u9519\u8BEF\u4EE3\u7801[" + xhr.readyState + '-' + xhr.status + "]:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01");

            _this2.changePrompt(teacherName + "\uFF08" + subjectName + "\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this2.list.length);
          },
          success: function success(res) {
            if (res.indexOf('location.href=') !== -1) {
              _this2.changePrompt(teacherName + "\uFF08" + subjectName + "\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this2.list.length);
            } else if (res.indexOf('history.back(-1);') !== -1) {
              _this2.changePrompt(teacherName + "\uFF08" + subjectName + "\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A" + (index + 1) + '/' + _this2.list.length);
            }

            setTimeout(function () {
              _this2.evaluate(++index);
            }, _this2.evaluationInterval);
          }
        });
      }
    });
  }
};
module.exports = fastEvaluationLegacy;
},{"babel-runtime/helpers/slicedToArray":"m8OI","babel-runtime/core-js/array/from":"VuZO"}],"Gbn9":[function(require,module,exports) {
'use strict'; // 恢复登录页面的「两周之内不必登录」选项插件

var recoverRememberMe = {
  name: 'recover-remember-me',
  pathname: '/login',
  $rememberMe: void 0,
  init: function init() {
    this.$rememberMe = window.$("\n      <div style=\"margin: 5px 0;\">\n        <input\n          type=\"checkbox\"\n          name=\"_spring_security_remember_me\"\n          class=\"fadeIn third\"\n          style=\"margin-bottom: 5px;text-align: left;\"\n        >\n        &nbsp;\u4E24\u5468\u4E4B\u5185\u4E0D\u5FC5\u767B\u5F55\n      </div>");
    window.$('#loginButton').before(this.$rememberMe);
  }
};
module.exports = recoverRememberMe;
},{}],"Fqjc":[function(require,module,exports) {
'use strict';

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 绩点计算插件


var fs = require('fs');

var gpa = {
  name: 'gpa',
  pathname: ['/', '/index.jsp'],
  style: ".gpa-st-item{cursor:pointer}.gpa-st-item>td{transition:0.1s}.gpa-st-item.selected>td{font-weight:bolder;color:#409eff;background-color:#ecf5ff !important}.gpa-st-item.selected:hover>td{background-color:#6a7681 !important;color:#fff}.gpa-st-item:active>td{background-color:#3a8ee6 !important;color:#fff;outline:none}.gpa-st-tag-selected-score,.gpa-st-tag-selected-gpa,.gpa-tt-tag-selected-score,.gpa-tt-tag-selected-gpa{display:none}.gpa-st-select-all-btn,.gpa-tt-select-all-btn{position:relative;top:2.5px;float:right}.gpa-st-cancel-btn,.gpa-tt-cancel-btn{display:none;position:relative;top:2.5px;float:right}#gpa-toolbar-detail,#gpa-toolbar-reset{cursor:pointer}.gpa-st-tag,.gpa-tt-tag{cursor:pointer}.gpa-info-badge{cursor:pointer;position:relative;top:-7.5px}.gpa-info-badge-tt-selected-course-quantity,.gpa-info-badge-tt-selected-course-credits,.gpa-info-badge-st-selected-course-quantity,.gpa-info-badge-st-selected-course-credits{display:none}\n",
  $indexWidget: null,
  $indexWidgetMain: null,
  $indexWidgetMainRow: null,
  records: null,
  init: function init() {
    var _this = this;

    this.initDOM(); // 第一次请求只是为了获得课程总数 totalCount

    window.$.post('/student/integratedQuery/scoreQuery/allTermScores/data', {
      zxjxjhh: '',
      kch: '',
      kcm: '',
      pageNum: 1,
      pageSize: 1
    }).then(function (_ref) {
      var totalCount = _ref.list.pageContext.totalCount; // 用拿到的课程总数再次请求，获得全部课程成绩列表

      return window.$.post('/student/integratedQuery/scoreQuery/allTermScores/data', {
        zxjxjhh: '',
        kch: '',
        kcm: '',
        pageNum: 1,
        pageSize: totalCount
      });
    }).then(function (data) {
      return (// 将获取的全部课程成绩列表按照学期分组
        data.list.records.reduce(function (acc, cur) {
          // 如果没有挂科，那么 cur[18] ≡ null
          // 如果挂科了，检查是否是因为「缓考」才在系统中记录为「未通过」，如果是缓考，则跳过这条记录
          if (!cur[18] || cur[18].indexOf('缓考') === -1) {
            var s = acc.filter(function (v) {
              return v.semester === cur[0];
            });

            if (s.length) {
              s[0].courses.push(cur);
            } else {
              acc.push({
                semester: cur[0],
                courses: [cur]
              });
            }
          }

          return acc;
        }, [])
      );
    }).then(function (list) {
      _this.records = convertRecords(list);

      _this.renderSemesterTranscript();

      _this.renderTotalTranscript();

      _this.initEvent();
    });
  },

  /**
   * 初始化最初的界面
   */
  initDOM: function initDOM() {
    this.$indexWidget = window.$(templates.indexWidget);
    window.$('.page-content').children('.row').append(this.$indexWidget);
    this.$indexWidgetMain = this.$indexWidget.find('.widget-main');
    this.$indexWidgetMainRow = this.$indexWidget.find('.widget-main .row');
  },

  /**
   * 初始化按钮与「课程块」的鼠标事件
   */
  initEvent: function initEvent() {
    var _this2 = this;

    var that = this;
    window.$('.gpa-st-item').click(function () {
      that.toggleTranscriptItemStatus(this);
      that.renderTagSelected();
    });
    window.$('#gpa-toolbar-detail').click(function () {
      window.toSelect(document.getElementById('125803405'));
      window.location = '/student/integratedQuery/scoreQuery/allTermScores/index';
    });
    window.$('#gpa-toolbar-reset').click(function () {
      _this2.reset();
    });
    window.$('.gpa-st-select-all-btn').click(function () {
      var semester = this.dataset.semester;
      getSemesterCourses(that.records, semester).forEach(function (item) {
        item.selected = true;
      });
      window.$('.gpa-st-item').each(function () {
        if (this.dataset.semester === semester) {
          window.$(this).addClass('selected');
        }
      });
      that.renderTagSelected();
    });
    window.$('.gpa-st-cancel-btn').click(function () {
      var semester = this.dataset.semester;
      getSemesterCourses(that.records, semester).forEach(function (item) {
        item.selected = false;
      });
      window.$('.gpa-st-item').each(function () {
        if (this.dataset.semester === semester) {
          window.$(this).removeClass('selected');
        }
      });
      that.renderTagSelected();
    });
    window.$('.gpa-tt-select-all-btn').click(function () {
      that.records.forEach(function (list) {
        return list.courses.forEach(function (item) {
          item.selected = true;
        });
      });
      window.$('.gpa-st-item').each(function () {
        window.$(this).addClass('selected');
      });
      that.renderTagSelected();
    });
    window.$('.gpa-tt-cancel-btn').click(function () {
      that.records.forEach(function (list) {
        return list.courses.forEach(function (item) {
          item.selected = false;
        });
      });
      window.$('.gpa-st-item').each(function () {
        window.$(this).removeClass('selected');
      });
      that.renderTagSelected();
    });
  },

  /**
   * 渲染与「选择」有关的元素
   */
  renderTagSelected: function renderTagSelected() {
    this.renderSemesterTagSelected();
    this.renderTotalTagSelected();
  },

  /**
   * 渲染与「选择」有关的「分学期」元素
   */
  renderSemesterTagSelected: function renderSemesterTagSelected() {
    this.records.forEach(function (_ref2) {
      var semester = _ref2.semester,
          courses = _ref2.courses;
      var selectedCourses = courses.filter(function (v) {
        return v.selected;
      });

      var getSemester$Element = function getSemester$Element(className) {
        return window.$((0, _from2.default)(document.getElementsByClassName(className)).filter(function (v) {
          return v.dataset.semester === semester;
        })[0]);
      };

      var $selectedCourseQuantityBadge = getSemester$Element('gpa-info-badge-st-selected-course-quantity');
      var $selectedCourseCreditsBadge = getSemester$Element('gpa-info-badge-st-selected-course-credits');
      var $scoreTag = getSemester$Element('gpa-st-tag-selected-score');
      var $gpaTag = getSemester$Element('gpa-st-tag-selected-gpa');
      var $selectAllBtn = getSemester$Element('gpa-st-select-all-btn');
      var $cancelBtn = getSemester$Element('gpa-st-cancel-btn');

      if (selectedCourses.length) {
        var selectedCoursesQuantity = selectedCourses.length;
        var selectedCourseCredits = selectedCourses.reduce(function (acc, cur) {
          return acc + cur.credit;
        }, 0);
        var selectedCoursesScore = getAllCoursesScore(selectedCourses);
        var selectedCoursesGPA = getAllCoursesGPA(selectedCourses);
        $selectedCourseQuantityBadge.show();
        $selectedCourseQuantityBadge.attr('title', "\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B");
        $selectedCourseQuantityBadge.text(selectedCoursesQuantity + " \u95E8");
        $selectedCourseCreditsBadge.show();
        $selectedCourseCreditsBadge.attr('title', "\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u7684\u8BFE\u7A0B\u603B\u5B66\u5206\u4E3A " + selectedCourseCredits);
        $selectedCourseCreditsBadge.text(selectedCourseCredits + " \u5B66\u5206");
        $scoreTag.show();
        $scoreTag.attr('title', "\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u51FA\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B\u8FDB\u884C\u8BA1\u7B97\uFF0C\u9009\u4E2D\u8BFE\u7A0B\u7684\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + selectedCoursesScore);
        $scoreTag.text("\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A" + selectedCoursesScore);
        $gpaTag.show();
        $gpaTag.attr('title', "\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u51FA\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B\u8FDB\u884C\u8BA1\u7B97\uFF0C\u9009\u4E2D\u8BFE\u7A0B\u7684\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + selectedCoursesGPA);
        $gpaTag.text("\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A" + selectedCoursesGPA);
        $selectAllBtn.hide();
        $cancelBtn.show();
      } else {
        $selectedCourseQuantityBadge.hide();
        $selectedCourseCreditsBadge.hide();
        $scoreTag.hide();
        $gpaTag.hide();
        $selectAllBtn.show();
        $cancelBtn.hide();
      }
    });
  },

  /**
   * 渲染与「选择」有关的「全部成绩」元素
   */
  renderTotalTagSelected: function renderTotalTagSelected() {
    var selectedCourses = this.records.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []).filter(function (v) {
      return v.selected;
    });
    var $selectedCourseQuantityBadge = window.$('.gpa-info-badge-tt-selected-course-quantity');
    var $selectedCourseCreditsBadge = window.$('.gpa-info-badge-tt-selected-course-credits');
    var $scoreTag = window.$('.gpa-tt-tag-selected-score');
    var $gpaTag = window.$('.gpa-tt-tag-selected-gpa');
    var $selectAllBtn = window.$('.gpa-tt-select-all-btn');
    var $cancelBtn = window.$('.gpa-tt-cancel-btn');

    if (selectedCourses.length) {
      var semestersQuantity = this.records.length;
      var selectedCoursesQuantity = selectedCourses.length;
      var selectedCourseCredits = selectedCourses.reduce(function (acc, cur) {
        return acc + cur.credit;
      }, 0);
      var selectedCoursesScore = getAllCoursesScore(selectedCourses);
      var selectedCoursesGPA = getAllCoursesGPA(selectedCourses);
      $selectedCourseQuantityBadge.show();
      $selectedCourseQuantityBadge.attr('title', "\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u4E00\u5171\u9009\u4E2D\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B");
      $selectedCourseQuantityBadge.text(selectedCoursesQuantity + " \u95E8");
      $selectedCourseCreditsBadge.show();
      $selectedCourseCreditsBadge.attr('title', "\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u7684\u5168\u90E8\u8BFE\u7A0B\u603B\u5B66\u5206\u4E3A " + selectedCourseCredits);
      $selectedCourseCreditsBadge.text(selectedCourseCredits + " \u5B66\u5206");
      $scoreTag.show();
      $scoreTag.attr('title', "\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u4E00\u5171\u9009\u51FA\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B\u8FDB\u884C\u8BA1\u7B97\uFF0C\u5168\u90E8\u9009\u4E2D\u8BFE\u7A0B\u7684\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + selectedCoursesScore);
      $scoreTag.text("\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A" + selectedCoursesScore);
      $gpaTag.show();
      $gpaTag.attr('title', "\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u4E00\u5171\u9009\u51FA\u4E86 " + selectedCoursesQuantity + " \u95E8\u8BFE\u7A0B\u8FDB\u884C\u8BA1\u7B97\uFF0C\u5168\u90E8\u9009\u4E2D\u8BFE\u7A0B\u7684\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + selectedCoursesGPA);
      $gpaTag.text("\u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A" + selectedCoursesGPA);
      $selectAllBtn.hide();
      $cancelBtn.show();
    } else {
      $selectedCourseQuantityBadge.hide();
      $selectedCourseCreditsBadge.hide();
      $scoreTag.hide();
      $gpaTag.hide();
      $selectAllBtn.show();
      $cancelBtn.hide();
    }
  },

  /**
   * 当「课程块」被点击时，做出相应的反应
   */
  toggleTranscriptItemStatus: function toggleTranscriptItemStatus(dom) {
    window.$(dom).toggleClass('selected');
    var status = window.$(dom).hasClass('selected');
    var _dom$dataset = dom.dataset,
        name = _dom$dataset.name,
        attribute = _dom$dataset.attribute,
        semester = _dom$dataset.semester;
    var score = Number(dom.dataset.score);
    var gpa = Number(dom.dataset.gpa);
    var credit = Number(dom.dataset.credit);
    getSemesterCourses(this.records, semester).filter(function (v) {
      return v.name === name && v.attribute === attribute && v.score === score && v.gpa === gpa && v.credit === credit;
    })[0].selected = status;
  },

  /**
   * 渲染「总成绩」部分的界面
   */
  renderTotalTranscript: function renderTotalTranscript() {
    var semestersQuantity = this.records.length;
    var allCourses = this.records.reduce(function (acc, cur) {
      return acc.concat(cur.courses);
    }, []);
    var labels = templates.totalTranscript(semestersQuantity, allCourses);
    this.$indexWidgetMain.prepend(labels);
  },

  /**
   * 渲染「学期成绩」部分的界面
   */
  renderSemesterTranscript: function renderSemesterTranscript() {
    var _this3 = this;

    this.records.forEach(function (_ref3) {
      var semester = _ref3.semester,
          courses = _ref3.courses;
      var header = templates.semesterTranscriptHeader(semester, courses);
      var labels = templates.semesterTranscriptLabels(semester, courses);
      var content = templates.semesterTranscriptContent(semester, courses);

      _this3.$indexWidgetMainRow.append(templates.semesterTranscriptWrapper(header, labels, content));
    });
  },

  /**
   * 销毁页面元素
   */
  destroy: function destroy() {
    this.$indexWidgetMainRow.remove();
    this.$indexWidgetMain.remove();
    this.$indexWidget.remove();
    this.$indexWidget = null;
    this.$indexWidgetMain = null;
    this.$indexWidgetMainRow = null;
    this.records = null;
  },

  /**
   * 重置页面，销毁页面元素，重新获取数据并渲染界面
   */
  reset: function reset() {
    this.destroy();
    this.init();
  }
};
/**
 * 将元素数据列表映射为需要的数据列表
 *
 * @param {*} rawList 原始数据
 * @returns 处理后的数据
 */

function convertRecords(rawList) {
  return rawList.map(function (s) {
    return {
      semester: s.semester.replace(/^(\d+-\d+)-(.+)$/, '$1学年 $2学期').replace('1-1学期', '秋季学期').replace('2-1学期', '春季学期'),
      courses: s.courses // 根据 http://jwc.scu.edu.cn/detail/122/6891.htm 《网上登录成绩的通知》 的说明
      // 教师「暂存」的成绩学生不应看到
      // 因此为了和教务处成绩显示保持一致，这里只显示「已提交」的成绩
      // TODO: 考虑做开关，让用户决定看不看
      .filter(function (v) {
        return v[4] === '05';
      }).map(function (v) {
        return {
          name: v[11],
          score: v[8],
          level: v[17],
          gpa: getPointByScore(v[8], s.semester),
          credit: v[13],
          attribute: v[15],
          selected: false
        };
      }) // 分数可能为null
      .filter(function (v) {
        return v.score;
      })
    };
  }) // 不显示还没有课程成绩的学期
  .filter(function (v) {
    return v.courses && v.courses.length;
  }); // .reverse()
}
/**
 * 从总记录中提取出对应学期的课程列表
 *
 * @param {*} records 总记录
 * @param {string} semester 学期名称
 * @returns 课程列表
 */


function getSemesterCourses(records, semester) {
  return records.filter(function (v) {
    return v.semester === semester;
  })[0].courses;
}
/**
 * 计算加权平均数
 *
 * @param {*} arr 一个数组，每个对象包括数值(value)和权值(weight)
 * @returns 计算好的加权平均数
 */


function getWeightedAverage(arr) {
  return arr.reduce(function (acc, cur) {
    return [acc[0] + cur.value * cur.weight, acc[1] + cur.weight];
  }, [0, 0]).reduce(function (valueSum, weightSum) {
    return valueSum / weightSum;
  });
}
/**
 * 从一个课程数组里筛选出所有的必修课程
 *
 * @param {*} arr 一个课程数组
 * @returns 筛选出的只包括必修课程的数组
 */


function getCompulsoryCourse(arr) {
  return arr.filter(function (v) {
    return v.attribute === '必修';
  });
}
/**
 * 将课程数组映射为只包含gpa作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {*} arr 一个课程数组
 * @returns 一个只包含gpa作为数值，学分作为权值的对象数组
 */


function mapGPA(arr) {
  return arr.map(function (v) {
    return {
      value: v.gpa,
      weight: v.credit
    };
  });
}
/**
 * 将课程数组映射为只包含分数作为数值，学分作为权值的对象数组，用于加权平均数计算
 *
 * @param {*} arr 一个课程数组
 * @returns 一个只包含分数作为数值，学分作为权值的对象数组
 */


function mapScore(arr) {
  return arr.map(function (v) {
    return {
      value: v.score,
      weight: v.credit
    };
  });
}
/**
 * 将数值保留3位小数，再作为number返回
 *
 * @param {*} num 待处理的数字
 * @param {number} [fractionDigits=3] 保留小数位数
 * @returns 保留对应位数后的小数
 */


function reserveDigits(num) {
  var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return Number(num.toFixed(fractionDigits));
}
/**
 * 输入课程数组，得到必修加权平均绩点
 *
 * @param {*} arr 课程数组
 * @returns 必修加权平均绩点
 */


function getCompulsoryCoursesGPA(arr) {
  return reserveDigits(getWeightedAverage(mapGPA(getCompulsoryCourse(arr))));
}
/**
 * 输入课程数组，得到必修加权平均分
 *
 * @param {*} arr 课程数组
 * @returns 必修加权平均分
 */


function getCompulsoryCoursesScore(arr) {
  return reserveDigits(getWeightedAverage(mapScore(getCompulsoryCourse(arr))));
}
/**
 * 输入课程数组，得到全部课程加权平均绩点
 *
 * @param {*} arr 课程数组
 * @returns 全部课程加权平均绩点
 */


function getAllCoursesGPA(arr) {
  return reserveDigits(getWeightedAverage(mapGPA(arr)));
}
/**
 * 输入课程数组，得到全部课程加权平均分
 *
 * @param {*} arr 课程数组
 * @returns 全部课程加权平均分
 */


function getAllCoursesScore(arr) {
  return reserveDigits(getWeightedAverage(mapScore(arr)));
}
/**
 * 一次性获得必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 *
 * @param {*} arr 一个由课程对象组成的数组
 * @returns 必修加权平均分、必修加权平均绩点、全部课程加权平均分、全部课程加权平均绩点4个值
 */


function getFourTypesValue(arr) {
  return {
    compulsoryCoursesGPA: getCompulsoryCoursesGPA(arr),
    compulsoryCoursesScore: getCompulsoryCoursesScore(arr),
    allCoursesGPA: getAllCoursesGPA(arr),
    allCoursesScore: getAllCoursesScore(arr)
  };
}
/**
 * 根据分数返回对应的绩点
 *
 * @param {*} score 分数
 * @returns 绩点
 */


function getPointByScore(score, semester) {
  // 2017年起，川大修改了绩点政策，因此要检测学期的年份
  var enrollmentYear = Number(semester.match(/^\d+/)[0]);

  if (enrollmentYear >= 2017) {
    // 2017-2018秋季学期起使用如下标准（Fall Term 2017-2018~Present）
    if (score >= 90) {
      return 4;
    } else if (score >= 85) {
      return 3.7;
    } else if (score >= 80) {
      return 3.3;
    } else if (score >= 76) {
      return 3;
    } else if (score >= 73) {
      return 2.7;
    } else if (score >= 70) {
      return 2.3;
    } else if (score >= 66) {
      return 2;
    } else if (score >= 63) {
      return 1.7;
    } else if (score >= 61) {
      return 1.3;
    } else if (score >= 60) {
      return 1;
    } else {
      return 0;
    }
  } else {
    // 2017-2018秋季学期以前使用如下标准（Before Fall Term 2017-2018）
    if (score >= 95) {
      return 4;
    } else if (score >= 90) {
      return 3.8;
    } else if (score >= 85) {
      return 3.6;
    } else if (score >= 80) {
      return 3.2;
    } else if (score >= 75) {
      return 2.7;
    } else if (score >= 70) {
      return 2.2;
    } else if (score >= 65) {
      return 1.7;
    } else if (score >= 60) {
      return 1;
    } else {
      return 0;
    }
  }
}

var templates = {
  indexWidget: "\n    <div class=\"col-sm-12 widget-container-col\">\n      <div class=\"widget-box\">\n        <div class=\"widget-header\">\n          <h5 class=\"widget-title\">\n            \u6211\u7684\u6210\u7EE9\n            <span class=\"badge badge-primary\" style=\"padding-top:3px;position:relative;top:-3px;\">SCU URP \u52A9\u624B</span>\n          </h5>\n          <div class=\"widget-toolbar\">\n            <div class=\"widget-menu\">\n                <a id=\"gpa-toolbar-detail\" data-action=\"settings\" data-toggle=\"dropdown\">\n                    <i class=\"ace-icon fa fa-bars\"></i>\n                </a>\n                <a id=\"gpa-toolbar-reset\" data-action=\"reload\"\">\n                    <i class=\"ace-icon fa fa-refresh\"></i>\n                </a>\n            </div>\n          </div>\n        </div>\n        <div class=\"widget-body\">\n          <div class=\"widget-main\">\n            <div class=\"row\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
  totalTranscript: function totalTranscript(semestersQuantity, courses) {
    var _getFourTypesValue = getFourTypesValue(courses),
        allCoursesGPA = _getFourTypesValue.allCoursesGPA,
        allCoursesScore = _getFourTypesValue.allCoursesScore,
        compulsoryCoursesGPA = _getFourTypesValue.compulsoryCoursesGPA,
        compulsoryCoursesScore = _getFourTypesValue.compulsoryCoursesScore;

    var compulsoryCourses = getCompulsoryCourse(courses);
    var coursesQuantity = courses.length;
    var totalCourseCredits = courses.reduce(function (acc, cur) {
      return acc + cur.credit;
    }, 0);
    var compulsoryCoursesQuantity = compulsoryCourses.length;
    return "\n      <div class=\"gpa-tt row\" style=\"margin-bottom: 20px;\">\n        <div class=\"col-sm-12\">\n          <h4 class=\"header smaller lighter grey\" style=\"margin-top: 0;\">\n            <i class=\"menu-icon fa fa-calendar\"></i> \u5168\u90E8\u6210\u7EE9\n            <span\n              class=\"gpa-info-badge badge badge-yellow\"\n              title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\"\n            >\n              " + coursesQuantity + " \u95E8\n            </span>\n            <span\n              class=\"gpa-info-badge badge badge-yellow\"\n              title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + totalCourseCredits + " \u5B66\u5206\"\n            >\n              " + totalCourseCredits + " \u5B66\u5206\n            </span>\n            <span\n              class=\"gpa-info-badge gpa-info-badge-tt-selected-course-quantity badge badge-pink\"\n              title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u4E00\u5171\u9009\u4E2D\u4E86 0 \u95E8\u8BFE\u7A0B\"\n            >\n              0 \u95E8\n            </span>\n            <span\n              class=\"gpa-info-badge gpa-info-badge-tt-selected-course-credits badge badge-pink\"\n              title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u7684\u5168\u90E8\u8BFE\u7A0B\u603B\u5B66\u5206\u4E3A 0\"\n            >\n              0 \u5B66\u5206\n            </span>\n            <button class=\"btn btn-white btn-minier gpa-tt-select-all-btn\">\n              <i class=\"ace-icon fa fa-check green\"></i>\n              \u5168\u9009\n            </button>\n            <button class=\"btn btn-white btn-minier gpa-tt-cancel-btn\">\n              <i class=\"ace-icon fa fa-times red2\"></i>\n              \u5168\u4E0D\u9009\n            </button>\n          </h4>\n          <span\n            class=\"gpa-tt-tag label label-success\"\n            title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + compulsoryCoursesQuantity + " \u95E8\u5FC5\u4FEE\u8BFE\u7A0B\uFF0C\u5FC5\u4FEE\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + compulsoryCoursesScore + "\"\n          >\n            \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A" + compulsoryCoursesScore + "\n          </span>\n          <span\n            class=\"gpa-tt-tag label label-success\"\n            title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + compulsoryCoursesQuantity + " \u95E8\u5FC5\u4FEE\u8BFE\u7A0B\uFF0C\u5FC5\u4FEE\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + compulsoryCoursesGPA + "\"\n          >\n            \u5FC5\u4FEE\u7EE9\u70B9\uFF1A" + compulsoryCoursesGPA + "\n          </span>\n          <span\n            class=\"gpa-tt-tag label label-purple\"\n            title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\uFF0C\u5168\u90E8\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + allCoursesScore + "\"\n          >\n            \u5168\u90E8\u5E73\u5747\u5206\uFF1A" + allCoursesScore + "\n          </span>\n          <span\n            class=\"gpa-st-tag label label-purple\"\n            title=\"\u5728 " + semestersQuantity + " \u4E2A\u5B66\u671F\u4E2D\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\uFF0C\u5168\u90E8\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + allCoursesGPA + "\"\n          >\n            \u5168\u90E8\u7EE9\u70B9\uFF1A" + allCoursesGPA + "\n          </span>\n          <span class=\"gpa-tt-tag gpa-tt-tag-selected-score label label-pink\">\n            \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n          </span>\n          <span class=\"gpa-tt-tag gpa-tt-tag-selected-gpa label label-pink\">\n            \u6240\u6709\u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n          </span>\n        </div>\n      </div>\n    ";
  },
  semesterTranscriptHeader: function semesterTranscriptHeader(semester, courses) {
    var coursesQuantity = courses.length;
    var totalCourseCredits = courses.reduce(function (acc, cur) {
      return acc + cur.credit;
    }, 0);
    return '\n      <h4 class="header smaller lighter grey">\n        <i class="menu-icon fa fa-calendar"></i> ' + semester + "\n        <span class=\"gpa-info-badge badge badge-yellow\" title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\">" + coursesQuantity + " \u95E8</span>\n        <span class=\"gpa-info-badge badge badge-yellow\" title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + totalCourseCredits + " \u5B66\u5206\">" + totalCourseCredits + " \u5B66\u5206</span>\n        <span\n          class=\"gpa-info-badge gpa-info-badge-st-selected-course-quantity badge badge-pink\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u4E86 0 \u95E8\u8BFE\u7A0B\"\n          data-semester=\"" + semester + "\"\n        >\n          0 \u95E8\n        </span>\n        <span\n          class=\"gpa-info-badge gpa-info-badge-st-selected-course-credits badge badge-pink\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u5F53\u524D\u9009\u4E2D\u7684\u8BFE\u7A0B\u603B\u5B66\u5206\u4E3A 0\"\n          data-semester=\"" + semester + "\"\n        >\n          0 \u5B66\u5206\n        </span>\n        <button class=\"btn btn-white btn-minier gpa-st-select-all-btn\" data-semester=\"" + semester + "\">\n          <i class=\"ace-icon fa fa-check green\"></i>\n          \u5168\u9009\n        </button>\n        <button class=\"btn btn-white btn-minier gpa-st-cancel-btn\" data-semester=\"" + semester + "\">\n          <i class=\"ace-icon fa fa-times red2\"></i>\n          \u5168\u4E0D\u9009\n        </button>\n      </h4>\n    ";
  },
  semesterTranscriptLabels: function semesterTranscriptLabels(semester, courses) {
    var _getFourTypesValue2 = getFourTypesValue(courses),
        allCoursesGPA = _getFourTypesValue2.allCoursesGPA,
        allCoursesScore = _getFourTypesValue2.allCoursesScore,
        compulsoryCoursesGPA = _getFourTypesValue2.compulsoryCoursesGPA,
        compulsoryCoursesScore = _getFourTypesValue2.compulsoryCoursesScore;

    var compulsoryCourses = getCompulsoryCourse(courses);
    var coursesQuantity = courses.length;
    var compulsoryCoursesQuantity = compulsoryCourses.length;
    return "\n      <p>\n        <span\n          class=\"gpa-st-tag label label-success\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + compulsoryCoursesQuantity + " \u95E8\u5FC5\u4FEE\u8BFE\u7A0B\uFF0C\u5FC5\u4FEE\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + compulsoryCoursesScore + "\"\n        >\n          \u5FC5\u4FEE\u5E73\u5747\u5206\uFF1A" + compulsoryCoursesScore + "\n        </span>\n        <span\n          class=\"gpa-st-tag label label-success\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + compulsoryCoursesQuantity + " \u95E8\u5FC5\u4FEE\u8BFE\u7A0B\uFF0C\u5FC5\u4FEE\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + compulsoryCoursesGPA + "\"\n        >\n          \u5FC5\u4FEE\u7EE9\u70B9\uFF1A" + compulsoryCoursesGPA + "\n        </span>\n        <span\n          class=\"gpa-st-tag label label-purple\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\uFF0C\u52A0\u6743\u5E73\u5747\u5206\u4E3A " + allCoursesScore + "\"\n        >\n          \u5168\u90E8\u5E73\u5747\u5206\uFF1A" + allCoursesScore + "\n        </span>\n        <span\n          class=\"gpa-st-tag label label-purple\"\n          title=\"\u5728" + semester + "\uFF0C\u60A8\u4E00\u5171\u4FEE\u8BFB\u4E86 " + coursesQuantity + " \u95E8\u8BFE\u7A0B\uFF0C\u52A0\u6743\u5E73\u5747\u7EE9\u70B9\u4E3A " + allCoursesGPA + "\"\n        >\n          \u5168\u90E8\u7EE9\u70B9\uFF1A" + allCoursesGPA + '\n        </span>\n      </p>\n      <p>\n        <span class="gpa-st-tag gpa-st-tag-selected-score label label-pink" data-semester="' + semester + "\">\n        \u9009\u4E2D\u8BFE\u7A0B\u5E73\u5747\u5206\uFF1A0\n        </span>\n        <span class=\"gpa-st-tag gpa-st-tag-selected-gpa label label-pink\" data-semester=\"" + semester + "\">\n          \u9009\u4E2D\u8BFE\u7A0B\u7EE9\u70B9\uFF1A0\n        </span>\n      </p>\n    ";
  },
  semesterTranscriptContent: function semesterTranscriptContent(semester, courses) {
    var courseList = function courseList() {
      return courses.map(function (v) {
        return '\n            <tr\n              class="gpa-st-item"\n              data-semester="' + semester + '"\n              data-name="' + v.name + '"\n              data-score="' + v.score + '"\n              data-level="' + v.level + '"\n              data-gpa="' + v.gpa + '"\n              data-credit="' + v.credit + '"\n              data-attribute="' + v.attribute + '"\n            >\n              <td>' + v.name + '</td>\n              <td class="center">' + v.score + '</td>\n              <td class="center">' + v.level + '</td>\n              <td class="center">' + v.gpa + '</td>\n              <td class="center">' + v.credit + '</td>\n              <td class="center">' + v.attribute + '</td>\n            </tr>\n          ';
      }).join('');
    };

    return "\n      <table class=\"gpa-st-table table table-striped table-bordered table-hover\">\n        <thead>\n          <tr>\n            <th>\u8BFE\u7A0B\u540D</th>\n            <th class=\"center\">\u5206\u6570</th>\n            <th class=\"center\">\u7B49\u7EA7</th>\n            <th class=\"center\">\u7EE9\u70B9</th>\n            <th class=\"center\">\u5B66\u5206</th>\n            <th class=\"center\">\u5C5E\u6027</th>\n          </tr>\n        </thead>\n        <tbody>\n        " + courseList() + '\n        </tbody>\n      </table>\n    ';
  },
  semesterTranscriptWrapper: function semesterTranscriptWrapper(header, labels, content) {
    return '<div class="gpa-st col-sm-6">' + (header + labels + content) + '</div>';
  }
};
module.exports = gpa;
},{"babel-runtime/core-js/array/from":"VuZO","fs":"tuDi"}],"KUik":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"ozpD":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"3zRh","./_iter-call":"hEIm","./_is-array-iter":"af0K","./_an-object":"zotD","./_to-length":"S7IM","./core.get-iterator-method":"7AqT"}],"B1ls":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"zotD","./_a-function":"g31e","./_wks":"Ug9I"}],"o4G5":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"uzcO":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"3zRh","./_invoke":"o4G5","./_html":"ebIA","./_dom-create":"9kxq","./_global":"i1Q6","./_cof":"ShN9"}],"H109":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"i1Q6","./_task":"uzcO","./_cof":"ShN9"}],"AIlg":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"g31e"}],"kX4D":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"/cCi":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"i1Q6"}],"5Czc":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"zotD","./_is-object":"BxvP","./_new-promise-capability":"AIlg"}],"O6kh":[function(require,module,exports) {
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":"akPY"}],"FGzK":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"i1Q6","./_core":"zKeE","./_object-dp":"Gfzd","./_descriptors":"6MLN","./_wks":"Ug9I"}],"9kJF":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"1kq3","./_global":"i1Q6","./_ctx":"3zRh","./_classof":"ZHvQ","./_export":"vSO4","./_is-object":"BxvP","./_a-function":"g31e","./_an-instance":"KUik","./_for-of":"ozpD","./_species-constructor":"B1ls","./_task":"uzcO","./_microtask":"H109","./_new-promise-capability":"AIlg","./_perform":"kX4D","./_user-agent":"/cCi","./_promise-resolve":"5Czc","./_wks":"Ug9I","./_redefine-all":"O6kh","./_set-to-string-tag":"11Ut","./_set-species":"FGzK","./_core":"zKeE","./_iter-detect":"Lli7"}],"zaru":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"vSO4","./_core":"zKeE","./_global":"i1Q6","./_species-constructor":"B1ls","./_promise-resolve":"5Czc"}],"+CEt":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"vSO4","./_new-promise-capability":"AIlg","./_perform":"kX4D"}],"9u1Q":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/es6.object.to-string":"tuDi","../modules/es6.string.iterator":"i+u+","../modules/web.dom.iterable":"COf8","../modules/es6.promise":"9kJF","../modules/es7.promise.finally":"zaru","../modules/es7.promise.try":"+CEt","../modules/_core":"zKeE"}],"L3Vt":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":"9u1Q"}],"cOHw":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"vSO4","./_core":"zKeE","./_fails":"wLcK"}],"PDcB":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"mbLO","./_object-keys":"knrM","./_object-sap":"cOHw"}],"eOjq":[function(require,module,exports) {
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/es6.object.keys":"PDcB","../../modules/_core":"zKeE"}],"8FtN":[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":"eOjq"}],"QVnC":[function(require,module,exports) {
var global = arguments[3];
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],"QYzI":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":"QVnC"}],"aIIw":[function(require,module,exports) {
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":"QYzI"}],"kcQR":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"../core-js/promise":"L3Vt"}],"J+gl":[function(require,module,exports) {
'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var query = function () {
  var _ref = (0, _asyncToGenerator3.default)(
  /*#__PURE__*/
  _regenerator2.default.mark(function _callee() {
    var $, number, _ref2, info, list;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $ = window.$;
            number = $('#major').val();

            if (!(number !== '无')) {
              _context.next = 12;
              break;
            }

            showLoadingAnimation($);
            _context.next = 6;
            return getTrainingSchemeData(number, $);

          case 6:
            _ref2 = _context.sent;
            info = _ref2.info;
            list = _ref2.list;
            hideLoadingAnimation($);
            $('.training-scheme-wrapper').append(genInfoHTML(info));
            $('.training-scheme-wrapper').append(genSchemeHTML(list));

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function query() {
    return _ref.apply(this, arguments);
  };
}();

var selectSelfMajorAndQuery = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(
  /*#__PURE__*/
  _regenerator2.default.mark(function _callee2($) {
    var selfMajorNumber, selfSchemeInfo;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getSelfMajorNumber($);

          case 2:
            selfMajorNumber = _context2.sent;
            selfSchemeInfo = trainingSchemeList.filter(function (v) {
              return v[0] === selfMajorNumber;
            })[0];
            $('#grade').val(selfSchemeInfo[1]);
            $('#department').val(selfSchemeInfo[2]);
            updateMajorList();
            $('#major').val(selfSchemeInfo[0]);
            query();

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function selectSelfMajorAndQuery(_x) {
    return _ref3.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 培养方案查询插件


var fs = require('fs');

var trainingSchemeList = JSON.parse("[[\"10\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"1001\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1002\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1006\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"1007\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"1041\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"1042\",\"2010\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"1043\",\"2012\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"1062\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"1064\",\"2009\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"1086\",\"2012\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u82F1\u8BED\uFF09\"],[\"11\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"1102\",\"2012\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"1103\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"1104\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u73AF\u5883\uFF08\u82F1\u8BED\uFF09\"],[\"1128\",\"2009\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u4E8C\u5B66\u4F4D\uFF09\"],[\"1141\",\"2010\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u4E8C\u5B66\u4F4D\uFF09\"],[\"12\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"1201\",\"2011\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u4E8C\u5B66\u4F4D\uFF09\"],[\"121\",\"2009\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"1221\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"1241\",\"2012\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u4E8C\u5B66\u4F4D\uFF09\"],[\"13\",\"2011\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"1341\",\"2009\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"1342\",\"2009\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"1345\",\"2009\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"1348\",\"2009\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"14\",\"2011\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"1446\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"1463\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"1465\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"1466\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"1467\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"1468\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"1469\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"1470\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"1471\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"1472\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"1473\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"1475\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"1476\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"1477\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"1478\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"1479\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"1480\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"1483\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"1484\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"15\",\"2011\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"1501\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"1502\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"1503\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"1504\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"1505\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\u7C7B\"],[\"1506\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"1507\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"1508\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"1510\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"1512\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\u7C7B\"],[\"1514\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"1515\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"1516\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"1517\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"1518\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"1522\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"1523\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"1524\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"1525\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"1526\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"1527\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"1528\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"1529\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"1530\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"1531\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"1532\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"1533\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"1534\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"1535\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"1536\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"1537\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"1538\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"1539\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"1540\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"1541\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"1542\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"1543\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"1544\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u751F\u7269\u5316\u5DE5\u4E0E\u5236\u836F\u65B9\u5411\uFF09\"],[\"1545\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"1546\",\"2013\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"1547\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"1548\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"1549\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"1550\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"1551\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"1552\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"1553\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"1554\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"1555\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"1556\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"1557\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1558\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"1559\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"1560\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1561\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"1562\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"1563\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"1564\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"1565\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"1566\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"1567\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"1568\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"1569\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"1570\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"1571\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"1572\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"1573\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"1574\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"1575\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"1576\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"1577\",\"2013\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u4E66\u6CD5\u65B9\u5411\uFF09\"],[\"1581\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"1582\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"1583\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"1584\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"1585\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"1586\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"1587\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"1588\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"1589\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"1590\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"1591\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"1592\",\"2013\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"1593\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"1594\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"1595\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"1596\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1597\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"1598\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\"],[\"1599\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"16\",\"2011\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"1600\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"1601\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"1602\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"1603\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"1604\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"1605\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"1606\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"1607\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1608\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"1609\",\"2013\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"1610\",\"2013\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"1611\",\"2013\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"1612\",\"2013\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1613\",\"2013\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"1614\",\"2013\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"1615\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"1616\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1617\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"1618\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"1619\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"1620\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1621\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"1622\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"1623\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"1624\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"1625\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"1626\",\"2013\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"1641\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1642\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"1643\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"1644\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u7C7B\"],[\"1645\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"1646\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"1647\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"1648\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"1649\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"1651\",\"2013\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u6750\u6599\u65B9\u5411\uFF09\"],[\"1652\",\"2013\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u52A0\u5DE5\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"1653\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\uFF08\u6750\u6599\u7269\u7406\u3001\u6750\u6599\u5316\u5B66\uFF09\"],[\"1654\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"1655\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"1656\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"1657\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"1658\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"1659\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"1660\",\"2013\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"1661\",\"2013\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"1662\",\"2013\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"1663\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"1664\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"1665\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"1666\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"1667\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"1668\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"1669\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"1670\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"1671\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"1672\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"1673\",\"2013\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"1674\",\"2013\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"1676\",\"2013\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"1677\",\"2013\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"1679\",\"2013\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"1680\",\"2013\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"1681\",\"2013\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"1682\",\"2013\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"17\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\u7C7B\"],[\"1701\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"1742\",\"2013\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"1747\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1762\",\"2012\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1763\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"1769\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1770\",\"2013\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1771\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"1772\",\"2013\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1773\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1774\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1775\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1776\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1777\",\"2013\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1778\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1779\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1780\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1781\",\"2013\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1782\",\"2013\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1783\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1784\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1785\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"1786\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u4FDD\u5BC6\u6280\u672F\u65B9\u5411\uFF09\"],[\"1789\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u6587\u5316\u521B\u610F\u4E0E\u6587\u5316\u4EA7\u4E1A\u65B9\u5411\uFF09\"],[\"1790\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u6587\u5316\u521B\u610F\u4E0E\u6587\u5316\u4EA7\u4E1A\u65B9\u5411\uFF09\"],[\"1791\",\"2013\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"1792\",\"2013\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"1793\",\"2013\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"18\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"1809\",\"2013\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"1810\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"1812\",\"2013\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"1813\",\"2013\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"182\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"19\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"2\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"20\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"201\",\"2004\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"21\",\"2010\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"22\",\"2010\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"222\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"223\",\"2005\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"225\",\"2005\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"23\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"24\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"241\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"242\",\"2006\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"2442\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"2443\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"2444\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"2445\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"2446\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"2447\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"2448\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"2449\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"2450\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"2451\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"2452\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"2453\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"2454\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"2455\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"2456\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"2457\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"2458\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"2459\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"2460\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"2461\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"2462\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"2463\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"2464\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"2465\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u751F\u7269\u5316\u5DE5\u4E0E\u5236\u836F\u65B9\u5411\uFF09\"],[\"2466\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"2467\",\"2014\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"2468\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"2469\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"2470\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"2471\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"2472\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"2473\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"2474\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"2475\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"2476\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"2477\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2478\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"2480\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"2481\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"2482\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"2483\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"2485\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"2486\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"2487\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"2488\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"2490\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"2491\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"2492\",\"2014\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"2493\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"2494\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"2495\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"2496\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2497\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"2498\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\"],[\"2499\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"25\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"2500\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"2501\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"2502\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"2504\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\uFF08\u6750\u6599\u7269\u7406\u3001\u6750\u6599\u5316\u5B66\uFF09\"],[\"2505\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"2506\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"2507\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"2508\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"2509\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"2510\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"2511\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"2512\",\"2014\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2513\",\"2014\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"2514\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"2515\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"2516\",\"2014\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"2517\",\"2014\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"2518\",\"2014\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"2519\",\"2014\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"2520\",\"2014\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"2521\",\"2014\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"2522\",\"2014\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"2523\",\"2014\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"2524\",\"2014\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"2525\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2526\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"2527\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"2528\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"2529\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"2530\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"2531\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"2532\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"2533\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"2534\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"2535\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"2536\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"2537\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"2538\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"2539\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"2540\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"2541\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"2542\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"2543\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"2544\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"2545\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"2546\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"2547\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"2548\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"2549\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"2550\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"2551\",\"2014\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u4E66\u6CD5\u65B9\u5411\uFF09\"],[\"2552\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"2553\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2555\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2556\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2557\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"2558\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"2559\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\u7C7B\"],[\"2560\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"2561\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"2562\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"2563\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"2564\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"2565\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\u7C7B\"],[\"2566\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"2567\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2568\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"2570\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"2571\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"2572\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"2573\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2574\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"2575\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"2576\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2577\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"2578\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2579\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"2580\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"2581\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"2582\",\"2014\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"2583\",\"2014\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"2584\",\"2014\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"2585\",\"2014\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2586\",\"2014\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2587\",\"2014\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"2588\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"2589\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"2590\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"2591\",\"2014\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"2592\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"2593\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2594\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2595\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2596\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"2597\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u7C7B\"],[\"2598\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"2599\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"26\",\"2010\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"2600\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"2601\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"2602\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"2603\",\"2014\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2604\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2605\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2607\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2608\",\"2014\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2609\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"261\",\"2006\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"2610\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2611\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2612\",\"2014\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2613\",\"2014\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2614\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2615\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2616\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2617\",\"2014\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u4FDD\u5BC6\u6280\u672F\u65B9\u5411\uFF09\"],[\"2618\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2619\",\"2014\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"2620\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"2621\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"2622\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"2623\",\"2014\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"2624\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"2625\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"2626\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"2627\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"2628\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"2629\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"2630\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2631\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"2632\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"2633\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"2634\",\"2014\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"2635\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2636\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2637\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"2638\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2639\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u6587\u5316\u521B\u610F\u4E0E\u6587\u5316\u4EA7\u4E1A\u65B9\u5411\uFF09\"],[\"2640\",\"2014\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"2641\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"2642\",\"2014\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"2643\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2644\",\"2014\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2649\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"2670\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"2671\",\"2014\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"2672\",\"2014\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"2687\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"2696\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u65B0\u95FB\u4F20\u5A92\u4E0E\u7ECF\u6D4E\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"27\",\"2010\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"2701\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2702\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2703\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2705\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2706\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2707\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2710\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"2711\",\"2014\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"2718\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2723\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2724\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2725\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2726\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u6587\u5316\u7ECF\u8425\u7BA1\u7406\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2729\",\"2012\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2730\",\"2012\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2731\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2733\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2734\",\"2012\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2735\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u6587\u5316\u7ECF\u8425\u7BA1\u7406\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2736\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u6587\u5316\u521B\u610F\u521B\u4F5C\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2738\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"2739\",\"2013\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"2741\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"2743\",\"2014\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"2751\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"2758\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2759\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2760\",\"2013\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2761\",\"2013\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2762\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"2763\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"2764\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"2765\",\"2015\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"2767\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"2768\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"2769\",\"2013\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2770\",\"2013\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2771\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2772\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2773\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2774\",\"2013\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2775\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2776\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2777\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2778\",\"2013\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u6587\u5316\u7ECF\u8425\u7BA1\u7406\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2779\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2780\",\"2013\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2781\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u65B0\u95FB\u4F20\u5A92\u4E0E\u7ECF\u6D4E\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2783\",\"2013\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2785\",\"2013\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2788\",\"2013\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"2789\",\"2015\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"2790\",\"2015\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"2791\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"2792\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"2793\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"2794\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"2795\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"2796\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"2797\",\"2015\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"2798\",\"2015\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"2799\",\"2015\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"28\",\"2010\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"2800\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2801\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"2802\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"2803\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"2804\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"2805\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"2806\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"2807\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"2808\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"2809\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"2810\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"2811\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"2812\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2813\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"2814\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"2815\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"2816\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"2817\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"2818\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"2819\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"2820\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"2821\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"2822\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"2823\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"2824\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"2825\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"2826\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"2827\",\"2015\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u4E66\u6CD5\u65B9\u5411\uFF09\"],[\"2828\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"2830\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"2831\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"2832\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"2833\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"2834\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"2836\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"2837\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2838\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"2840\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"2841\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"2842\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"2843\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2844\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"2845\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"2846\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"2847\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"2848\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"2849\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"2850\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"2851\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"2852\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u7C7B\"],[\"2853\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"2854\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"2855\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"2856\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"2857\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"2858\",\"2015\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2859\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2860\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2862\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2863\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2864\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2865\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2866\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2867\",\"2015\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2868\",\"2015\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2869\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2870\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2871\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2872\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u4FDD\u5BC6\u6280\u672F\u65B9\u5411\uFF09\"],[\"2873\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2874\",\"2015\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"2875\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"2876\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"2877\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"2878\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"2879\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"2880\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"2881\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"2882\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"2883\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"2884\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"2885\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2886\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"2887\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"2888\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"2890\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2891\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2893\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"2895\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"2896\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"2897\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"2898\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"2899\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"29\",\"2010\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"2901\",\"2015\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"2902\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"2903\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2904\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2905\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"2906\",\"2015\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"2907\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"2908\",\"2015\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"2909\",\"2015\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"2910\",\"2015\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"2911\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"2912\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"2913\",\"2015\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"2914\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"2915\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"2916\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"2917\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"2918\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"2919\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"2920\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"2921\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"2922\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"2923\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"2924\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"2925\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"2926\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"2927\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"2928\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"2929\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"2930\",\"2015\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u751F\u7269\u5316\u5DE5\u4E0E\u5236\u836F\u65B9\u5411\uFF09\"],[\"2931\",\"2015\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"2932\",\"2015\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"2933\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"2934\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"2935\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"2936\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"2937\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"2938\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"2939\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"2940\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"2941\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2942\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2944\",\"2015\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"2945\",\"2015\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"2946\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"2947\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2949\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2950\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2951\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"2952\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"2953\",\"2015\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"2954\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"2955\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"2956\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"2957\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"2958\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"2959\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"2960\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"2961\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"2962\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"2963\",\"2015\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"2964\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"2965\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"2966\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"2967\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2968\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"2969\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\"],[\"2970\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"2971\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"2972\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"2973\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"2974\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\uFF08\u6750\u6599\u7269\u7406\u3001\u6750\u6599\u5316\u5B66\uFF09\"],[\"2975\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"2976\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"2977\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"2978\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"2979\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"2980\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"2981\",\"2015\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2982\",\"2015\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"2983\",\"2015\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"2984\",\"2015\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"2985\",\"2015\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"2987\",\"2015\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"2988\",\"2015\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"2989\",\"2015\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"2990\",\"2015\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"2991\",\"2015\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"2993\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u542C\u529B\u4E0E\u8A00\u8BED\u5EB7\u590D\u65B9\u5411\uFF09\"],[\"2994\",\"2015\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"2995\",\"2015\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"2996\",\"2014\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"2998\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"30\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\u7C7B\"],[\"3002\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"3003\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"3005\",\"2013\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"3011\",\"2015\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3013\",\"2014\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"302\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3029\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3050\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3051\",\"2013\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3058\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3059\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3060\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3061\",\"2014\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3062\",\"2014\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3063\",\"2014\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3064\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3065\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3066\",\"2014\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u65B0\u95FB\u4F20\u5A92\u4E0E\u7ECF\u6D4E\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3067\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3068\",\"2014\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3069\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3070\",\"2014\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3071\",\"2014\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3072\",\"2014\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3073\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3074\",\"2014\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3075\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3076\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3078\",\"2014\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3079\",\"2015\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"3090\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3093\",\"2016\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3094\",\"2016\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3095\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3096\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"3097\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"3098\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"31\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"3100\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"3102\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"3103\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"3105\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3106\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3108\",\"2016\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"3110\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F51\u7EDC\u4E0E\u65B0\u5A92\u4F53\"],[\"3113\",\"2016\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u5DE5\u7A0B\"],[\"3114\",\"2016\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u98DE\u884C\u5668\u63A7\u5236\u4E0E\u4FE1\u606F\u5DE5\u7A0B\"],[\"3129\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"3130\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3131\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3132\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"3133\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"3134\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"3135\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"3136\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"3137\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"3138\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"3139\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"3140\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"3141\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"3142\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"3143\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"3144\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"3145\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"3146\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"3147\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"3149\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"3150\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"3151\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"3152\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"3153\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"3154\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"3155\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"3157\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u751F\u7269\u5316\u5DE5\u4E0E\u5236\u836F\u65B9\u5411\uFF09\"],[\"3158\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"3159\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"3160\",\"2016\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"3161\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"3162\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"3163\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"3164\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"3165\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"3166\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"3167\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"3168\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"3169\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3170\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3171\",\"2016\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"3172\",\"2016\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"3173\",\"2016\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"3174\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"3175\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3176\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3177\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3178\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"3179\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3180\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"3181\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"3182\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"3183\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"3184\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"3185\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"3186\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"3187\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"3188\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"3189\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"3190\",\"2016\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"3191\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"3192\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"3193\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"3194\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3195\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"3197\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"3198\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"3199\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"32\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"3200\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"3201\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\uFF08\u6750\u6599\u7269\u7406\u3001\u6750\u6599\u5316\u5B66\uFF09\"],[\"3202\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"3203\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"3204\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"3205\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"3206\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"3207\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"3208\",\"2016\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3209\",\"2016\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"3210\",\"2016\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"3211\",\"2016\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"3212\",\"2016\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"3213\",\"2016\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"3214\",\"2016\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3215\",\"2016\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3216\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"3217\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"3218\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"3220\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"3221\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"3222\",\"2016\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"3223\",\"2016\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"3224\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"3225\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"3226\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"3227\",\"2016\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"3228\",\"2016\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3229\",\"2016\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3230\",\"2016\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"3231\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"3232\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"3233\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"3234\",\"2016\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"3235\",\"2016\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"3236\",\"2016\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"3237\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3238\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"3239\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"3240\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"3241\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"3242\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u542C\u529B\u4E0E\u8A00\u8BED\u5EB7\u590D\u65B9\u5411\uFF09\"],[\"3243\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"3244\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3246\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"3247\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"3248\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"3249\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"3250\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3251\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"3252\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"3253\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"3254\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"3255\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"3256\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"3257\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"3258\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"3259\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"3260\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"3261\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"3262\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"3265\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"3267\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"3268\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"3269\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"3270\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"3271\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"3272\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"3273\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"3274\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3275\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"3277\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"3278\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"3279\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"3280\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3281\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"3282\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"3283\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"3284\",\"2016\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"3285\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"3286\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"3287\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"3288\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"3289\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u7C7B\"],[\"3290\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"3291\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3292\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3293\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"3294\",\"2016\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"3295\",\"2016\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3296\",\"2016\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3297\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3299\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"33\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"3300\",\"2016\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3301\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3302\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3303\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3304\",\"2016\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3305\",\"2016\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3306\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3307\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3308\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3309\",\"2016\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\uFF08\u4FDD\u5BC6\u6280\u672F\u65B9\u5411\uFF09\"],[\"3310\",\"2016\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3311\",\"2016\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"3312\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"3313\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"3314\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"3315\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"3316\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"3317\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"3318\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"3319\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"3320\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"3321\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"3322\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3323\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"3324\",\"2016\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"3325\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\uFF08\u52A9\u4EA7\u65B9\u5411\uFF09\"],[\"3326\",\"2016\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\"],[\"3327\",\"2016\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"3331\",\"2016\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u7C7B\"],[\"3333\",\"2014\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"3334\",\"2016\u7EA7\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\u5B66\u9662\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\"],[\"3360\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3361\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3362\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3363\",\"2015\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3364\",\"2015\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3365\",\"2015\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3366\",\"2015\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u65B0\u95FB\u4F20\u5A92\u4E0E\u7ECF\u6D4E\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3369\",\"2015\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3370\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3371\",\"2015\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3372\",\"2015\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3373\",\"2015\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3374\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3375\",\"2015\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3376\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3377\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3378\",\"2015\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3379\",\"2016\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"3382\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"34\",\"2009\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3409\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"3410\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"3411\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"3413\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3414\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3416\",\"2017\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"3417\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"3418\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3419\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"3420\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"3421\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"3422\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"3423\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"3424\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"3425\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"3426\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"3427\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"3428\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"3429\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"3430\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"3431\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"3432\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3433\",\"2017\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3436\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"3437\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"3438\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"3440\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"3442\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"3443\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3444\",\"2017\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"3445\",\"2017\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u5DE5\u7A0B\"],[\"3446\",\"2017\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u98DE\u884C\u5668\u63A7\u5236\u4E0E\u4FE1\u606F\u5DE5\u7A0B\"],[\"3447\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F51\u7EDC\u4E0E\u65B0\u5A92\u4F53\"],[\"3448\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"3449\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"3450\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"3451\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"3452\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3453\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"3454\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"3455\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"3456\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"3457\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"3458\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"3459\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"3460\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"3461\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"3463\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"3464\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"3465\",\"2017\u7EA7\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\u5B66\u9662\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\"],[\"3466\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"3467\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"3468\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"3469\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"3470\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"3471\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"3472\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"3473\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"3474\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3477\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"3478\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"3479\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"3480\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3481\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"3482\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"3483\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"3484\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"3485\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"3486\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"3487\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"3488\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"3490\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"3491\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3492\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3493\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"3494\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"3495\",\"2017\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3496\",\"2017\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3497\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"35\",\"2009\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"3500\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3501\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3502\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3503\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3504\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3505\",\"2017\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3506\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3507\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3510\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3511\",\"2017\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"3512\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"3513\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"3514\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"3515\",\"2017\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u7C7B\"],[\"3516\",\"2017\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"3517\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"3518\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"3519\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"3520\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"3521\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"3522\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"3523\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"3524\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3525\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"3526\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"3527\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\uFF08\u52A9\u4EA7\u65B9\u5411\uFF09\"],[\"3528\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\"],[\"3529\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"3530\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"3531\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"3532\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"3533\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"3534\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"3535\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"3536\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"3537\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"3538\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u751F\u7269\u5316\u5DE5\u4E0E\u5236\u836F\u65B9\u5411\uFF09\"],[\"3539\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"3540\",\"2017\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"3541\",\"2017\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"3542\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"3543\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"3544\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"3545\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"3546\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"3547\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"3548\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"3549\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"3550\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3551\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3552\",\"2017\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"3554\",\"2017\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"3555\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"3556\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3557\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3558\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3559\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"3560\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"3562\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"3563\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"3564\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"3565\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"3566\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"3567\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"3568\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"3569\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"3570\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"3571\",\"2017\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"3572\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"3573\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"3574\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"3575\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3576\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"3577\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"3578\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"3579\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"3580\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"3581\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\uFF08\u6750\u6599\u7269\u7406\u3001\u6750\u6599\u5316\u5B66\uFF09\"],[\"3582\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"3583\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"3584\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"3585\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"3586\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"3587\",\"2017\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"3588\",\"2017\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3589\",\"2017\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"3590\",\"2017\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"3591\",\"2017\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"3592\",\"2017\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"3593\",\"2017\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"3594\",\"2017\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3595\",\"2017\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"3596\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"3597\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"3598\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"3599\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"36\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"3600\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"3601\",\"2017\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"3602\",\"2017\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"3603\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"3604\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"3605\",\"2017\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"3606\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"3607\",\"2017\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"3608\",\"2017\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"3609\",\"2017\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"3610\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"3611\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"3612\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"3613\",\"2017\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"3614\",\"2017\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"3615\",\"2017\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"3616\",\"2017\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"3617\",\"2017\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"3618\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"3619\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"3620\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"3621\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u542C\u529B\u4E0E\u8A00\u8BED\u5EB7\u590D\u65B9\u5411\uFF09\"],[\"3622\",\"2017\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"3623\",\"2017\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"3654\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u8868\u6F14\uFF08\u58F0\u4E50\uFF09\"],[\"3655\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E2D\u56FD\u753B\"],[\"3656\",\"2017\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E66\u6CD5\u5B66\"],[\"3657\",\"2015\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"3660\",\"2016\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"3661\",\"2017\u7EA7\",\"\u56FD\u9645\u5173\u7CFB\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"3672\",\"2017\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"3675\",\"2015\u7EA7\",\"\u751F\u7269\u6CBB\u7597\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\",\"\u534E\u897F\u751F\u7269\u56FD\u91CD\u521B\u65B0\u73ED\"],[\"3676\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u56FE\u4E66\u60C5\u62A5\u4E0E\u6863\u6848\u7BA1\u7406\u7C7B\"],[\"3677\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u7C7B\"],[\"3679\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u7C7B\"],[\"3680\",\"2017\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u7C7B\"],[\"3681\",\"2017\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5DE5\u4E0E\u5236\u836F\u7C7B\"],[\"37\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"3702\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CE2\u5170\u8BED\uFF08\u7ECF\u6D4E\u65B9\u5411\uFF09\"],[\"3703\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CE2\u5170\u8BED\uFF08\u56FD\u9645\u5173\u7CFB\u65B9\u5411\uFF09\"],[\"3774\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u8D85\u58F0\u533B\u5B66\u6280\u672F\u65B9\u5411\uFF09\"],[\"3796\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3797\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"38\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"3800\",\"2016\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3801\",\"2016\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3802\",\"2016\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3803\",\"2016\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u65B0\u95FB\u4F20\u5A92\u4E0E\u7ECF\u6D4E\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3804\",\"2016\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3805\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3806\",\"2016\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3807\",\"2016\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3809\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3810\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3811\",\"2016\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3812\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3813\",\"2016\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"3814\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u8D85\u58F0\u533B\u5B66\u6280\u672F\u65B9\u5411\uFF09\"],[\"39\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"40\",\"2009\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"41\",\"2009\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"42\",\"2009\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"4254\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"4255\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"4256\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"4257\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"4258\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4260\",\"2018\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u5DE5\u7A0B\"],[\"4261\",\"2018\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u98DE\u884C\u5668\u63A7\u5236\u4E0E\u4FE1\u606F\u5DE5\u7A0B\"],[\"4262\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F51\u7EDC\u4E0E\u65B0\u5A92\u4F53\"],[\"4263\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"4264\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"4265\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4266\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4267\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4268\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4269\",\"2018\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4270\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4271\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4272\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4273\",\"2018\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"4274\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"4275\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"4276\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u80FD\u6E90\u5E94\u7528\u5DE5\u7A0B\"],[\"4277\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"4278\",\"2018\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u7C7B\"],[\"4279\",\"2018\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"428\",\"2009\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"4281\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u98CE\u666F\u56ED\u6797\"],[\"4282\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"4283\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"4284\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"4285\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"4287\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6392\u6C34\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"4288\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"4289\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u4E61\u89C4\u5212\"],[\"4290\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\uFF08\u52A9\u4EA7\u65B9\u5411\uFF09\"],[\"4291\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\"],[\"4292\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"4293\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"4294\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"4295\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"4296\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"4297\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"4298\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"4299\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"43\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\u7C7B\"],[\"4300\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"4302\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"4303\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"4304\",\"2018\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"4305\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"4306\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"4307\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"4308\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"4309\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"4310\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"4311\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"4312\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"4313\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4314\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4315\",\"2018\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"4316\",\"2018\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"4317\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"4318\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"4319\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4320\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4321\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"4322\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"4323\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"4324\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"4325\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"4326\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"4327\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"4328\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"4329\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"4330\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"4331\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"4332\",\"2018\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"4333\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"4334\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"4335\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"4336\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4337\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"4338\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"4339\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"4340\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"4341\",\"2018\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"4343\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"4344\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"4345\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"4346\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"4347\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"4348\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"4349\",\"2018\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4350\",\"2018\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"4351\",\"2018\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"4352\",\"2018\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"4353\",\"2018\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"4354\",\"2018\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"4355\",\"2018\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"4356\",\"2018\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"4357\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"4358\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"4359\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"4360\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"4361\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"4362\",\"2018\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"4363\",\"2018\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"4364\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"4365\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"4366\",\"2018\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4367\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"4368\",\"2018\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"4369\",\"2018\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4370\",\"2018\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"4371\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"4372\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"4373\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"4374\",\"2018\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"4377\",\"2018\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"4378\",\"2018\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"4379\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4380\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"4381\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"4382\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"4383\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"4384\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u542C\u529B\u4E0E\u8A00\u8BED\u5EB7\u590D\u65B9\u5411\uFF09\"],[\"4385\",\"2018\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"4386\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"4388\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"4389\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"4390\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"4391\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4392\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4393\",\"2018\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"4394\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"4395\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4396\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"4397\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4398\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"4399\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"44\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"4400\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"4402\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"4403\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\"],[\"4404\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"4405\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"4406\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"4407\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"4408\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"4409\",\"2018\u7EA7\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\u5B66\u9662\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\"],[\"4410\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"4411\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"4412\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"4413\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"4414\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"4415\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"4416\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"4417\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"4418\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"4419\",\"2018\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"4420\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u7C7B\"],[\"4421\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"4422\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"4423\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"4425\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"4426\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"4427\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"4428\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"4429\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"4431\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"4432\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"4433\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"4434\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4435\",\"2018\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"4436\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"4437\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\u5B66\"],[\"4438\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"4439\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"4441\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u7C7B\"],[\"4442\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u7C7B\"],[\"4443\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u7C7B\"],[\"4444\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5DE5\u4E0E\u5236\u836F\u7C7B\"],[\"4445\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"4446\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"4447\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4448\",\"2018\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"4449\",\"2018\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4450\",\"2018\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4451\",\"2018\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"4452\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"4453\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"4454\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"4455\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"4456\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"4457\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"4458\",\"2018\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4459\",\"2018\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4460\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"4461\",\"2018\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"4462\",\"2018\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"4463\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4465\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4466\",\"2018\u7EA7\",\"\u56FD\u9645\u5173\u7CFB\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"4468\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E66\u6CD5\u5B66\"],[\"4469\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u8868\u6F14\uFF08\u58F0\u4E50\uFF09\"],[\"4470\",\"2018\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E2D\u56FD\u753B\"],[\"4471\",\"2018\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"4472\",\"2018\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u7C7B\"],[\"4473\",\"2018\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u6863\u6848\u7BA1\u7406\u7C7B\"],[\"4475\",\"2016\u7EA7\",\"\u751F\u7269\u6CBB\u7597\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\",\"\u534E\u897F\u751F\u7269\u56FD\u91CD\u521B\u65B0\u73ED\"],[\"4476\",\"2017\u7EA7\",\"\u751F\u7269\u6CBB\u7597\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\",\"\u534E\u897F\u751F\u7269\u56FD\u91CD\u521B\u65B0\u73ED\"],[\"4477\",\"2018\u7EA7\",\"\u751F\u7269\u6CBB\u7597\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\",\"\u534E\u897F\u751F\u7269\u56FD\u91CD\u521B\u65B0\u73ED\"],[\"4478\",\"2016\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"4480\",\"2015\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"4494\",\"2018\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u7C7B\"],[\"4497\",\"2018\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\"],[\"4498\",\"2016\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\uFF08\u6570\u636E\u79D1\u5B66\u4E0E\u5927\u6570\u636E\u6280\u672F\u65B9\u5411\uFF09\"],[\"45\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"4500\",\"2018\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\uFF08\u6570\u636E\u79D1\u5B66\u4E0E\u5927\u6570\u636E\u6280\u672F\u65B9\u5411\uFF09\"],[\"4502\",\"2018\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u8D85\u58F0\u533B\u5B66\u6280\u672F\u65B9\u5411\uFF09\"],[\"4505\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\uFF09\"],[\"4536\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4537\",\"2017\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4538\",\"2017\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4539\",\"2017\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u77E5\u8BC6\u4EA7\u6743\u65B9\u5411\uFF09\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4540\",\"2017\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4541\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4542\",\"2017\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4543\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4544\",\"2017\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4545\",\"2017\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4546\",\"2017\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4547\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4548\",\"2017\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4549\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4550\",\"2017\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4575\",\"2018\u7EA7\",\"\u9884\u79D1\u6559\u80B2\",\"\u5C11\u6570\u6C11\u65CF\u9884\u79D1\uFF08\u6587\u79D1\uFF09\"],[\"4577\",\"2018\u7EA7\",\"\u9884\u79D1\u6559\u80B2\",\"\u5C11\u6570\u6C11\u65CF\u9884\u79D1\uFF08\u7406\u79D1\uFF09\"],[\"4594\",\"2018\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"461\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"4616\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4617\",\"2018\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"4618\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"4619\",\"2019\u7EA7\",\"\u9884\u79D1\u6559\u80B2\",\"\u5C11\u6570\u6C11\u65CF\u9884\u79D1\uFF08\u6587\u79D1\uFF09\"],[\"4620\",\"2019\u7EA7\",\"\u9884\u79D1\u6559\u80B2\",\"\u5C11\u6570\u6C11\u65CF\u9884\u79D1\uFF08\u7406\u79D1\uFF09\"],[\"4621\",\"2019\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"4622\",\"2019\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\u6280\u672F\"],[\"4623\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"4624\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"4625\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"4626\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4627\",\"2019\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"4628\",\"2019\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4629\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"4631\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"4632\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"4633\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"47\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"48\",\"2008\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"49\",\"2008\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"5\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"50\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"501\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"51\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"52\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"523\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"5297\",\"2017\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\u521B\u65B0\u73ED\uFF09\"],[\"53\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"5314\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\u7C7B\"],[\"5315\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"5316\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"5317\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"5318\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"5319\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"5320\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5322\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"5323\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"5324\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u7C7B\"],[\"5325\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5327\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"5328\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"5329\",\"2019\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"5330\",\"2019\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5331\",\"2019\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"5332\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u8868\u6F14\uFF08\u58F0\u4E50\uFF09\"],[\"5333\",\"2019\u7EA7\",\"\u56FD\u9645\u5173\u7CFB\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"5334\",\"2019\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"5335\",\"2019\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\u4E0E\u68C0\u75AB\"],[\"5336\",\"2019\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"5337\",\"2019\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"5338\",\"2019\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"5339\",\"2019\u7EA7\",\"\u56DB\u5DDD\u5927\u5B66\u5339\u5179\u5821\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u56FD\u9645\u5408\u4F5C\uFF09\"],[\"5340\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u91D1\u878D\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"5341\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\uFF08\u6570\u636E\u79D1\u5B66\u4E0E\u5927\u6570\u636E\u6280\u672F\u65B9\u5411\uFF09\"],[\"5342\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"5343\",\"2019\u7EA7\",\"\u56FD\u9645\u4EA4\u6D41\u6691\u671F\u5B66\u9662\",\"\u56FD\u9645\u4EA4\u6D41\"],[\"5344\",\"2019\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"5345\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"5346\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"5347\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u8BA1\u7B97\u751F\u7269\u4EA4\u53C9\u8BD5\u9A8C\u73ED\"],[\"5349\",\"2019\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"5350\",\"2019\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5352\",\"2019\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"5353\",\"2019\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5354\",\"2019\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"5355\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"5356\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"5357\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"5358\",\"2019\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"5359\",\"2019\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"5360\",\"2019\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"5361\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u542C\u529B\u4E0E\u8A00\u8BED\u5EB7\u590D\u65B9\u5411\uFF09\"],[\"5363\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"5364\",\"2019\u7EA7\",\"\u751F\u7269\u6CBB\u7597\u56FD\u5BB6\u91CD\u70B9\u5B9E\u9A8C\u5BA4\",\"\u534E\u897F\u751F\u7269\u56FD\u91CD\u521B\u65B0\u73ED\"],[\"5365\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"5366\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"5367\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5368\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5371\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"5372\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"5373\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"5374\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u73AF\u5883\u8BBE\u8BA1\"],[\"5375\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"5378\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u91D1\u878D\u65B9\u5411\uFF09\"],[\"5379\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F51\u7EDC\u4E0E\u65B0\u5A92\u4F53\"],[\"5380\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"5381\",\"2019\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5382\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5383\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5384\",\"2019\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u82F1\u8BED\uFF09\"],[\"5385\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\"],[\"5387\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"5388\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"5389\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u7C7B\"],[\"5391\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"5392\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"5395\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u773C\u89C6\u5149\u5B66\"],[\"5397\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u653E\u5C04\u6CBB\u7597\u6280\u672F\u65B9\u5411\uFF09\"],[\"5398\",\"2019\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u7C7B\"],[\"54\",\"2008\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"5400\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5401\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"5403\",\"2019\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"5410\",\"2019\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"5412\",\"2019\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"5413\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"5414\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"5416\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\uFF08\u52A9\u4EA7\u65B9\u5411\uFF09\"],[\"5417\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"5418\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"5419\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"5420\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"5421\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"5422\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"5423\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"5424\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"5425\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"5427\",\"2019\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5428\",\"2019\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\uFF08\u5353\u8D8A\u6CD5\u5F8B\u4EBA\u624D\u8BA1\u5212\u6D89\u5916\u5B9E\u9A8C\u73ED\uFF09\"],[\"5429\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u5F71\u50CF\u6280\u672F\uFF08\u8D85\u58F0\u533B\u5B66\u6280\u672F\u65B9\u5411\uFF09\"],[\"5431\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u7C7B\"],[\"5432\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\uFF09\"],[\"5433\",\"2019\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u53E3\u8154\u533B\u5B66\u65B9\u5411\uFF09\"],[\"5434\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u7C7B\"],[\"5436\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"5440\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5441\",\"2019\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5442\",\"2019\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\u6280\u672F\"],[\"5443\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"5444\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u8868\u6F14\"],[\"5445\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\"],[\"5446\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E66\u6CD5\u5B66\"],[\"5447\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u4E2D\u56FD\u753B\"],[\"5448\",\"2019\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u89C6\u89C9\u4F20\u8FBE\u8BBE\u8BA1\"],[\"5449\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"5450\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"5452\",\"2019\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"5453\",\"2019\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"5454\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"5455\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5456\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"5457\",\"2019\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5459\",\"2019\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"5460\",\"2019\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"5461\",\"2019\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5465\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"5466\",\"2019\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u98DF\u54C1\u536B\u751F\u4E0E\u8425\u517B\u5B66\"],[\"5467\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"5470\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u7535\u4FE1\u606F\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"5471\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"5472\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"5473\",\"2019\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"5474\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u56FD\u9645\u6559\u80B2\"],[\"5475\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u5B66\"],[\"5476\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"5477\",\"2019\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"5484\",\"2019\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"5487\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"5488\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"5489\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"5490\",\"2019\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u5B66\u4F4D\uFF09\"],[\"5491\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u80FD\u6E90\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"5492\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"5493\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"5494\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"5495\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"5496\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"5498\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\"],[\"5499\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"55\",\"2008\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"5500\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u6587\u7269\u4E0E\u535A\u7269\u9986\u5B66\"],[\"5501\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"5502\",\"2019\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"5503\",\"2019\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"5504\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5505\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"5508\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"5510\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"5512\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5513\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\uFF08\u8F7B\u5DE5\u751F\u7269\u6280\u672F\u65B9\u5411\uFF09\"],[\"5514\",\"2019\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u4E0E\u670D\u9970\u8BBE\u8BA1\"],[\"5515\",\"2019\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"5516\",\"2019\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5517\",\"2019\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u98DE\u884C\u5668\u63A7\u5236\u4E0E\u4FE1\u606F\u5DE5\u7A0B\"],[\"5518\",\"2019\u7EA7\",\"\u7A7A\u5929\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u822A\u7A7A\u822A\u5929\u5DE5\u7A0B\"],[\"5519\",\"2019\u7EA7\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\u5B66\u9662\",\"\u7F51\u7EDC\u7A7A\u95F4\u5B89\u5168\"],[\"5520\",\"2019\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u7C7B\"],[\"5521\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"5523\",\"2019\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7C7B\"],[\"5524\",\"2019\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"5525\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u79D1\u8BD5\u9A8C\u73ED\uFF08\u7EFF\u8272\u5316\u5DE5\u4E0E\u751F\u7269\u5236\u836F\u65B9\u5411\uFF09\"],[\"5529\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5530\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"5531\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"5532\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"5533\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5534\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5535\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"5536\",\"2019\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u7406\u8BBA\"],[\"5537\",\"2019\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\uFF08\u5730\u4E0B\u5DE5\u7A0B\u65B9\u5411\uFF09\"],[\"5554\",\"2019\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"5555\",\"2019\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u79D1\u5B9E\u9A8C\u73ED\uFF08\u52A8\u529B\u88C5\u5907\u4E0E\u5B89\u5168\u65B9\u5411\uFF09\"],[\"5574\",\"2018\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"5575\",\"2017\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\uFF08\u6570\u636E\u79D1\u5B66\u4E0E\u5927\u6570\u636E\u6280\u672F\u65B9\u5411\uFF09\"],[\"5576\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CE2\u5170\u8BED\uFF08\u7ECF\u6D4E\u65B9\u5411\uFF09\"],[\"5577\",\"2019\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CE2\u5170\u8BED\uFF08\u56FD\u9645\u5173\u7CFB\u65B9\u5411\uFF09\"],[\"5594\",\"2019\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u4EBA\u5DE5\u667A\u80FD\"],[\"56\",\"2008\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"57\",\"2008\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"58\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"5882\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"5883\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5884\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5885\",\"2011\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5886\",\"2011\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"5888\",\"2011\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"5889\",\"2011\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"5890\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"5891\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"5892\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"5893\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"5894\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"5895\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"5896\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"5897\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"5898\",\"2011\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"5899\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"59\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"5900\",\"2011\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"5901\",\"2011\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"5902\",\"2011\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"5903\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5904\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5905\",\"2011\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5906\",\"2011\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"5907\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"5908\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"5909\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"5910\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"5911\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"5912\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\"],[\"5913\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"5914\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"5915\",\"2011\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"5916\",\"2011\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"5917\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"5918\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"5919\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"5920\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"5921\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"5922\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"5923\",\"2011\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"5924\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"5925\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"5926\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"5927\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"5928\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"5929\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"5930\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"5933\",\"2011\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"5934\",\"2011\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"5935\",\"2011\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"5937\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"5938\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"5939\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"5940\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"5941\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"5942\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"5943\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5945\",\"2011\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"5946\",\"2011\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"5947\",\"2011\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"5948\",\"2011\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"5949\",\"2011\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"5950\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"5951\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u5EFA\u7C7B\"],[\"5952\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"5953\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"5954\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"5955\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"5956\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"5957\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"5958\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"5960\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"5961\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"5962\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"5963\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"5964\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"5965\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"5966\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"5967\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"5968\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"5969\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"5970\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"5971\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"5972\",\"2011\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"5973\",\"2011\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"5975\",\"2011\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"5976\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"5979\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"5980\",\"2011\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"5981\",\"2011\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"5982\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"5983\",\"2011\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"5984\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u535A\u7269\u9986\u5B66\"],[\"5985\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"5986\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"5987\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"5988\",\"2011\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"5989\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"5990\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"5991\",\"2011\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"5992\",\"2011\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"5993\",\"2011\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"5994\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"5995\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"5996\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"5997\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"5998\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"5999\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"60\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"6002\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"6003\",\"2011\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6004\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6005\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6006\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"6007\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6008\",\"2011\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6009\",\"2011\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6010\",\"2011\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6011\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"6012\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6013\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6014\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6015\",\"2011\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6016\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6017\",\"2011\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6018\",\"2011\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6019\",\"2011\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6021\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6022\",\"2011\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"6023\",\"2011\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6024\",\"2011\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6025\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6026\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6027\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6028\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6029\",\"2011\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6030\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6032\",\"2011\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6033\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6034\",\"2011\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6035\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"6036\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6037\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6038\",\"2011\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6039\",\"2011\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6040\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6041\",\"2011\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6042\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6043\",\"2011\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6044\",\"2011\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6045\",\"2011\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6046\",\"2011\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6048\",\"2011\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6049\",\"2010\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6050\",\"2010\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6051\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6052\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6053\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6054\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6055\",\"2010\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"6056\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6058\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6059\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6060\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6061\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6062\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6063\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6065\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6066\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6067\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6068\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"6069\",\"2010\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6070\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6071\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6072\",\"2010\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"6073\",\"2010\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6074\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6075\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6076\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6077\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6078\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6079\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6080\",\"2010\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6081\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6082\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6083\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6084\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6085\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"6086\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6087\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"6088\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6089\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6090\",\"2010\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6091\",\"2010\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6093\",\"2010\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6094\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6095\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6096\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6097\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6099\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6101\",\"2010\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6102\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6103\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"6104\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6105\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6106\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6107\",\"2010\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"6108\",\"2010\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6109\",\"2010\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u535A\u7269\u9986\u5B66\"],[\"6110\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"6111\",\"2010\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6112\",\"2010\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF082+2\uFF09\"],[\"6113\",\"2010\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6114\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u5EFA\u7C7B\"],[\"6116\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6118\",\"2010\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6119\",\"2010\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6120\",\"2010\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"6121\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6122\",\"2010\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"6123\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6124\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\"],[\"6125\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6126\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6127\",\"2010\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6128\",\"2010\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6129\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6130\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6131\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6132\",\"2010\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6133\",\"2010\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6134\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"6135\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6136\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6137\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6138\",\"2010\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6139\",\"2010\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6140\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"6141\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6142\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"6145\",\"2010\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6146\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6147\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"6148\",\"2010\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"6149\",\"2010\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6150\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"6151\",\"2010\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6152\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"6153\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6154\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6155\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"6156\",\"2010\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6157\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6158\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6159\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6160\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6161\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6164\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"6165\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"6166\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6168\",\"2010\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6169\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"6170\",\"2010\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"6171\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"6172\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6173\",\"2010\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"6174\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6175\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6176\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6177\",\"2010\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6178\",\"2010\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6179\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6180\",\"2010\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"6181\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6182\",\"2010\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"6183\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6184\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6185\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"6186\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6187\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6188\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6189\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6190\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6191\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6192\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"6193\",\"2010\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"6194\",\"2010\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"6195\",\"2010\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6196\",\"2010\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6197\",\"2010\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6198\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6199\",\"2010\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"62\",\"2007\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\"],[\"6200\",\"2010\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6201\",\"2010\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"6202\",\"2010\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6203\",\"2010\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6204\",\"2010\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6205\",\"2010\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"6206\",\"2010\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"6207\",\"2010\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6208\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"6209\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"6210\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6211\",\"2010\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"6212\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6213\",\"2010\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6214\",\"2010\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6216\",\"2010\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6217\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6218\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6219\",\"2009\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6220\",\"2009\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6221\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"6222\",\"2009\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"6223\",\"2009\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF082+2\uFF09\"],[\"6224\",\"2009\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"6225\",\"2009\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"6226\",\"2009\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6227\",\"2009\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6228\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"6229\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6230\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"6231\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6232\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6233\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6234\",\"2009\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6235\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"6236\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"6237\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6239\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6240\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"6241\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"6242\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6243\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6244\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6245\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6246\",\"2009\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"6247\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6248\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6249\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6250\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6251\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6252\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6253\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6256\",\"2009\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6257\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"6259\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6260\",\"2009\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6261\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6262\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6264\",\"2009\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6265\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"6266\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6267\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6268\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6269\",\"2009\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6270\",\"2009\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6271\",\"2009\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6272\",\"2009\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"6273\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6276\",\"2009\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"6277\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6278\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6279\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6280\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6281\",\"2009\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"6284\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6285\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6286\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"6287\",\"2009\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6288\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6289\",\"2009\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6291\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6292\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6293\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6294\",\"2009\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6295\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6296\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6297\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6298\",\"2009\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6299\",\"2009\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u535A\u7269\u9986\u5B66\"],[\"63\",\"2007\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"6300\",\"2009\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6301\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6302\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6303\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6304\",\"2009\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6305\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6306\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"6307\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"6308\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6309\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6311\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"6314\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"6315\",\"2009\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"6317\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"6318\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6319\",\"2009\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6320\",\"2009\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6321\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"6322\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6323\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6324\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"6325\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6326\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6327\",\"2009\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6328\",\"2009\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6329\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u5EFA\u7C7B\"],[\"6330\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6332\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"6333\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6334\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"6335\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6336\",\"2009\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6337\",\"2009\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6338\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6339\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"6340\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6341\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"6342\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6343\",\"2009\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6344\",\"2009\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6345\",\"2009\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6346\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"6347\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6348\",\"2009\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6349\",\"2009\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6350\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6351\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6352\",\"2009\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6353\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6354\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6355\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6356\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6357\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6359\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6360\",\"2009\u7EA7\",\"\u521B\u65B0\u6559\u80B2\",\"\u5168\u6821\u6587\u5316\u7D20\u8D28\u516C\u9009\u8BFE\"],[\"6361\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6362\",\"2009\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6363\",\"2009\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"6364\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6365\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6366\",\"2009\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6367\",\"2009\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6368\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6369\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6370\",\"2009\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"6371\",\"2009\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6372\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6373\",\"2009\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"6374\",\"2009\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6375\",\"2009\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6376\",\"2009\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6377\",\"2009\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6378\",\"2009\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6379\",\"2009\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6380\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6381\",\"2009\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6384\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\"],[\"6385\",\"2009\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6386\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6387\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6388\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"6389\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6390\",\"2008\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"6392\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"6393\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6394\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6395\",\"2008\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6396\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6397\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6398\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6399\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"64\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"6400\",\"2008\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"6401\",\"2008\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6402\",\"2008\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6403\",\"2008\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6404\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6405\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6406\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6407\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"6408\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6410\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6411\",\"2008\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6412\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6413\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6414\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6415\",\"2008\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6418\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6421\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6423\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6424\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6425\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"6426\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6427\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"6428\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"6430\",\"2008\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6431\",\"2008\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6432\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"6433\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"6434\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6435\",\"2008\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6436\",\"2008\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6437\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6438\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6439\",\"2008\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6440\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6441\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6443\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6444\",\"2008\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"6445\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6446\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6448\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6449\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"6450\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6451\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6452\",\"2008\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6453\",\"2008\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6456\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u533B\u79D1\"],[\"6457\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"6458\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6459\",\"2008\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6460\",\"2008\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6461\",\"2008\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6462\",\"2008\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"6463\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u5EFA\u7C7B\"],[\"6464\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"6465\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6466\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6467\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6470\",\"2008\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6471\",\"2008\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"6473\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6474\",\"2008\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6475\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6476\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6477\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6478\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"6479\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6480\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"6481\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"6482\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6483\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"6484\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6485\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6486\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6487\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6489\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"6490\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6491\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6492\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6493\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6494\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6495\",\"2008\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u897F\u85CF\u65C5\u6E38\u7BA1\u7406\"],[\"6496\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6497\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"6498\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6499\",\"2008\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"65\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"6500\",\"2008\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6501\",\"2008\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6502\",\"2008\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6505\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6506\",\"2008\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"6507\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6508\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6509\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6510\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6511\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6512\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6513\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6514\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6516\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6517\",\"2008\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"6518\",\"2008\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"6519\",\"2008\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6520\",\"2008\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6521\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"6522\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"6523\",\"2008\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6524\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"6525\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"6526\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6527\",\"2008\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"6528\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6529\",\"2008\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6531\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6532\",\"2008\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6534\",\"2008\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6535\",\"2008\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"6538\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\"],[\"6539\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6540\",\"2008\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6541\",\"2008\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6543\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6544\",\"2008\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6545\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6546\",\"2008\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6547\",\"2008\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6548\",\"2008\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6549\",\"2008\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6550\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"6551\",\"2008\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6552\",\"2008\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"6553\",\"2008\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6554\",\"2008\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6556\",\"2008\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6557\",\"2008\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6558\",\"2008\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6559\",\"2008\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"6561\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6562\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6563\",\"2007\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u897F\u85CF\u65C5\u6E38\u7BA1\u7406\"],[\"6564\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"6565\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u533B\u79D1\"],[\"6566\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6567\",\"2007\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6568\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6569\",\"2007\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6570\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6571\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"6572\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"6573\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6574\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6575\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6576\",\"2007\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6577\",\"2007\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6578\",\"2007\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6579\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"6580\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6581\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"6582\",\"2007\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"6583\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6584\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6585\",\"2007\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"6586\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6587\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"6588\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6589\",\"2007\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"6590\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6592\",\"2007\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"6593\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6594\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6595\",\"2007\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u4E2D\u533B\u5B66\uFF08\u4E2D\u897F\u533B\u7ED3\u5408\u65B9\u5411\uFF09\"],[\"6598\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6599\",\"2007\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"66\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"6600\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6601\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6602\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6603\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"6604\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6605\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6606\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6607\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6608\",\"2007\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"6609\",\"2007\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"6610\",\"2007\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6611\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6612\",\"2007\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6613\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6614\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6615\",\"2007\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6616\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"6617\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6618\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6619\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6620\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6621\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"6622\",\"2007\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6623\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6624\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6625\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6626\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6627\",\"2007\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6628\",\"2007\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6629\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6630\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6631\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6632\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6633\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6634\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"6635\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6636\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6637\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6639\",\"2007\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6640\",\"2007\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"6641\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6643\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6644\",\"2007\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6645\",\"2007\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6646\",\"2007\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6647\",\"2007\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6648\",\"2007\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6649\",\"2007\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6650\",\"2007\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6651\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"6652\",\"2007\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"6653\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"6654\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6655\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"6656\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6659\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6660\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"6661\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6662\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6663\",\"2007\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"6664\",\"2007\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"6665\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"6666\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6667\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6668\",\"2007\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6669\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6670\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6671\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6672\",\"2007\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6673\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6674\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6675\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6678\",\"2007\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"6679\",\"2007\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\"],[\"6681\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"6682\",\"2007\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6683\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6684\",\"2007\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"6685\",\"2007\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6686\",\"2007\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6687\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6688\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"6689\",\"2007\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"6690\",\"2007\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6691\",\"2007\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6692\",\"2007\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6694\",\"2007\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6695\",\"2007\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6696\",\"2007\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6697\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6698\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u5EB7\u590D\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6699\",\"2007\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"67\",\"2007\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"6701\",\"2007\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u4FEE\u590D\u5DE5\u827A\u5B66\"],[\"6702\",\"2007\u7EA7\",\"\u8054\u5408\u73ED\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6703\",\"2007\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6704\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"6705\",\"2007\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6706\",\"2007\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6707\",\"2007\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6708\",\"2007\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6709\",\"2007\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6710\",\"2007\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6711\",\"2007\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6713\",\"2007\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"6714\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6715\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6716\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6717\",\"2007\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6719\",\"2007\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6720\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6721\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6722\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6723\",\"2006\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6724\",\"2006\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6725\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u533B\u79D1\"],[\"6726\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6727\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6728\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"6729\",\"2006\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6730\",\"2006\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6731\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6732\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6733\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"6734\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6735\",\"2006\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"6736\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6737\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6738\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6739\",\"2006\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\"],[\"6740\",\"2006\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"6741\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6742\",\"2006\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6743\",\"2006\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6744\",\"2006\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"6745\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"6746\",\"2006\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6747\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6748\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5987\u5E7C\u4FDD\u5065\u533B\u5B66\"],[\"6749\",\"2006\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6750\",\"2006\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6751\",\"2006\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"6752\",\"2006\u7EA7\",\"\u5176\u5B83\",null],[\"6753\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6754\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"6755\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"6756\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6757\",\"2006\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"6758\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6759\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6760\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"6761\",\"2006\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6762\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6763\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"6764\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6765\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"6766\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6767\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"6768\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6769\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6770\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6771\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"6772\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6773\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"6774\",\"2006\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"6775\",\"2006\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6776\",\"2006\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6777\",\"2006\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"6778\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6779\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"6780\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6781\",\"2006\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6782\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"6783\",\"2006\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"6784\",\"2006\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6785\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6786\",\"2006\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6787\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6788\",\"2006\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6789\",\"2006\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"6790\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6791\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6792\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6793\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6794\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"6795\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"6796\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6797\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6799\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"68\",\"2007\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"6800\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6801\",\"2006\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6802\",\"2006\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"6803\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"6804\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6805\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6806\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6807\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6808\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6809\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6810\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6811\",\"2006\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u4E2D\u533B\u5B66\uFF08\u4E2D\u897F\u533B\u7ED3\u5408\u65B9\u5411\uFF09\"],[\"6813\",\"2006\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u4FEE\u590D\u5DE5\u827A\u5B66\"],[\"6814\",\"2006\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\"],[\"6815\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6816\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6817\",\"2006\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6818\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"6819\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6820\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6821\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6822\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6823\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6824\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"6825\",\"2006\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"6826\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6827\",\"2006\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"6828\",\"2006\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6829\",\"2006\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6830\",\"2006\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6831\",\"2006\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"6832\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6833\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"6834\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6835\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"6836\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"6837\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6838\",\"2006\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"6839\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6840\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"6841\",\"2006\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6842\",\"2006\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6843\",\"2006\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6844\",\"2006\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u897F\u85CF\u65C5\u6E38\u7BA1\u7406\"],[\"6845\",\"2006\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"6846\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"6847\",\"2006\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6848\",\"2006\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"6849\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6850\",\"2006\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"6851\",\"2006\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6852\",\"2006\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6853\",\"2006\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"6854\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6855\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6856\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"6857\",\"2006\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"6858\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"6859\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6860\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u5EB7\u590D\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6861\",\"2006\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6862\",\"2006\u7EA7\",\"\u8054\u5408\u73ED\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6863\",\"2006\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6864\",\"2006\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6865\",\"2006\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6866\",\"2006\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6867\",\"2006\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"6868\",\"2006\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"6869\",\"2006\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6870\",\"2006\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6871\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6872\",\"2006\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"6874\",\"2006\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6875\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"6876\",\"2005\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"6877\",\"2005\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"6878\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6879\",\"2005\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"6880\",\"2005\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"6881\",\"2005\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"6882\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"6883\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"6884\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"6885\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"6886\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"6887\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"6889\",\"2005\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"6890\",\"2005\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\uFF09\"],[\"6891\",\"2005\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"6892\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"6893\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6894\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"6895\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"6896\",\"2005\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"6897\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"6898\",\"2005\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"6899\",\"2005\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"69\",\"2007\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"6900\",\"2005\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6901\",\"2005\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6902\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"6903\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6904\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"6905\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"6906\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"6907\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"6908\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"6909\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"6910\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"6911\",\"2005\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"6912\",\"2005\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"6913\",\"2005\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"6914\",\"2005\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"6915\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"6916\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"6917\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6918\",\"2005\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"6919\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"6920\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6921\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"6922\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"6923\",\"2005\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"6924\",\"2005\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"6925\",\"2005\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"6926\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u4E2D\u533B\u836F\u5236\u836F\u5DE5\u7A0B\"],[\"6927\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"6928\",\"2005\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u4E2D\u533B\u5B66\uFF08\u4E2D\u897F\u533B\u7ED3\u5408\u65B9\u5411\uFF09\"],[\"6929\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5987\u5E7C\u4FDD\u5065\u533B\u5B66\"],[\"6930\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"6931\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"6933\",\"2005\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"6934\",\"2005\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"6935\",\"2005\u7EA7\",\"\u8054\u5408\u73ED\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"6936\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6937\",\"2005\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u897F\u85CF\u65C5\u6E38\u7BA1\u7406\"],[\"6938\",\"2005\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"6939\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u533B\u79D1\"],[\"6940\",\"2005\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"6941\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"6942\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"6943\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"6944\",\"2005\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"6945\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"6946\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"6947\",\"2005\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\"],[\"6948\",\"2005\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"6949\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"6950\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"6951\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"6953\",\"2005\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\"],[\"6954\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6955\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"6956\",\"2005\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"6957\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"6958\",\"2005\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"6959\",\"2005\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"6960\",\"2005\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"6961\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"6962\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"6963\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"6964\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"6965\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"6966\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"6967\",\"2005\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u4FEE\u590D\u5DE5\u827A\u5B66\"],[\"6968\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"6969\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"6970\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"6971\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"6972\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6973\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"6974\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"6975\",\"2005\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"6976\",\"2005\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"6977\",\"2005\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"6978\",\"2005\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"6979\",\"2005\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"6980\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"6981\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"6982\",\"2005\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"6983\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"6984\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"6985\",\"2005\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"6986\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"6987\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"6988\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"6989\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"6990\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"6991\",\"2005\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8054\u5408\u73ED\"],[\"6992\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"6993\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"6994\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"6995\",\"2005\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"6996\",\"2005\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"6997\",\"2005\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"6998\",\"2005\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"6999\",\"2005\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"7\",\"2011\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"70\",\"2007\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"7000\",\"2005\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7001\",\"2005\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"7002\",\"2005\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7003\",\"2005\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"7004\",\"2005\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"7005\",\"2005\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"7006\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"7007\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"7008\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"7009\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"7010\",\"2005\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u5EB7\u590D\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"7011\",\"2005\u7EA7\",\"\u521B\u65B0\u6559\u80B2\",\"\u5168\u6821\u6587\u5316\u7D20\u8D28\u516C\u9009\u8BFE\"],[\"7012\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"7013\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"7014\",\"2005\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"7015\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"7016\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"7017\",\"2005\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"7018\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"7019\",\"2005\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"7020\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"7021\",\"2005\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7022\",\"2005\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"7023\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7024\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\"],[\"7025\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"7026\",\"2005\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"7027\",\"2005\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"7028\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"7029\",\"2005\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"7030\",\"2005\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"7031\",\"2005\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"7032\",\"2005\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"7033\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7034\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"7035\",\"2004\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"7036\",\"2004\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"7037\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"7038\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7039\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7040\",\"2004\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7041\",\"2004\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"7042\",\"2004\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7043\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"7044\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"7045\",\"2004\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"7046\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"7047\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u4E2D\u533B\u836F\u5236\u836F\u5DE5\u7A0B\"],[\"7048\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"7049\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7050\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"7051\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"7052\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"7053\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"7054\",\"2004\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u4E2D\u533B\u5B66\uFF08\u4E2D\u897F\u533B\u7ED3\u5408\u65B9\u5411\uFF09\"],[\"7055\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u5EB7\u590D\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"7056\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"7057\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7058\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"7059\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"7060\",\"2004\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"7061\",\"2004\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"7062\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u533B\u79D1\"],[\"7063\",\"2004\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"7064\",\"2004\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7065\",\"2004\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"7066\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"7067\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"7068\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"7069\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"7070\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"7071\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"7072\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"7073\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"7074\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"7075\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"7076\",\"2004\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"7077\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"7078\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"7079\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"7080\",\"2004\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"7081\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"7082\",\"2004\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"7083\",\"2004\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"7084\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"7085\",\"2004\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"7086\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"7087\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"7088\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"7089\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"7090\",\"2004\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"7091\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"7092\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"7093\",\"2004\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"7094\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7095\",\"2004\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"7096\",\"2004\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"7097\",\"2004\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7098\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"7099\",\"2004\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"7100\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"7101\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"7102\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"7103\",\"2004\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"7104\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u57CE\u5E02\u89C4\u5212\uFF08\u57CE\u5E02\u89C4\u5212\u4E0E\u8BA1\u7B97\u673A\uFF09\"],[\"7105\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"7106\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"7107\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"7108\",\"2004\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7109\",\"2004\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"7110\",\"2004\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u897F\u85CF\u65C5\u6E38\u7BA1\u7406\"],[\"7111\",\"2004\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"7112\",\"2004\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"7113\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7114\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"7115\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"7116\",\"2004\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7117\",\"2004\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"7118\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"7119\",\"2004\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"7120\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u4E13\u5347\u672C\uFF09\"],[\"7121\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"7122\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"7123\",\"2004\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"7124\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5987\u5E7C\u4FDD\u5065\u533B\u5B66\"],[\"7125\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"7127\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"7128\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"7129\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"713\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"7130\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"7131\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"7132\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"7133\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7134\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"7135\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"7136\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"7137\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"7138\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"7139\",\"2004\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\"],[\"714\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\u7C7B\"],[\"7140\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"7141\",\"2004\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"7142\",\"2004\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"7143\",\"2004\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"7144\",\"2004\u7EA7\",\"\u521B\u65B0\u6559\u80B2\",\"\u5168\u6821\u6587\u5316\u7D20\u8D28\u516C\u9009\u8BFE\"],[\"7145\",\"2004\u7EA7\",\"\u5176\u5B83\",null],[\"7146\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7147\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7148\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"7149\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"715\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u7C7B\"],[\"7150\",\"2004\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"7151\",\"2004\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u79D1\u6280\u82F1\u8BED\uFF09\"],[\"7152\",\"2004\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"7153\",\"2004\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"7154\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"7155\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"7156\",\"2004\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"7157\",\"2004\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"7158\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7159\",\"2004\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"716\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"7160\",\"2004\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"7161\",\"2004\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"7162\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"7163\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"7165\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8054\u5408\u73ED\"],[\"7166\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"7167\",\"2004\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"7168\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"7169\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"717\",\"2012\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"7170\",\"2004\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"7171\",\"2004\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"7172\",\"2004\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"7173\",\"2004\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"7174\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7175\",\"2004\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",null],[\"7176\",\"2004\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"7177\",\"2004\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"7178\",\"2004\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\"],[\"7179\",\"2004\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"718\",\"2012\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u7C7B\"],[\"7180\",\"2004\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"7181\",\"2004\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"7182\",\"2004\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"7183\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"7184\",\"2004\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"7185\",\"2004\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"7186\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"7187\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"7188\",\"2004\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"7189\",\"2004\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\uFF09\"],[\"719\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u9AD8\u6C34\u5E73\u8FD0\u52A8\u5458\u73ED\uFF09\"],[\"7190\",\"2004\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"7191\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"7192\",\"2004\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\"],[\"7193\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"7194\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"7195\",\"2003\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"7196\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"7197\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7198\",\"2003\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"7199\",\"2003\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"720\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\u7C7B\"],[\"7200\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"7201\",\"2003\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"7202\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"7203\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u4E13\u5347\u672C\uFF09\"],[\"7204\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"7205\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"7206\",\"2003\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\uFF08\u751F\u7269\u591A\u6837\u6027\uFF09\"],[\"7207\",\"2003\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\uFF08\u68EE\u6797\u751F\u6001\uFF09\"],[\"7208\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7209\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7210\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"7211\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"7212\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"7213\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"7214\",\"2003\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"7215\",\"2003\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7216\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"7217\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7218\",\"2003\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"7219\",\"2003\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"7220\",\"2003\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"7221\",\"2003\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"7222\",\"2003\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\"],[\"7223\",\"2003\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"7224\",\"2003\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"7225\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"7226\",\"2003\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"7227\",\"2003\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"7228\",\"2003\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\uFF08\u4E9A\u592A\uFF09\"],[\"7229\",\"2003\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"7230\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"7231\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"7232\",\"2003\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\"],[\"7233\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"7234\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"7235\",\"2003\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\uFF08\u536B\u751F\u68C0\u9A8C\uFF09\"],[\"7236\",\"2003\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u5065\u5EB7\u4FDD\u9669\u65B9\u5411\uFF09\"],[\"7237\",\"2003\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u536B\u751F\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"7238\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"7239\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"7240\",\"2003\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"7241\",\"2003\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7242\",\"2003\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"7243\",\"2003\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u5206\u5B50\u6750\u6599\uFF09\"],[\"7244\",\"2003\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u6750\u6210\u578B\u673A\u68B0\u53CA\u6A21\u5177\uFF09\"],[\"7245\",\"2003\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7246\",\"2003\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7247\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"7248\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u56FE\u4E66\u9986\u5B66\"],[\"7249\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"7250\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"7251\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"7252\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"7253\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"7254\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"7255\",\"2003\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"7256\",\"2003\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\uFF08\u79D1\u6280\u82F1\u8BED\uFF09\"],[\"7257\",\"2003\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"7258\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7259\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7260\",\"2003\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"7261\",\"2003\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7262\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"7263\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"7264\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u53CC\u8BED\uFF09\"],[\"7265\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"7266\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u5EB7\u590D\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"7267\",\"2003\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"7268\",\"2003\u7EA7\",\"\u9A6C\u514B\u601D\u4E3B\u4E49\u5B66\u9662\",\"\u56FD\u9645\u653F\u6CBB\"],[\"7269\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"7270\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7271\",\"2003\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"7272\",\"2003\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",null],[\"7273\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"7274\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"7275\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"7276\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"7277\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"7278\",\"2003\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"7279\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"7280\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"7281\",\"2003\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\uFF08\u53CC\u8BED\u73ED\uFF09\"],[\"7282\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"7283\",\"2003\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"7284\",\"2003\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7285\",\"2003\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7286\",\"2003\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"7287\",\"2003\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7288\",\"2003\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"7289\",\"2003\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"7290\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"7291\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"7292\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"7293\",\"2003\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\uFF08\u533B\u836F\u4F01\u4E1A\uFF09\"],[\"7294\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"7295\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"7296\",\"2003\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"7297\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7298\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u56ED\u6797\"],[\"7299\",\"2003\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"7300\",\"2003\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"7301\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"7302\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"7303\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u4E2D\u533B\u836F\u5236\u836F\u5DE5\u7A0B\"],[\"7304\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"7305\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"7306\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7307\",\"2003\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"7308\",\"2003\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"7309\",\"2003\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"7310\",\"2003\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"7311\",\"2003\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5851\u6599\u5DE5\u7A0B\uFF09\"],[\"7312\",\"2003\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7313\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"7314\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\uFF08\u5BA4\u5185\u8BBE\u8BA1\uFF09\"],[\"7315\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"7316\",\"2003\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"7317\",\"2003\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"7318\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"7319\",\"2003\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"7320\",\"2003\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"7321\",\"2003\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"7322\",\"2003\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"7323\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"7324\",\"2003\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"7325\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u773C\u89C6\u5149\u5B66\u65B9\u5411\uFF09\"],[\"7326\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"7327\",\"2003\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\"],[\"7328\",\"2003\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"7329\",\"2003\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"7330\",\"2003\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u836F\u5B66\"],[\"7331\",\"2003\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\uFF08\u519C\u4E1A\u751F\u6001\u4E0E\u4EBA\u7C7B\u5B66\uFF09\"],[\"7332\",\"2003\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"7333\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"7334\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"7335\",\"2002\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"7336\",\"2002\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"7337\",\"2002\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u5206\u5B50\u6750\u6599\uFF09\"],[\"7338\",\"2002\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5851\u6599\u5DE5\u7A0B\uFF09\"],[\"7339\",\"2002\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"734\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7340\",\"2002\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"7341\",\"2002\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"7342\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"7343\",\"2002\u7EA7\",\"\u8054\u5408\u73ED\",\"\u57CE\u5E02\u89C4\u5212\uFF08\u57CE\u5E02\u89C4\u5212\u4E0E\u8BA1\u7B97\u673A\uFF09\"],[\"7344\",\"2002\u7EA7\",\"\u8054\u5408\u73ED\",\"\u6750\u6599\u7269\u7406\uFF08\u73AF\u5883\u6750\u6599\u52A0\u5DE5\u4E0E\u5236\u5907\u5DE5\u7A0B\uFF09\"],[\"7345\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"7346\",\"2002\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"7347\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"7348\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7349\",\"2002\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\"],[\"7350\",\"2002\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"7351\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"7352\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"7353\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"7354\",\"2002\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"7355\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"7356\",\"2002\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"7357\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"7358\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"7359\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"7360\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"7361\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7362\",\"2002\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"7363\",\"2002\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"7364\",\"2002\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"7365\",\"2002\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7366\",\"2002\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"7367\",\"2002\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"7368\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7369\",\"2002\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7370\",\"2002\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"7371\",\"2002\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7372\",\"2002\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"7373\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"7374\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"7375\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"7376\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"7377\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"7378\",\"2002\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"7379\",\"2002\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"7380\",\"2002\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"7381\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7382\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"7383\",\"2002\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"7384\",\"2002\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"7385\",\"2002\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"7386\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7387\",\"2002\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"7388\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"7389\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"739\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u7269\u7406\"],[\"7390\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"7391\",\"2002\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u7535\u5B50\u7535\u6C14\u521B\u65B0\u73ED\"],[\"7392\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u65F6\u88C5\u8868\u6F14\u65B9\u5411\uFF09\"],[\"7393\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"7394\",\"2002\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"7395\",\"2002\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"7396\",\"2002\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7397\",\"2002\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"7398\",\"2002\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u6750\u6210\u578B\u673A\u68B0\u53CA\u6A21\u5177\uFF09\"],[\"7399\",\"2002\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"740\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u7C7B\"],[\"7400\",\"2002\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"7401\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"7402\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u4E2D\u533B\u836F\u5236\u836F\u5DE5\u7A0B\"],[\"7403\",\"2002\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"7404\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"7405\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"7406\",\"2002\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"7407\",\"2002\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"7408\",\"2002\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"7409\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"741\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u7C7B\"],[\"7410\",\"2002\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7411\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"7412\",\"2002\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"7413\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"7414\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"7415\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"7416\",\"2002\u7EA7\",\"\u8054\u5408\u73ED\",\"\u751F\u7269\u79D1\u5B66\"],[\"7417\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"7418\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7419\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"742\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"7420\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7421\",\"2002\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"7422\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"7423\",\"2002\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"7424\",\"2002\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"7425\",\"2002\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7426\",\"2002\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"7427\",\"2002\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"7428\",\"2002\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7429\",\"2002\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"743\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u73AF\u5883\u5DE5\u7A0B\uFF082+2\u9879\u76EE\uFF09\"],[\"7430\",\"2002\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7431\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"7432\",\"2002\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"7433\",\"2002\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"7434\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"7435\",\"2002\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u56FE\u4E66\u9986\u5B66\"],[\"7436\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"7437\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"7438\",\"2002\u7EA7\",\"\u8054\u5408\u73ED\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"7439\",\"2002\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8003\u53E4\u5B66\uFF08\u4EBA\u7C7B\u4E0E\u8003\u53E4\uFF09\"],[\"744\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u97F3\u4E50\u5B66\"],[\"7440\",\"2002\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"7441\",\"2002\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"7442\",\"2002\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"7443\",\"2002\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"7444\",\"2002\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"7445\",\"2002\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"7446\",\"2002\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"7447\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7448\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"7449\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"745\",\"2012\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"7450\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"7451\",\"2001\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"7452\",\"2001\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7453\",\"2001\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7454\",\"2001\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u5206\u5B50\u6750\u6599\uFF09\"],[\"7455\",\"2001\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u5851\u6599\u5DE5\u7A0B\uFF09\"],[\"7456\",\"2001\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"7457\",\"2001\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7458\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"7459\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"746\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"7460\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"7461\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u4E8B\u4E1A\u7BA1\u7406\"],[\"7462\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"7463\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"7464\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",null],[\"7465\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7466\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u65F6\u88C5\u8868\u6F14\u65B9\u5411\uFF09\"],[\"7467\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",null],[\"7468\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"7469\",\"2001\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"747\",\"2012\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\u7B2C\u4E8C\u5B66\u4F4D\uFF08\u4E24\u5E74\u5236\uFF09\"],[\"7470\",\"2001\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"7471\",\"2001\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"7472\",\"2001\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"7473\",\"2001\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"7474\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"7475\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"7476\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"7477\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"7478\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u4E2D\u533B\u836F\u5236\u836F\u5DE5\u7A0B\"],[\"7479\",\"2001\u7EA7\",\"\u7F51\u7EDC\u6559\u80B2\u5B66\u9662\",null],[\"748\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u544A\u5B66\"],[\"7480\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"7481\",\"2001\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7482\",\"2001\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"7483\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"7484\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\uFF08\u4E13\u5347\u672C\uFF09\"],[\"7485\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u56FE\u4E66\u9986\u5B66\"],[\"7486\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7BA1\u7406\u79D1\u5B66\"],[\"7487\",\"2001\u7EA7\",\"\u7F51\u7EDC\u6559\u80B2\u5B66\u9662\",null],[\"7488\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u97F3\u4E50\u8868\u6F14\u65B9\u5411\uFF09\"],[\"7489\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"749\",\"2012\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\u7C7B\"],[\"7490\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"7491\",\"2001\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",null],[\"7492\",\"2001\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"7493\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",null],[\"7494\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",null],[\"7495\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"7496\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"7497\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"7498\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"7499\",\"2001\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"750\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"7500\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7501\",\"2001\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7502\",\"2001\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"7503\",\"2001\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"7504\",\"2001\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"7505\",\"2001\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7506\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7507\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",null],[\"7508\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",null],[\"7509\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",null],[\"751\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u897F\u73ED\u7259\u8BED\"],[\"7510\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"7511\",\"2001\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",null],[\"7512\",\"2001\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",null],[\"7513\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"7514\",\"2001\u7EA7\",\"\u7F51\u7EDC\u6559\u80B2\u5B66\u9662\",null],[\"7515\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"7516\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"7517\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"7518\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",null],[\"7519\",\"2001\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"752\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7520\",\"2001\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\"],[\"7521\",\"2001\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",null],[\"7522\",\"2001\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"7523\",\"2001\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u52A0\u5DE5\u5DE5\u7A0B\"],[\"7524\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"7525\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"7526\",\"2001\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"7527\",\"2001\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",null],[\"7528\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"7529\",\"2001\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"753\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u5F71\u50CF\u65B9\u5411\uFF09\"],[\"7530\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"7531\",\"2001\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"7532\",\"2001\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"7533\",\"2001\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"7534\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\"],[\"7535\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"7536\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u4F53\u80B2\u821E\u8E48\u8868\u6F14\uFF09\"],[\"7537\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"7538\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"7539\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"754\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"7540\",\"2001\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"7541\",\"2001\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"7542\",\"2001\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\"],[\"7543\",\"2001\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"7544\",\"2001\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",null],[\"7545\",\"2001\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"7546\",\"2001\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\uFF08\u9AD8\u6750\u6210\u578B\u673A\u68B0\u53CA\u6A21\u5177\uFF09\"],[\"7547\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"7548\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\"],[\"7549\",\"2001\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"755\",\"2012\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u4FE1\u606F\u7C7B\"],[\"7550\",\"2001\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",null],[\"7551\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"7552\",\"2001\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"7553\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"7554\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"7555\",\"2001\u7EA7\",\"\u8054\u5408\u73ED\",\"\u8054\u5408\u73ED\"],[\"7556\",\"2001\u7EA7\",\"\u7F51\u7EDC\u6559\u80B2\u5B66\u9662\",null],[\"7557\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7558\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"7559\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",null],[\"756\",\"2012\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\u7C7B\"],[\"7560\",\"2001\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"7561\",\"2001\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",null],[\"7562\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",null],[\"7563\",\"2001\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"7564\",\"2001\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"7565\",\"2001\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",null],[\"7566\",\"2001\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u6001\u5B66\"],[\"7567\",\"2001\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"7568\",\"2001\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",null],[\"7569\",\"2001\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"757\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u5EFA\u7C7B\"],[\"7570\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\"],[\"7571\",\"2001\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"7572\",\"2001\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"7573\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"7574\",\"2001\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"7575\",\"2001\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"7576\",\"2001\u7EA7\",\"\u7F51\u7EDC\u6559\u80B2\u5B66\u9662\",null],[\"7577\",\"2000\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"759\",\"2012\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u6210\u578B\u53CA\u63A7\u5236\u5DE5\u7A0B\"],[\"760\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u516C\u5171\u7BA1\u7406\u7C7B\"],[\"761\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u5047\u80A2\u77EB\u5F62\u65B9\u5411\uFF09\"],[\"762\",\"2012\u7EA7\",\"\u5434\u7389\u7AE0\u5B66\u9662\",\"\u5434\u7389\u7AE0\u5B66\u9662\u4E13\u4E1A\"],[\"763\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u535A\u7269\u9986\u5B66\"],[\"765\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u7269\u7406\u5B66\u7C7B\"],[\"766\",\"2012\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u7535\u6C14\u5DE5\u7A0B\u53CA\u5176\u81EA\u52A8\u5316\"],[\"767\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u98DF\u54C1\u79D1\u5B66\u4E0E\u5DE5\u7A0B\"],[\"768\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u6863\u6848\u5B66\"],[\"769\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\u4E0E\u7ECF\u6D4E\u5B66\u9662\",\"\u6570\u5B66\u7ECF\u6D4E\u521B\u65B0\u73ED\"],[\"771\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7F8E\u672F\u5B66\"],[\"772\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u821E\u8E48\u5B66\"],[\"773\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u8868\u6F14\uFF08\u5F71\u89C6\u8868\u6F14\u65B9\u5411\uFF09\"],[\"774\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u52A8\u753B\"],[\"775\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u57FA\u7840\u65B9\u5411\uFF09\"],[\"776\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u7F16\u5BFC\"],[\"778\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u4FC4\u8BED\"],[\"779\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u8D22\u653F\u5B66\"],[\"780\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\"],[\"782\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u6C11\u7ECF\u6D4E\u7BA1\u7406\"],[\"783\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5DE5\u7A0B\"],[\"784\",\"2012\u7EA7\",\"\u6CD5\u5B66\u9662\",\"\u6CD5\u5B66\"],[\"785\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u5E73\u9762\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"786\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u827A\u672F\u8BBE\u8BA1\uFF08\u73AF\u5883\u827A\u672F\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"787\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u6CB9\u753B\u65B9\u5411\uFF09\"],[\"788\",\"2012\u7EA7\",\"\u827A\u672F\u5B66\u9662\",\"\u7ED8\u753B\uFF08\u56FD\u753B\u65B9\u5411\uFF09\"],[\"789\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u7ECF\u6D4E\u5B66\"],[\"790\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u56FD\u9645\u7ECF\u6D4E\u4E0E\u8D38\u6613\"],[\"791\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\"],[\"792\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u7F16\u8F91\u51FA\u7248\u5B66\"],[\"793\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u82F1\u8BED\"],[\"794\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u6CD5\u8BED\"],[\"795\",\"2012\u7EA7\",\"\u5916\u56FD\u8BED\u5B66\u9662\",\"\u65E5\u8BED\"],[\"796\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"797\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u8003\u53E4\u5B66\"],[\"798\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"],[\"799\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5FAE\u7535\u5B50\u5B66\"],[\"800\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u6838\u5DE5\u7A0B\u4E0E\u6838\u6280\u672F\"],[\"801\",\"2012\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"802\",\"2012\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5316\u5B66\"],[\"803\",\"2012\u7EA7\",\"\u5316\u5B66\u5B66\u9662\",\"\u5E94\u7528\u5316\u5B66\"],[\"804\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u79D1\u5B66\"],[\"805\",\"2012\u7EA7\",\"\u751F\u547D\u79D1\u5B66\u5B66\u9662\",\"\u751F\u7269\u6280\u672F\"],[\"808\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"809\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u7269\u7406\"],[\"810\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u5316\u5B66\"],[\"811\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"812\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65E0\u673A\u975E\u91D1\u5C5E\u6750\u6599\u5DE5\u7A0B\"],[\"813\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u6750\u6599\u4E0E\u4EBA\u5DE5\u5668\u5B98\u65B9\u5411\uFF09\"],[\"814\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u533B\u5B66\u5DE5\u7A0B\uFF08\u751F\u7269\u533B\u5B66\u56FE\u50CF\u4EEA\u5668\u3001\u751F\u7269\u529B\u5B66\u65B9\u5411\uFF09\"],[\"815\",\"2012\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\"],[\"816\",\"2012\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u5DE5\u4E1A\u8BBE\u8BA1\"],[\"817\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\"],[\"818\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u5149\u4FE1\u606F\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"819\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"820\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u4FE1\u606F\u5B89\u5168\"],[\"821\",\"2012\u7EA7\",\"\u9AD8\u5206\u5B50\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u9AD8\u5206\u5B50\u6750\u6599\u4E0E\u5DE5\u7A0B\"],[\"822\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\uFF08\u8BD5\u9A8C\u73ED\uFF09\"],[\"823\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u4FE1\u606F\u4E0E\u8BA1\u7B97\u79D1\u5B66\"],[\"824\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"825\",\"2012\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u7EDF\u8BA1\u5B66\"],[\"826\",\"2012\u7EA7\",\"\u7269\u7406\u79D1\u5B66\u4E0E\u6280\u672F\u5B66\u9662\",\"\u5E94\u7528\u7269\u7406\u5B66\"],[\"827\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\u6587\u5B66\"],[\"828\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"829\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5BF9\u5916\u6C49\u8BED\"],[\"830\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u5B66\"],[\"831\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u5E7F\u64AD\u7535\u89C6\u65B0\u95FB\u5B66\"],[\"832\",\"2012\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u81EA\u52A8\u5316\"],[\"833\",\"2012\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u901A\u4FE1\u5DE5\u7A0B\"],[\"834\",\"2012\u7EA7\",\"\u7535\u6C14\u4FE1\u606F\u5B66\u9662\",\"\u533B\u5B66\u4FE1\u606F\u5DE5\u7A0B\"],[\"835\",\"2012\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u8BA1\u7B97\u673A\u79D1\u5B66\u4E0E\u6280\u672F\"],[\"836\",\"2012\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7F51\u7EDC\u5DE5\u7A0B\"],[\"838\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\"],[\"839\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5B89\u5168\u5DE5\u7A0B\"],[\"840\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\"],[\"841\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u751F\u7269\u5DE5\u7A0B\"],[\"842\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\"],[\"843\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u76AE\u9769\u5546\u8D38\u65B9\u5411\uFF09\"],[\"844\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5316\u5DE5\u7A0B\uFF08\u9769\u5236\u54C1\u8BBE\u8BA1\u65B9\u5411\uFF09\"],[\"845\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u7EBA\u7EC7\u5DE5\u7A0B\"],[\"846\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u670D\u88C5\u8BBE\u8BA1\u4E0E\u5DE5\u7A0B\"],[\"847\",\"2012\u7EA7\",\"\u8F7B\u7EBA\u4E0E\u98DF\u54C1\u5B66\u9662\",\"\u8F7B\u5DE5\u751F\u7269\u6280\u672F\"],[\"848\",\"2012\u7EA7\",\"\u8F6F\u4EF6\u5B66\u9662\",\"\u8F6F\u4EF6\u5DE5\u7A0B\"],[\"849\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u54F2\u5B66\"],[\"850\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u7BA1\u7406\u4E0E\u4FE1\u606F\u7CFB\u7EDF\"],[\"853\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u571F\u6728\u5DE5\u7A0B\"],[\"854\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u7ED9\u6C34\u6392\u6C34\u5DE5\u7A0B\"],[\"856\",\"2012\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6D4B\u63A7\u6280\u672F\u4E0E\u4EEA\u5668\"],[\"857\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u5DE5\u7A0B\"],[\"858\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u529B\u5B66\"],[\"859\",\"2012\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u70ED\u80FD\u4E0E\u52A8\u529B\u5DE5\u7A0B\"],[\"860\",\"2012\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u5229\u6C34\u7535\u5DE5\u7A0B\"],[\"861\",\"2012\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u6C34\u6587\u4E0E\u6C34\u8D44\u6E90\u5DE5\u7A0B\"],[\"862\",\"2012\u7EA7\",\"\u6C34\u5229\u6C34\u7535\u5B66\u9662\",\"\u519C\u4E1A\u6C34\u5229\u5DE5\u7A0B\"],[\"863\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u51B6\u91D1\u5DE5\u7A0B\"],[\"864\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u7A0B\u7BA1\u7406\"],[\"865\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u5546\u7BA1\u7406\uFF08\u8FD0\u8425\u7BA1\u7406\u65B9\u5411\uFF09\"],[\"866\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5E02\u573A\u8425\u9500\"],[\"867\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\"],[\"868\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u8D22\u52A1\u7BA1\u7406\"],[\"869\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4EBA\u529B\u8D44\u6E90\u7BA1\u7406\"],[\"870\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u4F1A\u8BA1\u5B66\uFF08ACCA\u73ED\uFF09\"],[\"871\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u7535\u5B50\u5546\u52A1\"],[\"872\",\"2012\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u57FA\u7840\u533B\u5B66\uFF08\u57FA\u5730\u73ED\uFF09\"],[\"873\",\"2012\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"874\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u4E34\u5E8A\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"875\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u68C0\u9A8C\"],[\"876\",\"2012\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u536B\u751F\u68C0\u9A8C\"],[\"882\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u7269\u7406\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"883\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u5EB7\u590D\u6CBB\u7597\u5B66\uFF08\u4F5C\u4E1A\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"884\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u547C\u5438\u6CBB\u7597\u65B9\u5411\uFF09\"],[\"885\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\uFF08\u533B\u5B66\u8425\u517B\u65B9\u5411\uFF09\"],[\"887\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u62A4\u7406\u5B66\"],[\"888\",\"2012\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u4E03\u5E74\u5236\uFF09\"],[\"889\",\"2012\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\"],[\"890\",\"2012\u7EA7\",\"\u534E\u897F\u53E3\u8154\u533B\u5B66\u9662\",\"\u53E3\u8154\u533B\u5B66\uFF08\u516B\u5E74\u5236\uFF09\"],[\"891\",\"2012\u7EA7\",\"\u534E\u897F\u516C\u5171\u536B\u751F\u5B66\u9662\",\"\u9884\u9632\u533B\u5B66\"],[\"892\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u884C\u653F\u7BA1\u7406\"],[\"893\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u52B3\u52A8\u4E0E\u793E\u4F1A\u4FDD\u969C\"],[\"894\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u571F\u5730\u8D44\u6E90\u7BA1\u7406\"],[\"895\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u4FE1\u606F\u8D44\u6E90\u7BA1\u7406\"],[\"897\",\"2012\u7EA7\",\"\u5546\u5B66\u9662\",\"\u5DE5\u4E1A\u5DE5\u7A0B\"],[\"899\",\"2012\u7EA7\",\"\u7535\u5B50\u4FE1\u606F\u5B66\u9662\",\"\u7535\u5B50\u4FE1\u606F\u5DE5\u7A0B\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"9\",\"2011\u7EA7\",\"\u534E\u897F\u57FA\u7840\u533B\u5B66\u4E0E\u6CD5\u533B\u5B66\u9662\",\"\u6CD5\u533B\u5B66\"],[\"900\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5DE5\u7A0B\u9020\u4EF7\"],[\"905\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u8FC7\u7A0B\u88C5\u5907\u4E0E\u63A7\u5236\u5DE5\u7A0B\u7C7B\"],[\"906\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5316\u5B66\u5DE5\u7A0B\u4E0E\u5DE5\u827A\u7C7B\"],[\"908\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u65B0\u80FD\u6E90\u6750\u6599\u4E0E\u5668\u4EF6\"],[\"909\",\"2012\u7EA7\",\"\u8BA1\u7B97\u673A\u5B66\u9662\",\"\u7269\u8054\u7F51\u5DE5\u7A0B\"],[\"921\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u4E2D\u56FD\u8BED\u8A00\u6587\u5B66\u7C7B\"],[\"922\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u65B0\u95FB\u4F20\u64AD\u5B66\u7C7B\"],[\"923\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u5386\u53F2\u5B66\u7C7B\"],[\"924\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u73AF\u5883\u79D1\u5B66\"],[\"926\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u620F\u5267\u5F71\u89C6\u6587\u5B66\"],[\"927\",\"2012\u7EA7\",\"\u534E\u897F\u836F\u5B66\u9662\",\"\u4E34\u5E8A\u836F\u5B66\"],[\"928\",\"2012\u7EA7\",\"\u6587\u5B66\u4E0E\u65B0\u95FB\u5B66\u9662\",\"\u6C49\u8BED\u8A00\"],[\"929\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u4FDD\u9669\"],[\"930\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u4F1A\u5C55\u7ECF\u6D4E\u4E0E\u7BA1\u7406\"],[\"932\",\"2012\u7EA7\",\"\u5386\u53F2\u6587\u5316\u5B66\u9662\uFF08\u65C5\u6E38\u5B66\u9662\uFF09\",\"\u65C5\u6E38\u7BA1\u7406\u7C7B\"],[\"933\",\"2012\u7EA7\",\"\u7ECF\u6D4E\u5B66\u9662\",\"\u91D1\u878D\u5B66\u7C7B\"],[\"934\",\"2012\u7EA7\",\"\u5316\u5B66\u5DE5\u7A0B\u5B66\u9662\",\"\u5236\u836F\u5DE5\u7A0B\u7C7B\"],[\"935\",\"2012\u7EA7\",\"\u534E\u897F\u4E34\u5E8A\u533B\u5B66\u9662\",\"\u533B\u5B66\u6280\u672F\u7C7B\"],[\"936\",\"2012\u7EA7\",\"\u516C\u5171\u7BA1\u7406\u5B66\u9662\",\"\u793E\u4F1A\u5DE5\u4F5C\"],[\"937\",\"2012\u7EA7\",\"\u6750\u6599\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u6750\u6599\u79D1\u5B66\u7C7B\"],[\"964\",\"2011\u7EA7\",\"\u5236\u9020\u79D1\u5B66\u4E0E\u5DE5\u7A0B\u5B66\u9662\",\"\u673A\u68B0\u8BBE\u8BA1\u5236\u9020\u53CA\u5176\u81EA\u52A8\u5316\uFF08\u5353\u8D8A\u5DE5\u7A0B\u5E08\u73ED\uFF09\"],[\"965\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u73AF\u5883\u4E0E\u8BBE\u5907\u5DE5\u7A0B\"],[\"971\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u5EFA\u7B51\u5B66\"],[\"972\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u666F\u89C2\u5EFA\u7B51\u8BBE\u8BA1\"],[\"975\",\"2012\u7EA7\",\"\u5EFA\u7B51\u4E0E\u73AF\u5883\u5B66\u9662\",\"\u57CE\u5E02\u89C4\u5212\"],[\"983\",\"2009\u7EA7\",\"\u6570\u5B66\u5B66\u9662\",\"\u6570\u5B66\u4E0E\u5E94\u7528\u6570\u5B66\"]]");
var chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
var trainingScheme = {
  name: 'training-scheme',
  pathname: '/**',
  style: ".training-scheme-wrapper{position:relative}.training-scheme-wrapper .info-container .info-content{display:flex;flex-wrap:wrap}.training-scheme-wrapper .info-container .info-content>div{margin-bottom:20px}.training-scheme-wrapper .info-container .info-content table{height:100%;margin-bottom:0}.training-scheme-wrapper .info-container .info-content table tr:first-child td:first-child,.training-scheme-wrapper .info-container .info-content table tr:first-child td:nth-child(2){border-top:1px solid #eee}.training-scheme-wrapper .info-container .info-content table tr:last-child td:first-child,.training-scheme-wrapper .info-container .info-content table tr:last-child td:nth-child(2){border-bottom:1px solid #eee}.training-scheme-wrapper .info-container .info-content table tr td{vertical-align:middle}.training-scheme-wrapper .info-container .info-content table tr td:first-child{max-width:150px;min-width:100px;font-weight:bold;color:#336199;background-color:#EDF3F4;border-top:1px solid #F7FBFF;border-bottom:1px solid #F7FBFF}.training-scheme-wrapper .info-container .info-content table tr td:nth-child(2){border-top:1px dotted #DCEBF7;border-bottom:1px dotted #DCEBF7}.training-scheme-wrapper .loading-container{position:absolute;width:100%;left:0;top:0;height:60vh;display:flex;justify-content:center;align-items:center;flex-direction:column}.training-scheme-wrapper .loading-container .lds-dual-ring{display:inline-block;width:200px;height:200px}.training-scheme-wrapper .loading-container .lds-dual-ring:after{content:\" \";display:block;width:100%;height:100%;margin:1px;border-radius:50%;border:5px solid #336199;border-color:#336199 transparent #336199 transparent;animation:lds-dual-ring 1.2s linear infinite}.training-scheme-wrapper .loading-container .lds-title{font-size:30px;color:#336199;padding-top:40px;font-weight:lighter}@keyframes lds-dual-ring{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.training-scheme-wrapper .scheme-container *{box-sizing:border-box}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item{border-radius:4px;border:1px solid #ebeef5;background-color:#fff;overflow:hidden;color:#303133;transition:.3s;box-shadow:0 1px 3px rgba(26,26,26,0.1);margin-bottom:20px}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-title{height:50px;line-height:50px;padding:0 15px;border-bottom:1px solid #EBEEF5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;font-size:16px}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content{padding:15px;position:relative}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item{display:flex}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-title{font-weight:bold;display:flex;justify-content:center;align-items:center;font-size:16px;padding-right:20px;margin:5px;border-right:1px solid #EBEEF5}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content{flex:1;display:flex;flex-wrap:wrap}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper{width:20%}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item{display:flex;border-radius:4px;border:1px solid #ebeef5;background-color:#fff;overflow:hidden;color:#303133;transition:.3s;margin:5px}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-primary{padding:10px}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-primary .course-name{font-size:16px;line-height:2;font-weight:lighter}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary{padding:10px;padding-top:0}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary .info-tag{display:inline-block;height:24px;padding:0 5px;margin:2px 0;line-height:24px;font-size:12px;border-width:1px;border-style:solid;border-radius:4px;box-sizing:border-box;white-space:nowrap}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary .info-tag.course-number{background-color:#ecf4f8;border-color:#d9e8f1;color:#438EB9}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary .info-tag.course-attribute{background-color:#fdf6ec;border-color:#faecd8;color:#e6a23c}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary .info-tag.course-property-name{background-color:#fef0f0;border-color:#fde2e2;color:#f56c6c}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-item .semester-item-content .course-item-wrapper .course-item .course-item-info .info-secondary .info-tag.course-property-name.required{background-color:#f0f9eb;border-color:#e1f3d8;color:#67c23a}.training-scheme-wrapper .scheme-container .scheme-wrapper .year-item .year-item-content .semester-divider{background-color:#DCDFE6;position:relative;display:block;height:1px;width:100%;margin:24px 0}\n",
  menu: [{
    rootMenuId: 'sua-menu-list',
    rootMenuName: 'SCU URP 助手',
    id: 'menu-advanced-query',
    name: '高级查询',
    items: [{
      name: '培养方案查询',
      breadcrumbs: ['SCU URP 助手', '高级查询', '培养方案查询'],
      render: renderPageContent
    }]
  }]
};

function updateMajorList() {
  var $ = window.$;
  var grade = $('#grade').val();
  var department = $('#department').val();
  var res = trainingSchemeList.filter(function (v) {
    return v[1] === grade && v[2] === department;
  }).map(function (v) {
    return '<option value="' + v[0] + '">' + v[3] + '</option>';
  }).join('');
  $('#major').empty().append(res || "<option value=\"\u65E0\">\u65E0</option>");
}

function getSelfMajorNumber($) {
  $.ajaxSetup({
    beforeSend: function beforeSend(xhr) {
      return xhr.setRequestHeader('X-Requested-With', {
        toString: function toString() {
          return '';
        }
      });
    }
  });
  var res = $.get('/student/rollManagement/rollInfo/index').then(function (res) {
    return res.match(/name="zx" value="(\d+)"/)[1];
  }); // 还原Ajax配置

  $.ajaxSetup({
    beforeSend: null
  });
  return res;
}

function renderPageContent(root, $) {
  initFunc();
  initDOM(root, $);
  selectSelfMajorAndQuery($);
}

function showLoadingAnimation($) {
  var template = "\n    <div class=\"loading-container\">\n      <div class=\"lds-dual-ring\"></div>\n      <div class=\"lds-title\">( \xBA\uFE43\xBA ) \u5146\u57FA\u7948\u7977\u4E2D\u2026\u2026</div>\n    </div>\n  ";
  $('.info-container').remove();
  $('.scheme-container').remove();
  $('.training-scheme-wrapper').append(template);
}

function hideLoadingAnimation($) {
  $('.loading-container').remove();
}

function initFunc() {
  window.__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__ = updateMajorList;
  window.__$SUA_TRAINING_SCHEME_QUERY__ = query;
}

function initDOM(root, $) {
  var template = '\n    <div class="training-scheme-wrapper">\n      ' + genQueryHTML(trainingSchemeList) + '\n    </div>\n  ';
  $(root).append(template);
}

function genQueryHTML(trainingSchemeList) {
  var _trainingSchemeList$r = trainingSchemeList.reduce(function (acc, cur) {
    return {
      gradeList: acc.gradeList.includes(cur[1]) ? acc.gradeList : acc.gradeList.concat(cur[1]),
      departmentList: acc.departmentList.includes(cur[2]) ? acc.departmentList : acc.departmentList.concat(cur[2])
    };
  }, {
    gradeList: [],
    departmentList: []
  }),
      gradeList = _trainingSchemeList$r.gradeList,
      departmentList = _trainingSchemeList$r.departmentList;

  return "\n    <div class=\"query-container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 self-margin\">\n          <h4 class=\"header smaller lighter grey\">\n            <i class=\"ace-icon fa fa-search\"></i>\u67E5\u8BE2\u6761\u4EF6\n            <span class=\"right_top_oper\">\n              <button id=\"queryButton\" title=\"\u67E5\u8BE2\" class=\"btn btn-info btn-xs btn-round\" onclick=\"__$SUA_TRAINING_SCHEME_QUERY__()\">\n                <i class=\"ace-con fa fa-search white bigger-120\"></i>\u67E5\u8BE2\n              </button>\n            </span>\n          </h4>\n          <div class=\"profile-user-info profile-user-info-striped self\">\n            <div class=\"profile-info-row\">\n              <div class=\"profile-info-name\">\u5E74\u7EA7</div>\n              <div class=\"profile-info-value\">\n                <select name=\"grade\" id=\"grade\" class=\"select form-control value_element\" onchange=\"__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__()\">\n                  <option value=\"\u8BF7\u9009\u62E9\u5E74\u7EA7\">\u8BF7\u9009\u62E9\u5E74\u7EA7</option>\n                  " + gradeList.sort(function (a, b) {
    return Number(b.replace('级', '')) - Number(a.replace('级', ''));
  }).map(function (v) {
    return '<option value="' + v + '">' + v + '</option>';
  }).join('') + "\n                </select>\n              </div>\n              <div class=\"profile-info-name\">\u9662\u7CFB</div>\n              <div class=\"profile-info-value\">\n                <select name=\"department\" id=\"department\" class=\"select form-control value_element\" onchange=\"__$SUA_TRAINING_SCHEME_UPDATE_MAJOR_LIST__()\">\n                  <option value=\"\u8BF7\u9009\u62E9\u5B66\u9662\">\u8BF7\u9009\u62E9\u5B66\u9662</option>\n                  " + departmentList.map(function (v) {
    return '<option value="' + v + '">' + v + '</option>';
  }).join('') + "\n                </select>\n              </div>\n              <div class=\"profile-info-name\">\u4E13\u4E1A</div>\n              <div class=\"profile-info-value\">\n                <select name=\"major\" id=\"major\" class=\"form-control value_element\">\n                  <option value=\"\u65E0\">\u65E0</option>\n                </select>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ";
}

function genInfoHTML(info) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(info)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (!info[key]) {
        info[key] = '-';
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return '\n    <div class="info-container">\n      <div class="info-header row">\n        <div class="col-xs-12">\n          <h4 class="header smaller lighter grey">\n            <i class="fa fa-graduation-cap"></i> ' + info.zym + "\u65B9\u6848\u8BA1\u5212\u4FE1\u606F\n          </h4>\n        </div>\n      </div>\n      <div class=\"info-content row\">\n        <div class=\"col-xs-12 col-md-4\">\n          <table class=\"table table-bordered table-hover\">\n            <tbody>\n              <tr>\n                <td>\u65B9\u6848\u540D\u79F0</td>\n                <td>" + info.famc + "</td>\n              </tr>\n              <tr>\n                <td>\u8BA1\u5212\u540D\u79F0</td>\n                <td>" + info.jhmc + "</td>\n              </tr>\n              <tr>\n                <td>\u5E74\u7EA7</td>\n                <td>" + info.njmc + "</td>\n              </tr>\n              <tr>\n                <td>\u9662\u7CFB\u540D\u79F0</td>\n                <td>" + info.xsm + "</td>\n              </tr>\n              <tr>\n                <td>\u4E13\u4E1A\u540D\u79F0</td>\n                <td>" + info.zym + "</td>\n              </tr>\n              <tr>\n                <td>\u4E13\u4E1A\u65B9\u5411\u540D\u79F0</td>\n                <td>" + info.zyfxm + "</td>\n              </tr>\n              <tr>\n                <td>\u5B66\u4F4D</td>\n                <td>" + info.xwm + "</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"col-xs-12 col-md-4\">\n          <table class=\"table table-bordered table-hover\">\n            <tbody>\n              <tr>\n                <td>\u6BD5\u4E1A\u7C7B\u578B</td>\n                <td>" + info.bylxmc + "</td>\n              </tr>\n              <tr>\n                <td>\u5B66\u5236\u7C7B\u578B</td>\n                <td>" + info.xzlxmc + "</td>\n              </tr>\n              <tr>\n                <td>\u4FEE\u8BFB\u7C7B\u578B</td>\n                <td>" + info.xdlxmc + "</td>\n              </tr>\n              <tr>\n                <td>\u65B9\u6848\u8BA1\u5212\u7C7B\u578B</td>\n                <td>" + info.fajhlx + "</td>\n              </tr>\n              <tr>\n                <td>\u5F00\u59CB\u5B66\u5E74\u4EE3\u7801</td>\n                <td>" + info.xnmc + "</td>\n              </tr>\n              <tr>\n                <td>\u5B66\u671F\u7C7B\u578B\u4EE3\u7801</td>\n                <td>" + info.xqlxm + "</td>\n              </tr>\n              <tr>\n                <td>\u5F00\u59CB\u5B66\u671F\u4EE3\u7801</td>\n                <td>" + info.xqm + "</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"col-xs-12 col-md-4\">\n          <table class=\"table table-bordered table-hover\">\n            <tbody>\n              <tr>\n                <td>\u8981\u6C42\u603B\u5B66\u5206</td>\n                <td>" + info.yqzxf + "</td>\n              </tr>\n              <tr>\n                <td>\u8BFE\u7A0B\u603B\u5B66\u5206</td>\n                <td>" + info.kczxf + "</td>\n              </tr>\n              <tr>\n                <td>\u8BFE\u7A0B\u603B\u95E8\u6570</td>\n                <td>" + info.kczms + "</td>\n              </tr>\n              <tr>\n                <td>\u8BFE\u7A0B\u603B\u5B66\u65F6</td>\n                <td>" + info.kczxs + "</td>\n              </tr>\n              <tr>\n                <td>\u5B66\u5236\u7C7B\u578B</td>\n                <td>" + info.xzlxmc + "</td>\n              </tr>\n              <tr>\n                <td>\u57F9\u517B\u76EE\u6807</td>\n                <td>" + info.pymb + "</td>\n              </tr>\n              <tr>\n                <td>\u4FEE\u8BFB\u8981\u6C42</td>\n                <td>" + info.xdyq + "</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"col-xs-12\">\n          <table class=\"table table-bordered table-hover\">\n            <tbody>\n              <tr>\n                <td>\u5907\u6CE8</td>\n                <td>" + info.bz + '</td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  ';
}

function genSchemeHTML(list) {
  var courseItemTemplate = function courseItemTemplate(course, number) {
    return '\n    <div class="course-item-wrapper">\n      <div class="course-item">\n        <div class="course-item-info">\n          <div class="info-primary">\n            <div class="course-name">\n              <div>' + number + '. ' + course.courseName + "</div>\n            </div>\n          </div>\n          <div class=\"info-secondary\">\n            <div class=\"info-tag course-number\">\u8BFE\u7A0B\u53F7\uFF1A" + course.courseNumber + '</div>\n            ' + (course.coursePropertyName ? '<div class="info-tag course-property-name' + (course.coursePropertyName === '必修' || course.coursePropertyName.includes('中华文化') ? ' required' : '') + '">' + course.coursePropertyName + '</div>' : '') + '\n            ' + course.courseAttributes.map(function (v) {
      return '<div class="info-tag course-attribute">' + v + '</div>';
    }).join('&nbsp;') + '\n          </div>\n        </div>\n      </div>\n    </div>\n  ';
  };

  var semesterItemTemplate = function semesterItemTemplate(semester) {
    return '\n    <div class="semester-item">\n      <div class="semester-item-title">' + semester.name + '</div>\n      <div class="semester-item-content">\n        ' + semester.children.map(function (v, i) {
      return courseItemTemplate(v, i + 1);
    }).join('') + '\n      </div>\n    </div>\n  ';
  };

  var yearItemTemplate = function yearItemTemplate(year, grade) {
    return '\n  <div class="year-item">\n    <div class="year-item-title"><i class="fa fa-cubes" aria-hidden="true"></i> ' + year.name + "\uFF08" + chineseNumbers[grade] + "\u5E74\u7EA7\uFF09</div>\n    <div class=\"year-item-content\">\n      " + year.children.map(function (v) {
      return semesterItemTemplate(v);
    }).join('<div class="semester-divider"></div>') + '\n    </div>\n  </div>\n  ';
  };

  return "\n    <div class=\"scheme-container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <h4 class=\"header smaller lighter grey\">\n            <i class=\"fa fa-book\"></i> \u57F9\u517B\u65B9\u6848\u4E0E\u6307\u5BFC\u6027\u6559\u5B66\u8BA1\u5212\n          </h4>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"scheme-wrapper\">\n            " + list.map(function (v, i) {
    return yearItemTemplate(v, i + 1);
  }).join('') + '\n          </div>\n        </div>\n      </div>\n    </div>\n  ';
}

function getTrainingSchemeData(number, $) {
  $.ajaxSetup({
    beforeSend: function beforeSend(xhr) {
      return xhr.setRequestHeader('X-Requested-With', {
        toString: function toString() {
          return '';
        }
      });
    }
  });
  var coursePropertyNameList = ['必修', '选修'];

  var res = _promise2.default.all([$.get('/student/rollManagement/project/' + number + '/2/detail').then(function (_ref4) {
    var jhFajhb = _ref4.jhFajhb,
        treeList = _ref4.treeList;
    return {
      info: jhFajhb,
      list: treeList.reduce(function (acc, cur) {
        if (cur.name.match(/^\d{4}-\d{4}学年$/)) {
          acc.push({
            name: cur.name,
            children: []
          });
        } else if (cur.name === '春' || cur.name === '秋') {
          acc[acc.length - 1].children.push({
            name: cur.name,
            children: []
          });
        } else {
          acc[acc.length - 1].children[acc[acc.length - 1].children.length - 1].children.push({
            courseName: cur.name,
            courseNumber: cur.urlPath.match(/project\/.+\/(\d+)$/)[1]
          });
        }

        return acc;
      }, [])
    };
  }), $.get('/student/rollManagement/project/' + number + '/1/detail').then(function (_ref5) {
    var treeList = _ref5.treeList;
    return (0, _values2.default)(treeList.reduce(function (acc, cur) {
      acc[cur.id] = cur;

      if (!acc[cur.pId]) {
        acc[cur.pId] = {
          id: cur.pId
        };
      }

      cur.parent = acc[cur.pId];
      cur.isDir = cur.name.includes('fa-kz');

      if (cur.name.includes('必修')) {
        cur.coursePropertyName = '必修';
      } else if (cur.name.includes('选修')) {
        cur.coursePropertyName = '选修';
      } else {
        cur.coursePropertyName = '';
      }

      cur.courseName = cur.name.match(/<\/i>(.+)$/)[1].replace(' 必修', '').replace(' 选修', '');
      return acc;
    }, {})).reduce(function (acc, _ref6) {
      var urlPath = _ref6.urlPath,
          isDir = _ref6.isDir,
          parent = _ref6.parent,
          courseName = _ref6.courseName,
          coursePropertyName = _ref6.coursePropertyName;

      if (urlPath) {
        var courseNumber = urlPath.match(/@(.+)$/)[1];

        if (!isDir) {
          var courseAttributes = [];
          var p = parent;

          while (p.courseName) {
            if (!coursePropertyNameList.includes(p.courseName)) {
              courseAttributes.unshift(p.courseName);
            }

            p = p.parent;
          }

          acc[courseNumber] = {
            courseName: courseName,
            courseNumber: courseNumber,
            coursePropertyName: coursePropertyName,
            courseAttributes: courseAttributes
          };
        }
      }

      return acc;
    }, {});
  }), number]).then(function (_ref7) {
    var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
        _ref8$ = _ref8[0],
        info = _ref8$.info,
        list = _ref8$.list,
        selfMajorNumber = _ref8$.selfMajorNumber,
        table = _ref8[1];

    return {
      selfMajorNumber: selfMajorNumber,
      info: info,
      list: list.map(function (year) {
        return {
          name: year.name,
          children: year.children.map(function (semester) {
            return {
              name: semester.name,
              children: semester.children.map(function (v) {
                return (0, _assign2.default)(v, table[v.courseNumber]);
              }).sort(function (a, b) {
                var propertyWeight = {
                  必修: 100,
                  '中华文化（春）': 75,
                  '中华文化（秋）': 75,
                  选修: 50
                };
                var attributeWeight = {
                  公共基础课: 10,
                  公共课: 10,
                  '中华文化（春）_kz': 9,
                  '中华文化（秋）_kz': 9,
                  学科基础课: 8,
                  专业基础课: 8,
                  专业课: 6,
                  实践环节: 4
                };

                var getAttributesWeight = function getAttributesWeight(attributes) {
                  return (attributes || []).reduce(function (acc, cur) {
                    return acc + (attributeWeight[cur] || 0);
                  }, 0);
                };

                var weightA = (propertyWeight[a.coursePropertyName] || 0) + getAttributesWeight(a.courseAttributes);
                var weightB = (propertyWeight[b.coursePropertyName] || 0) + getAttributesWeight(b.courseAttributes);
                return weightB - weightA;
              })
            };
          })
        };
      })
    };
  }); // 还原Ajax配置


  $.ajaxSetup({
    beforeSend: null
  });
  return res;
}

module.exports = trainingScheme;
},{"babel-runtime/core-js/object/assign":"gc0D","babel-runtime/helpers/slicedToArray":"m8OI","babel-runtime/core-js/object/values":"Qujq","babel-runtime/core-js/promise":"L3Vt","babel-runtime/core-js/object/keys":"8FtN","babel-runtime/core-js/get-iterator":"X9RM","babel-runtime/regenerator":"aIIw","babel-runtime/helpers/asyncToGenerator":"kcQR","fs":"tuDi"}],"287w":[function(require,module,exports) {
'use strict';

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var minimatch = require('minimatch');

var fastEvaluation = require('./plugins/fast-evaluation');

var tooltip = require('./plugins/tooltip');

var compatibilityLegacy = require('./plugins/compatibility-legacy');

var fastEvaluationLegacy = require('./plugins/fast-evaluation-legacy');

var recoverRememberMe = require('./plugins/recover-remember-me');

var gpa = require('./plugins/gpa');

var trainingScheme = require('./plugins/training-scheme'); // 挂载到 window 上的全局对象


var $sua = {
  // 属性值的存放处
  data: {
    /**
     * 定时任务的执行间隔
     */
    taskTimeInterval: 100
  },

  /**
   * 插件
   */
  plugins: [tooltip, fastEvaluation, recoverRememberMe, gpa, trainingScheme],

  /**
   * 初始化任务的队列
   */
  initQueue: [],

  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],

  /**
   * 加载样式的队列
   */
  styleQueue: [],

  /**
   * 加载菜单的队列
   */
  menuQueue: [],

  /**
   * 存储菜单的对象
   */
  menuItems: [],

  /**
   * 初始化 SCU URP 助手
   */
  init: function init() {
    var _this = this; // 旧版教务系统兼容


    if (window.location.host === 'zhjwwx.scu.edu.cn:8080') {
      if (window.location.pathname !== '/loginAction.do') {
        return;
      }

      var dataLegacy = {
        topFrame: window.frames.topFrame,
        bottomFrame: window.frames.bottomFrame,
        menuFrame: window.frames.bottomFrame.frames.menuFrame,
        mainFrame: window.frames.bottomFrame.frames.mainFrame
      };
      var pluginsLegacy = [compatibilityLegacy, fastEvaluationLegacy];
      window.$sua = (0, _assign2.default)($sua, dataLegacy);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(pluginsLegacy), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;
          plugin.$sua = $sua;
          plugin = (0, _assign2.default)(plugin, dataLegacy);

          if (plugin.init) {
            this.initQueue.push(plugin.init.bind(plugin));
          }

          if (plugin.task) {
            this.taskQueue.push(plugin.task.bind(plugin));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(this.initQueue), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;
          i();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      setInterval(function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(_this.taskQueue), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var t = _step3.value;
            t();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }, this.timeInterval);
      return;
    } // 将data中的属性注入$sua对象中，使其内部可以用this直接访问


    window.$sua = (0, _assign2.default)($sua, $sua.data); // 加载插件

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(this.plugins), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _plugin = _step4.value;
        _plugin.$sua = $sua; // 将data中的属性注入plugin对象中，使其内部可以用this直接访问

        _plugin = (0, _assign2.default)(_plugin, $sua.data);

        if (urlTrigger(_plugin)) {
          // 将样式推入队列中
          if (_plugin.style) {
            this.styleQueue.push(_plugin.style);
          } // 将菜单推入队列中


          if (_plugin.menu) {
            this.menuQueue = this.menuQueue.concat(_plugin.menu);
          } // 将初始化方法推入队列中


          if (_plugin.init) {
            this.initQueue.push(_plugin.init.bind(_plugin));
          } // 将需要定时执行的任务推入队列中


          if (_plugin.task) {
            this.taskQueue.push(_plugin.task.bind(_plugin));
          }
        }
      } // 加载样式

    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    window.$('head').append("\n      <style type=\"text/css\">\n        body, h1, h2, h3, h4, h5, h6 {\n          font-family: \"Helvetica Neue\",Helvetica,\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei\",\"\u5FAE\u8F6F\u96C5\u9ED1\",Arial,sans-serif;\n        }\n      </style>\n    ");
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)(this.styleQueue), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var s = _step5.value;
        window.$('head').append('\n        <style type="text/css">\n          ' + s + '\n        </style>\n      ');
      } // 加载菜单

    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var _loop = function _loop(m) {
      var rootMenuId = m.rootMenuId,
          rootMenuName = m.rootMenuName,
          menuId = m.id,
          menuName = m.name,
          items = m.items;
      var $rootMenuList = window.$('#menus'); // 检查根菜单是否存在，如不存在则新建

      if (!$rootMenuList.children('li#' + rootMenuId).length) {
        $rootMenuList.append('\n          <li class="hsub sua-menu-list" id="' + rootMenuId + '" onclick="rootMenuClick(this);">\n            <a href="#" class="dropdown-toggle">\n              <i class="menu-icon fa fa-gavel"></i>\n              <span class="menu-text">' + rootMenuName + '</span>\n              <b class="arrow fa fa-angle-down"></b>\n            </a>\n            <b class="arrow"></b>\n            <ul class="submenu nav-hide" onclick="stopHere();" style="display: none;">\n            </ul>\n          </li>\n        ');
      }

      var $rootMenu = $rootMenuList.find('li#' + rootMenuId + '>ul.submenu'); // 检查菜单是否存在，如不存在则新建

      if (!$rootMenu.children('li#' + menuId).length) {
        $rootMenu.append('\n          <li class="hsub open sua-menu" id="' + menuId + '">\n            <a href="#" class="dropdown-toggle">\n              <i class="menu-icon fa fa-caret-right"></i>' + menuName + '\n              <b class="arrow fa fa-angle-down"></b></a>\n            <b class="arrow"></b>\n            <ul class="submenu nav-show" style="display: block;">\n            </ul>\n          </li>\n        ');
      }

      var $menu = $rootMenu.find('li#' + menuId + '>ul.submenu');
      items.forEach(function (_ref) {
        var name = _ref.name,
            breadcrumbs = _ref.breadcrumbs,
            render = _ref.render;
        $menu.append('\n          <li class="sua-menu-item" id="menu-item-' + name + '" onclick="$sua.menuItems[' + _this.menuItems.length + '].clickHandler()">\n            <a href="#">&nbsp;&nbsp; ' + name + '</a>\n            <b class="arrow"></b>\n          </li>\n        ');

        _this.menuItems.push({
          element: $menu.children('#menu-item-' + name)[0],
          id: 'menu-item-' + name,
          name: name,
          clickHandler: function clickHandler() {
            var _this2 = this;

            window.$sua.menuItems.forEach(function (v) {
              if (v.id === _this2.element.id) {
                window.$(v.element).addClass('active');
              } else {
                window.$(v.element).removeClass('active');
              }
            });
            var $breadcrumbs = window.$('.main-content>.breadcrumbs>ul.breadcrumb');
            $breadcrumbs.empty().append("\n              <li onclick=\"javascript:window.location.href='/'\" style=\"cursor:pointer;\">\n                <i class=\"ace-icon fa fa-home home-icon\"></i>\n                \u9996\u9875\n              </li>\n              <li class=\"active\" onclick=\"ckickTopMenu(this);return false;\" id=\"firmenu\" menuid=\"" + rootMenuId + '">' + rootMenuName + '</li>\n              <li class="active" onclick="ckickTopMenu(this);return false;" id="secmenu" menuid="' + menuId + '">' + menuName + '</li>\n              <li class="active" onclick="ckickTopMenu(this);return false;" id="lastmenu" menuid="' + this.element.id + '">' + this.name + '</li>\n            ');
            var $pageContent = window.$('.main-content>.page-content');
            $pageContent.empty();
            render(window.$('.main-content>.page-content')[0], window.$);
          }
        });
      });
    };

    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = (0, _getIterator3.default)(this.menuQueue), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var m = _step6.value;

        _loop(m);
      } // 初始化方法

    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6.return) {
          _iterator6.return();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = (0, _getIterator3.default)(this.initQueue), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _i = _step7.value;

        _i();
      } // 定时任务

    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7.return) {
          _iterator7.return();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    setInterval(function () {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = (0, _getIterator3.default)(_this.taskQueue), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var t = _step8.value;
          t();
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8.return) {
            _iterator8.return();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }, this.taskTimeInterval);
    /**
     * 检测当前的location.pathname是否满足插件触发要求
     *
     * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
     * 如果 pathname 属性不存在，则默认对全体 url 均生效
     * @returns 检测的结果
     */

    function urlTrigger(plugin) {
      var pathname = plugin.pathname; // 如果pathname不存在，默认对全部url生效

      if (!pathname) {
        return true;
      } else if (typeof pathname === 'boolean') {
        return pathname;
      } else if (typeof pathname === 'string') {
        return minimatch(window.location.pathname, pathname);
      } else if (Array.isArray(pathname)) {
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = (0, _getIterator3.default)(pathname), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var item = _step9.value;

            if (minimatch(window.location.pathname, item)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        return false;
      } else if ((typeof pathname === 'undefined' ? 'undefined' : (0, _typeof3.default)(pathname)) === 'object') {
        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = (0, _getIterator3.default)((0, _values2.default)(pathname)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var _item = _step10.value;

            if (minimatch(window.location.pathname, _item)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }

        return false;
      } else if (typeof pathname === 'function') {
        return pathname.bind(plugin)();
      }

      return false;
    }
  }
};
module.exports = $sua;
},{"babel-runtime/core-js/object/values":"Qujq","babel-runtime/helpers/typeof":"GyB/","babel-runtime/core-js/get-iterator":"X9RM","babel-runtime/core-js/object/assign":"gc0D","minimatch":"Nt/K","./plugins/fast-evaluation":"eunL","./plugins/tooltip":"IHPy","./plugins/compatibility-legacy":"BZ5J","./plugins/fast-evaluation-legacy":"wAV6","./plugins/recover-remember-me":"Gbn9","./plugins/gpa":"Fqjc","./plugins/training-scheme":"J+gl"}],"9TYs":[function(require,module,exports) {
'use strict'; // ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.9.3
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。2. 恢复登陆页面的「两周之内不必登录」选项。3. 增强绩点与均分的计算功能。4. 增加查询全校专业的培养方案与指导性教学计划的功能
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @include      http://zhjwwx.scu.edu.cn:8080/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

var sua = require('./sua-core');

(function () {
  if (!window.jQuery) {
    var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
    var src = 'https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js';
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');

    script.onload = function () {
      // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
      window.$(function () {
        sua.init();
      });
    };

    script.setAttribute('src', src);
    HEAD.appendChild(script);
  } else {
    // 必须等页面加载完之后再初始化，否则此时页面结构还没加载出来，document里面内容不全
    window.$(function () {
      sua.init();
    });
  }
})();
},{"./sua-core":"287w"}]},{},["9TYs"], null)