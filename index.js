var async = require('async'),
    consolidate = require('consolidate'),
    extend = require('extend'),
    path = require('path');

/**
 * @param {!Object} data
 * @param {!Metalsmith} metalsmith
 * @param {!Object} options
 * @param {!Function} callback
 */
var renderArticle = function(data, metalsmith, options, callback) {
  consolidate[options.engine].render(
    data.contents.toString(),
    extend({}, options, metalsmith.metadata(), data),
    function(error, result) {
      if (error) {
        return callback(error);
      }

      data.contents = result;
      callback();
    }
  );
};

module.exports = function(options) {
  if (!options || !options.engine) {
    throw new Error('Must specify engine');
  }

  if (!(options.engine in consolidate)) {
    throw new Error('Invalid engine name: ' + options.engine);
  }

  /**
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done) {
    var articles = Object.keys(files).filter(function(file) {
          // Only operate on HTML or Markdown
          return /\.(html|md)$/.test(path.extname(file)) ||
                 files[file].content_template;
        });

    async.each(articles, function(file, callback) {
      renderArticle(files[file], metalsmith, options, callback);
    }, done);
  };
};
