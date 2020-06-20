import React from "react";

import "./More.styl";

class More extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="userMore-wrapper">
        <div className="more-box">
          <div className="more-item border-1px">
            赞过的文章
          </div>
          <div className="more-item border-1px">
            关注的标签
          </div>
        </div>
      </div>
    )
  }

}

export default More;
