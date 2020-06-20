import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./CommentItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import {publishDate, levelIcon, defaultAvatar} from "../../../assets/js/utils.js";

class CommentItem extends React.Component {
  static defaultProps = {
    commentItemData: {}
  };

  static propTypes = {
    commentItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleUserBoxClick(commentItemData) {
    this.props.history.push(`/user/${commentItemData.userInfo.objectId}`);
  }

  handleThumbClick(commentId) {
    this.props.changeCommentThumbState(commentId);
  }

  isThumb(objectId, thumbCount) {
    const index = this.props.commentThumbList.findIndex(item => item === objectId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      return thumbCount;
    }
  }

  thumbIsActive(objectId) {
    const index = this.props.commentThumbList.findIndex(item => item === objectId);
    return index !== -1;
  }

  render() {
    return (
      <div className="commentItem-wrapper border-1px">
        <div className="commentItem-header">
          <div className="user-box" onClick={this.handleUserBoxClick.bind(this, this.props.commentItemData)}>
            <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.props.commentItemData.userInfo.avatarLarge)})`}}></div>
            <div className="user-info">
              <p className="username">
                <span>{this.props.commentItemData.userInfo.username}</span>
                <img src={levelIcon(this.props.commentItemData.userInfo.level)} alt=""/>
              </p>
              <p className="job">
                {this.props.commentItemData.userInfo.jobTitle ?
                  <span>{this.props.commentItemData.userInfo.jobTitle} · </span>
                : undefined}
                <span>{publishDate(this.props.commentItemData.createdAt)}</span>
              </p>
            </div>
          </div>
          <div className="option-box">
            <div className={`like ${this.thumbIsActive.call(this, this.props.commentItemData.id) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.commentItemData.id)}>
              <i className={`iconfont ${this.thumbIsActive.call(this, this.props.commentItemData.id) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
              <span className="count">{this.isThumb.call(this, this.props.commentItemData.id, this.props.commentItemData.likesCount)}</span>
            </div>
            <div className="comment">
              <i className="iconfont icon-pinglun"></i>
            </div>
          </div>
        </div>

        <div className="commentItem-content">
          <p className="user-comment">{this.props.commentItemData.content}</p>
          {this.props.commentItemData.topComment && this.props.commentItemData.topComment.length ?
            <ul className="reply">
              {this.props.commentItemData.topComment.map((item, index) => (
                <li key={item.id} className="reply-item">
                  <span><span className="username">{item.userInfo.username}</span> {index !== 0 ? <span><span> 回复 </span><span className="username">{item.respUserInfo.username}</span></span> : undefined}: &nbsp;&nbsp;&nbsp;</span>
                  <span>{item.content}</span>
                </li>
              ))}
            </ul>
          : undefined}
        </div>

      </div>
    )
  }

}

export default connect(state => ({...state.profile.commentThumb}), {...actionCreator.profile})(withRouter(CommentItem));
