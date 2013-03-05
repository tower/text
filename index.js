
/**
 * Module dependencies.
 */

var mm = require('minstache');

/**
 * Expose `text`.
 */

module.exports = text;

function text(name) {
  return text[name] || (text[name] = new Text(name))
}

text.Text = Text;

/**
 * Text (for I18n).
 *
 * text('messages')
 */

function Text(name) {
  this.name = name
  this.inflections = [];
}

Text.prototype.past = function(string) {
  return this.inflection(string, context.inflection.count, 'past');
};

Text.prototype.present = function(string) {
  return this.inflection(string, context.inflection.count, 'present');
};

Text.prototype.future = function(string) {
  return this.inflection(string, context.inflection.count, 'future');
};

// may reverse the tense/count args.
Text.prototype.tense = function(string, tense, count) {
  return this.inflection(string, count, tense);
}

Text.prototype.none = function(string) {
  return this.inflection(string, 'none');
};

Text.prototype.one = function(string) {
  return this.inflection(string, 'one');
};

Text.prototype.other = function(string) {
  return this.inflection(string, 'other');
};

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
 */

Text.prototype.render = function(options) {
  options || (options = {});

  var count = (options.count ? (options.count == 1 ? 'one' : 'other') : 'none')
    , tense = options.tense || 'present'
    , key = tense + '.' + count
    , inflections = this.inflections
    , inflection = inflections[0]
    , i = 0
    , n = inflections.length
    , currScore = 0
    , prevScore = 0;

  for (i; i < n; i++) {
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