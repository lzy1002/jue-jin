import React from "react";

import "./Refresh.styl";

class Refresh extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="refresh-wrapper">
        <div className="icon-box">
          <i className="iconfont icon-shuaxin"></i>
        </div>
      </div>
    )
  }

}

export default Refresh;
