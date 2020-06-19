import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "./Users.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import MinHeader from "../../../../components/content/MinHeader/MinHeader.js";
import UserItem from "../../../../components/content/UserItem/UserItem.js";

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.title = "关注的用户";
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="profileUsers-wrapper">
        <MinHeader title={this.title} handleBackClick={this.handleBackClick.bind(this)}/>

        <div className="users-content">
          <Scroll>
            {this.props.userFollowingList.map((item, index) => (
              <UserItem key={index} userItemData={item}/>
            ))}
          </Scroll>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing}))(withRouter(Users));
