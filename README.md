# Inflector

**0.4kb** minified and gzipped. Ultra tiny I18n.

## Example

``` js
var text = require('tower-inflector');

text('messages')
  .one('You have 1 message')
    .past('You had 1 message')
    .future('You might get a message')
  .none('You have no messages')
    .past('You never had any messages')
    .future('You might never get a message')
  .other('You have {{count}} messages')
    .past('You had {{count}} messages')
    .future('You might get {{count}} messages');

assert.equal(9, text('messages').inflections.length);

// 1
assert.equal('You have 1 message', text('messages').render({count: 1}));
assert.equal('You had 1 message', text('messages').render({tense: 'past', count: 1}));
assert.equal('You might get a message', text('messages').render({tense: 'future', count: 1}));

// 0
assert.equal('You have no messages', text('messages').render({count: 0}));
assert.equal('You never had any messages', text('messages').render({tense: 'past', count: 0}));
assert.equal('You might never get a message', text('messages').render({tense: 'future', count: 0}));

// n
assert.equal('You have 3 messages', text('messages').render({count: 3}));
assert.equal('You had 3 messages', text('messages').render({tense: 'past', count: 3}));
assert.equal('You might get 3 messages', text('messages').render({tense: 'future', count: 3}));
```

Another module, orthography?

## License

MIT