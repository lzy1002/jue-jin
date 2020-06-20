import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "./UserBox.styl";

import {UserCls} from "../../../assets/js/class.js";
import {publishDate, levelIcon, defaultAvatar} from "../../../assets/js/utils.js";

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

  handleUserBoxClick(e, userData) {
    if(this.props.location.pathname.startsWith("/user")) {
      if((userData.id || userData.objectId) === this.props.match.params.userId) {
        e.stopPropagation();
        return;
      }
    }
    this.props.history.push(`/user/${userData.id || userData.objectId}`);
    e.stopPropagation();
  }

  handleFollowBtnClick(userData) {
    const user = new UserCls(userData);
    this.props.changeUserFollowingState(user);
  }

  userIsActive(objectId) {
    const index = this.props.userFollowingList.findIndex(item => item.user.objectId === objectId);
    return index !== -1;
  }

  render() {
    return (
      <div className="userBox-wrapper" onClick={e => this.handleUserBoxClick.call(this, e, this.props.userData)}>
        <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.props.userData.avatarLarge)})`}}></div>
        <div className="content-box">
          <p className="username">
            <span>{this.props.userData.username}</span>
            {this.props.userData.level && this.props.userData.level !== 0 ?
              <img src={levelIcon(this.props.userData.level)} alt=""/>
            : undefined}
          </p>
          <p className="info">
            {this.props.userData.jobTitle ?
              <span>{this.props.userData.jobTitle}</span>
              : undefined}
            {this.props.userData.jobTitle && this.props.userData.company ?
              <span> @ </span>
              : undefined}
            {this.props.userData.company ?
              <span>{this.props.userData.company}</span>
            : undefined}
            {this.props.userData.jobTitle && this.props.createdAt || this.props.userData.company && this.props.createdAt ?
              <span> · </span>
            : undefined}
            {this.props.createdAt ?
              <span>{publishDate(this.props.createdAt)}</span>
            : undefined}
          </p>
        </div>
        <FollowBtn isFollow={this.userIsActive.call(this, this.props.userData.id || this.props.userData.objectId)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.userData)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}), {...actionCreator.profile})(withRouter(UserBox));
