import React from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./ShareItem.styl";

import {publishDate} from "../../../assets/js/utils.js";

class ShareItem extends React.Component {
  static defaultProps = {
    shareItemData: {}
  };

  static propTypes = {
    shareItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  handleShareItemClick(shareItemData) {
    this.props.history.push(`/article/${shareItemData.objectId || shareItemData.id}`);
  }

  render() {
    return (
      <div className="shareItem-wrapper border-1px" onClick={this.handleShareItemClick.bind(this, this.props.shareItemData)}>
        <div className="shareItem-content">
          <h3 className="title">{this.props.shareItemData.title}</h3>
          <p className="info">
            <span>{this.props.shareItemData.collectionCount}人赞</span>
            <span> · </span>
            <span>{this.props.shareItemData.user.username}</span>
            <span> · </span>
            <span>{publishDate(this.props.shareItemData.createdAt)}</span>
          </p>
        </div>
        {this.props.shareItemData.screenshot ?
          <div className="image-box" style={{backgroundImage: `url(${this.props.shareItemData.screenshot})`}}></div>
        : undefined}
      </div>
    )
  }

}

export default withRouter(ShareItem);
