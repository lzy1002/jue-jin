import React from "react";

import "./Follow.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import LoginTip from "../../../../components/content/LoginTip/LoginTip.js";

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.tipText = "登录后可查看关注动态";
  }

  render() {
    return (
      <div className="pinsFollow-wrapper">
        <Scroll>
          <div className="loginTip-box">
            <LoginTip tipText={this.tipText}/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default Follow;
