import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./UserItem.styl";

import {levelIcon} from "../../../assets/js/utils.js";
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
    console.log(userData);
    const user = new UserCls(userData);
    this.props.changeUserFollowingState(user);
  }

  userIsActive(objectId) {
    const index = this.props.userFollowingList.findIndex(item => item.user.objectId === objectId);
    return index !== -1;
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
        <FollowBtn isFollow={this.userIsActive.call(this, this.props.userItemData.user.id)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.props.userItemData.user)}/>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}), {...actionCreator.profile})(withRouter(UserItem));
