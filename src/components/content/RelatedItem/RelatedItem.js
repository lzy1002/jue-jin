import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./RelatedItem.styl";

class RelatedItem extends React.Component {
  static defaultProps = {
    relatedItemData: {}
  };

  static propTypes = {
    relatedItemData: propTypes.object
  };

  constructor(props) {
    super(props);

  }

  getPublishData(createdAt) {
    const createDate = new Date(createdAt).getTime();
    const nowDate = new Date().getTime();
    const publishDate = nowDate - createDate;
    const hour = publishDate / 1000 / 60 / 60;
    if(hour >= 24) {
      return Math.floor(hour / 24) + "天前";
    }

    return Math.floor(hour) + "小时前";
  }

  handleArticleItemClick(articleItemData) {
    this.props.history.push(`/article/${articleItemData.id || articleItemData.objectId}`);
  }

  render() {
    return (
      <div className="related-wrapper border-1px" onClick={this.handleArticleItemClick.bind(this, this.props.relatedItemData)}>
        <h3 className="related-title">{this.props.relatedItemData.title}</h3>
        <p className="related-info">
          <span>{this.props.relatedItemData.likeCount || this.props.relatedItemData.collectionCount}赞 · {this.props.relatedItemData.user.username} · {this.getPublishData.call(this, this.props.relatedItemData.createdAt)}</span>
        </p>
      </div>
    )
  }

}

export default withRouter(RelatedItem);
