# Deprecated! Do not use!

[metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place) is a superset of this plugin and should be used instead.

# metalsmith-template-content

Use the template language of your choice within the content of an article

## Usage

```js
var template_contents = require('metalsmith-template-contents');

metalsmith.use({
  engine: 'swig'
});
```

Runs automatically on `.html` and `.md` files. To add to other files, set `content_template` within the frontmatter.

## Changelog

* 0.0.2: Fix issue due to post contents not being `Buffer`s.
* 0.0.1: First release

## Alternatives

* [metalsmith-in-place](https://github.com/superwolff/metalsmith-in-place): Has many more features, but was not around when this plugin was first created.
