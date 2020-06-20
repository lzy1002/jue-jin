import React from "react";
import propTypes from "prop-types";

import "./LinkBox.styl";

class LinkBox extends React.Component {
  static defaultProps = {
    linkData: {}
  };

  static propTypes = {
    linkData: propTypes.object
  };

  constructor(props) {
    super(props);

    this.defaultLinkImg = "https://b-gold-cdn.xitu.io/v3/static/img/defaultThumb.023ed66.svg";
  }

  render() {
    return (
      <div className="linkBox-wrapper">
        <div className="content">
          <h3 className="linkBox-title">{this.props.linkData.urlTitle}</h3>
          <span className="path">juejin.im</span>
        </div>
        <div className="img" style={{backgroundImage: `url(${this.props.linkData.urlPic || this.defaultLinkImg})`}}></div>
      </div>
    )
  }

}

export default LinkBox;
