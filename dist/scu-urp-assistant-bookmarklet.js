// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({68:[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],60:[function(require,module,exports) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],146:[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],121:[function(require,module,exports) {
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

},{"./_a-function":146}],116:[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],72:[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":116}],132:[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],108:[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":132}],150:[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":116,"./_global":68}],143:[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":108,"./_fails":132,"./_dom-create":150}],138:[function(require,module,exports) {
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

},{"./_is-object":116}],106:[function(require,module,exports) {
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

},{"./_an-object":72,"./_ie8-dom-define":143,"./_to-primitive":138,"./_descriptors":108}],107:[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],69:[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":106,"./_property-desc":107,"./_descriptors":108}],133:[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],89:[function(require,module,exports) {

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

},{"./_global":68,"./_core":60,"./_ctx":121,"./_hide":69,"./_has":133}],120:[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":89,"./_descriptors":108,"./_object-dp":106}],106:[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":120,"../../modules/_core":60}],6:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":106}],118:[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],119:[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],65:[function(require,module,exports) {
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

},{"./_to-integer":118,"./_defined":119}],109:[function(require,module,exports) {
module.exports = true;

},{}],110:[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":69}],70:[function(require,module,exports) {
module.exports = {};

},{}],145:[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],131:[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":145}],105:[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":131,"./_defined":119}],124:[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":118}],153:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":118}],152:[function(require,module,exports) {
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

},{"./_to-iobject":105,"./_to-length":124,"./_to-absolute-index":153}],114:[function(require,module,exports) {

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

},{"./_core":60,"./_global":68,"./_library":109}],115:[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],144:[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":114,"./_uid":115}],147:[function(require,module,exports) {
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

},{"./_has":133,"./_to-iobject":105,"./_array-includes":152,"./_shared-key":144}],148:[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],128:[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":147,"./_enum-bug-keys":148}],149:[function(require,module,exports) {
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

},{"./_object-dp":106,"./_an-object":72,"./_object-keys":128,"./_descriptors":108}],151:[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":68}],139:[function(require,module,exports) {
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

},{"./_an-object":72,"./_object-dps":149,"./_enum-bug-keys":148,"./_shared-key":144,"./_dom-create":150,"./_html":151}],71:[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":114,"./_uid":115,"./_global":68}],112:[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":106,"./_has":133,"./_wks":71}],111:[function(require,module,exports) {
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

},{"./_object-create":139,"./_property-desc":107,"./_set-to-string-tag":112,"./_hide":69,"./_wks":71}],127:[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":119}],113:[function(require,module,exports) {
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

},{"./_has":133,"./_to-object":127,"./_shared-key":144}],66:[function(require,module,exports) {
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

},{"./_library":109,"./_export":89,"./_redefine":110,"./_hide":69,"./_iterators":70,"./_iter-create":111,"./_set-to-string-tag":112,"./_object-gpo":113,"./_wks":71}],47:[function(require,module,exports) {
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

},{"./_string-at":65,"./_iter-define":66}],103:[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],104:[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],67:[function(require,module,exports) {
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

},{"./_add-to-unscopables":103,"./_iter-step":104,"./_iterators":70,"./_to-iobject":105,"./_iter-define":66}],46:[function(require,module,exports) {

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

},{"./es6.array.iterator":67,"./_global":68,"./_hide":69,"./_iterators":70,"./_wks":71}],84:[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":71}],45:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":47,"../../modules/web.dom.iterable":46,"../../modules/_wks-ext":84}],26:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":45}],135:[function(require,module,exports) {
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

},{"./_uid":115,"./_is-object":116,"./_has":133,"./_object-dp":106,"./_fails":132}],134:[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":68,"./_core":60,"./_library":109,"./_wks-ext":84,"./_object-dp":106}],129:[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],130:[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],136:[function(require,module,exports) {
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

},{"./_object-keys":128,"./_object-gops":129,"./_object-pie":130}],137:[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":145}],142:[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":147,"./_enum-bug-keys":148}],140:[function(require,module,exports) {
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

},{"./_to-iobject":105,"./_object-gopn":142}],141:[function(require,module,exports) {
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

},{"./_object-pie":130,"./_property-desc":107,"./_to-iobject":105,"./_to-primitive":138,"./_has":133,"./_ie8-dom-define":143,"./_descriptors":108}],91:[function(require,module,exports) {

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

},{"./_global":68,"./_has":133,"./_descriptors":108,"./_export":89,"./_redefine":110,"./_meta":135,"./_fails":132,"./_shared":114,"./_set-to-string-tag":112,"./_uid":115,"./_wks":71,"./_wks-ext":84,"./_wks-define":134,"./_enum-keys":136,"./_is-array":137,"./_an-object":72,"./_is-object":116,"./_to-iobject":105,"./_to-primitive":138,"./_property-desc":107,"./_object-create":139,"./_object-gopn-ext":140,"./_object-gopd":141,"./_object-dp":106,"./_object-keys":128,"./_object-gopn":142,"./_object-pie":130,"./_object-gops":129,"./_library":109,"./_hide":69}],92:[function(require,module,exports) {

},{}],93:[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":134}],94:[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":134}],54:[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":91,"../../modules/es6.object.to-string":92,"../../modules/es7.symbol.async-iterator":93,"../../modules/es7.symbol.observable":94,"../../modules/_core":60}],24:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":54}],124:[function(require,module,exports) {
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

},{"./_export":89,"./_core":60,"./_fails":132}],121:[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":127,"./_object-gpo":113,"./_object-sap":124}],104:[function(require,module,exports) {
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;

},{"../../modules/es6.object.get-prototype-of":121,"../../modules/_core":60}],8:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":104}],13:[function(require,module,exports) {
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
},{"../core-js/symbol/iterator":26,"../core-js/symbol":24}],90:[function(require,module,exports) {
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

},{"./_object-keys":128,"./_to-iobject":105,"./_object-pie":130}],61:[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":89,"./_object-to-array":90}],34:[function(require,module,exports) {
require('../../modules/es7.object.values');
module.exports = require('../../modules/_core').Object.values;

},{"../../modules/es7.object.values":61,"../../modules/_core":60}],12:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/values"), __esModule: true };
},{"core-js/library/fn/object/values":34}],117:[function(require,module,exports) {
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

},{"./_cof":145,"./_wks":71}],73:[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":117,"./_wks":71,"./_iterators":70,"./_core":60}],48:[function(require,module,exports) {
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":72,"./core.get-iterator-method":73,"./_core":60}],27:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/web.dom.iterable":46,"../modules/es6.string.iterator":47,"../modules/core.get-iterator":48}],14:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":27}],88:[function(require,module,exports) {
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

},{"./_object-keys":128,"./_object-gops":129,"./_object-pie":130,"./_to-object":127,"./_iobject":131,"./_fails":132}],59:[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":89,"./_object-assign":88}],33:[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":59,"../../modules/_core":60}],15:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":33}],41:[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
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
    }
    // if setTimeout wasn't available but was latter defined
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
    }
    // if clearTimeout wasn't available but was latter defined
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
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
},{}],21:[function(require,module,exports) {
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

},{"process":41}],39:[function(require,module,exports) {
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

},{}],40:[function(require,module,exports) {
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

},{}],22:[function(require,module,exports) {
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


},{"concat-map":39,"balanced-match":40}],11:[function(require,module,exports) {
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

},{"path":21,"brace-expansion":22}],120:[function(require,module,exports) {
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

},{"./_classof":117,"./_wks":71,"./_iterators":70,"./_core":60}],74:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/web.dom.iterable":46,"../modules/es6.string.iterator":47,"../modules/core.is-iterable":120}],56:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":74}],32:[function(require,module,exports) {
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
},{"../core-js/is-iterable":56,"../core-js/get-iterator":14}],122:[function(require,module,exports) {
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

},{"./_an-object":72}],123:[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":70,"./_wks":71}],125:[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":106,"./_property-desc":107}],126:[function(require,module,exports) {
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

},{"./_wks":71}],87:[function(require,module,exports) {
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

},{"./_ctx":121,"./_export":89,"./_to-object":127,"./_iter-call":122,"./_is-array-iter":123,"./_to-length":124,"./_create-property":125,"./core.get-iterator-method":73,"./_iter-detect":126}],50:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":47,"../../modules/es6.array.from":87,"../../modules/_core":60}],31:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":50}],79:[function(require,module,exports) {
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 一键评教插件
var fastEvaluation = {
  name: 'fast-evaluation',
  pathname: '/student/teachingEvaluation/evaluation/index',
  $btn: undefined,
  $prompt: undefined,
  list: [],
  evaluationInterval: 1000 * 121,
  checkboxWrapperSelectors: {
    '研究生助教评价': '#yjs-checkbox-wrapper',
    '学生评教（课堂教学）': '#ktjx-checkbox-wrapper',
    '学生评教（实验教学）': '#syjx-checkbox-wrapper',
    '学生评教（实践教学）': '#sjjx-checkbox-wrapper',
    '学生评教（体育教学）': '#tyjx-checkbox-wrapper'
  },
  questionsNumberRange: {
    '研究生助教评价': {
      begin: 28,
      end: 33
    },
    '学生评教（课堂教学）': {
      begin: 36,
      end: 42
    },
    '学生评教（实验教学）': {
      begin: 82,
      end: 88
    },
    '学生评教（实践教学）': {
      begin: 89,
      end: 95
    },
    '学生评教（体育教学）': {
      begin: 96,
      end: 102
    }
  },
  templates: {
    btn: '<button class="btn btn-xs btn-round btn-light" id="fast_evaluation_btn" style="margin-left: 5px;">点此开始一键评教!</button>',
    prompt: '<span id="fast_evaluation_prompt" style="margin-left: 10px;"></span>',
    selectionModal: '\n      <div id="selection-modal">\n        <style>\n          #selection-modal {\n            padding: 10px 20px;\n          }\n\n          .selection-modal-introduction>p {\n            font-size: 14px;\n            margin-bottom: 10px;\n          }\n\n          .selection-modal-introduction>p:last-child {\n            margin-bottom: 0;\n          }\n\n          .checkbox-wrapper {\n            display: flex;\n            flex-wrap: wrap;\n            margin-bottom: 10px;\n          }\n\n          .checkbox-wrapper:last-child {\n            margin-bottom: 0;\n          }\n\n          #selection-checkbox-wrapper>.checkbox {\n            padding-bottom: 7px;\n          }\n\n        </style>\n        <form id="selection-form" class="form-horizontal" role="form">\n          <div class="row">\n            <div class="col-xs-12">\n              <div class="selection-modal-introduction">\n                <p>\u6240\u6709\u9009\u4E2D\u7684\u8001\u5E08\u90FD\u5C06\u88AB\u4E00\u952E\u6EE1\u5206\u597D\u8BC4\uFF0C\u4E3B\u89C2\u8BC4\u4EF7\u4F1A\u4ECE25\u6761\u8BED\u53E5\u5E93\u91CC\u968F\u673A\u62BD\u53D6\u3002</p>\n                <p>\u9ED8\u8BA4\u6240\u6709\u8001\u5E08\u90FD\u662F\u9009\u4E2D\u72B6\u6001\uFF0C\u60A8\u53EA\u9700\u8981\u53D6\u6D88\u52FE\u9009\u60A8\u60F3\u624B\u52A8\u8BC4\u4EF7\u7684\u8001\u5E08\u5373\u53EF\u3002</p>\n              </div>\n              <hr>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u8BFE\u5802\u6559\u5B66\uFF09</h4>\n              <div id="ktjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u9A8C\u6559\u5B66\uFF09</h4>\n              <div id="syjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u5B9E\u8DF5\u6559\u5B66\uFF09</h4>\n              <div id="sjjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u5B66\u751F\u8BC4\u6559\uFF08\u4F53\u80B2\u6559\u5B66\uFF09</h4>\n              <div id="tyjx-checkbox-wrapper" class="checkbox-wrapper"></div>\n              <h4 class="lighter blue">\u7814\u7A76\u751F\u52A9\u6559\u8BC4\u4EF7</h4>\n              <div id="yjs-checkbox-wrapper" class="checkbox-wrapper"></div>\n            </div>\n          </div>\n        </form>\n      </div>\n    '
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
          _this.evaluate(0);
        }
      }
    });
  },
  collectData: function collectData() {
    var _this2 = this;

    var collectingMsgIndex = window.layer.msg('正在收集本页问卷数据……');
    var items = (0, _from2.default)(document.getElementById('jxpgtbody').getElementsByTagName('button')).filter(function (item) {
      return item.innerText === '评估';
    })
    // 2018-8-31 20:21:20
    // 今天发现 urp 代码有修改，把 evaluationContentContent 从 onClick 函数调用里删除了。
    // 临时这样补上，尽量不做大修改，防止出错。
    .map(function (item) {
      return item.getAttribute('onClick').replace(/evaluationResult\("|evaluation\("|"\);return false;/ig, '') + ('","' + item.parentElement.parentElement.children[3].innerText);
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

    var result = { questionnaireCode: questionnaireCode, questionnaireName: questionnaireName, evaluatedPeopleNumber: evaluatedPeopleNumber, evaluatedPeople: evaluatedPeople, evaluationContentNumber: evaluationContentNumber, evaluationContentContent: evaluationContentContent };
    return result;
  },
  getComment: function getComment() {
    return encodeURIComponent(this.comments[Math.floor(Math.random() * this.comments.length)]);
  },
  evaluate: function evaluate(index) {
    var _this3 = this;

    var origin = window.location.origin;
    if (index >= this.list.length) {
      this.changePrompt('\u672C\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
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

    this.changePrompt('\u6B63\u5728\u8BC4\u4EF7' + evaluationContentContent + '\u8BFE\u7A0B\u7684' + evaluatedPeople + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');

    window.$.ajax({
      type: 'POST',
      url: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
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
        window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
      },
      success: function success(data) {
        tokenValue = data.match(/<input.+tokenValue.+value="(.+)"\/>/i)[1];

        if (_this3.questionsNumberRange[questionnaireName]) {
          var _questionsNumberRange = _this3.questionsNumberRange[questionnaireName],
              begin = _questionsNumberRange.begin,
              end = _questionsNumberRange.end;

          var bodyStr = 'tokenValue=' + tokenValue + '&questionnaireCode=' + questionnaireCode + '&evaluationContentNumber=' + evaluationContentNumber + '&evaluatedPeopleNumber=' + evaluatedPeopleNumber;
          for (var i = begin; i <= end; i++) {
            var num = ('0000000000' + i).substr(-10);
            bodyStr += '&' + num + '=10_1';
          }
          bodyStr += '&zgpj=' + _this3.getComment();

          window.$.ajax({
            cache: true,
            type: 'POST',
            async: true,
            url: '/student/teachingEvaluation/teachingEvaluation/evaluation',
            data: bodyStr,
            error: function error(xhr) {
              window.urp.alert('\u9519\u8BEF\u4EE3\u7801[' + xhr.readyState + '-' + xhr.status + ']:\u83B7\u53D6\u6570\u636E\u5931\u8D25\uFF01');
              _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
            },
            success: function success(data) {
              if (data['result'].indexOf('/') !== -1) {
                console.log(data);
              } else if (data['result'] === 'success') {
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length + '\uFF0C\u5C06\u57282\u5206\u949F\u540E\u81EA\u52A8\u5F00\u59CB\u8BC4\u4EF7\u4E0B\u4E00\u4F4D\u8001\u5E08\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~');
                setTimeout(function () {
                  _this3.evaluate(++index);
                }, _this3.evaluationInterval);
              } else if (data['result'] === 'notEnoughTime') {
                tokenValue = data['token'];
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + ' \u8DDD\u79BB\u4E0A\u4E00\u6B21\u63D0\u4EA4\u672A\u52302\u5206\u949F QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length + '\uFF0C\u5C06\u57282\u5206\u949F\u540E\u81EA\u52A8\u91CD\u65B0\u8BC4\u4EF7\u8FD9\u4F4D\u8001\u5E08\uFF0C\u8BC4\u6559\u8FC7\u7A0B\u4E2D\u60A8\u53EF\u4EE5\u53BB\u505A\u4E9B\u5176\u4ED6\u4E8B\u60C5\uFF0C\u53EA\u8981\u4E0D\u5173\u95ED\u6B64\u7F51\u9875\u5C31\u53EF\u4EE5~');
                setTimeout(function () {
                  _this3.evaluate(index);
                }, _this3.evaluationInterval);
              } else {
                window.urp.alert('保存失败');
                _this3.changePrompt(evaluatedPeople + '\uFF08' + evaluationContentContent + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
              }
            }
          });
        } else {
          console.log('无效的问卷名称：' + questionnaireName);
        }
      }
    });
  }
};

module.exports = fastEvaluation;
},{"babel-runtime/helpers/slicedToArray":32,"babel-runtime/core-js/array/from":31}],80:[function(require,module,exports) {
'use strict';

// 提示信息插件

var tooltip = {
  name: 'tooltip',
  pathname: '/**',
  $loginTooltip: undefined,
  $navTooltip: undefined,
  version: '0.7.12',
  init: function init() {
    if (window.location.pathname === '/login') {
      this.$loginTooltip = window.$('\n        <span class="sua-tooltip" style="\n          position: absolute;\n          font-size: 12px;\n          top: 10px;\n          right: 15px;\n          color: #909399;\n        ">\n          SCU URP \u52A9\u624B ' + this.version + '\n        </span>');
      window.$('#formContent').prepend(this.$loginTooltip);
    } else {
      this.$navTooltip = window.$('\n        <li class="light-orange" style="text-align: center">\n            <a href="#"\n              onclick="javascript:window.open(\'https://zhaoji.wang/sichuan-university-urp-assistant/\');\n            ">\n              <i class="ace-icon fa fa-gavel"></i> SCU URP \u52A9\u624B ' + this.version + '\n            </a>\n        </li>');
      window.$('#navbar-container > div.navbar-buttons.navbar-header.pull-right > ul').prepend(this.$navTooltip);
    }
  }
};

module.exports = tooltip;
},{}],81:[function(require,module,exports) {
'use strict';

// 删除手动评教的时间限制插件

var removeEvaluationTimeLimit = {
  name: 'remove-evaluation-time-limit',
  pathname: '/student/teachingEvaluation/teachingEvaluation/evaluationPage',
  init: function init() {
    window.$('#RemainM').parent().parent().html('<h4 class="green">时间限制已移除</h4>');
    window.flag = true;
  }
};

module.exports = removeEvaluationTimeLimit;
},{}],82:[function(require,module,exports) {
'use strict';

// 修复兼容性插件(旧版教务系统)

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
    var resizable = 'no';
    // 默认窗口需要可以滚动，不然课程表之类的都只能显示一半
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
},{}],83:[function(require,module,exports) {
'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// 一键评教插件(旧版教务系统)
var fastEvaluationLegacy = {
  list: [],
  btn: void 0,
  span: void 0,
  evaluationInterval: 500,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
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
    var result = { wjbm: wjbm, bpr: bpr, bprm: bprm, wjmc: wjmc, pgnrm: pgnrm, pgnr: pgnr, oper: oper };
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
      this.changePrompt('\u7B2C' + page + '\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
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
    this.changePrompt('\u6B63\u5728\u8BC4\u4EF7' + subjectName + '\u8BFE\u7A0B\u7684' + teacherName + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');
    window.fetch(origin + '/jxpgXsAction.do', {
      'credentials': 'include',
      'headers': this.headers,
      'referrer': origin + '/jxpgXsAction.do?totalrows=25&page=1&pageSize=20',
      'referrerPolicy': 'no-referrer-when-downgrade',
      'body': 'wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject + '&oper=' + oper + '&pageSize=20&page=1&currentPage=1&pageNo=',
      'method': 'POST',
      'mode': 'cors'
    }).then(function () {
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
      return window.fetch(origin + '/jxpgXsAction.do?oper=wjpg', {
        'credentials': 'include',
        'headers': _this2.headers,
        'referrer': origin + '/jxpgXsAction.do',
        'referrerPolicy': 'no-referrer-when-downgrade',
        'body': bodyStr,
        'method': 'POST',
        'mode': 'cors'
      });
    }).then(function (res) {
      return res.text();
    }).then(function (res) {
      if (res.indexOf('location.href=') !== -1) {
        _this2.changePrompt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
      } else if (res.indexOf('history.back(-1);') !== -1) {
        _this2.changePrompt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this2.list.length);
      }
      setTimeout(function () {
        _this2.evaluate(++index);
      }, _this2.evaluationInterval);
    });
  }
};

module.exports = fastEvaluationLegacy;
},{"babel-runtime/helpers/slicedToArray":32,"babel-runtime/core-js/array/from":31}],3:[function(require,module,exports) {
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
  return obj && obj.__esModule ? obj : { default: obj };
}

var minimatch = require('minimatch');
var fastEvaluation = require('./plugins/fast-evaluation');
var tooltip = require('./plugins/tooltip');
var removeEvaluationTimeLimit = require('./plugins/remove-evaluation-time-limit');
var compatibilityLegacy = require('./plugins/compatibility-legacy');
var fastEvaluationLegacy = require('./plugins/fast-evaluation-legacy');

// 挂载到 window 上的全局对象
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
  plugins: [tooltip, fastEvaluation, removeEvaluationTimeLimit],
  /**
   * 初始化任务的队列
   */
  initQueue: [],
  /**
   * 定时执行的任务的队列
   */
  taskQueue: [],
  /**
   * 初始化 SCU URP 助手
   */
  init: function init() {
    var _this = this;

    // 旧版教务系统兼容
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
    }

    // 将data中的属性注入$sua对象中，使其内部可以用this直接访问
    window.$sua = (0, _assign2.default)($sua, $sua.data);
    // 加载插件
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = (0, _getIterator3.default)(this.plugins), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var _plugin = _step4.value;

        _plugin.$sua = $sua;
        // 将data中的属性注入plugin对象中，使其内部可以用this直接访问
        _plugin = (0, _assign2.default)(_plugin, $sua.data);
        if (urlTrigger(_plugin)) {
          // 将初始化方法推入队列中
          if (_plugin.init) {
            this.initQueue.push(_plugin.init.bind(_plugin));
          }
          // 将需要定时执行的任务推入队列中
          if (_plugin.task) {
            this.taskQueue.push(_plugin.task.bind(_plugin));
          }
        }
      }
      // 初始化方法
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

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = (0, _getIterator3.default)(this.initQueue), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _i = _step5.value;

        _i();
      }
      // 定时任务
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

    setInterval(function () {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = (0, _getIterator3.default)(_this.taskQueue), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var t = _step6.value;

          t();
        }
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
    }, this.taskTimeInterval);

    /**
     * 检测当前的location.pathname是否满足插件触发要求
     *
     * @param {*} plugin 插件对象，pathname 属性可以是 Boolean、String、Array、Object、Function等类型。
     * 如果 pathname 属性不存在，则默认对全体 url 均生效
     * @returns 检测的结果
     */
    function urlTrigger(plugin) {
      var pathname = plugin.pathname;
      // 如果pathname不存在，默认对全部url生效

      if (!pathname) {
        return true;
      } else if (typeof pathname === 'boolean') {
        return pathname;
      } else if (typeof pathname === 'string') {
        return minimatch(window.location.pathname, pathname);
      } else if (Array.isArray(pathname)) {
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = (0, _getIterator3.default)(pathname), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var item = _step7.value;

            if (minimatch(window.location.pathname, item)) {
              return true;
            }
          }
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

        return false;
      } else if ((typeof pathname === 'undefined' ? 'undefined' : (0, _typeof3.default)(pathname)) === 'object') {
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = (0, _getIterator3.default)((0, _values2.default)(pathname)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _item = _step8.value;

            if (minimatch(window.location.pathname, _item)) {
              return true;
            }
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

        return false;
      } else if (typeof pathname === 'function') {
        return pathname.bind(plugin)();
      }
      return false;
    }
  }
};

module.exports = $sua;
},{"babel-runtime/core-js/object/values":12,"babel-runtime/helpers/typeof":13,"babel-runtime/core-js/get-iterator":14,"babel-runtime/core-js/object/assign":15,"minimatch":11,"./plugins/fast-evaluation":79,"./plugins/tooltip":80,"./plugins/remove-evaluation-time-limit":81,"./plugins/compatibility-legacy":82,"./plugins/fast-evaluation-legacy":83}],1:[function(require,module,exports) {
var define;
"use strict";

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _iterator = require("babel-runtime/core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.7.12
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 一键评教的功能。2. 为手动评教页面「去除 2 分钟时间限制」
// @author       Zhaoji Wang
// @include      http://202.115.47.141/*
// @include      http://zhjw.scu.edu.cn/*
// @include      http://zhjwwx.scu.edu.cn:8080/*
// @grant        none
// ==/UserScript==

var sua = require('./sua-core');

(function () {
  if (!window.jQuery) {
    /*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
    !function (e, t) {
      "use strict";

      "object" == (typeof module === "undefined" ? "undefined" : (0, _typeof3.default)(module)) && "object" == (0, _typeof3.default)(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");return t(e);
      } : t(e);
    }("undefined" != typeof window ? window : this, function (e, t) {
      "use strict";

      var n = [],
          r = e.document,
          i = _getPrototypeOf2.default,
          o = n.slice,
          a = n.concat,
          s = n.push,
          u = n.indexOf,
          l = {},
          c = l.toString,
          f = l.hasOwnProperty,
          p = f.toString,
          d = p.call(Object),
          h = {},
          g = function e(t) {
        return "function" == typeof t && "number" != typeof t.nodeType;
      },
          y = function e(t) {
        return null != t && t === t.window;
      },
          v = { type: !0, src: !0, noModule: !0 };function m(e, t, n) {
        var i,
            o = (t = t || r).createElement("script");if (o.text = e, n) for (i in v) {
          n[i] && (o[i] = n[i]);
        }t.head.appendChild(o).parentNode.removeChild(o);
      }function x(e) {
        return null == e ? e + "" : "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) || "function" == typeof e ? l[c.call(e)] || "object" : typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e);
      }var b = "3.3.1",
          w = function w(e, t) {
        return new w.fn.init(e, t);
      },
          T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn = w.prototype = { jquery: "3.3.1", constructor: w, length: 0, toArray: function toArray() {
          return o.call(this);
        }, get: function get(e) {
          return null == e ? o.call(this) : e < 0 ? this[e + this.length] : this[e];
        }, pushStack: function pushStack(e) {
          var t = w.merge(this.constructor(), e);return t.prevObject = this, t;
        }, each: function each(e) {
          return w.each(this, e);
        }, map: function map(e) {
          return this.pushStack(w.map(this, function (t, n) {
            return e.call(t, n, t);
          }));
        }, slice: function slice() {
          return this.pushStack(o.apply(this, arguments));
        }, first: function first() {
          return this.eq(0);
        }, last: function last() {
          return this.eq(-1);
        }, eq: function eq(e) {
          var t = this.length,
              n = +e + (e < 0 ? t : 0);return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
        }, end: function end() {
          return this.prevObject || this.constructor();
        }, push: s, sort: n.sort, splice: n.splice }, w.extend = w.fn.extend = function () {
        var e,
            t,
            n,
            r,
            i,
            o,
            a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) || g(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
          if (null != (e = arguments[s])) for (t in e) {
            n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && w.isPlainObject(n) ? n : {}, a[t] = w.extend(l, o, r)) : void 0 !== r && (a[t] = r));
          }
        }return a;
      }, w.extend({ expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(e) {
          throw new Error(e);
        }, noop: function noop() {}, isPlainObject: function isPlainObject(e) {
          var t, n;return !(!e || "[object Object]" !== c.call(e)) && (!(t = i(e)) || "function" == typeof (n = f.call(t, "constructor") && t.constructor) && p.call(n) === d);
        }, isEmptyObject: function isEmptyObject(e) {
          var t;for (t in e) {
            return !1;
          }return !0;
        }, globalEval: function globalEval(e) {
          m(e);
        }, each: function each(e, t) {
          var n,
              r = 0;if (C(e)) {
            for (n = e.length; r < n; r++) {
              if (!1 === t.call(e[r], r, e[r])) break;
            }
          } else for (r in e) {
            if (!1 === t.call(e[r], r, e[r])) break;
          }return e;
        }, trim: function trim(e) {
          return null == e ? "" : (e + "").replace(T, "");
        }, makeArray: function makeArray(e, t) {
          var n = t || [];return null != e && (C(Object(e)) ? w.merge(n, "string" == typeof e ? [e] : e) : s.call(n, e)), n;
        }, inArray: function inArray(e, t, n) {
          return null == t ? -1 : u.call(t, e, n);
        }, merge: function merge(e, t) {
          for (var n = +t.length, r = 0, i = e.length; r < n; r++) {
            e[i++] = t[r];
          }return e.length = i, e;
        }, grep: function grep(e, t, n) {
          for (var r, i = [], o = 0, a = e.length, s = !n; o < a; o++) {
            (r = !t(e[o], o)) !== s && i.push(e[o]);
          }return i;
        }, map: function map(e, t, n) {
          var r,
              i,
              o = 0,
              s = [];if (C(e)) for (r = e.length; o < r; o++) {
            null != (i = t(e[o], o, n)) && s.push(i);
          } else for (o in e) {
            null != (i = t(e[o], o, n)) && s.push(i);
          }return a.apply([], s);
        }, guid: 1, support: h }), "function" == typeof _symbol2.default && (w.fn[_iterator2.default] = n[_iterator2.default]), w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase();
      });function C(e) {
        var t = !!e && "length" in e && e.length,
            n = x(e);return !g(e) && !y(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
      }var E = function (e) {
        var t,
            n,
            r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            f,
            p,
            d,
            h,
            g,
            y,
            v,
            m,
            x,
            b = "sizzle" + 1 * new Date(),
            w = e.document,
            T = 0,
            C = 0,
            E = ae(),
            k = ae(),
            S = ae(),
            D = function D(e, t) {
          return e === t && (f = !0), 0;
        },
            N = {}.hasOwnProperty,
            A = [],
            j = A.pop,
            q = A.push,
            L = A.push,
            H = A.slice,
            O = function O(e, t) {
          for (var n = 0, r = e.length; n < r; n++) {
            if (e[n] === t) return n;
          }return -1;
        },
            P = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            M = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + M + "*(" + R + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + M + "*\\]",
            W = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            $ = new RegExp(M + "+", "g"),
            B = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
            F = new RegExp("^" + M + "*," + M + "*"),
            _ = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
            z = new RegExp("=" + M + "*([^\\]'\"]*?)" + M + "*\\]", "g"),
            X = new RegExp(W),
            U = new RegExp("^" + R + "$"),
            V = { ID: new RegExp("^#(" + R + ")"), CLASS: new RegExp("^\\.(" + R + ")"), TAG: new RegExp("^(" + R + "|[*])"), ATTR: new RegExp("^" + I), PSEUDO: new RegExp("^" + W), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"), bool: new RegExp("^(?:" + P + ")$", "i"), needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i") },
            G = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            Z = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
            ee = function ee(e, t, n) {
          var r = "0x" + t - 65536;return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        },
            te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ne = function ne(e, t) {
          return t ? "\0" === e ? "\uFFFD" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e;
        },
            re = function re() {
          p();
        },
            ie = me(function (e) {
          return !0 === e.disabled && ("form" in e || "label" in e);
        }, { dir: "parentNode", next: "legend" });try {
          L.apply(A = H.call(w.childNodes), w.childNodes), A[w.childNodes.length].nodeType;
        } catch (e) {
          L = { apply: A.length ? function (e, t) {
              q.apply(e, H.call(t));
            } : function (e, t) {
              var n = e.length,
                  r = 0;while (e[n++] = t[r++]) {}e.length = n - 1;
            } };
        }function oe(e, t, r, i) {
          var o,
              s,
              l,
              c,
              f,
              h,
              v,
              m = t && t.ownerDocument,
              T = t ? t.nodeType : 9;if (r = r || [], "string" != typeof e || !e || 1 !== T && 9 !== T && 11 !== T) return r;if (!i && ((t ? t.ownerDocument || t : w) !== d && p(t), t = t || d, g)) {
            if (11 !== T && (f = J.exec(e))) if (o = f[1]) {
              if (9 === T) {
                if (!(l = t.getElementById(o))) return r;if (l.id === o) return r.push(l), r;
              } else if (m && (l = m.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r;
            } else {
              if (f[2]) return L.apply(r, t.getElementsByTagName(e)), r;if ((o = f[3]) && n.getElementsByClassName && t.getElementsByClassName) return L.apply(r, t.getElementsByClassName(o)), r;
            }if (n.qsa && !S[e + " "] && (!y || !y.test(e))) {
              if (1 !== T) m = t, v = e;else if ("object" !== t.nodeName.toLowerCase()) {
                (c = t.getAttribute("id")) ? c = c.replace(te, ne) : t.setAttribute("id", c = b), s = (h = a(e)).length;while (s--) {
                  h[s] = "#" + c + " " + ve(h[s]);
                }v = h.join(","), m = K.test(e) && ge(t.parentNode) || t;
              }if (v) try {
                return L.apply(r, m.querySelectorAll(v)), r;
              } catch (e) {} finally {
                c === b && t.removeAttribute("id");
              }
            }
          }return u(e.replace(B, "$1"), t, r, i);
        }function ae() {
          var e = [];function t(n, i) {
            return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
          }return t;
        }function se(e) {
          return e[b] = !0, e;
        }function ue(e) {
          var t = d.createElement("fieldset");try {
            return !!e(t);
          } catch (e) {
            return !1;
          } finally {
            t.parentNode && t.parentNode.removeChild(t), t = null;
          }
        }function le(e, t) {
          var n = e.split("|"),
              i = n.length;while (i--) {
            r.attrHandle[n[i]] = t;
          }
        }function ce(e, t) {
          var n = t && e,
              r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;if (r) return r;if (n) while (n = n.nextSibling) {
            if (n === t) return -1;
          }return e ? 1 : -1;
        }function fe(e) {
          return function (t) {
            return "input" === t.nodeName.toLowerCase() && t.type === e;
          };
        }function pe(e) {
          return function (t) {
            var n = t.nodeName.toLowerCase();return ("input" === n || "button" === n) && t.type === e;
          };
        }function de(e) {
          return function (t) {
            return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && ie(t) === e : t.disabled === e : "label" in t && t.disabled === e;
          };
        }function he(e) {
          return se(function (t) {
            return t = +t, se(function (n, r) {
              var i,
                  o = e([], n.length, t),
                  a = o.length;while (a--) {
                n[i = o[a]] && (n[i] = !(r[i] = n[i]));
              }
            });
          });
        }function ge(e) {
          return e && "undefined" != typeof e.getElementsByTagName && e;
        }n = oe.support = {}, o = oe.isXML = function (e) {
          var t = e && (e.ownerDocument || e).documentElement;return !!t && "HTML" !== t.nodeName;
        }, p = oe.setDocument = function (e) {
          var t,
              i,
              a = e ? e.ownerDocument || e : w;return a !== d && 9 === a.nodeType && a.documentElement ? (d = a, h = d.documentElement, g = !o(d), w !== d && (i = d.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = ue(function (e) {
            return e.className = "i", !e.getAttribute("className");
          }), n.getElementsByTagName = ue(function (e) {
            return e.appendChild(d.createComment("")), !e.getElementsByTagName("*").length;
          }), n.getElementsByClassName = Q.test(d.getElementsByClassName), n.getById = ue(function (e) {
            return h.appendChild(e).id = b, !d.getElementsByName || !d.getElementsByName(b).length;
          }), n.getById ? (r.filter.ID = function (e) {
            var t = e.replace(Z, ee);return function (e) {
              return e.getAttribute("id") === t;
            };
          }, r.find.ID = function (e, t) {
            if ("undefined" != typeof t.getElementById && g) {
              var n = t.getElementById(e);return n ? [n] : [];
            }
          }) : (r.filter.ID = function (e) {
            var t = e.replace(Z, ee);return function (e) {
              var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");return n && n.value === t;
            };
          }, r.find.ID = function (e, t) {
            if ("undefined" != typeof t.getElementById && g) {
              var n,
                  r,
                  i,
                  o = t.getElementById(e);if (o) {
                if ((n = o.getAttributeNode("id")) && n.value === e) return [o];i = t.getElementsByName(e), r = 0;while (o = i[r++]) {
                  if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                }
              }return [];
            }
          }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
            return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
          } : function (e, t) {
            var n,
                r = [],
                i = 0,
                o = t.getElementsByTagName(e);if ("*" === e) {
              while (n = o[i++]) {
                1 === n.nodeType && r.push(n);
              }return r;
            }return o;
          }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
            if ("undefined" != typeof t.getElementsByClassName && g) return t.getElementsByClassName(e);
          }, v = [], y = [], (n.qsa = Q.test(d.querySelectorAll)) && (ue(function (e) {
            h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || y.push("\\[" + M + "*(?:value|" + P + ")"), e.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), e.querySelectorAll(":checked").length || y.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]");
          }), ue(function (e) {
            e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t = d.createElement("input");t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && y.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), y.push(",.*:");
          })), (n.matchesSelector = Q.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && ue(function (e) {
            n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), v.push("!=", W);
          }), y = y.length && new RegExp(y.join("|")), v = v.length && new RegExp(v.join("|")), t = Q.test(h.compareDocumentPosition), x = t || Q.test(h.contains) ? function (e, t) {
            var n = 9 === e.nodeType ? e.documentElement : e,
                r = t && t.parentNode;return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
          } : function (e, t) {
            if (t) while (t = t.parentNode) {
              if (t === e) return !0;
            }return !1;
          }, D = t ? function (e, t) {
            if (e === t) return f = !0, 0;var r = !e.compareDocumentPosition - !t.compareDocumentPosition;return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === d || e.ownerDocument === w && x(w, e) ? -1 : t === d || t.ownerDocument === w && x(w, t) ? 1 : c ? O(c, e) - O(c, t) : 0 : 4 & r ? -1 : 1);
          } : function (e, t) {
            if (e === t) return f = !0, 0;var n,
                r = 0,
                i = e.parentNode,
                o = t.parentNode,
                a = [e],
                s = [t];if (!i || !o) return e === d ? -1 : t === d ? 1 : i ? -1 : o ? 1 : c ? O(c, e) - O(c, t) : 0;if (i === o) return ce(e, t);n = e;while (n = n.parentNode) {
              a.unshift(n);
            }n = t;while (n = n.parentNode) {
              s.unshift(n);
            }while (a[r] === s[r]) {
              r++;
            }return r ? ce(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
          }, d) : d;
        }, oe.matches = function (e, t) {
          return oe(e, null, null, t);
        }, oe.matchesSelector = function (e, t) {
          if ((e.ownerDocument || e) !== d && p(e), t = t.replace(z, "='$1']"), n.matchesSelector && g && !S[t + " "] && (!v || !v.test(t)) && (!y || !y.test(t))) try {
            var r = m.call(e, t);if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
          } catch (e) {}return oe(t, d, null, [e]).length > 0;
        }, oe.contains = function (e, t) {
          return (e.ownerDocument || e) !== d && p(e), x(e, t);
        }, oe.attr = function (e, t) {
          (e.ownerDocument || e) !== d && p(e);var i = r.attrHandle[t.toLowerCase()],
              o = i && N.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
        }, oe.escape = function (e) {
          return (e + "").replace(te, ne);
        }, oe.error = function (e) {
          throw new Error("Syntax error, unrecognized expression: " + e);
        }, oe.uniqueSort = function (e) {
          var t,
              r = [],
              i = 0,
              o = 0;if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(D), f) {
            while (t = e[o++]) {
              t === e[o] && (i = r.push(o));
            }while (i--) {
              e.splice(r[i], 1);
            }
          }return c = null, e;
        }, i = oe.getText = function (e) {
          var t,
              n = "",
              r = 0,
              o = e.nodeType;if (o) {
            if (1 === o || 9 === o || 11 === o) {
              if ("string" == typeof e.textContent) return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
                n += i(e);
              }
            } else if (3 === o || 4 === o) return e.nodeValue;
          } else while (t = e[r++]) {
            n += i(t);
          }return n;
        }, (r = oe.selectors = { cacheLength: 50, createPseudo: se, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
              return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
            }, CHILD: function CHILD(e) {
              return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e;
            }, PSEUDO: function PSEUDO(e) {
              var t,
                  n = !e[6] && e[2];return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
            } }, filter: { TAG: function TAG(e) {
              var t = e.replace(Z, ee).toLowerCase();return "*" === e ? function () {
                return !0;
              } : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t;
              };
            }, CLASS: function CLASS(e) {
              var t = E[e + " "];return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && E(e, function (e) {
                return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "");
              });
            }, ATTR: function ATTR(e, t, n) {
              return function (r) {
                var i = oe.attr(r, e);return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace($, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"));
              };
            }, CHILD: function CHILD(e, t, n, r, i) {
              var o = "nth" !== e.slice(0, 3),
                  a = "last" !== e.slice(-4),
                  s = "of-type" === t;return 1 === r && 0 === i ? function (e) {
                return !!e.parentNode;
              } : function (t, n, u) {
                var l,
                    c,
                    f,
                    p,
                    d,
                    h,
                    g = o !== a ? "nextSibling" : "previousSibling",
                    y = t.parentNode,
                    v = s && t.nodeName.toLowerCase(),
                    m = !u && !s,
                    x = !1;if (y) {
                  if (o) {
                    while (g) {
                      p = t;while (p = p[g]) {
                        if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                      }h = g = "only" === e && !h && "nextSibling";
                    }return !0;
                  }if (h = [a ? y.firstChild : y.lastChild], a && m) {
                    x = (d = (l = (c = (f = (p = y)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], p = d && y.childNodes[d];while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                      if (1 === p.nodeType && ++x && p === t) {
                        c[e] = [T, d, x];break;
                      }
                    }
                  } else if (m && (x = d = (l = (c = (f = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) while (p = ++d && p && p[g] || (x = d = 0) || h.pop()) {
                    if ((s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) && ++x && (m && ((c = (f = p[b] || (p[b] = {}))[p.uniqueID] || (f[p.uniqueID] = {}))[e] = [T, x]), p === t)) break;
                  }return (x -= i) === r || x % r == 0 && x / r >= 0;
                }
              };
            }, PSEUDO: function PSEUDO(e, t) {
              var n,
                  i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function (e, n) {
                var r,
                    o = i(e, t),
                    a = o.length;while (a--) {
                  e[r = O(e, o[a])] = !(n[r] = o[a]);
                }
              }) : function (e) {
                return i(e, 0, n);
              }) : i;
            } }, pseudos: { not: se(function (e) {
              var t = [],
                  n = [],
                  r = s(e.replace(B, "$1"));return r[b] ? se(function (e, t, n, i) {
                var o,
                    a = r(e, null, i, []),
                    s = e.length;while (s--) {
                  (o = a[s]) && (e[s] = !(t[s] = o));
                }
              }) : function (e, i, o) {
                return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop();
              };
            }), has: se(function (e) {
              return function (t) {
                return oe(e, t).length > 0;
              };
            }), contains: se(function (e) {
              return e = e.replace(Z, ee), function (t) {
                return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
              };
            }), lang: se(function (e) {
              return U.test(e || "") || oe.error("unsupported lang: " + e), e = e.replace(Z, ee).toLowerCase(), function (t) {
                var n;do {
                  if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
                } while ((t = t.parentNode) && 1 === t.nodeType);return !1;
              };
            }), target: function target(t) {
              var n = e.location && e.location.hash;return n && n.slice(1) === t.id;
            }, root: function root(e) {
              return e === h;
            }, focus: function focus(e) {
              return e === d.activeElement && (!d.hasFocus || d.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
            }, enabled: de(!1), disabled: de(!0), checked: function checked(e) {
              var t = e.nodeName.toLowerCase();return "input" === t && !!e.checked || "option" === t && !!e.selected;
            }, selected: function selected(e) {
              return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
            }, empty: function empty(e) {
              for (e = e.firstChild; e; e = e.nextSibling) {
                if (e.nodeType < 6) return !1;
              }return !0;
            }, parent: function parent(e) {
              return !r.pseudos.empty(e);
            }, header: function header(e) {
              return Y.test(e.nodeName);
            }, input: function input(e) {
              return G.test(e.nodeName);
            }, button: function button(e) {
              var t = e.nodeName.toLowerCase();return "input" === t && "button" === e.type || "button" === t;
            }, text: function text(e) {
              var t;return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
            }, first: he(function () {
              return [0];
            }), last: he(function (e, t) {
              return [t - 1];
            }), eq: he(function (e, t, n) {
              return [n < 0 ? n + t : n];
            }), even: he(function (e, t) {
              for (var n = 0; n < t; n += 2) {
                e.push(n);
              }return e;
            }), odd: he(function (e, t) {
              for (var n = 1; n < t; n += 2) {
                e.push(n);
              }return e;
            }), lt: he(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; --r >= 0;) {
                e.push(r);
              }return e;
            }), gt: he(function (e, t, n) {
              for (var r = n < 0 ? n + t : n; ++r < t;) {
                e.push(r);
              }return e;
            }) } }).pseudos.nth = r.pseudos.eq;for (t in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
          r.pseudos[t] = fe(t);
        }for (t in { submit: !0, reset: !0 }) {
          r.pseudos[t] = pe(t);
        }function ye() {}ye.prototype = r.filters = r.pseudos, r.setFilters = new ye(), a = oe.tokenize = function (e, t) {
          var n,
              i,
              o,
              a,
              s,
              u,
              l,
              c = k[e + " "];if (c) return t ? 0 : c.slice(0);s = e, u = [], l = r.preFilter;while (s) {
            n && !(i = F.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = _.exec(s)) && (n = i.shift(), o.push({ value: n, type: i[0].replace(B, " ") }), s = s.slice(n.length));for (a in r.filter) {
              !(i = V[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({ value: n, type: a, matches: i }), s = s.slice(n.length));
            }if (!n) break;
          }return t ? s.length : s ? oe.error(e) : k(e, u).slice(0);
        };function ve(e) {
          for (var t = 0, n = e.length, r = ""; t < n; t++) {
            r += e[t].value;
          }return r;
        }function me(e, t, n) {
          var r = t.dir,
              i = t.next,
              o = i || r,
              a = n && "parentNode" === o,
              s = C++;return t.first ? function (t, n, i) {
            while (t = t[r]) {
              if (1 === t.nodeType || a) return e(t, n, i);
            }return !1;
          } : function (t, n, u) {
            var l,
                c,
                f,
                p = [T, s];if (u) {
              while (t = t[r]) {
                if ((1 === t.nodeType || a) && e(t, n, u)) return !0;
              }
            } else while (t = t[r]) {
              if (1 === t.nodeType || a) if (f = t[b] || (t[b] = {}), c = f[t.uniqueID] || (f[t.uniqueID] = {}), i && i === t.nodeName.toLowerCase()) t = t[r] || t;else {
                if ((l = c[o]) && l[0] === T && l[1] === s) return p[2] = l[2];if (c[o] = p, p[2] = e(t, n, u)) return !0;
              }
            }return !1;
          };
        }function xe(e) {
          return e.length > 1 ? function (t, n, r) {
            var i = e.length;while (i--) {
              if (!e[i](t, n, r)) return !1;
            }return !0;
          } : e[0];
        }function be(e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            oe(e, t[r], n);
          }return n;
        }function we(e, t, n, r, i) {
          for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
            (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
          }return a;
        }function Te(e, t, n, r, i, o) {
          return r && !r[b] && (r = Te(r)), i && !i[b] && (i = Te(i, o)), se(function (o, a, s, u) {
            var l,
                c,
                f,
                p = [],
                d = [],
                h = a.length,
                g = o || be(t || "*", s.nodeType ? [s] : s, []),
                y = !e || !o && t ? g : we(g, p, e, s, u),
                v = n ? i || (o ? e : h || r) ? [] : a : y;if (n && n(y, v, s, u), r) {
              l = we(v, d), r(l, [], s, u), c = l.length;while (c--) {
                (f = l[c]) && (v[d[c]] = !(y[d[c]] = f));
              }
            }if (o) {
              if (i || e) {
                if (i) {
                  l = [], c = v.length;while (c--) {
                    (f = v[c]) && l.push(y[c] = f);
                  }i(null, v = [], l, u);
                }c = v.length;while (c--) {
                  (f = v[c]) && (l = i ? O(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f));
                }
              }
            } else v = we(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : L.apply(a, v);
          });
        }function Ce(e) {
          for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) {
            return e === t;
          }, s, !0), f = me(function (e) {
            return O(t, e) > -1;
          }, s, !0), p = [function (e, n, r) {
            var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));return t = null, i;
          }]; u < o; u++) {
            if (n = r.relative[e[u].type]) p = [me(xe(p), n)];else {
              if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
                for (i = ++u; i < o; i++) {
                  if (r.relative[e[i].type]) break;
                }return Te(u > 1 && xe(p), u > 1 && ve(e.slice(0, u - 1).concat({ value: " " === e[u - 2].type ? "*" : "" })).replace(B, "$1"), n, u < i && Ce(e.slice(u, i)), i < o && Ce(e = e.slice(i)), i < o && ve(e));
              }p.push(n);
            }
          }return xe(p);
        }function Ee(e, t) {
          var n = t.length > 0,
              i = e.length > 0,
              o = function o(_o, a, s, u, c) {
            var f,
                h,
                y,
                v = 0,
                m = "0",
                x = _o && [],
                b = [],
                w = l,
                C = _o || i && r.find.TAG("*", c),
                E = T += null == w ? 1 : Math.random() || .1,
                k = C.length;for (c && (l = a === d || a || c); m !== k && null != (f = C[m]); m++) {
              if (i && f) {
                h = 0, a || f.ownerDocument === d || (p(f), s = !g);while (y = e[h++]) {
                  if (y(f, a || d, s)) {
                    u.push(f);break;
                  }
                }c && (T = E);
              }n && ((f = !y && f) && v--, _o && x.push(f));
            }if (v += m, n && m !== v) {
              h = 0;while (y = t[h++]) {
                y(x, b, a, s);
              }if (_o) {
                if (v > 0) while (m--) {
                  x[m] || b[m] || (b[m] = j.call(u));
                }b = we(b);
              }L.apply(u, b), c && !_o && b.length > 0 && v + t.length > 1 && oe.uniqueSort(u);
            }return c && (T = E, l = w), x;
          };return n ? se(o) : o;
        }return s = oe.compile = function (e, t) {
          var n,
              r = [],
              i = [],
              o = S[e + " "];if (!o) {
            t || (t = a(e)), n = t.length;while (n--) {
              (o = Ce(t[n]))[b] ? r.push(o) : i.push(o);
            }(o = S(e, Ee(i, r))).selector = e;
          }return o;
        }, u = oe.select = function (e, t, n, i) {
          var o,
              u,
              l,
              c,
              f,
              p = "function" == typeof e && e,
              d = !i && a(e = p.selector || e);if (n = n || [], 1 === d.length) {
            if ((u = d[0] = d[0].slice(0)).length > 2 && "ID" === (l = u[0]).type && 9 === t.nodeType && g && r.relative[u[1].type]) {
              if (!(t = (r.find.ID(l.matches[0].replace(Z, ee), t) || [])[0])) return n;p && (t = t.parentNode), e = e.slice(u.shift().value.length);
            }o = V.needsContext.test(e) ? 0 : u.length;while (o--) {
              if (l = u[o], r.relative[c = l.type]) break;if ((f = r.find[c]) && (i = f(l.matches[0].replace(Z, ee), K.test(u[0].type) && ge(t.parentNode) || t))) {
                if (u.splice(o, 1), !(e = i.length && ve(u))) return L.apply(n, i), n;break;
              }
            }
          }return (p || s(e, d))(i, t, !g, n, !t || K.test(e) && ge(t.parentNode) || t), n;
        }, n.sortStable = b.split("").sort(D).join("") === b, n.detectDuplicates = !!f, p(), n.sortDetached = ue(function (e) {
          return 1 & e.compareDocumentPosition(d.createElement("fieldset"));
        }), ue(function (e) {
          return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
        }) || le("type|href|height|width", function (e, t, n) {
          if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }), n.attributes && ue(function (e) {
          return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
        }) || le("value", function (e, t, n) {
          if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
        }), ue(function (e) {
          return null == e.getAttribute("disabled");
        }) || le(P, function (e, t, n) {
          var r;if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
        }), oe;
      }(e);w.find = E, w.expr = E.selectors, w.expr[":"] = w.expr.pseudos, w.uniqueSort = w.unique = E.uniqueSort, w.text = E.getText, w.isXMLDoc = E.isXML, w.contains = E.contains, w.escapeSelector = E.escape;var k = function k(e, t, n) {
        var r = [],
            i = void 0 !== n;while ((e = e[t]) && 9 !== e.nodeType) {
          if (1 === e.nodeType) {
            if (i && w(e).is(n)) break;r.push(e);
          }
        }return r;
      },
          S = function S(e, t) {
        for (var n = []; e; e = e.nextSibling) {
          1 === e.nodeType && e !== t && n.push(e);
        }return n;
      },
          D = w.expr.match.needsContext;function N(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      }var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e, t, n) {
        return g(t) ? w.grep(e, function (e, r) {
          return !!t.call(e, r, e) !== n;
        }) : t.nodeType ? w.grep(e, function (e) {
          return e === t !== n;
        }) : "string" != typeof t ? w.grep(e, function (e) {
          return u.call(t, e) > -1 !== n;
        }) : w.filter(t, e, n);
      }w.filter = function (e, t, n) {
        var r = t[0];return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
          return 1 === e.nodeType;
        }));
      }, w.fn.extend({ find: function find(e) {
          var t,
              n,
              r = this.length,
              i = this;if ("string" != typeof e) return this.pushStack(w(e).filter(function () {
            for (t = 0; t < r; t++) {
              if (w.contains(i[t], this)) return !0;
            }
          }));for (n = this.pushStack([]), t = 0; t < r; t++) {
            w.find(e, i[t], n);
          }return r > 1 ? w.uniqueSort(n) : n;
        }, filter: function filter(e) {
          return this.pushStack(j(this, e || [], !1));
        }, not: function not(e) {
          return this.pushStack(j(this, e || [], !0));
        }, is: function is(e) {
          return !!j(this, "string" == typeof e && D.test(e) ? w(e) : e || [], !1).length;
        } });var q,
          L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init = function (e, t, n) {
        var i, o;if (!e) return this;if (n = n || q, "string" == typeof e) {
          if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : L.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);if (i[1]) {
            if (t = t instanceof w ? t[0] : t, w.merge(this, w.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), A.test(i[1]) && w.isPlainObject(t)) for (i in t) {
              g(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
            }return this;
          }return (o = r.getElementById(i[2])) && (this[0] = o, this.length = 1), this;
        }return e.nodeType ? (this[0] = e, this.length = 1, this) : g(e) ? void 0 !== n.ready ? n.ready(e) : e(w) : w.makeArray(e, this);
      }).prototype = w.fn, q = w(r);var H = /^(?:parents|prev(?:Until|All))/,
          O = { children: !0, contents: !0, next: !0, prev: !0 };w.fn.extend({ has: function has(e) {
          var t = w(e, this),
              n = t.length;return this.filter(function () {
            for (var e = 0; e < n; e++) {
              if (w.contains(this, t[e])) return !0;
            }
          });
        }, closest: function closest(e, t) {
          var n,
              r = 0,
              i = this.length,
              o = [],
              a = "string" != typeof e && w(e);if (!D.test(e)) for (; r < i; r++) {
            for (n = this[r]; n && n !== t; n = n.parentNode) {
              if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && w.find.matchesSelector(n, e))) {
                o.push(n);break;
              }
            }
          }return this.pushStack(o.length > 1 ? w.uniqueSort(o) : o);
        }, index: function index(e) {
          return e ? "string" == typeof e ? u.call(w(e), this[0]) : u.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }, add: function add(e, t) {
          return this.pushStack(w.uniqueSort(w.merge(this.get(), w(e, t))));
        }, addBack: function addBack(e) {
          return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
        } });function P(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType) {}return e;
      }w.each({ parent: function parent(e) {
          var t = e.parentNode;return t && 11 !== t.nodeType ? t : null;
        }, parents: function parents(e) {
          return k(e, "parentNode");
        }, parentsUntil: function parentsUntil(e, t, n) {
          return k(e, "parentNode", n);
        }, next: function next(e) {
          return P(e, "nextSibling");
        }, prev: function prev(e) {
          return P(e, "previousSibling");
        }, nextAll: function nextAll(e) {
          return k(e, "nextSibling");
        }, prevAll: function prevAll(e) {
          return k(e, "previousSibling");
        }, nextUntil: function nextUntil(e, t, n) {
          return k(e, "nextSibling", n);
        }, prevUntil: function prevUntil(e, t, n) {
          return k(e, "previousSibling", n);
        }, siblings: function siblings(e) {
          return S((e.parentNode || {}).firstChild, e);
        }, children: function children(e) {
          return S(e.firstChild);
        }, contents: function contents(e) {
          return N(e, "iframe") ? e.contentDocument : (N(e, "template") && (e = e.content || e), w.merge([], e.childNodes));
        } }, function (e, t) {
        w.fn[e] = function (n, r) {
          var i = w.map(this, t, n);return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = w.filter(r, i)), this.length > 1 && (O[e] || w.uniqueSort(i), H.test(e) && i.reverse()), this.pushStack(i);
        };
      });var M = /[^\x20\t\r\n\f]+/g;function R(e) {
        var t = {};return w.each(e.match(M) || [], function (e, n) {
          t[n] = !0;
        }), t;
      }w.Callbacks = function (e) {
        e = "string" == typeof e ? R(e) : w.extend({}, e);var t,
            n,
            r,
            i,
            o = [],
            a = [],
            s = -1,
            u = function u() {
          for (i = i || e.once, r = t = !0; a.length; s = -1) {
            n = a.shift();while (++s < o.length) {
              !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
            }
          }e.memory || (n = !1), t = !1, i && (o = n ? [] : "");
        },
            l = { add: function add() {
            return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
              w.each(n, function (n, r) {
                g(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== x(r) && t(r);
              });
            }(arguments), n && !t && u()), this;
          }, remove: function remove() {
            return w.each(arguments, function (e, t) {
              var n;while ((n = w.inArray(t, o, n)) > -1) {
                o.splice(n, 1), n <= s && s--;
              }
            }), this;
          }, has: function has(e) {
            return e ? w.inArray(e, o) > -1 : o.length > 0;
          }, empty: function empty() {
            return o && (o = []), this;
          }, disable: function disable() {
            return i = a = [], o = n = "", this;
          }, disabled: function disabled() {
            return !o;
          }, lock: function lock() {
            return i = a = [], n || t || (o = n = ""), this;
          }, locked: function locked() {
            return !!i;
          }, fireWith: function fireWith(e, n) {
            return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this;
          }, fire: function fire() {
            return l.fireWith(this, arguments), this;
          }, fired: function fired() {
            return !!r;
          } };return l;
      };function I(e) {
        return e;
      }function W(e) {
        throw e;
      }function $(e, t, n, r) {
        var i;try {
          e && g(i = e.promise) ? i.call(e).done(t).fail(n) : e && g(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r));
        } catch (e) {
          n.apply(void 0, [e]);
        }
      }w.extend({ Deferred: function Deferred(t) {
          var n = [["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2], ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"]],
              r = "pending",
              i = { state: function state() {
              return r;
            }, always: function always() {
              return o.done(arguments).fail(arguments), this;
            }, "catch": function _catch(e) {
              return i.then(null, e);
            }, pipe: function pipe() {
              var e = arguments;return w.Deferred(function (t) {
                w.each(n, function (n, r) {
                  var i = g(e[r[4]]) && e[r[4]];o[r[1]](function () {
                    var e = i && i.apply(this, arguments);e && g(e.promise) ? e.promise().progress(t.notify).done(t.resolve).fail(t.reject) : t[r[0] + "With"](this, i ? [e] : arguments);
                  });
                }), e = null;
              }).promise();
            }, then: function then(t, r, i) {
              var o = 0;function a(t, n, r, i) {
                return function () {
                  var s = this,
                      u = arguments,
                      l = function l() {
                    var e, l;if (!(t < o)) {
                      if ((e = r.apply(s, u)) === n.promise()) throw new TypeError("Thenable self-resolution");l = e && ("object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) || "function" == typeof e) && e.then, g(l) ? i ? l.call(e, a(o, n, I, i), a(o, n, W, i)) : (o++, l.call(e, a(o, n, I, i), a(o, n, W, i), a(o, n, I, n.notifyWith))) : (r !== I && (s = void 0, u = [e]), (i || n.resolveWith)(s, u));
                    }
                  },
                      c = i ? l : function () {
                    try {
                      l();
                    } catch (e) {
                      w.Deferred.exceptionHook && w.Deferred.exceptionHook(e, c.stackTrace), t + 1 >= o && (r !== W && (s = void 0, u = [e]), n.rejectWith(s, u));
                    }
                  };t ? c() : (w.Deferred.getStackHook && (c.stackTrace = w.Deferred.getStackHook()), e.setTimeout(c));
                };
              }return w.Deferred(function (e) {
                n[0][3].add(a(0, e, g(i) ? i : I, e.notifyWith)), n[1][3].add(a(0, e, g(t) ? t : I)), n[2][3].add(a(0, e, g(r) ? r : W));
              }).promise();
            }, promise: function promise(e) {
              return null != e ? w.extend(e, i) : i;
            } },
              o = {};return w.each(n, function (e, t) {
            var a = t[2],
                s = t[5];i[t[1]] = a.add, s && a.add(function () {
              r = s;
            }, n[3 - e][2].disable, n[3 - e][3].disable, n[0][2].lock, n[0][3].lock), a.add(t[3].fire), o[t[0]] = function () {
              return o[t[0] + "With"](this === o ? void 0 : this, arguments), this;
            }, o[t[0] + "With"] = a.fireWith;
          }), i.promise(o), t && t.call(o, o), o;
        }, when: function when(e) {
          var t = arguments.length,
              n = t,
              r = Array(n),
              i = o.call(arguments),
              a = w.Deferred(),
              s = function s(e) {
            return function (n) {
              r[e] = this, i[e] = arguments.length > 1 ? o.call(arguments) : n, --t || a.resolveWith(r, i);
            };
          };if (t <= 1 && ($(e, a.done(s(n)).resolve, a.reject, !t), "pending" === a.state() || g(i[n] && i[n].then))) return a.then();while (n--) {
            $(i[n], s(n), a.reject);
          }return a.promise();
        } });var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook = function (t, n) {
        e.console && e.console.warn && t && B.test(t.name) && e.console.warn("jQuery.Deferred exception: " + t.message, t.stack, n);
      }, w.readyException = function (t) {
        e.setTimeout(function () {
          throw t;
        });
      };var F = w.Deferred();w.fn.ready = function (e) {
        return F.then(e)["catch"](function (e) {
          w.readyException(e);
        }), this;
      }, w.extend({ isReady: !1, readyWait: 1, ready: function ready(e) {
          (!0 === e ? --w.readyWait : w.isReady) || (w.isReady = !0, !0 !== e && --w.readyWait > 0 || F.resolveWith(r, [w]));
        } }), w.ready.then = F.then;function _() {
        r.removeEventListener("DOMContentLoaded", _), e.removeEventListener("load", _), w.ready();
      }"complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll ? e.setTimeout(w.ready) : (r.addEventListener("DOMContentLoaded", _), e.addEventListener("load", _));var z = function z(e, t, n, r, i, o, a) {
        var s = 0,
            u = e.length,
            l = null == n;if ("object" === x(n)) {
          i = !0;for (s in n) {
            z(e, t, s, n[s], !0, o, a);
          }
        } else if (void 0 !== r && (i = !0, g(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
          return l.call(w(e), n);
        })), t)) for (; s < u; s++) {
          t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        }return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
      },
          X = /^-ms-/,
          U = /-([a-z])/g;function V(e, t) {
        return t.toUpperCase();
      }function G(e) {
        return e.replace(X, "ms-").replace(U, V);
      }var Y = function Y(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
      };function Q() {
        this.expando = w.expando + Q.uid++;
      }Q.uid = 1, Q.prototype = { cache: function cache(e) {
          var t = e[this.expando];return t || (t = {}, Y(e) && (e.nodeType ? e[this.expando] = t : (0, _defineProperty2.default)(e, this.expando, { value: t, configurable: !0 }))), t;
        }, set: function set(e, t, n) {
          var r,
              i = this.cache(e);if ("string" == typeof t) i[G(t)] = n;else for (r in t) {
            i[G(r)] = t[r];
          }return i;
        }, get: function get(e, t) {
          return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][G(t)];
        }, access: function access(e, t, n) {
          return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t);
        }, remove: function remove(e, t) {
          var n,
              r = e[this.expando];if (void 0 !== r) {
            if (void 0 !== t) {
              n = (t = Array.isArray(t) ? t.map(G) : (t = G(t)) in r ? [t] : t.match(M) || []).length;while (n--) {
                delete r[t[n]];
              }
            }(void 0 === t || w.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando]);
          }
        }, hasData: function hasData(e) {
          var t = e[this.expando];return void 0 !== t && !w.isEmptyObject(t);
        } };var J = new Q(),
          K = new Q(),
          Z = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
          ee = /[A-Z]/g;function te(e) {
        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : Z.test(e) ? JSON.parse(e) : e);
      }function ne(e, t, n) {
        var r;if (void 0 === n && 1 === e.nodeType) if (r = "data-" + t.replace(ee, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
          try {
            n = te(n);
          } catch (e) {}K.set(e, t, n);
        } else n = void 0;return n;
      }w.extend({ hasData: function hasData(e) {
          return K.hasData(e) || J.hasData(e);
        }, data: function data(e, t, n) {
          return K.access(e, t, n);
        }, removeData: function removeData(e, t) {
          K.remove(e, t);
        }, _data: function _data(e, t, n) {
          return J.access(e, t, n);
        }, _removeData: function _removeData(e, t) {
          J.remove(e, t);
        } }), w.fn.extend({ data: function data(e, t) {
          var n,
              r,
              i,
              o = this[0],
              a = o && o.attributes;if (void 0 === e) {
            if (this.length && (i = K.get(o), 1 === o.nodeType && !J.get(o, "hasDataAttrs"))) {
              n = a.length;while (n--) {
                a[n] && 0 === (r = a[n].name).indexOf("data-") && (r = G(r.slice(5)), ne(o, r, i[r]));
              }J.set(o, "hasDataAttrs", !0);
            }return i;
          }return "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) ? this.each(function () {
            K.set(this, e);
          }) : z(this, function (t) {
            var n;if (o && void 0 === t) {
              if (void 0 !== (n = K.get(o, e))) return n;if (void 0 !== (n = ne(o, e))) return n;
            } else this.each(function () {
              K.set(this, e, t);
            });
          }, null, t, arguments.length > 1, null, !0);
        }, removeData: function removeData(e) {
          return this.each(function () {
            K.remove(this, e);
          });
        } }), w.extend({ queue: function queue(e, t, n) {
          var r;if (e) return t = (t || "fx") + "queue", r = J.get(e, t), n && (!r || Array.isArray(n) ? r = J.access(e, t, w.makeArray(n)) : r.push(n)), r || [];
        }, dequeue: function dequeue(e, t) {
          t = t || "fx";var n = w.queue(e, t),
              r = n.length,
              i = n.shift(),
              o = w._queueHooks(e, t),
              a = function a() {
            w.dequeue(e, t);
          };"inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire();
        }, _queueHooks: function _queueHooks(e, t) {
          var n = t + "queueHooks";return J.get(e, n) || J.access(e, n, { empty: w.Callbacks("once memory").add(function () {
              J.remove(e, [t + "queue", n]);
            }) });
        } }), w.fn.extend({ queue: function queue(e, t) {
          var n = 2;return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? w.queue(this[0], e) : void 0 === t ? this : this.each(function () {
            var n = w.queue(this, e, t);w._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && w.dequeue(this, e);
          });
        }, dequeue: function dequeue(e) {
          return this.each(function () {
            w.dequeue(this, e);
          });
        }, clearQueue: function clearQueue(e) {
          return this.queue(e || "fx", []);
        }, promise: function promise(e, t) {
          var n,
              r = 1,
              i = w.Deferred(),
              o = this,
              a = this.length,
              s = function s() {
            --r || i.resolveWith(o, [o]);
          };"string" != typeof e && (t = e, e = void 0), e = e || "fx";while (a--) {
            (n = J.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
          }return s(), i.promise(t);
        } });var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
          ie = new RegExp("^(?:([+-])=|)(" + re + ")([a-z%]*)$", "i"),
          oe = ["Top", "Right", "Bottom", "Left"],
          ae = function ae(e, t) {
        return "none" === (e = t || e).style.display || "" === e.style.display && w.contains(e.ownerDocument, e) && "none" === w.css(e, "display");
      },
          se = function se(e, t, n, r) {
        var i,
            o,
            a = {};for (o in t) {
          a[o] = e.style[o], e.style[o] = t[o];
        }i = n.apply(e, r || []);for (o in t) {
          e.style[o] = a[o];
        }return i;
      };function ue(e, t, n, r) {
        var i,
            o,
            a = 20,
            s = r ? function () {
          return r.cur();
        } : function () {
          return w.css(e, t, "");
        },
            u = s(),
            l = n && n[3] || (w.cssNumber[t] ? "" : "px"),
            c = (w.cssNumber[t] || "px" !== l && +u) && ie.exec(w.css(e, t));if (c && c[3] !== l) {
          u /= 2, l = l || c[3], c = +u || 1;while (a--) {
            w.style(e, t, c + l), (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0), c /= o;
          }c *= 2, w.style(e, t, c + l), n = n || [];
        }return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
      }var le = {};function ce(e) {
        var t,
            n = e.ownerDocument,
            r = e.nodeName,
            i = le[r];return i || (t = n.body.appendChild(n.createElement(r)), i = w.css(t, "display"), t.parentNode.removeChild(t), "none" === i && (i = "block"), le[r] = i, i);
      }function fe(e, t) {
        for (var n, r, i = [], o = 0, a = e.length; o < a; o++) {
          (r = e[o]).style && (n = r.style.display, t ? ("none" === n && (i[o] = J.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && ae(r) && (i[o] = ce(r))) : "none" !== n && (i[o] = "none", J.set(r, "display", n)));
        }for (o = 0; o < a; o++) {
          null != i[o] && (e[o].style.display = i[o]);
        }return e;
      }w.fn.extend({ show: function show() {
          return fe(this, !0);
        }, hide: function hide() {
          return fe(this);
        }, toggle: function toggle(e) {
          return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
            ae(this) ? w(this).show() : w(this).hide();
          });
        } });var pe = /^(?:checkbox|radio)$/i,
          de = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
          he = /^$|^module$|\/(?:java|ecma)script/i,
          ge = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ge.optgroup = ge.option, ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td;function ye(e, t) {
        var n;return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && N(e, t) ? w.merge([e], n) : n;
      }function ve(e, t) {
        for (var n = 0, r = e.length; n < r; n++) {
          J.set(e[n], "globalEval", !t || J.get(t[n], "globalEval"));
        }
      }var me = /<|&#?\w+;/;function xe(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++) {
          if ((o = e[d]) || 0 === o) if ("object" === x(o)) w.merge(p, o.nodeType ? [o] : o);else if (me.test(o)) {
            a = a || f.appendChild(t.createElement("div")), s = (de.exec(o) || ["", ""])[1].toLowerCase(), u = ge[s] || ge._default, a.innerHTML = u[1] + w.htmlPrefilter(o) + u[2], c = u[0];while (c--) {
              a = a.lastChild;
            }w.merge(p, a.childNodes), (a = f.firstChild).textContent = "";
          } else p.push(t.createTextNode(o));
        }f.textContent = "", d = 0;while (o = p[d++]) {
          if (r && w.inArray(o, r) > -1) i && i.push(o);else if (l = w.contains(o.ownerDocument, o), a = ye(f.appendChild(o), "script"), l && ve(a), n) {
            c = 0;while (o = a[c++]) {
              he.test(o.type || "") && n.push(o);
            }
          }
        }return f;
      }!function () {
        var e = r.createDocumentFragment().appendChild(r.createElement("div")),
            t = r.createElement("input");t.setAttribute("type", "radio"), t.setAttribute("checked", "checked"), t.setAttribute("name", "t"), e.appendChild(t), h.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", h.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
      }();var be = r.documentElement,
          we = /^key/,
          Te = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
          Ce = /^([^.]*)(?:\.(.+)|)/;function Ee() {
        return !0;
      }function ke() {
        return !1;
      }function Se() {
        try {
          return r.activeElement;
        } catch (e) {}
      }function De(e, t, n, r, i, o) {
        var a, s;if ("object" == (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t))) {
          "string" != typeof n && (r = r || n, n = void 0);for (s in t) {
            De(e, s, n, r, t[s], o);
          }return e;
        }if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ke;else if (!i) return e;return 1 === o && (a = i, (i = function i(e) {
          return w().off(e), a.apply(this, arguments);
        }).guid = a.guid || (a.guid = w.guid++)), e.each(function () {
          w.event.add(this, t, i, r, n);
        });
      }w.event = { global: {}, add: function add(e, t, n, r, i) {
          var o,
              a,
              s,
              u,
              l,
              c,
              f,
              p,
              d,
              h,
              g,
              y = J.get(e);if (y) {
            n.handler && (n = (o = n).handler, i = o.selector), i && w.find.matchesSelector(be, i), n.guid || (n.guid = w.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function (t) {
              return "undefined" != typeof w && w.event.triggered !== t.type ? w.event.dispatch.apply(e, arguments) : void 0;
            }), l = (t = (t || "").match(M) || [""]).length;while (l--) {
              d = g = (s = Ce.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), d && (f = w.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, f = w.event.special[d] || {}, c = w.extend({ type: d, origType: g, data: r, handler: n, guid: n.guid, selector: i, needsContext: i && w.expr.match.needsContext.test(i), namespace: h.join(".") }, o), (p = u[d]) || ((p = u[d] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(e, r, h, a) || e.addEventListener && e.addEventListener(d, a)), f.add && (f.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), w.event.global[d] = !0);
            }
          }
        }, remove: function remove(e, t, n, r, i) {
          var o,
              a,
              s,
              u,
              l,
              c,
              f,
              p,
              d,
              h,
              g,
              y = J.hasData(e) && J.get(e);if (y && (u = y.events)) {
            l = (t = (t || "").match(M) || [""]).length;while (l--) {
              if (s = Ce.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                f = w.event.special[d] || {}, p = u[d = (r ? f.delegateType : f.bindType) || d] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length;while (o--) {
                  c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                }a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || w.removeEvent(e, d, y.handle), delete u[d]);
              } else for (d in u) {
                w.event.remove(e, d + t[l], n, r, !0);
              }
            }w.isEmptyObject(u) && J.remove(e, "handle events");
          }
        }, dispatch: function dispatch(e) {
          var t = w.event.fix(e),
              n,
              r,
              i,
              o,
              a,
              s,
              u = new Array(arguments.length),
              l = (J.get(this, "events") || {})[t.type] || [],
              c = w.event.special[t.type] || {};for (u[0] = t, n = 1; n < arguments.length; n++) {
            u[n] = arguments[n];
          }if (t.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, t)) {
            s = w.event.handlers.call(this, t, l), n = 0;while ((o = s[n++]) && !t.isPropagationStopped()) {
              t.currentTarget = o.elem, r = 0;while ((a = o.handlers[r++]) && !t.isImmediatePropagationStopped()) {
                t.rnamespace && !t.rnamespace.test(a.namespace) || (t.handleObj = a, t.data = a.data, void 0 !== (i = ((w.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (t.result = i) && (t.preventDefault(), t.stopPropagation()));
              }
            }return c.postDispatch && c.postDispatch.call(this, t), t.result;
          }
        }, handlers: function handlers(e, t) {
          var n,
              r,
              i,
              o,
              a,
              s = [],
              u = t.delegateCount,
              l = e.target;if (u && l.nodeType && !("click" === e.type && e.button >= 1)) for (; l !== this; l = l.parentNode || this) {
            if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
              for (o = [], a = {}, n = 0; n < u; n++) {
                void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? w(i, this).index(l) > -1 : w.find(i, this, null, [l]).length), a[i] && o.push(r);
              }o.length && s.push({ elem: l, handlers: o });
            }
          }return l = this, u < t.length && s.push({ elem: l, handlers: t.slice(u) }), s;
        }, addProp: function addProp(e, t) {
          (0, _defineProperty2.default)(w.Event.prototype, e, { enumerable: !0, configurable: !0, get: g(t) ? function () {
              if (this.originalEvent) return t(this.originalEvent);
            } : function () {
              if (this.originalEvent) return this.originalEvent[e];
            }, set: function set(t) {
              (0, _defineProperty2.default)(this, e, { enumerable: !0, configurable: !0, writable: !0, value: t });
            } });
        }, fix: function fix(e) {
          return e[w.expando] ? e : new w.Event(e);
        }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
              if (this !== Se() && this.focus) return this.focus(), !1;
            }, delegateType: "focusin" }, blur: { trigger: function trigger() {
              if (this === Se() && this.blur) return this.blur(), !1;
            }, delegateType: "focusout" }, click: { trigger: function trigger() {
              if ("checkbox" === this.type && this.click && N(this, "input")) return this.click(), !1;
            }, _default: function _default(e) {
              return N(e.target, "a");
            } }, beforeunload: { postDispatch: function postDispatch(e) {
              void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
            } } } }, w.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n);
      }, w.Event = function (e, t) {
        if (!(this instanceof w.Event)) return new w.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ee : ke, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[w.expando] = !0;
      }, w.Event.prototype = { constructor: w.Event, isDefaultPrevented: ke, isPropagationStopped: ke, isImmediatePropagationStopped: ke, isSimulated: !1, preventDefault: function preventDefault() {
          var e = this.originalEvent;this.isDefaultPrevented = Ee, e && !this.isSimulated && e.preventDefault();
        }, stopPropagation: function stopPropagation() {
          var e = this.originalEvent;this.isPropagationStopped = Ee, e && !this.isSimulated && e.stopPropagation();
        }, stopImmediatePropagation: function stopImmediatePropagation() {
          var e = this.originalEvent;this.isImmediatePropagationStopped = Ee, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation();
        } }, w.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(e) {
          var t = e.button;return null == e.which && we.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Te.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which;
        } }, w.event.addProp), w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
        w.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
            var n,
                r = this,
                i = e.relatedTarget,
                o = e.handleObj;return i && (i === r || w.contains(r, i)) || (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n;
          } };
      }), w.fn.extend({ on: function on(e, t, n, r) {
          return De(this, e, t, n, r);
        }, one: function one(e, t, n, r) {
          return De(this, e, t, n, r, 1);
        }, off: function off(e, t, n) {
          var r, i;if (e && e.preventDefault && e.handleObj) return r = e.handleObj, w(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;if ("object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e))) {
            for (i in e) {
              this.off(i, t, e[i]);
            }return this;
          }return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ke), this.each(function () {
            w.event.remove(this, e, n, t);
          });
        } });var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
          Ae = /<script|<style|<link/i,
          je = /checked\s*(?:[^=]|=\s*.checked.)/i,
          qe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e, t) {
        return N(e, "table") && N(11 !== t.nodeType ? t : t.firstChild, "tr") ? w(e).children("tbody")[0] || e : e;
      }function He(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e;
      }function Oe(e) {
        return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e;
      }function Pe(e, t) {
        var n, r, i, o, a, s, u, l;if (1 === t.nodeType) {
          if (J.hasData(e) && (o = J.access(e), a = J.set(t, o), l = o.events)) {
            delete a.handle, a.events = {};for (i in l) {
              for (n = 0, r = l[i].length; n < r; n++) {
                w.event.add(t, i, l[i][n]);
              }
            }
          }K.hasData(e) && (s = K.access(e), u = w.extend({}, s), K.set(t, u));
        }
      }function Me(e, t) {
        var n = t.nodeName.toLowerCase();"input" === n && pe.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
      }function Re(e, t, n, r) {
        t = a.apply([], t);var i,
            o,
            s,
            u,
            l,
            c,
            f = 0,
            p = e.length,
            d = p - 1,
            y = t[0],
            v = g(y);if (v || p > 1 && "string" == typeof y && !h.checkClone && je.test(y)) return e.each(function (i) {
          var o = e.eq(i);v && (t[0] = y.call(this, i, o.html())), Re(o, t, n, r);
        });if (p && (i = xe(t, e[0].ownerDocument, !1, e, r), o = i.firstChild, 1 === i.childNodes.length && (i = o), o || r)) {
          for (u = (s = w.map(ye(i, "script"), He)).length; f < p; f++) {
            l = i, f !== d && (l = w.clone(l, !0, !0), u && w.merge(s, ye(l, "script"))), n.call(e[f], l, f);
          }if (u) for (c = s[s.length - 1].ownerDocument, w.map(s, Oe), f = 0; f < u; f++) {
            l = s[f], he.test(l.type || "") && !J.access(l, "globalEval") && w.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? w._evalUrl && w._evalUrl(l.src) : m(l.textContent.replace(qe, ""), c, l));
          }
        }return e;
      }function Ie(e, t, n) {
        for (var r, i = t ? w.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
          n || 1 !== r.nodeType || w.cleanData(ye(r)), r.parentNode && (n && w.contains(r.ownerDocument, r) && ve(ye(r, "script")), r.parentNode.removeChild(r));
        }return e;
      }w.extend({ htmlPrefilter: function htmlPrefilter(e) {
          return e.replace(Ne, "<$1></$2>");
        }, clone: function clone(e, t, n) {
          var r,
              i,
              o,
              a,
              s = e.cloneNode(!0),
              u = w.contains(e.ownerDocument, e);if (!(h.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || w.isXMLDoc(e))) for (a = ye(s), r = 0, i = (o = ye(e)).length; r < i; r++) {
            Me(o[r], a[r]);
          }if (t) if (n) for (o = o || ye(e), a = a || ye(s), r = 0, i = o.length; r < i; r++) {
            Pe(o[r], a[r]);
          } else Pe(e, s);return (a = ye(s, "script")).length > 0 && ve(a, !u && ye(e, "script")), s;
        }, cleanData: function cleanData(e) {
          for (var t, n, r, i = w.event.special, o = 0; void 0 !== (n = e[o]); o++) {
            if (Y(n)) {
              if (t = n[J.expando]) {
                if (t.events) for (r in t.events) {
                  i[r] ? w.event.remove(n, r) : w.removeEvent(n, r, t.handle);
                }n[J.expando] = void 0;
              }n[K.expando] && (n[K.expando] = void 0);
            }
          }
        } }), w.fn.extend({ detach: function detach(e) {
          return Ie(this, e, !0);
        }, remove: function remove(e) {
          return Ie(this, e);
        }, text: function text(e) {
          return z(this, function (e) {
            return void 0 === e ? w.text(this) : this.empty().each(function () {
              1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e);
            });
          }, null, e, arguments.length);
        }, append: function append() {
          return Re(this, arguments, function (e) {
            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e);
          });
        }, prepend: function prepend() {
          return Re(this, arguments, function (e) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
              var t = Le(this, e);t.insertBefore(e, t.firstChild);
            }
          });
        }, before: function before() {
          return Re(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this);
          });
        }, after: function after() {
          return Re(this, arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
          });
        }, empty: function empty() {
          for (var e, t = 0; null != (e = this[t]); t++) {
            1 === e.nodeType && (w.cleanData(ye(e, !1)), e.textContent = "");
          }return this;
        }, clone: function clone(e, t) {
          return e = null != e && e, t = null == t ? e : t, this.map(function () {
            return w.clone(this, e, t);
          });
        }, html: function html(e) {
          return z(this, function (e) {
            var t = this[0] || {},
                n = 0,
                r = this.length;if (void 0 === e && 1 === t.nodeType) return t.innerHTML;if ("string" == typeof e && !Ae.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
              e = w.htmlPrefilter(e);try {
                for (; n < r; n++) {
                  1 === (t = this[n] || {}).nodeType && (w.cleanData(ye(t, !1)), t.innerHTML = e);
                }t = 0;
              } catch (e) {}
            }t && this.empty().append(e);
          }, null, e, arguments.length);
        }, replaceWith: function replaceWith() {
          var e = [];return Re(this, arguments, function (t) {
            var n = this.parentNode;w.inArray(this, e) < 0 && (w.cleanData(ye(this)), n && n.replaceChild(t, this));
          }, e);
        } }), w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
        w.fn[e] = function (e) {
          for (var n, r = [], i = w(e), o = i.length - 1, a = 0; a <= o; a++) {
            n = a === o ? this : this.clone(!0), w(i[a])[t](n), s.apply(r, n.get());
          }return this.pushStack(r);
        };
      });var We = new RegExp("^(" + re + ")(?!px)[a-z%]+$", "i"),
          $e = function $e(t) {
        var n = t.ownerDocument.defaultView;return n && n.opener || (n = e), n.getComputedStyle(t);
      },
          Be = new RegExp(oe.join("|"), "i");!function () {
        function t() {
          if (c) {
            l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", c.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", be.appendChild(l).appendChild(c);var t = e.getComputedStyle(c);i = "1%" !== t.top, u = 12 === n(t.marginLeft), c.style.right = "60%", s = 36 === n(t.right), o = 36 === n(t.width), c.style.position = "absolute", a = 36 === c.offsetWidth || "absolute", be.removeChild(l), c = null;
          }
        }function n(e) {
          return Math.round(parseFloat(e));
        }var i,
            o,
            a,
            s,
            u,
            l = r.createElement("div"),
            c = r.createElement("div");c.style && (c.style.backgroundClip = "content-box", c.cloneNode(!0).style.backgroundClip = "", h.clearCloneStyle = "content-box" === c.style.backgroundClip, w.extend(h, { boxSizingReliable: function boxSizingReliable() {
            return t(), o;
          }, pixelBoxStyles: function pixelBoxStyles() {
            return t(), s;
          }, pixelPosition: function pixelPosition() {
            return t(), i;
          }, reliableMarginLeft: function reliableMarginLeft() {
            return t(), u;
          }, scrollboxSize: function scrollboxSize() {
            return t(), a;
          } }));
      }();function Fe(e, t, n) {
        var r,
            i,
            o,
            a,
            s = e.style;return (n = n || $e(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || w.contains(e.ownerDocument, e) || (a = w.style(e, t)), !h.pixelBoxStyles() && We.test(a) && Be.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a;
      }function _e(e, t) {
        return { get: function get() {
            if (!e()) return (this.get = t).apply(this, arguments);delete this.get;
          } };
      }var ze = /^(none|table(?!-c[ea]).+)/,
          Xe = /^--/,
          Ue = { position: "absolute", visibility: "hidden", display: "block" },
          Ve = { letterSpacing: "0", fontWeight: "400" },
          Ge = ["Webkit", "Moz", "ms"],
          Ye = r.createElement("div").style;function Qe(e) {
        if (e in Ye) return e;var t = e[0].toUpperCase() + e.slice(1),
            n = Ge.length;while (n--) {
          if ((e = Ge[n] + t) in Ye) return e;
        }
      }function Je(e) {
        var t = w.cssProps[e];return t || (t = w.cssProps[e] = Qe(e) || e), t;
      }function Ke(e, t, n) {
        var r = ie.exec(t);return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
      }function Ze(e, t, n, r, i, o) {
        var a = "width" === t ? 1 : 0,
            s = 0,
            u = 0;if (n === (r ? "border" : "content")) return 0;for (; a < 4; a += 2) {
          "margin" === n && (u += w.css(e, n + oe[a], !0, i)), r ? ("content" === n && (u -= w.css(e, "padding" + oe[a], !0, i)), "margin" !== n && (u -= w.css(e, "border" + oe[a] + "Width", !0, i))) : (u += w.css(e, "padding" + oe[a], !0, i), "padding" !== n ? u += w.css(e, "border" + oe[a] + "Width", !0, i) : s += w.css(e, "border" + oe[a] + "Width", !0, i));
        }return !r && o >= 0 && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5))), u;
      }function et(e, t, n) {
        var r = $e(e),
            i = Fe(e, t, r),
            o = "border-box" === w.css(e, "boxSizing", !1, r),
            a = o;if (We.test(i)) {
          if (!n) return i;i = "auto";
        }return a = a && (h.boxSizingReliable() || i === e.style[t]), ("auto" === i || !parseFloat(i) && "inline" === w.css(e, "display", !1, r)) && (i = e["offset" + t[0].toUpperCase() + t.slice(1)], a = !0), (i = parseFloat(i) || 0) + Ze(e, t, n || (o ? "border" : "content"), a, r, i) + "px";
      }w.extend({ cssHooks: { opacity: { get: function get(e, t) {
              if (t) {
                var n = Fe(e, "opacity");return "" === n ? "1" : n;
              }
            } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: {}, style: function style(e, t, n, r) {
          if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
            var i,
                o,
                a,
                s = G(t),
                u = Xe.test(t),
                l = e.style;if (u || (t = Je(s)), a = w.cssHooks[t] || w.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];"string" == (o = typeof n === "undefined" ? "undefined" : (0, _typeof3.default)(n)) && (i = ie.exec(n)) && i[1] && (n = ue(e, t, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (w.cssNumber[s] ? "" : "px")), h.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n));
          }
        }, css: function css(e, t, n, r) {
          var i,
              o,
              a,
              s = G(t);return Xe.test(t) || (t = Je(s)), (a = w.cssHooks[t] || w.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), void 0 === i && (i = Fe(e, t, r)), "normal" === i && t in Ve && (i = Ve[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i;
        } }), w.each(["height", "width"], function (e, t) {
        w.cssHooks[t] = { get: function get(e, n, r) {
            if (n) return !ze.test(w.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? et(e, t, r) : se(e, Ue, function () {
              return et(e, t, r);
            });
          }, set: function set(e, n, r) {
            var i,
                o = $e(e),
                a = "border-box" === w.css(e, "boxSizing", !1, o),
                s = r && Ze(e, t, r, a, o);return a && h.scrollboxSize() === o.position && (s -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(o[t]) - Ze(e, t, "border", !1, o) - .5)), s && (i = ie.exec(n)) && "px" !== (i[3] || "px") && (e.style[t] = n, n = w.css(e, t)), Ke(e, n, s);
          } };
      }), w.cssHooks.marginLeft = _e(h.reliableMarginLeft, function (e, t) {
        if (t) return (parseFloat(Fe(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, { marginLeft: 0 }, function () {
          return e.getBoundingClientRect().left;
        })) + "px";
      }), w.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
        w.cssHooks[e + t] = { expand: function expand(n) {
            for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) {
              i[e + oe[r] + t] = o[r] || o[r - 2] || o[0];
            }return i;
          } }, "margin" !== e && (w.cssHooks[e + t].set = Ke);
      }), w.fn.extend({ css: function css(e, t) {
          return z(this, function (e, t, n) {
            var r,
                i,
                o = {},
                a = 0;if (Array.isArray(t)) {
              for (r = $e(e), i = t.length; a < i; a++) {
                o[t[a]] = w.css(e, t[a], !1, r);
              }return o;
            }return void 0 !== n ? w.style(e, t, n) : w.css(e, t);
          }, e, t, arguments.length > 1);
        } });function tt(e, t, n, r, i) {
        return new tt.prototype.init(e, t, n, r, i);
      }w.Tween = tt, tt.prototype = { constructor: tt, init: function init(e, t, n, r, i, o) {
          this.elem = e, this.prop = n, this.easing = i || w.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (w.cssNumber[n] ? "" : "px");
        }, cur: function cur() {
          var e = tt.propHooks[this.prop];return e && e.get ? e.get(this) : tt.propHooks._default.get(this);
        }, run: function run(e) {
          var t,
              n = tt.propHooks[this.prop];return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : tt.propHooks._default.set(this), this;
        } }, tt.prototype.init.prototype = tt.prototype, tt.propHooks = { _default: { get: function get(e) {
            var t;return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = w.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
          }, set: function set(e) {
            w.fx.step[e.prop] ? w.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[w.cssProps[e.prop]] && !w.cssHooks[e.prop] ? e.elem[e.prop] = e.now : w.style(e.elem, e.prop, e.now + e.unit);
          } } }, tt.propHooks.scrollTop = tt.propHooks.scrollLeft = { set: function set(e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        } }, w.easing = { linear: function linear(e) {
          return e;
        }, swing: function swing(e) {
          return .5 - Math.cos(e * Math.PI) / 2;
        }, _default: "swing" }, w.fx = tt.prototype.init, w.fx.step = {};var nt,
          rt,
          it = /^(?:toggle|show|hide)$/,
          ot = /queueHooks$/;function at() {
        rt && (!1 === r.hidden && e.requestAnimationFrame ? e.requestAnimationFrame(at) : e.setTimeout(at, w.fx.interval), w.fx.tick());
      }function st() {
        return e.setTimeout(function () {
          nt = void 0;
        }), nt = Date.now();
      }function ut(e, t) {
        var n,
            r = 0,
            i = { height: e };for (t = t ? 1 : 0; r < 4; r += 2 - t) {
          i["margin" + (n = oe[r])] = i["padding" + n] = e;
        }return t && (i.opacity = i.width = e), i;
      }function lt(e, t, n) {
        for (var r, i = (pt.tweeners[t] || []).concat(pt.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
          if (r = i[o].call(n, t, e)) return r;
        }
      }function ct(e, t, n) {
        var r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            f = "width" in t || "height" in t,
            p = this,
            d = {},
            h = e.style,
            g = e.nodeType && ae(e),
            y = J.get(e, "fxshow");n.queue || (null == (a = w._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
          a.unqueued || s();
        }), a.unqueued++, p.always(function () {
          p.always(function () {
            a.unqueued--, w.queue(e, "fx").length || a.empty.fire();
          });
        }));for (r in t) {
          if (i = t[r], it.test(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
              if ("show" !== i || !y || void 0 === y[r]) continue;g = !0;
            }d[r] = y && y[r] || w.style(e, r);
          }
        }if ((u = !w.isEmptyObject(t)) || !w.isEmptyObject(d)) {
          f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = J.get(e, "display")), "none" === (c = w.css(e, "display")) && (l ? c = l : (fe([e], !0), l = e.style.display || l, c = w.css(e, "display"), fe([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === w.css(e, "float") && (u || (p.done(function () {
            h.display = l;
          }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
          })), u = !1;for (r in d) {
            u || (y ? "hidden" in y && (g = y.hidden) : y = J.access(e, "fxshow", { display: l }), o && (y.hidden = !g), g && fe([e], !0), p.done(function () {
              g || fe([e]), J.remove(e, "fxshow");for (r in d) {
                w.style(e, r, d[r]);
              }
            })), u = lt(g ? y[r] : 0, r, p), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0));
          }
        }
      }function ft(e, t) {
        var n, r, i, o, a;for (n in e) {
          if (r = G(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = w.cssHooks[r]) && "expand" in a) {
            o = a.expand(o), delete e[r];for (n in o) {
              n in e || (e[n] = o[n], t[n] = i);
            }
          } else t[r] = i;
        }
      }function pt(e, t, n) {
        var r,
            i,
            o = 0,
            a = pt.prefilters.length,
            s = w.Deferred().always(function () {
          delete u.elem;
        }),
            u = function u() {
          if (i) return !1;for (var t = nt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) {
            l.tweens[o].run(r);
          }return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (a || s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l]), !1);
        },
            l = s.promise({ elem: e, props: w.extend({}, t), opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n), originalProperties: t, originalOptions: n, startTime: nt || st(), duration: n.duration, tweens: [], createTween: function createTween(t, n) {
            var r = w.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);return l.tweens.push(r), r;
          }, stop: function stop(t) {
            var n = 0,
                r = t ? l.tweens.length : 0;if (i) return this;for (i = !0; n < r; n++) {
              l.tweens[n].run(1);
            }return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
          } }),
            c = l.props;for (ft(c, l.opts.specialEasing); o < a; o++) {
          if (r = pt.prefilters[o].call(l, e, c, l.opts)) return g(r.stop) && (w._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)), r;
        }return w.map(c, lt, l), g(l.opts.start) && l.opts.start.call(e, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), w.fx.timer(w.extend(u, { elem: e, anim: l, queue: l.opts.queue })), l;
      }w.Animation = w.extend(pt, { tweeners: { "*": [function (e, t) {
            var n = this.createTween(e, t);return ue(n.elem, e, ie.exec(t), n), n;
          }] }, tweener: function tweener(e, t) {
          g(e) ? (t = e, e = ["*"]) : e = e.match(M);for (var n, r = 0, i = e.length; r < i; r++) {
            n = e[r], pt.tweeners[n] = pt.tweeners[n] || [], pt.tweeners[n].unshift(t);
          }
        }, prefilters: [ct], prefilter: function prefilter(e, t) {
          t ? pt.prefilters.unshift(e) : pt.prefilters.push(e);
        } }), w.speed = function (e, t, n) {
        var r = e && "object" == (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) ? w.extend({}, e) : { complete: n || !n && t || g(e) && e, duration: e, easing: n && t || t && !g(t) && t };return w.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in w.fx.speeds ? r.duration = w.fx.speeds[r.duration] : r.duration = w.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
          g(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue);
        }, r;
      }, w.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
          return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
        }, animate: function animate(e, t, n, r) {
          var i = w.isEmptyObject(e),
              o = w.speed(t, n, r),
              a = function a() {
            var t = pt(this, w.extend({}, e), o);(i || J.get(this, "finish")) && t.stop(!0);
          };return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
        }, stop: function stop(e, t, n) {
          var r = function r(e) {
            var t = e.stop;delete e.stop, t(n);
          };return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
            var t = !0,
                i = null != e && e + "queueHooks",
                o = w.timers,
                a = J.get(this);if (i) a[i] && a[i].stop && r(a[i]);else for (i in a) {
              a[i] && a[i].stop && ot.test(i) && r(a[i]);
            }for (i = o.length; i--;) {
              o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
            }!t && n || w.dequeue(this, e);
          });
        }, finish: function finish(e) {
          return !1 !== e && (e = e || "fx"), this.each(function () {
            var t,
                n = J.get(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = w.timers,
                a = r ? r.length : 0;for (n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
              o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
            }for (t = 0; t < a; t++) {
              r[t] && r[t].finish && r[t].finish.call(this);
            }delete n.finish;
          });
        } }), w.each(["toggle", "show", "hide"], function (e, t) {
        var n = w.fn[t];w.fn[t] = function (e, r, i) {
          return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i);
        };
      }), w.each({ slideDown: ut("show"), slideUp: ut("hide"), slideToggle: ut("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
        w.fn[e] = function (e, n, r) {
          return this.animate(t, e, n, r);
        };
      }), w.timers = [], w.fx.tick = function () {
        var e,
            t = 0,
            n = w.timers;for (nt = Date.now(); t < n.length; t++) {
          (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        }n.length || w.fx.stop(), nt = void 0;
      }, w.fx.timer = function (e) {
        w.timers.push(e), w.fx.start();
      }, w.fx.interval = 13, w.fx.start = function () {
        rt || (rt = !0, at());
      }, w.fx.stop = function () {
        rt = null;
      }, w.fx.speeds = { slow: 600, fast: 200, _default: 400 }, w.fn.delay = function (t, n) {
        return t = w.fx ? w.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
          var i = e.setTimeout(n, t);r.stop = function () {
            e.clearTimeout(i);
          };
        });
      }, function () {
        var e = r.createElement("input"),
            t = r.createElement("select").appendChild(r.createElement("option"));e.type = "checkbox", h.checkOn = "" !== e.value, h.optSelected = t.selected, (e = r.createElement("input")).value = "t", e.type = "radio", h.radioValue = "t" === e.value;
      }();var dt,
          ht = w.expr.attrHandle;w.fn.extend({ attr: function attr(e, t) {
          return z(this, w.attr, e, t, arguments.length > 1);
        }, removeAttr: function removeAttr(e) {
          return this.each(function () {
            w.removeAttr(this, e);
          });
        } }), w.extend({ attr: function attr(e, t, n) {
          var r,
              i,
              o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof e.getAttribute ? w.prop(e, t, n) : (1 === o && w.isXMLDoc(e) || (i = w.attrHooks[t.toLowerCase()] || (w.expr.match.bool.test(t) ? dt : void 0)), void 0 !== n ? null === n ? void w.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = w.find.attr(e, t)) ? void 0 : r);
        }, attrHooks: { type: { set: function set(e, t) {
              if (!h.radioValue && "radio" === t && N(e, "input")) {
                var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
              }
            } } }, removeAttr: function removeAttr(e, t) {
          var n,
              r = 0,
              i = t && t.match(M);if (i && 1 === e.nodeType) while (n = i[r++]) {
            e.removeAttribute(n);
          }
        } }), dt = { set: function set(e, t, n) {
          return !1 === t ? w.removeAttr(e, n) : e.setAttribute(n, n), n;
        } }, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = ht[t] || w.find.attr;ht[t] = function (e, t, r) {
          var i,
              o,
              a = t.toLowerCase();return r || (o = ht[a], ht[a] = i, i = null != n(e, t, r) ? a : null, ht[a] = o), i;
        };
      });var gt = /^(?:input|select|textarea|button)$/i,
          yt = /^(?:a|area)$/i;w.fn.extend({ prop: function prop(e, t) {
          return z(this, w.prop, e, t, arguments.length > 1);
        }, removeProp: function removeProp(e) {
          return this.each(function () {
            delete this[w.propFix[e] || e];
          });
        } }), w.extend({ prop: function prop(e, t, n) {
          var r,
              i,
              o = e.nodeType;if (3 !== o && 8 !== o && 2 !== o) return 1 === o && w.isXMLDoc(e) || (t = w.propFix[t] || t, i = w.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
        }, propHooks: { tabIndex: { get: function get(e) {
              var t = w.find.attr(e, "tabindex");return t ? parseInt(t, 10) : gt.test(e.nodeName) || yt.test(e.nodeName) && e.href ? 0 : -1;
            } } }, propFix: { "for": "htmlFor", "class": "className" } }), h.optSelected || (w.propHooks.selected = { get: function get(e) {
          var t = e.parentNode;return t && t.parentNode && t.parentNode.selectedIndex, null;
        }, set: function set(e) {
          var t = e.parentNode;t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
        } }), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        w.propFix[this.toLowerCase()] = this;
      });function vt(e) {
        return (e.match(M) || []).join(" ");
      }function mt(e) {
        return e.getAttribute && e.getAttribute("class") || "";
      }function xt(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.match(M) || [] : [];
      }w.fn.extend({ addClass: function addClass(e) {
          var t,
              n,
              r,
              i,
              o,
              a,
              s,
              u = 0;if (g(e)) return this.each(function (t) {
            w(this).addClass(e.call(this, t, mt(this)));
          });if ((t = xt(e)).length) while (n = this[u++]) {
            if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
              a = 0;while (o = t[a++]) {
                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
              }i !== (s = vt(r)) && n.setAttribute("class", s);
            }
          }return this;
        }, removeClass: function removeClass(e) {
          var t,
              n,
              r,
              i,
              o,
              a,
              s,
              u = 0;if (g(e)) return this.each(function (t) {
            w(this).removeClass(e.call(this, t, mt(this)));
          });if (!arguments.length) return this.attr("class", "");if ((t = xt(e)).length) while (n = this[u++]) {
            if (i = mt(n), r = 1 === n.nodeType && " " + vt(i) + " ") {
              a = 0;while (o = t[a++]) {
                while (r.indexOf(" " + o + " ") > -1) {
                  r = r.replace(" " + o + " ", " ");
                }
              }i !== (s = vt(r)) && n.setAttribute("class", s);
            }
          }return this;
        }, toggleClass: function toggleClass(e, t) {
          var n = typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e),
              r = "string" === n || Array.isArray(e);return "boolean" == typeof t && r ? t ? this.addClass(e) : this.removeClass(e) : g(e) ? this.each(function (n) {
            w(this).toggleClass(e.call(this, n, mt(this), t), t);
          }) : this.each(function () {
            var t, i, o, a;if (r) {
              i = 0, o = w(this), a = xt(e);while (t = a[i++]) {
                o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
              }
            } else void 0 !== e && "boolean" !== n || ((t = mt(this)) && J.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : J.get(this, "__className__") || ""));
          });
        }, hasClass: function hasClass(e) {
          var t,
              n,
              r = 0;t = " " + e + " ";while (n = this[r++]) {
            if (1 === n.nodeType && (" " + vt(mt(n)) + " ").indexOf(t) > -1) return !0;
          }return !1;
        } });var bt = /\r/g;w.fn.extend({ val: function val(e) {
          var t,
              n,
              r,
              i = this[0];{
            if (arguments.length) return r = g(e), this.each(function (n) {
              var i;1 === this.nodeType && (null == (i = r ? e.call(this, n, w(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = w.map(i, function (e) {
                return null == e ? "" : e + "";
              })), (t = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
            });if (i) return (t = w.valHooks[i.type] || w.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(bt, "") : null == n ? "" : n;
          }
        } }), w.extend({ valHooks: { option: { get: function get(e) {
              var t = w.find.attr(e, "value");return null != t ? t : vt(w.text(e));
            } }, select: { get: function get(e) {
              var t,
                  n,
                  r,
                  i = e.options,
                  o = e.selectedIndex,
                  a = "select-one" === e.type,
                  s = a ? null : [],
                  u = a ? o + 1 : i.length;for (r = o < 0 ? u : a ? o : 0; r < u; r++) {
                if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !N(n.parentNode, "optgroup"))) {
                  if (t = w(n).val(), a) return t;s.push(t);
                }
              }return s;
            }, set: function set(e, t) {
              var n,
                  r,
                  i = e.options,
                  o = w.makeArray(t),
                  a = i.length;while (a--) {
                ((r = i[a]).selected = w.inArray(w.valHooks.option.get(r), o) > -1) && (n = !0);
              }return n || (e.selectedIndex = -1), o;
            } } } }), w.each(["radio", "checkbox"], function () {
        w.valHooks[this] = { set: function set(e, t) {
            if (Array.isArray(t)) return e.checked = w.inArray(w(e).val(), t) > -1;
          } }, h.checkOn || (w.valHooks[this].get = function (e) {
          return null === e.getAttribute("value") ? "on" : e.value;
        });
      }), h.focusin = "onfocusin" in e;var wt = /^(?:focusinfocus|focusoutblur)$/,
          Tt = function Tt(e) {
        e.stopPropagation();
      };w.extend(w.event, { trigger: function trigger(t, n, i, o) {
          var a,
              s,
              u,
              l,
              c,
              p,
              d,
              h,
              v = [i || r],
              m = f.call(t, "type") ? t.type : t,
              x = f.call(t, "namespace") ? t.namespace.split(".") : [];if (s = h = u = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !wt.test(m + w.event.triggered) && (m.indexOf(".") > -1 && (m = (x = m.split(".")).shift(), x.sort()), c = m.indexOf(":") < 0 && "on" + m, t = t[w.expando] ? t : new w.Event(m, "object" == (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = x.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + x.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : w.makeArray(n, [t]), d = w.event.special[m] || {}, o || !d.trigger || !1 !== d.trigger.apply(i, n))) {
            if (!o && !d.noBubble && !y(i)) {
              for (l = d.delegateType || m, wt.test(l + m) || (s = s.parentNode); s; s = s.parentNode) {
                v.push(s), u = s;
              }u === (i.ownerDocument || r) && v.push(u.defaultView || u.parentWindow || e);
            }a = 0;while ((s = v[a++]) && !t.isPropagationStopped()) {
              h = s, t.type = a > 1 ? l : d.bindType || m, (p = (J.get(s, "events") || {})[t.type] && J.get(s, "handle")) && p.apply(s, n), (p = c && s[c]) && p.apply && Y(s) && (t.result = p.apply(s, n), !1 === t.result && t.preventDefault());
            }return t.type = m, o || t.isDefaultPrevented() || d._default && !1 !== d._default.apply(v.pop(), n) || !Y(i) || c && g(i[m]) && !y(i) && ((u = i[c]) && (i[c] = null), w.event.triggered = m, t.isPropagationStopped() && h.addEventListener(m, Tt), i[m](), t.isPropagationStopped() && h.removeEventListener(m, Tt), w.event.triggered = void 0, u && (i[c] = u)), t.result;
          }
        }, simulate: function simulate(e, t, n) {
          var r = w.extend(new w.Event(), n, { type: e, isSimulated: !0 });w.event.trigger(r, null, t);
        } }), w.fn.extend({ trigger: function trigger(e, t) {
          return this.each(function () {
            w.event.trigger(e, t, this);
          });
        }, triggerHandler: function triggerHandler(e, t) {
          var n = this[0];if (n) return w.event.trigger(e, t, n, !0);
        } }), h.focusin || w.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = function n(e) {
          w.event.simulate(t, e.target, w.event.fix(e));
        };w.event.special[t] = { setup: function setup() {
            var r = this.ownerDocument || this,
                i = J.access(r, t);i || r.addEventListener(e, n, !0), J.access(r, t, (i || 0) + 1);
          }, teardown: function teardown() {
            var r = this.ownerDocument || this,
                i = J.access(r, t) - 1;i ? J.access(r, t, i) : (r.removeEventListener(e, n, !0), J.remove(r, t));
          } };
      });var Ct = e.location,
          Et = Date.now(),
          kt = /\?/;w.parseXML = function (t) {
        var n;if (!t || "string" != typeof t) return null;try {
          n = new e.DOMParser().parseFromString(t, "text/xml");
        } catch (e) {
          n = void 0;
        }return n && !n.getElementsByTagName("parsererror").length || w.error("Invalid XML: " + t), n;
      };var St = /\[\]$/,
          Dt = /\r?\n/g,
          Nt = /^(?:submit|button|image|reset|file)$/i,
          At = /^(?:input|select|textarea|keygen)/i;function jt(e, t, n, r) {
        var i;if (Array.isArray(t)) w.each(t, function (t, i) {
          n || St.test(e) ? r(e, i) : jt(e + "[" + ("object" == (typeof i === "undefined" ? "undefined" : (0, _typeof3.default)(i)) && null != i ? t : "") + "]", i, n, r);
        });else if (n || "object" !== x(t)) r(e, t);else for (i in t) {
          jt(e + "[" + i + "]", t[i], n, r);
        }
      }w.param = function (e, t) {
        var n,
            r = [],
            i = function i(e, t) {
          var n = g(t) ? t() : t;r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n);
        };if (Array.isArray(e) || e.jquery && !w.isPlainObject(e)) w.each(e, function () {
          i(this.name, this.value);
        });else for (n in e) {
          jt(n, e[n], t, i);
        }return r.join("&");
      }, w.fn.extend({ serialize: function serialize() {
          return w.param(this.serializeArray());
        }, serializeArray: function serializeArray() {
          return this.map(function () {
            var e = w.prop(this, "elements");return e ? w.makeArray(e) : this;
          }).filter(function () {
            var e = this.type;return this.name && !w(this).is(":disabled") && At.test(this.nodeName) && !Nt.test(e) && (this.checked || !pe.test(e));
          }).map(function (e, t) {
            var n = w(this).val();return null == n ? null : Array.isArray(n) ? w.map(n, function (e) {
              return { name: t.name, value: e.replace(Dt, "\r\n") };
            }) : { name: t.name, value: n.replace(Dt, "\r\n") };
          }).get();
        } });var qt = /%20/g,
          Lt = /#.*$/,
          Ht = /([?&])_=[^&]*/,
          Ot = /^(.*?):[ \t]*([^\r\n]*)$/gm,
          Pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
          Mt = /^(?:GET|HEAD)$/,
          Rt = /^\/\//,
          It = {},
          Wt = {},
          $t = "*/".concat("*"),
          Bt = r.createElement("a");Bt.href = Ct.href;function Ft(e) {
        return function (t, n) {
          "string" != typeof t && (n = t, t = "*");var r,
              i = 0,
              o = t.toLowerCase().match(M) || [];if (g(n)) while (r = o[i++]) {
            "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
          }
        };
      }function _t(e, t, n, r) {
        var i = {},
            o = e === Wt;function a(s) {
          var u;return i[s] = !0, w.each(e[s] || [], function (e, s) {
            var l = s(t, n, r);return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1);
          }), u;
        }return a(t.dataTypes[0]) || !i["*"] && a("*");
      }function zt(e, t) {
        var n,
            r,
            i = w.ajaxSettings.flatOptions || {};for (n in t) {
          void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        }return r && w.extend(!0, e, r), e;
      }function Xt(e, t, n) {
        var r,
            i,
            o,
            a,
            s = e.contents,
            u = e.dataTypes;while ("*" === u[0]) {
          u.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        }if (r) for (i in s) {
          if (s[i] && s[i].test(r)) {
            u.unshift(i);break;
          }
        }if (u[0] in n) o = u[0];else {
          for (i in n) {
            if (!u[0] || e.converters[i + " " + u[0]]) {
              o = i;break;
            }a || (a = i);
          }o = o || a;
        }if (o) return o !== u[0] && u.unshift(o), n[o];
      }function Ut(e, t, n, r) {
        var i,
            o,
            a,
            s,
            u,
            l = {},
            c = e.dataTypes.slice();if (c[1]) for (a in e.converters) {
          l[a.toLowerCase()] = e.converters[a];
        }o = c.shift();while (o) {
          if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
            if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
              if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));break;
              }
            }if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
              t = a(t);
            } catch (e) {
              return { state: "parsererror", error: a ? e : "No conversion from " + u + " to " + o };
            }
          }
        }return { state: "success", data: t };
      }w.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Ct.href, type: "GET", isLocal: Pt.test(Ct.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": $t, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(e, t) {
          return t ? zt(zt(e, w.ajaxSettings), t) : zt(w.ajaxSettings, e);
        }, ajaxPrefilter: Ft(It), ajaxTransport: Ft(Wt), ajax: function ajax(t, n) {
          "object" == (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && (n = t, t = void 0), n = n || {};var i,
              o,
              a,
              s,
              u,
              l,
              c,
              f,
              p,
              d,
              h = w.ajaxSetup({}, n),
              g = h.context || h,
              y = h.context && (g.nodeType || g.jquery) ? w(g) : w.event,
              v = w.Deferred(),
              m = w.Callbacks("once memory"),
              x = h.statusCode || {},
              b = {},
              T = {},
              C = "canceled",
              E = { readyState: 0, getResponseHeader: function getResponseHeader(e) {
              var t;if (c) {
                if (!s) {
                  s = {};while (t = Ot.exec(a)) {
                    s[t[1].toLowerCase()] = t[2];
                  }
                }t = s[e.toLowerCase()];
              }return null == t ? null : t;
            }, getAllResponseHeaders: function getAllResponseHeaders() {
              return c ? a : null;
            }, setRequestHeader: function setRequestHeader(e, t) {
              return null == c && (e = T[e.toLowerCase()] = T[e.toLowerCase()] || e, b[e] = t), this;
            }, overrideMimeType: function overrideMimeType(e) {
              return null == c && (h.mimeType = e), this;
            }, statusCode: function statusCode(e) {
              var t;if (e) if (c) E.always(e[E.status]);else for (t in e) {
                x[t] = [x[t], e[t]];
              }return this;
            }, abort: function abort(e) {
              var t = e || C;return i && i.abort(t), k(0, t), this;
            } };if (v.promise(E), h.url = ((t || h.url || Ct.href) + "").replace(Rt, Ct.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(M) || [""], null == h.crossDomain) {
            l = r.createElement("a");try {
              l.href = h.url, l.href = l.href, h.crossDomain = Bt.protocol + "//" + Bt.host != l.protocol + "//" + l.host;
            } catch (e) {
              h.crossDomain = !0;
            }
          }if (h.data && h.processData && "string" != typeof h.data && (h.data = w.param(h.data, h.traditional)), _t(It, h, n, E), c) return E;(f = w.event && h.global) && 0 == w.active++ && w.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !Mt.test(h.type), o = h.url.replace(Lt, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(qt, "+")) : (d = h.url.slice(o.length), h.data && (h.processData || "string" == typeof h.data) && (o += (kt.test(o) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (o = o.replace(Ht, "$1"), d = (kt.test(o) ? "&" : "?") + "_=" + Et++ + d), h.url = o + d), h.ifModified && (w.lastModified[o] && E.setRequestHeader("If-Modified-Since", w.lastModified[o]), w.etag[o] && E.setRequestHeader("If-None-Match", w.etag[o])), (h.data && h.hasContent && !1 !== h.contentType || n.contentType) && E.setRequestHeader("Content-Type", h.contentType), E.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + $t + "; q=0.01" : "") : h.accepts["*"]);for (p in h.headers) {
            E.setRequestHeader(p, h.headers[p]);
          }if (h.beforeSend && (!1 === h.beforeSend.call(g, E, h) || c)) return E.abort();if (C = "abort", m.add(h.complete), E.done(h.success), E.fail(h.error), i = _t(Wt, h, n, E)) {
            if (E.readyState = 1, f && y.trigger("ajaxSend", [E, h]), c) return E;h.async && h.timeout > 0 && (u = e.setTimeout(function () {
              E.abort("timeout");
            }, h.timeout));try {
              c = !1, i.send(b, k);
            } catch (e) {
              if (c) throw e;k(-1, e);
            }
          } else k(-1, "No Transport");function k(t, n, r, s) {
            var l,
                p,
                d,
                b,
                T,
                C = n;c || (c = !0, u && e.clearTimeout(u), i = void 0, a = s || "", E.readyState = t > 0 ? 4 : 0, l = t >= 200 && t < 300 || 304 === t, r && (b = Xt(h, E, r)), b = Ut(h, b, E, l), l ? (h.ifModified && ((T = E.getResponseHeader("Last-Modified")) && (w.lastModified[o] = T), (T = E.getResponseHeader("etag")) && (w.etag[o] = T)), 204 === t || "HEAD" === h.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, p = b.data, l = !(d = b.error))) : (d = C, !t && C || (C = "error", t < 0 && (t = 0))), E.status = t, E.statusText = (n || C) + "", l ? v.resolveWith(g, [p, C, E]) : v.rejectWith(g, [E, C, d]), E.statusCode(x), x = void 0, f && y.trigger(l ? "ajaxSuccess" : "ajaxError", [E, h, l ? p : d]), m.fireWith(g, [E, C]), f && (y.trigger("ajaxComplete", [E, h]), --w.active || w.event.trigger("ajaxStop")));
          }return E;
        }, getJSON: function getJSON(e, t, n) {
          return w.get(e, t, n, "json");
        }, getScript: function getScript(e, t) {
          return w.get(e, void 0, t, "script");
        } }), w.each(["get", "post"], function (e, t) {
        w[t] = function (e, n, r, i) {
          return g(n) && (i = i || r, r = n, n = void 0), w.ajax(w.extend({ url: e, type: t, dataType: i, data: n, success: r }, w.isPlainObject(e) && e));
        };
      }), w._evalUrl = function (e) {
        return w.ajax({ url: e, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
      }, w.fn.extend({ wrapAll: function wrapAll(e) {
          var t;return this[0] && (g(e) && (e = e.call(this[0])), t = w(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
            var e = this;while (e.firstElementChild) {
              e = e.firstElementChild;
            }return e;
          }).append(this)), this;
        }, wrapInner: function wrapInner(e) {
          return g(e) ? this.each(function (t) {
            w(this).wrapInner(e.call(this, t));
          }) : this.each(function () {
            var t = w(this),
                n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
          });
        }, wrap: function wrap(e) {
          var t = g(e);return this.each(function (n) {
            w(this).wrapAll(t ? e.call(this, n) : e);
          });
        }, unwrap: function unwrap(e) {
          return this.parent(e).not("body").each(function () {
            w(this).replaceWith(this.childNodes);
          }), this;
        } }), w.expr.pseudos.hidden = function (e) {
        return !w.expr.pseudos.visible(e);
      }, w.expr.pseudos.visible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }, w.ajaxSettings.xhr = function () {
        try {
          return new e.XMLHttpRequest();
        } catch (e) {}
      };var Vt = { 0: 200, 1223: 204 },
          Gt = w.ajaxSettings.xhr();h.cors = !!Gt && "withCredentials" in Gt, h.ajax = Gt = !!Gt, w.ajaxTransport(function (t) {
        var _n, r;if (h.cors || Gt && !t.crossDomain) return { send: function send(i, o) {
            var a,
                s = t.xhr();if (s.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (a in t.xhrFields) {
              s[a] = t.xhrFields[a];
            }t.mimeType && s.overrideMimeType && s.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");for (a in i) {
              s.setRequestHeader(a, i[a]);
            }_n = function n(e) {
              return function () {
                _n && (_n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === e ? s.abort() : "error" === e ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Vt[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? { binary: s.response } : { text: s.responseText }, s.getAllResponseHeaders()));
              };
            }, s.onload = _n(), r = s.onerror = s.ontimeout = _n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
              4 === s.readyState && e.setTimeout(function () {
                _n && r();
              });
            }, _n = _n("abort");try {
              s.send(t.hasContent && t.data || null);
            } catch (e) {
              if (_n) throw e;
            }
          }, abort: function abort() {
            _n && _n();
          } };
      }), w.ajaxPrefilter(function (e) {
        e.crossDomain && (e.contents.script = !1);
      }), w.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(e) {
            return w.globalEval(e), e;
          } } }), w.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
      }), w.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
          var t, _n2;return { send: function send(i, o) {
              t = w("<script>").prop({ charset: e.scriptCharset, src: e.url }).on("load error", _n2 = function n(e) {
                t.remove(), _n2 = null, e && o("error" === e.type ? 404 : 200, e.type);
              }), r.head.appendChild(t[0]);
            }, abort: function abort() {
              _n2 && _n2();
            } };
        }
      });var Yt = [],
          Qt = /(=)\?(?=&|$)|\?\?/;w.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
          var e = Yt.pop() || w.expando + "_" + Et++;return this[e] = !0, e;
        } }), w.ajaxPrefilter("json jsonp", function (t, n, r) {
        var i,
            o,
            a,
            s = !1 !== t.jsonp && (Qt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Qt.test(t.data) && "data");if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = g(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Qt, "$1" + i) : !1 !== t.jsonp && (t.url += (kt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
          return a || w.error(i + " was not called"), a[0];
        }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
          a = arguments;
        }, r.always(function () {
          void 0 === o ? w(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Yt.push(i)), a && g(o) && o(a[0]), a = o = void 0;
        }), "script";
      }), h.createHTMLDocument = function () {
        var e = r.implementation.createHTMLDocument("").body;return e.innerHTML = "<form></form><form></form>", 2 === e.childNodes.length;
      }(), w.parseHTML = function (e, t, n) {
        if ("string" != typeof e) return [];"boolean" == typeof t && (n = t, t = !1);var i, o, a;return t || (h.createHTMLDocument ? ((i = (t = r.implementation.createHTMLDocument("")).createElement("base")).href = r.location.href, t.head.appendChild(i)) : t = r), o = A.exec(e), a = !n && [], o ? [t.createElement(o[1])] : (o = xe([e], t, a), a && a.length && w(a).remove(), w.merge([], o.childNodes));
      }, w.fn.load = function (e, t, n) {
        var r,
            i,
            o,
            a = this,
            s = e.indexOf(" ");return s > -1 && (r = vt(e.slice(s)), e = e.slice(0, s)), g(t) ? (n = t, t = void 0) : t && "object" == (typeof t === "undefined" ? "undefined" : (0, _typeof3.default)(t)) && (i = "POST"), a.length > 0 && w.ajax({ url: e, type: i || "GET", dataType: "html", data: t }).done(function (e) {
          o = arguments, a.html(r ? w("<div>").append(w.parseHTML(e)).find(r) : e);
        }).always(n && function (e, t) {
          a.each(function () {
            n.apply(this, o || [e.responseText, t, e]);
          });
        }), this;
      }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        w.fn[t] = function (e) {
          return this.on(t, e);
        };
      }), w.expr.pseudos.animated = function (e) {
        return w.grep(w.timers, function (t) {
          return e === t.elem;
        }).length;
      }, w.offset = { setOffset: function setOffset(e, t, n) {
          var r,
              i,
              o,
              a,
              s,
              u,
              l,
              c = w.css(e, "position"),
              f = w(e),
              p = {};"static" === c && (e.style.position = "relative"), s = f.offset(), o = w.css(e, "top"), u = w.css(e, "left"), (l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1) ? (a = (r = f.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), g(t) && (t = t.call(e, n, w.extend({}, s))), null != t.top && (p.top = t.top - s.top + a), null != t.left && (p.left = t.left - s.left + i), "using" in t ? t.using.call(e, p) : f.css(p);
        } }, w.fn.extend({ offset: function offset(e) {
          if (arguments.length) return void 0 === e ? this : this.each(function (t) {
            w.offset.setOffset(this, e, t);
          });var t,
              n,
              r = this[0];if (r) return r.getClientRects().length ? (t = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, { top: t.top + n.pageYOffset, left: t.left + n.pageXOffset }) : { top: 0, left: 0 };
        }, position: function position() {
          if (this[0]) {
            var e,
                t,
                n,
                r = this[0],
                i = { top: 0, left: 0 };if ("fixed" === w.css(r, "position")) t = r.getBoundingClientRect();else {
              t = this.offset(), n = r.ownerDocument, e = r.offsetParent || n.documentElement;while (e && (e === n.body || e === n.documentElement) && "static" === w.css(e, "position")) {
                e = e.parentNode;
              }e && e !== r && 1 === e.nodeType && ((i = w(e).offset()).top += w.css(e, "borderTopWidth", !0), i.left += w.css(e, "borderLeftWidth", !0));
            }return { top: t.top - i.top - w.css(r, "marginTop", !0), left: t.left - i.left - w.css(r, "marginLeft", !0) };
          }
        }, offsetParent: function offsetParent() {
          return this.map(function () {
            var e = this.offsetParent;while (e && "static" === w.css(e, "position")) {
              e = e.offsetParent;
            }return e || be;
          });
        } }), w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, t) {
        var n = "pageYOffset" === t;w.fn[e] = function (r) {
          return z(this, function (e, r, i) {
            var o;if (y(e) ? o = e : 9 === e.nodeType && (o = e.defaultView), void 0 === i) return o ? o[t] : e[r];o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : e[r] = i;
          }, e, r, arguments.length);
        };
      }), w.each(["top", "left"], function (e, t) {
        w.cssHooks[t] = _e(h.pixelPosition, function (e, n) {
          if (n) return n = Fe(e, t), We.test(n) ? w(e).position()[t] + "px" : n;
        });
      }), w.each({ Height: "height", Width: "width" }, function (e, t) {
        w.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, r) {
          w.fn[r] = function (i, o) {
            var a = arguments.length && (n || "boolean" != typeof i),
                s = n || (!0 === i || !0 === o ? "margin" : "border");return z(this, function (t, n, i) {
              var o;return y(t) ? 0 === r.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? w.css(t, n, s) : w.style(t, n, i, s);
            }, t, a ? i : void 0, a);
          };
        });
      }), w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, t) {
        w.fn[t] = function (e, n) {
          return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
        };
      }), w.fn.extend({ hover: function hover(e, t) {
          return this.mouseenter(e).mouseleave(t || e);
        } }), w.fn.extend({ bind: function bind(e, t, n) {
          return this.on(e, null, t, n);
        }, unbind: function unbind(e, t) {
          return this.off(e, null, t);
        }, delegate: function delegate(e, t, n, r) {
          return this.on(t, e, n, r);
        }, undelegate: function undelegate(e, t, n) {
          return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
        } }), w.proxy = function (e, t) {
        var n, r, i;if ("string" == typeof t && (n = e[t], t = e, e = n), g(e)) return r = o.call(arguments, 2), i = function i() {
          return e.apply(t || this, r.concat(o.call(arguments)));
        }, i.guid = e.guid = e.guid || w.guid++, i;
      }, w.holdReady = function (e) {
        e ? w.readyWait++ : w.ready(!0);
      }, w.isArray = Array.isArray, w.parseJSON = JSON.parse, w.nodeName = N, w.isFunction = g, w.isWindow = y, w.camelCase = G, w.type = x, w.now = Date.now, w.isNumeric = function (e) {
        var t = w.type(e);return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e));
      }, "function" == typeof define && define.amd && define("jquery", [], function () {
        return w;
      });var Jt = e.jQuery,
          Kt = e.$;return w.noConflict = function (t) {
        return e.$ === w && (e.$ = Kt), t && e.jQuery === w && (e.jQuery = Jt), w;
      }, t || (e.jQuery = e.$ = w), w;
    });
  }
  var href = window.location.href;
  if (href.indexOf('202.115.47.141') !== -1 || href.indexOf('zhjw.scu.edu.cn') !== -1 || href.indexOf('zhjwwx.scu.edu.cn') !== -1) {
    sua.init();
    window.alert('恭喜！启动成功！如果刷新页面，需要再启动一下哦~');
  } else {
    window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。');
  }
})();
},{"babel-runtime/core-js/object/define-property":6,"babel-runtime/core-js/symbol/iterator":26,"babel-runtime/core-js/symbol":24,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/typeof":13,"./sua-core":3}]},{},[1], null)