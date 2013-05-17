var text = 'undefined' == typeof window
    ? require('..')
    : require('tower-inflector')
  , assert = require('assert');

describe('serverTest', function(){
  it('should define', function(){
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
  })

  it('should have sensible defaults if some tense/count is missing', function(){

  })
});