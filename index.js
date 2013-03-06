
/**
 * Module dependencies.
 */

var container = require('tower-container')
  , mm = require('minstache');

/**
 * Expose `text`.
 */

module.exports = text;

/**
 * Instantiate a new `Text`.
 *
 * Example:
 *
 *    text('messages')
 *
 * @param {String} key
 * @api public
 */

function text(key) {
  // XXX: handle multiple languages
  return container.lookup('text:en:' + key, 'text:*');
}

container.factory('text:*', Text);

/**
 * Text (for I18n).
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

Text.prototype.past = function(string) {
  return this.inflection(string, context.inflection.count, 'past');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.present = function(string) {
  return this.inflection(string, context.inflection.count, 'present');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.future = function(string) {
  return this.inflection(string, context.inflection.count, 'future');
};

// may reverse the tense/count args.
Text.prototype.tense = function(string, tense, count) {
  return this.inflection(string, count, tense);
}

/**
 * @param {String} string
 * @api public
 */

Text.prototype.none = function(string) {
  return this.inflection(string, 'none');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.one = function(string) {
  return this.inflection(string, 'one');
};

/**
 * @param {String} string
 * @api public
 */

Text.prototype.other = function(string) {
  return this.inflection(string, 'other');
};

/**
 * @param {String} string
 * @param {String} count
 * @param {String} tense
 * @api public
 */

Text.prototype.inflection = function(string, count, tense) {
  // this isn't quite correct...
  this.inflections.push(context.inflection = {
      string: string
    , count: count == null ? 'all' : count
    , tense: tense || 'present'
  });

  return this;
};

/**
 * This could be a view on the client.
 *
 * @param {Object} options
 * @api public
 */

Text.prototype.render = function(options) {
  options || (options = {});

  var count = (options.count ? (options.count == 1 ? 'one' : 'other') : 'none')
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

  return mm(inflection.string, options);
}