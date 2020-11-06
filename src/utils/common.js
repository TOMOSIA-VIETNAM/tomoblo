const siteConfig = require("../../config")

export function addTargetBlank() {
  if (typeof window == `undefined`) return;

  window.addEventListener("load", function () {
    let links = document.getElementsByTagName('a');
    let len = links.length;
    for (let i = 0; i < len; i++) {
      if (links[i].href.startsWith(siteConfig.host) || links[i].href.startsWith(siteConfig.localhost)) continue;
      links[i].target = "_blank";
    }
  });
}

export function excerpt(post) {
  let date = post.node.frontmatter.date;

  if (!date) return post.node.excerpt;

  let segments = date.split('-')
  let day = segments[0];
  let month = segments[1];
  let year = segments[2];
  let date_pass = Date.parse(`${year}-${month}-${day}`);
  let date_future = Date.parse('2020-09-07');
  if (date_pass <= date_future) {
    return post.node.excerpt;
  } else {
    return post.node.snippet;
  }
}
