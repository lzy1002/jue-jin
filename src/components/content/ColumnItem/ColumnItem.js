import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./ColumnItem.styl";

import {levelIcon} from "../../../assets/js/utils.js";

class ColumnItem extends React.Component {
  static defaultProps = {
    columnItemData: {}
  };

  static propTypes = {
    columnItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleColumnItemClick(columnItemData) {
    this.props.history.push(`/article/${columnItemData.objectId}`);
  }

  handleAvatarBoxClick(e, columnItemData) {
    this.props.history.push(`/user/${columnItemData.user.objectId}`);
    e.stopPropagation();
  }

  render() {
    return (
      <div className="columnItem-wrapper" onClick={this.handleColumnItemClick.bind(this, this.props.columnItemData)}>
        <div className="columnItem-header">
          <div className="user-box">
            <div className="avatar-box" onClick={e => this.handleAvatarBoxClick.call(this, e, this.props.columnItemData)}>
              <img src={this.props.columnItemData.user.avatarLarge} alt=""/>
            </div>
            <div className="user-info">
              <p className="username">
                <span>{this.props.columnItemData.user.username}</span>
                <img src={levelIcon(this.props.columnItemData.user.level)} alt=""/>
              </p>
              <p className="post">
                <span className="job-title">{this.props.columnItemData.user.jobTitle}</span>
                {this.props.columnItemData.user.jobTitle && this.props.columnItemData.user.company ? <span>@</span> : undefined}
                <span className="company">{this.props.columnItemData.user.company}</span>
              </p>
            </div>
            <div className="follow-btn"><i className="iconfont icon-Add1"></i><span className="text">关注</span></div>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>
        <div className="columnItem-content border-1px">
          <div className="title-box">
            <span className="tag">专栏</span>
            {this.props.columnItemData.title}
          </div>
          <div className="content">
            <div className="text">
              {this.props.columnItemData.content}
            </div>
            {this.props.columnItemData.screenshot ?
              <div className="img-box" style={{backgroundImage: `url(${this.props.columnItemData.screenshot})`}}></div>
              : undefined}
          </div>
        </div>
        <div className="columnItem-footer">
          <div className="footer-item">
            <i className="iconfont icon-dianzan"></i>
            <span>点赞</span>
          </div>
          <div className="footer-item">
            <i className="iconfont icon-pinglun"></i>
            <span>{this.props.columnItemData.commentsCount}</span>
          </div>
          <div className="footer-item">
            <i className="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(ColumnItem);
