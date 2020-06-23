const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/pages/404.js"))),
  "component---src-pages-about-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/pages/about.js"))),
  "component---src-pages-archive-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/pages/archive.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/pages/index.js"))),
  "component---src-templates-blog-post-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/templates/blog-post.js"))),
  "component---src-templates-tag-js": hot(preferDefault(require("/Users/admin/Project/tomoblo/src/templates/tag.js")))
}

