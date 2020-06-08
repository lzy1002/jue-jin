import React from "react";
import propTypes from "prop-types";

import "./User.styl";

class User extends React.Component {
  static defaultProps = {
    userData: {}
  };

  static propTypes = {
    userData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  levelIcon(level) {
    switch (level) {
      case 1: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-1.636691c.svg";
      case 2: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg";
      case 3: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-3.e108c68.svg";
      case 4: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-4.2c3fafd.svg";
      case 5: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-5.f8d5198.svg";
      case 6: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-6.74bd93a.svg";
    }
  }

  render() {
    return (
      <div className="user-wrapper">
        <div className="avatar-box">
          <img src={this.props.userData.avatarLarge} alt=""/>
        </div>
        <div className="content-box">
          <p className="username">
            <span>{this.props.userData.username}</span>
            <img src={this.levelIcon(this.props.userData.level)} alt=""/>
          </p>
          <p className="info">
            <span>{this.props.userData.jobTitle}</span>
            {this.props.userData.jobTitle && this.props.userData.company ?
              <span> @ </span>
              : undefined}
            <span>{this.props.userData.company}</span>
          </p>
        </div>
        <div className="follow-btn">
          <i className="iconfont icon-Add1"></i>
          <span>关注</span>
        </div>
      </div>
    )
  }

}

export default User;
