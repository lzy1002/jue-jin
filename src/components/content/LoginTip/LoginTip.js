import React from "react";

import "./LoginTip.styl";

class LoginTip extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="loginTip-wrapper">
        <i className="iconfont icon-yonghu"></i>
        <p className="tip">关注的人发布的文章会出现在这里</p>
        <div className="login-btn">登录/注册</div>
      </div>
    )
  }

}

export default LoginTip;
