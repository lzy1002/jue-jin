import React from "react";
import propTypes from "prop-types";

import "./ColumnItem.styl";

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

  levelIcon(level) {
    switch (level) {
      case 1: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-1.636691c.svg";
      case 2: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg";
      case 3: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-3.e108c68.svg";
      case 4: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-4.2c3fafd.svg";
      case 5: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-5.f8d5198.svg";
      case 6: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-6.74bd93a.svg";
    }
  }

  render() {
    return (
      <div className="columnItem-wrapper">
        <div className="columnItem-header">
          <div className="user-box">
            <div className="avatar-box">
              <img src={this.props.columnItemData.user.avatarLarge} alt=""/>
            </div>
            <div className="user-info">
              <p className="username">
                <span>{this.props.columnItemData.user.username}</span>
                <img src={this.levelIcon(this.props.columnItemData.user.level)} alt=""/>
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

export default ColumnItem;
