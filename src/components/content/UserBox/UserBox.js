import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./UserBox.styl";

import {levelIcon} from "../../../assets/js/utils.js";

class UserBox extends React.Component {
  static defaultProps = {
    userData: {},
    createdAt: ""
  };

  static propTypes = {
    userData: propTypes.object,
    createdAt: propTypes.string
  };

  constructor(props) {
    super(props);

  }

  handleAvatarBoxClick(userData) {
    this.props.history.push(`/user/${userData.objectId}`);
  }

  render() {
    return (
      <div className="userBox-wrapper">
        <div className="avatar-box" onClick={this.handleAvatarBoxClick.bind(this, this.props.userData)}>
          <img src={this.props.userData.avatarLarge} alt=""/>
        </div>
        <div className="content-box">
          <p className="username">
            <span>{this.props.userData.username}</span>
            <img src={levelIcon(this.props.userData.level)} alt=""/>
          </p>
          <p className="info">
            <span>{this.props.userData.jobTitle}</span>
            {this.props.userData.jobTitle && this.props.userData.company ?
              <span> @ </span>
              : undefined}
            <span>{this.props.userData.company}</span>
            {this.props.createdAt ?
              <span>
                <span> · </span>
                <span>{this.props.createdAt}</span>
              </span>
            : undefined}
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

export default withRouter(UserBox);
