import React from "react";
import {connect} from "react-redux";

import "./Tags.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import MinHeader from "../../../../components/content/MinHeader/MinHeader.js";
import TagItem from "../../../../components/content/TagItem/TagItem.js";

class Tags extends React.Component {
  constructor(props) {
    super(props);

    this.title = "标签管理";
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="profileTags-wrapper">
        <MinHeader title={this.title} handleBackClick={this.handleBackClick.bind(this)}/>

        <div className="tag-content">
          <Scroll>
            {this.props.tagFollowingList.map((item, index) => (
              <TagItem key={index} tagItemData={item}/>
            ))}
          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.tagFollowing}))(Tags);
