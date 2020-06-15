import React from "react";
import propTypes from "prop-types";

import "./LoginTip.styl";

class LoginTip extends React.Component {
  static defaultProps = {
    tipText: "关注的人发布的文章会出现在这里"
  };

  static propTypes = {
    tipText: propTypes.string
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="loginTip-wrapper">
        <i className="iconfont icon-yonghu"></i>
        <p className="tip">{this.props.tipText}</p>
        <div className="login-btn">登录/注册</div>
      </div>
    )
  }

}

export default LoginTip;
