import React from "react";
import propTypes from "prop-types";
import {withRouter} from "react-router-dom";

import "./RelatedItem.styl";

import {publishDate} from "../../../assets/js/utils.js";

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

  handleArticleItemClick(articleItemData) {
    this.props.history.replace(`/article/${articleItemData.id || articleItemData.objectId}`);
  }

  render() {
    return (
      <div className="related-wrapper border-1px" onClick={this.handleArticleItemClick.bind(this, this.props.relatedItemData)}>
        <h3 className="related-title">{this.props.relatedItemData.title}</h3>
        <p className="related-info">
          <span>{this.props.relatedItemData.likeCount || this.props.relatedItemData.collectionCount}赞 · {this.props.relatedItemData.user.username} · {publishDate(this.props.relatedItemData.createdAt)}</span>
        </p>
      </div>
    )
  }

}

export default withRouter(RelatedItem);
