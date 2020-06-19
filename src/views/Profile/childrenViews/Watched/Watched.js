import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "./Watched.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import MinHeader from "../../../../components/content/MinHeader/MinHeader.js";
import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";

class Watched extends React.Component {
  constructor(props) {
    super(props);

    this.title = "阅读过的文章";
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="profileWatched-wrapper">
        <MinHeader title={this.title} handleBackClick={this.handleBackClick.bind(this)}/>
        <div className="watched-content">
          <Scroll>
            {this.props.articleHistoryList.map((item, index) => (
              <ShareItem key={index} shareItemData={item}/>
            ))}
          </Scroll>
        </div>

      </div>
    )
  }

}

export default connect(state => ({...state.profile.articleHistory}))(withRouter(Watched));
