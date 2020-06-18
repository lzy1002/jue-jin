import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "./UserBox.styl";

import {UserCls} from "../../../assets/js/class.js";
import {levelIcon} from "../../../assets/js/utils.js";

import actionCreator from "../../../store/actionCreator/index.js";

import FollowBtn from "../../../components/content/FollowBtn/FollowBtn.js";

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

  handleAvatarBoxClick(e, userData) {
    this.props.history.push(`/user/${userData.id || userData.objectId}`);
    e.stopPropagation();
  }

  handleFollowBtnClick(userData) {
    console.log(userData);
    const user = new UserCls(userData);
    console.log(user);
    this.props.changeUserFollowingState(user);
  }

  userIsActive(objectId) {
    const index = this.props.userFollowingList.findIndex(item => item.user.objectId === objectId);
    return index !== -1;
  }

  render() {
    return (
      <div className="userBox-wrapper">
        <div className="avatar-box" onClick={e => this.handleAvatarBoxClick.call(this, e, this.props.userData)}>
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
            {this.props.userData.jobTitle || this.props.userData.company ?
              <span> · </span>
            : undefined}
            {this.props.createdAt ?
              <span>
                <span>{this.props.createdAt}</span>
              </span>
            : undefined}
          </p>
        </div>
        <FollowBtn isFollow={this.userIsActive.call(this, this.props.userData.id || this.props.userData.objectId)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.userData)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}), {...actionCreator.profile})(withRouter(UserBox));
