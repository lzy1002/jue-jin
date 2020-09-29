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
    createdAt: 0
  };

  static propTypes = {
    userData: propTypes.object,
    createdAt: propTypes.number
  };

  constructor(props) {
    super(props);

  }

  handleUserBoxClick(e, userData) {
    if(this.props.location.pathname.startsWith("/user")) {
      if(userData.user_id === this.props.match.params.userId) {
        e.stopPropagation();
        return;
      }
    }
    this.props.history.push(`/user/${userData.user_id}`);
    e.stopPropagation();
  }

  handleFollowBtnClick(userData) {
    const user = new UserCls(userData);
    this.props.changeUserFollowingState(user);
  }

  userIsActive(userId) {
    const index = this.props.userFollowingList.findIndex(item => item.user_id === userId);
    return index !== -1;
  }

  render() {
    return (
      <div className="userBox-wrapper" onClick={e => this.handleUserBoxClick.call(this, e, this.props.userData)}>
        <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.props.userData.avatar_large)})`}}></div>
        <div className="content-box">
          <p className="username">
            <span>{this.props.userData.user_name}</span>
            {this.props.userData.level && this.props.userData.level !== 0 ?
              <img src={levelIcon(this.props.userData.level)} alt=""/>
            : undefined}
          </p>
          <p className="info">
            {this.props.userData.job_title ?
              <span>{this.props.userData.job_title}</span>
              : undefined}
            {this.props.userData.job_title && this.props.userData.company ?
              <span> @ </span>
              : undefined}
            {this.props.userData.company ?
              <span>{this.props.userData.company}</span>
            : undefined}
            {this.props.userData.job_title && this.props.createdAt || this.props.userData.company && this.props.createdAt ?
              <span> · </span>
            : undefined}
            {this.props.createdAt ?
              <span>{publishDate(this.props.createdAt)}</span>
            : undefined}
          </p>
        </div>
        <FollowBtn isFollow={this.userIsActive.call(this, this.props.userData.user_id)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.userData)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}), {...actionCreator.profile})(withRouter(UserBox));
