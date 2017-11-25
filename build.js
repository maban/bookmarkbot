var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

Metalsmith(__dirname)
.metadata({
  title: 'Bookmarks',
  description: 'Interesting links from around the world wide web',
})
.source('./src')
.destination('./build')
.clean(false)
.use(markdown())
.use(permalinks())
.use(collections({
  bookmarks: {
    pattern: 'bookmarks/**',
  },
}))
.use(layouts({
  engine: 'handlebars',
}))
.build(function (err, files) {
  if (err) { throw err; }
});
