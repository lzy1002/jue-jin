import React from "react";
import propTypes from "prop-types";

import "./FollowBtn.styl";

class FollowBtn extends React.Component {
  static defaultProps = {
    isFollow: false,
    handleFollowBtnClick: () => {}
  };

  static propTypes = {
    isFollow: propTypes.bool,
    handleFollowBtnClick: propTypes.func
  };

  constructor(props) {
    super(props);

  }

  handleBtnClick(e) {
    this.props.handleFollowBtnClick();
    e.stopPropagation();
  }

  render() {
    return (
      <div className={`followBtn-wrapper ${this.props.isFollow ? "following" : ""}`} onClick={e => this.handleBtnClick.call(this, e)}>
        <i className="iconfont icon-Add1"></i>
        <span className="text">{this.props.isFollow ? "已关注" : "关注"}</span>
      </div>
    )
  }

}

export default FollowBtn;
