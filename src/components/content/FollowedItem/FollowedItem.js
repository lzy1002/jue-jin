import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./FollowedItem.styl";

import {levelIcon, defaultAvatar} from "../../../assets/js/utils.js";

class FollowedItem extends React.Component {
  static defaultProps = {
    followedItemData: {}
  };

  static propTypes = {
    followedItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleAvatarBoxClick(userId) {
    this.props.history.push(`/user/${userId}`);
  }

  render() {
    return (
      <div className="followed-wrapper">
        <div className="avatar-box" onClick={this.handleAvatarBoxClick.bind(this, this.props.followedItemData.user.id)} style={{backgroundImage: `url(${defaultAvatar(this.props.followedItemData.user.avatarLarge)})`}}></div>
        <div className="content">
          <p className="content-top">
            <span className="actor">{this.props.followedItemData.actor.username}</span>
            <span className="text">关注了</span>
            <span className="user">
              <span className="name">{this.props.followedItemData.user.username}</span>
              {this.props.followedItemData.user.level && this.props.followedItemData.user.level !== 0 ?
                <img src={levelIcon(this.props.followedItemData.user.level)} alt=""/>
              : undefined}
            </span>
          </p>
          {this.props.followedItemData.user.jobTitle ?
            <p className="jobTitle">{this.props.followedItemData.user.jobTitle}</p>
          : undefined}
        </div>
      </div>
    )
  }

}

export default withRouter(FollowedItem);
