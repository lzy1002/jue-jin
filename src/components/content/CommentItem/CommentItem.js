import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./CommentItem.styl";

import {publishDate, levelIcon} from "../../../assets/js/utils.js";

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

  handleAvatarBoxClick(commentItemData) {
    this.props.history.push(`/user/${commentItemData.userInfo.objectId}`);
  }

  render() {
    return (
      <div className="commentItem-wrapper border-1px">
        <div className="commentItem-header">
          <div className="user-box">
            <div className="avatar-box" onClick={this.handleAvatarBoxClick.bind(this, this.props.commentItemData)}>
              <img src={this.props.commentItemData.userInfo.avatarLarge} alt=""/>
            </div>
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
            <div className="like">
              <i className="iconfont icon-dianzan"></i>
              <span className="count">{this.props.commentItemData.likesCount}</span>
            </div>
            <div className="comment">
              <i className="iconfont icon-pinglun"></i>
            </div>
          </div>
        </div>

        <div className="commentItem-content">
          <p className="user-comment">{this.props.commentItemData.content}</p>
          {this.props.commentItemData.topComment.length ?
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

export default withRouter(CommentItem);
