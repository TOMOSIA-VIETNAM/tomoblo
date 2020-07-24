/* eslint-disable import/first */
import React from "react";
if (typeof window !== `undefined`) require('applause-button');
import 'applause-button/dist/applause-button.css';
import "./applause_aside.scss"

const siteConfig = require("../../../config")

const ApplauseAside = ({ width, height, onMobile }) => {
  const classNameParent = onMobile == 'true' ? 'applause-foot' : 'applause-aside'
  const disabledClap = 'disabled-clap'
  const gitToken = localStorage.getItem('GT_ACCESS_TOKEN')

  const pathUrl = () => {
    if (typeof window !== `undefined`) {
      return window.location.href
    }
  }

  const redirect_to = (str) => {
    if (typeof window !== `undefined`) {
      return window.location.replace(str)
    }
  }

  const authorizeClap = () => {
    if (gitToken) return;

    const host = 'https://github.com/login/oauth/authorize'
    const client_id = `?client_id=${siteConfig.gitalk.clientID}`
    const redirect_uri = `&redirect_uri=${pathUrl()}`
    const scope = '&scope=public_repo'
    const url = host + client_id + redirect_uri + scope
    redirect_to(url)
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
