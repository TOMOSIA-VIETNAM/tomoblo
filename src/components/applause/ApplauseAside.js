import React from "react";
import 'applause-button';
import 'applause-button/dist/applause-button.css';
import "./applause_aside.scss"

const siteConfig = require("../../../config")

const ApplauseAside = ({ width, height, onMobile }) => {
  const classNameParent = onMobile == 'true' ? 'applause-foot' : 'applause-aside'
  const disabledClap = 'disabled-clap'
  const gitToken = localStorage.getItem('GT_ACCESS_TOKEN')

  const authorizeClap = () => {
    if (gitToken) return;

    const host = 'https://github.com/login/oauth/authorize'
    const client_id = `?client_id=${siteConfig.gitalk.clientID}`
    const redirect_uri = `&redirect_uri=${window.location.href}`
    const scope = '&scope=public_repo'
    window.location.replace(host + client_id + redirect_uri + scope)
  }
  return (
    <div className={classNameParent} onClickCapture={authorizeClap}>
      <applause-button style={{ width: width, height: height }} class={gitToken ? '' : disabledClap} />
    </div>
  );
};

ApplauseAside.defaultProps = {
  width: '60px',
  height: '60px'
}

export default ApplauseAside;
