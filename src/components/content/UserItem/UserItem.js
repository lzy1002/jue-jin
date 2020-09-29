import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./UserItem.styl";

import {levelIcon, defaultAvatar} from "../../../assets/js/utils.js";
import {UserCls} from "../../../assets/js/class.js";

import actionCreator from "../../../store/actionCreator/index.js";

import FollowBtn from "../../../components/content/FollowBtn/FollowBtn.js";

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
      <div className="userItem-wrapper border-1px" onClick={this.handleUserItemClick.bind(this, this.props.userItemData.user_id)}>
        <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.props.userItemData.avatar_large)})`}}></div>
        <div className="content">
          <p className="username">
            <span>{this.props.userItemData.user_name}</span>
            {this.props.userItemData.level ?
              <img src={levelIcon(this.props.userItemData.level)} alt=""/>
            : undefined}
          </p>
          {this.props.userItemData.job_title ? <p className="job">{this.props.userItemData.job_title}</p> : undefined}
          {this.props.userItemData.company ? <p className="company">{this.props.userItemData.company}</p> : undefined}
        </div>
        <FollowBtn isFollow={this.userIsActive.call(this, this.props.userItemData.user_id)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.userItemData)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}), {...actionCreator.profile})(withRouter(UserItem));
