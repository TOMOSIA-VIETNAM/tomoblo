import React from "react";
import { getLocalStorage, getPathUrl, redirectTo } from '../../utils/browser'
import "./applause_aside.scss"

const siteConfig = require("../../../config")

const ApplauseAside = ({ width, height, onMobile }) => {
  const classNameParent = onMobile === 'true' ? 'applause-foot' : 'applause-aside'
  const gitToken = getLocalStorage('GT_ACCESS_TOKEN') ? true : false;

  const authorizeClap = () => {
    console.log("gitToken: " + gitToken)
    if (gitToken) return;

    const host = 'https://github.com/login/oauth/authorize'
    const client_id = `?client_id=${siteConfig.gitalk.clientID}`
    const redirect_uri = `&redirect_uri=${getPathUrl()}`
    const scope = '&scope=public_repo'
    const url = host + client_id + redirect_uri + scope
    redirectTo(url)
  }

  return (
    <div className={classNameParent} onClickCapture={authorizeClap}>
      <applause-button style={{ width: width, height: height }} class={gitToken ? '' : 'disabled-clap'} />
    </div>
  );
};

ApplauseAside.defaultProps = {
  width: '60px',
  height: '60px'
}

export default ApplauseAside;
