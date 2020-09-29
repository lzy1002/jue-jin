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
        <div className="avatar-box" onClick={this.handleAvatarBoxClick.bind(this, this.props.followedItemData.target_data.user_id)} style={{backgroundImage: `url(${defaultAvatar(this.props.followedItemData.target_data.avatar_large)})`}}></div>
        <div className="content">
          <p className="content-top">
            <span className="actor">{this.props.followedItemData.user.user_name}</span>
            <span className="text">关注了</span>
            <span className="user">
              <span className="name">{this.props.followedItemData.target_data.user_name}</span>
              {this.props.followedItemData.target_data.level && this.props.followedItemData.target_data.level !== 0 ?
                <img src={levelIcon(this.props.followedItemData.target_data.level)} alt=""/>
              : undefined}
            </span>
          </p>
          {this.props.followedItemData.target_data.job_title ?
            <p className="jobTitle">{this.props.followedItemData.target_data.job_title}</p>
          : undefined}
        </div>
      </div>
    )
  }

}

export default withRouter(FollowedItem);
