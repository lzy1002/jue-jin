import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./UserItem.styl";

import {levelIcon} from "../../../assets/js/utils.js";

class UserItem extends React.Component {
  static defaultProps = {
    userItemData: {}
  };

  static propTypes = {
    userItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleUserItemClick(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
      <div className="userItem-wrapper border-1px" onClick={this.handleUserItemClick.bind(this, this.props.userItemData.user.id)}>
        <div className="avatar-box" style={{backgroundImage: `url(${this.props.userItemData.user.avatarLarge})`}}></div>
        <div className="content">
          <p className="username">
            <span>{this.props.userItemData.user.username}</span>
            <img src={levelIcon(this.props.userItemData.user.level)} alt=""/>
          </p>
          {this.props.userItemData.title ? <p className="desc">{this.props.userItemData.title}</p> : undefined}
          {this.props.userItemData.info ? <p className="info">{this.props.userItemData.info}</p> : undefined}
        </div>
        <div className="follow-btn" onClick={e => e.stopPropagation()}>
          <i className="iconfont icon-Add1"></i>
          <span>关注</span>
        </div>
      </div>
    )
  }

}

export default withRouter(UserItem);
