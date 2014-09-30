# metalsmith-template-content

Use the template language of your choice within the content of an article

## Usage

```js
var content_templates = require('metalsmith-content-templates');

metalsmith.use({
  engine: 'swig'
});
```

Runs automatically on `.html` and `.md` files. To add to other files, set `content_template` within the frontmatter.
