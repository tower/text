# Tower Text

I18n, inflections, and other random bits of text to keep organized.

## Installation

node.js:

```bash
$ npm install tower-text
```

browser:

```bash
$ component install tower/text
```

## Example

```js
var text = require('tower-text');

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

assert(9 === text('messages').inflections.length);

// 1
assert('You have 1 message' === text('messages').render({ count: 1 }));
assert('You had 1 message' === text('messages').render({ tense: 'past', count: 1 }));
assert('You might get a message' === text('messages').render({ tense: 'future', count: 1 }));

// 0
assert('You have no messages' === text('messages').render({ count: 0 }));
assert('You never had any messages' === text('messages').render({ tense: 'past', count: 0 }));
assert('You might never get a message' === text('messages').render({ tense: 'future', count: 0 }));

// n
assert('You have 3 messages' === text('messages').render({ count: 3 }));
assert('You had 3 messages' === text('messages').render({ tense: 'past', count: 3 }));
assert('You might get 3 messages' === text('messages').render({ tense: 'future', count: 3 }));
```

Another module, orthography?

## Testing

Install testem:

```bash
$ npm install -g testem
```

Run tests:

```bash
$ testem
```

Then, open all the browsers you want to test by going to the outputted url defaulted to [http://localhost:7357](http://localhost:7357)

Tests will run on any open browser linked to the stated url and your current Node environment.

## Contributing

Before you send a pull request, make sure your code meets the style guidelines at [https://github.com/tower/style-guide](https://github.com/tower/style-guide) and all tests pass.

## License

MIT