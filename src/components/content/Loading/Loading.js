import React from "react";

import "./Loading.styl";

const loading = require("../../../assets/images/loading.6e26d656.gif");

class Loading extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="loading-wrapper">
        <div className="icon-box">
          <img src={loading} alt=""/>
        </div>
      </div>
    )
  }

}

export default Loading;
