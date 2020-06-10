import React from "react";
import propTypes from "prop-types";

import "./FollowedItem.styl";

import {levelIcon} from "../../../assets/js/utils.js";

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

  render() {
    return (
      <div className="followed-wrapper">
        <div className="avatar-box">
          <img src="" alt=""/>
        </div>
        <div className="content">
          <p className="content-top">
            <span className="actor">{this.props.followedItemData.actor.username}</span>
            <span className="text">关注了</span>
            <span className="user">
              <span className="name">{this.props.followedItemData.user.username}</span>
              <img src={levelIcon(this.props.followedItemData.user.level)} alt=""/>
            </span>
          </p>
          <p className="jobTitle">{this.props.followedItemData.actor.jobTitle}</p>
        </div>
      </div>
    )
  }

}

export default FollowedItem;
