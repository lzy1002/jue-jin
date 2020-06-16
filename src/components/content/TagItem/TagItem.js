import React from "react";
import propTypes from "prop-types";

import "./TagItem.styl";

class TagItem extends React.Component {
  static defaultProps = {
    tagItemData: {}
  };

  static propTypes = {
    tagItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="tagItem-wrapper border-1px">
        <div className="img-box" style={{backgroundImage: `url(${this.props.tagItemData.icon})`}}></div>
        <div className="content">
          <p className="title">{this.props.tagItemData.title}</p>
          <p className="info">
            <span>{this.props.tagItemData.subscribersCount}人关注</span>
            <span> · </span>
            <span>{this.props.tagItemData.entryCount}篇文章</span>
          </p>
        </div>
        <div className="follow-btn">
          <i className="iconfont icon-Add1"></i>
          <span>关注</span>
        </div>
      </div>
    )
  }

}

export default TagItem;
