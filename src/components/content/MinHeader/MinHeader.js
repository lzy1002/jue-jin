import React from "react";
import propTypes from "prop-types";

import "./MinHeader.styl";

class MinHeader extends React.Component {
  static defaultProps = {
    title: "",
    handleBackClick: () => {}
  };

  static propTypes = {
    title: propTypes.string,
    handleBackClick: propTypes.func
  };

  constructor(props) {
    super(props);

  }

  handleBackClick() {
    this.props.handleBackClick();
  }

  render() {
    return (
      <div className="minHeader-wrapper">
        <div className="back" onClick={this.handleBackClick.bind(this)}>
          <i className="iconfont icon-fanhui"></i>
        </div>
        <div className="content">
          {this.props.title}
        </div>
        <div className="more">
          <i className="iconfont icon-unie644"></i>
        </div>
      </div>
    )
  }

}

export default MinHeader;
