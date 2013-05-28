
/**
 * DSL context.
 */

var context;

/**
 * Current language.
 */

var locale;

/**
 * Expose `text`.
 */

exports = module.exports = text;

/**
 * Example:
 *
 *    text('messages')
 *
 * @param {String} key
 * @api public
 */

function text(key, val){
  return undefined === val
    ? (locale[key] || (locale[key] = new Text))
    : (locale[key] = new Text).one(val);
}

exports.has = function(key){
  return !!locale[key];
};

exports.ns = function(ns){
  var fn = function text(key, val) {
    return exports(ns + '.' + key, val);
  }
  fn.text = fn;
};

/**
 * Set locale.
 */

exports.locale = function(val){
  locale = exports[val] || (exports[val] = {});
  return exports;
};

/**
 * Default locale is `en`.
 */

exports.locale('en');

/**
 * Instantiate a new `Text`.
 *
 * @api private
 */

function Text() {
  this.inflections = [];
}

/**
 * @param {String} string
 * @api public
 */

Text.prototype.past = function(string){
  return this.inflection(string, context.count, 'past');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.present = function(string){
  return this.inflection(string, context.count, 'present');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.future = function(string){
  return this.inflection(string, context.count, 'future');
};

/**
 * @param {String} string
 * @param {String} tense
 * @param {String} count
 * @api public
 */

Text.prototype.tense = function(string, tense, count){
  return this.inflection(string, count, tense);
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.none = function(string){
  return this.inflection(string, 'none');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.one = function(string){
  return this.inflection(string, 'one');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.other = function(string){
  return this.inflection(string, 'other');
};

/**
 * @param {String} string
 * @param {String} count
 * @param {String} tense
 * @api public
 */

Text.prototype.inflection = function(string, count, tense){
  // this isn't quite correct...
  this.inflections.push(context = {
    string: string,
    count: count == null ? 'all' : count,
    tense: tense || 'present'
  });

  return this;
};

/**
 * This could be a view on the client.
 *
 * @param {Object} options
 * @api public
 */

Text.prototype.render = function(options){
  options || (options = {});

  var count = (options.count ? (1 === options.count ? 'one' : 'other') : 'none')
    , tense = options.tense || 'present'
    , key = tense + '.' + count
    , inflections = this.inflections
    , inflection = inflections[0]
    , currScore = 0
    , prevScore = 0;

  for (var i = 0, n = inflections.length; i < n; i++) {
    currScore = 0
      + (count == inflections[i].count ? 1 : 0)
      + (tense == inflections[i].tense ? 1 : 0);

    if (currScore > prevScore) {
      inflection = inflections[i];
      prevScore = currScore; 
    }
  }

  return inflection.string.replace(/\{\{(\w+)\}\}/g, function(_, $1){
    return options[$1];
  });
};