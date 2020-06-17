import React from "react";
import propTypes from "prop-types";

import "./SectionItem.styl";

class SectionItem extends React.Component {
  static defaultProps = {
    sectionItemData: {},
    num: -1
  };

  static propTypes = {
    sectionItemData: propTypes.object,
    num: propTypes.number
  };

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="sectionItem-wrapper border-1px">
        <div className="num">
          {this.props.num}
        </div>
        <div className="content">
          <h3 className="title">{this.props.sectionItemData.title}</h3>
          <p className="info">
            <span>{this.props.sectionItemData.pv}次学习</span>
            <span>{this.props.sectionItemData.commentCount || 0}条评论</span>
          </p>
        </div>
      </div>
    )
  }

}

export default SectionItem;
