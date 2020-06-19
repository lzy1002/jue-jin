import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import "./Thumbed.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import MinHeader from "../../../../components/content/MinHeader/MinHeader.js";
import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";

class Thumbed extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.title = "我赞过的";
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="profileThumbed-wrapper">
        <MinHeader title={this.title} handleBackClick={this.handleBackClick.bind(this)}/>

        <div className="thumbed-content">
          <Scroll>
            {this.props.articleThumbList.map((item, index) => (
              <ShareItem key={index} shareItemData={item}/>
            ))}
          </Scroll>

        </div>

      </div>
    )
  }

}

export default connect(state => ({...state.profile.articleThumb}))(withRouter(Thumbed));
