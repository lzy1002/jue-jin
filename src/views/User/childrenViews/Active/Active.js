import React, {Fragment} from "react";

import "./Active.styl";

import {getUserActive} from "../../../../api/user.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";
import ColumnItem from "../../../../components/content/ColumnItem/ColumnItem.js";
import FollowedItem from "../../../../components/content/FollowedItem/FollowedItem.js";

class Active extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userActive: []
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserActive(userId);

  }

  getUserActive(userId) {
    getUserActive(userId).then(res => {
      console.log(res);
      this.setState({
        userActive: res.data.data.ownActivityFeed.items.userActivities
      })
    })
  }

  render() {
    return (
      <div className="active-wrapper">
        {this.state.userActive.map((item, index) => (
          <Fragment key={index}>
            {item.userActivity.action === "PUBLISH_PIN" ?
              <PinItem pinItemData={{user: item.userActivity.actors[0], ...item.userActivity.pins[0]}}/>
            : undefined}
            {item.userActivity.action === "LIKE_ARTICLE" ?
              <div className="like-box">
                <div className="like-header border-1px">
                  <span className="username">{item.userActivity.actors[0].username}</span>
                  <span>赞了这篇文章</span>
                </div>
                <ColumnItem columnItemData={{user: item.userActivity.actors[0], ...item.userActivity.entries[0]}}/>
              </div>
            : undefined}
            {item.userActivity.action === "PUBLISH_ARTICLE" ?
              <ColumnItem columnItemData={{user: item.userActivity.actors[0], ...item.userActivity.entries[0]}}/>
            : undefined}
            {item.userActivity.action === "FOLLOW_USER" ?
              <FollowedItem followedItemData={{actor: item.userActivity.actors[0], user: item.userActivity.users[0]}}/>
            : undefined}
          </Fragment>
        ))}
      </div>
    )
  }

}

export default Active;
