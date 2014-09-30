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
  assert(files['real.html'].contents, 'HI', 'Simple template');
  assert(files['feed.xml'].contents, 'HI', 'content_template opt-in');
  
  // Make sure non-HTML / MD is ignored
  assert(files['bogus.jpg'].contents, '{{{ Hi | upper }}', 'Ignore .jpg');

  console.log('All tests passed');
});
