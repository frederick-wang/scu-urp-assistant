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
})({72:[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],73:[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],37:[function(require,module,exports) {
module.exports = {};

},{}],119:[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],110:[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":119}],81:[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],74:[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":110,"./_defined":81}],82:[function(require,module,exports) {
module.exports = true;

},{}],35:[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],28:[function(require,module,exports) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],105:[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],53:[function(require,module,exports) {
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

},{"./_a-function":105}],87:[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],41:[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":87}],111:[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],77:[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":111}],126:[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":87,"./_global":35}],120:[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":77,"./_fails":111,"./_dom-create":126}],121:[function(require,module,exports) {
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

},{"./_is-object":87}],75:[function(require,module,exports) {
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

},{"./_an-object":41,"./_ie8-dom-define":120,"./_to-primitive":121,"./_descriptors":77}],76:[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],36:[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":75,"./_property-desc":76,"./_descriptors":77}],106:[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],54:[function(require,module,exports) {

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

},{"./_global":35,"./_core":28,"./_ctx":53,"./_hide":36,"./_has":106}],83:[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":36}],80:[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],58:[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":80}],130:[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":80}],127:[function(require,module,exports) {
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

},{"./_to-iobject":74,"./_to-length":58,"./_to-absolute-index":130}],78:[function(require,module,exports) {

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

},{"./_core":28,"./_global":35,"./_library":82}],79:[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],123:[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":78,"./_uid":79}],124:[function(require,module,exports) {
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

},{"./_has":106,"./_to-iobject":74,"./_array-includes":127,"./_shared-key":123}],125:[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],107:[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":124,"./_enum-bug-keys":125}],128:[function(require,module,exports) {
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

},{"./_object-dp":75,"./_an-object":41,"./_object-keys":107,"./_descriptors":77}],129:[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":35}],122:[function(require,module,exports) {
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

},{"./_an-object":41,"./_object-dps":128,"./_enum-bug-keys":125,"./_shared-key":123,"./_dom-create":126,"./_html":129}],38:[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":78,"./_uid":79,"./_global":35}],85:[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":75,"./_has":106,"./_wks":38}],84:[function(require,module,exports) {
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

},{"./_object-create":122,"./_property-desc":76,"./_set-to-string-tag":85,"./_hide":36,"./_wks":38}],55:[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":81}],86:[function(require,module,exports) {
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

},{"./_has":106,"./_to-object":55,"./_shared-key":123}],40:[function(require,module,exports) {
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

},{"./_library":82,"./_export":54,"./_redefine":83,"./_hide":36,"./_iterators":37,"./_iter-create":84,"./_set-to-string-tag":85,"./_object-gpo":86,"./_wks":38}],34:[function(require,module,exports) {
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

},{"./_add-to-unscopables":72,"./_iter-step":73,"./_iterators":37,"./_to-iobject":74,"./_iter-define":40}],21:[function(require,module,exports) {

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

},{"./es6.array.iterator":34,"./_global":35,"./_hide":36,"./_iterators":37,"./_wks":38}],39:[function(require,module,exports) {
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

},{"./_to-integer":80,"./_defined":81}],22:[function(require,module,exports) {
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

},{"./_string-at":39,"./_iter-define":40}],71:[function(require,module,exports) {
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

},{"./_cof":119,"./_wks":38}],42:[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":71,"./_wks":38,"./_iterators":37,"./_core":28}],23:[function(require,module,exports) {
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":41,"./core.get-iterator-method":42,"./_core":28}],12:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/web.dom.iterable":21,"../modules/es6.string.iterator":22,"../modules/core.get-iterator":23}],3:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":12}],108:[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],109:[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],61:[function(require,module,exports) {
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

},{"./_object-keys":107,"./_object-gops":108,"./_object-pie":109,"./_to-object":55,"./_iobject":110,"./_fails":111}],29:[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":54,"./_object-assign":61}],15:[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":29,"../../modules/_core":28}],4:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":15}],33:[function(require,module,exports) {
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

},{"./_classof":71,"./_wks":38,"./_iterators":37,"./_core":28}],19:[function(require,module,exports) {
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/web.dom.iterable":21,"../modules/es6.string.iterator":22,"../modules/core.is-iterable":33}],11:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":19}],5:[function(require,module,exports) {
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
},{"../core-js/is-iterable":11,"../core-js/get-iterator":3}],56:[function(require,module,exports) {
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

},{"./_an-object":41}],57:[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":37,"./_wks":38}],59:[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":75,"./_property-desc":76}],60:[function(require,module,exports) {
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

},{"./_wks":38}],27:[function(require,module,exports) {
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

},{"./_ctx":53,"./_export":54,"./_to-object":55,"./_iter-call":56,"./_is-array-iter":57,"./_to-length":58,"./_create-property":59,"./core.get-iterator-method":42,"./_iter-detect":60}],16:[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":22,"../../modules/es6.array.from":27,"../../modules/_core":28}],6:[function(require,module,exports) {
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":16}],1:[function(require,module,exports) {
'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// ==UserScript==
// @name         四川大学综合教务系统助手
// @namespace    http://zhaoji.wang/
// @version      0.6
// @description  四川大学综合教务系统助手，是一个优化四川大学综合教务系统的「Userscript」，即用户脚本。这不是一个独立的软件，也不是一个浏览器的插件，但可以依赖浏览器的插件运行，或者作为一个Bookmarklet在点击后运行。目前包括的功能有：1. 修复 SCU URP 在 Firefox、Chrome等现代化浏览器下无法正常使用的问题；2. 增加一键评教的功能。
// @author       Zhaoji Wang
// @include      http://202.115.47.141/loginAction.do
// @include      http://zhjw.scu.edu.cn/loginAction.do
// @grant        none
// ==/UserScript==

(function () {
  var href = window.location.href;
  if (href === 'http://202.115.47.141/loginAction.do' || href === 'http://zhjw.scu.edu.cn/loginAction.do') {
    // 修复兼容性插件
    var compatibility = {
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
    // 一键评教插件
    var fastEvaluation = {
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
        var _this2 = this;

        e.preventDefault();
        this.changePromopt('正在收集本页问卷数据……');
        var names = (0, _from2.default)(this.mainFrame.document.getElementsByTagName('img')).filter(function (item) {
          return item.getAttribute('title') === '评估';
        }).map(function (item) {
          return item.name;
        }).filter(function (item) {
          return item && item !== 'goto';
        });
        if (!names.length) {
          window.alert('本页上的所有教师都已经评教过了，您可以换一页再使用。');
          this.changePromopt('本页上的所有教师都已经评教过了，您可以换一页再使用。');
          return;
        }
        this.list = names.map(function (item) {
          return _this2.parseName(item);
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
      changePromopt: function changePromopt(str) {
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
        var _this3 = this;

        var origin = window.location.origin;
        if (index >= this.list.length) {
          var page = '1';
          if (this.mainFrame.location.search.indexOf('page=') !== -1) {
            page = this.mainFrame.location.search.match(/page=(\d+)/)[1];
          }
          this.changePromopt('\u7B2C' + page + '\u9875\u4E0A\u7684\u8001\u5E08\u5DF2\u7ECF\u5168\u90E8\u8BC4\u4EF7\u5B8C\u6BD5\uFF01\u6B63\u5728\u5237\u65B0\u2026\u2026');
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
        this.changePromopt('\u6B63\u5728\u8BC4\u4EF7' + subjectName + '\u8BFE\u7A0B\u7684' + teacherName + '\u8001\u5E08\uFF08' + (index + 1) + '/' + this.list.length + '\uFF09');
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
        bodyStr += '&zgpj=' + this.getComment();
        window.fetch(origin + '/jxpgXsAction.do', {
          'credentials': 'include',
          'headers': this.headers,
          'referrer': origin + '/jxpgXsAction.do?totalrows=25&page=1&pageSize=20',
          'referrerPolicy': 'no-referrer-when-downgrade',
          'body': 'wjbm=' + questionnaire + '&bpr=' + teacher + '&pgnr=' + subject + '&oper=' + oper + '&pageSize=20&page=1&currentPage=1&pageNo=',
          'method': 'POST',
          'mode': 'cors'
        }).then(function (response) {
          window.fetch(origin + '/jxpgXsAction.do?oper=wjpg', {
            'credentials': 'include',
            'headers': _this3.headers,
            'referrer': origin + '/jxpgXsAction.do',
            'referrerPolicy': 'no-referrer-when-downgrade',
            'body': bodyStr,
            'method': 'POST',
            'mode': 'cors'
          }).then(function (response) {
            response.text().then(function (text) {
              if (text.indexOf('location.href=') !== -1) {
                _this3.changePromopt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u6210\u529F\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
              } else if (text.indexOf('history.back(-1);') !== -1) {
                _this3.changePromopt(teacherName + '\uFF08' + subjectName + '\uFF09\u8BC4\u4EF7\u5931\u8D25 QAQ\uFF0C\u8FDB\u5EA6\uFF1A' + (index + 1) + '/' + _this3.list.length);
              }
              setTimeout(function () {
                _this3.evaluate(++index);
              }, _this3.evaluationInterval);
            });
          });
        });
      }
    };
    // 挂载到 window 上的全局对象
    var $sua = {
      // 属性值的存放处
      data: {
        timeInterval: 100,
        topFrame: window.frames.topFrame,
        bottomFrame: window.frames.bottomFrame,
        menuFrame: window.frames.bottomFrame.frames.menuFrame,
        mainFrame: window.frames.bottomFrame.frames.mainFrame
      },
      // 初始化任务的队列
      initQueue: [],
      // 定时执行的任务的队列
      taskQueue: [],
      // 插件
      plugins: [],
      init: function init() {
        var _this4 = this;

        window.$sua = (0, _assign2.default)($sua, $sua.data);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(this.plugins), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var plugin = _step.value;

            plugin.$sua = $sua;
            plugin = (0, _assign2.default)(plugin, $sua.data);
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
            for (var _iterator3 = (0, _getIterator3.default)(_this4.taskQueue), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
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
      }
    };
    $sua.plugins = [compatibility, fastEvaluation];
    $sua.init();
    window.alert('恭喜！修复成功！');
  } else {
    window.alert('抱歉，您当前不处于四川大学 URP 登陆后的页面。请登陆后再使用哦。');
  }
})();
},{"babel-runtime/core-js/get-iterator":3,"babel-runtime/core-js/object/assign":4,"babel-runtime/helpers/slicedToArray":5,"babel-runtime/core-js/array/from":6}]},{},[1], null)