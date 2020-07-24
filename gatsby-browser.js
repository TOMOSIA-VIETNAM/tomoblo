/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
require('prismjs/plugins/line-numbers/prism-line-numbers.css')
require('./src/templates/codeblock.css')
require('katex/dist/katex.min.css')
require('bootstrap/dist/css/bootstrap.min.css');


const addScript = url => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
}

export const onClientEntry = () => {
  window.onload = () => {
    addScript("https://unpkg.com/applause-button/dist/applause-button.js")
  }
}
