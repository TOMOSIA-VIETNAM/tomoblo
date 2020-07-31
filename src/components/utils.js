const siteConfig = require("../../config")

export function add_target_blank() {
  if (!window) return;

  window.addEventListener("load", function () {
    let links = document.getElementsByTagName('a');
    let len = links.length;
    for (let i = 0; i < len; i++) {
      if (links[i].href.startsWith(siteConfig.host) || links[i].href.startsWith(siteConfig.localhost)) continue;
      links[i].target = "_blank";
    }
  });
}
