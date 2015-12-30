var assert = require('assert');

var plugin = require('./index')({engine: 'swig'});

var files = {
      'bogus.jpg': {
        contents: new Buffer('{{ "Hi" | upper }}')
      },
      'feed.xml': {
        content_template: true,
        contents: new Buffer('{{ "Hi" | upper }}')
      },
      'real.html': {
        contents: new Buffer('{{ "Hi" | upper }}')
      }
    },
    metalsmith = {
      metadata: function() {
        return {
          foo: 'bar'
        };
      }
    };

plugin(files, metalsmith, function(error) {
  if (error) {
    throw error;
  }

  assert.equal(files['real.html'].contents.toString(), 'HI',
    'Simple template');
  assert.equal(files['feed.xml'].contents.toString(), 'HI',
    'content_template opt-in');

  // Make sure non-HTML / MD is ignored
  assert.equal(files['bogus.jpg'].contents.toString(), '{{ "Hi" | upper }}',
    'Ignore .jpg');

  console.log('All tests passed');
});
