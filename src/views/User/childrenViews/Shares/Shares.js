import React from "react";

import "./Shares.styl";

import {getUserShare} from "../../../../api/user.js";

import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";

class Shares extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userShare: []
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.getUserShare(userId);
  }

  getUserShare(userId) {
    getUserShare(userId).then(res => {
      console.log(res);
      this.setState({
        userShare: res.data.d.entrylist
      })
    })
  }

  render() {
    return (
      <div className="userShares-wrapper">
        {this.state.userShare.map((item, index) => (
          <ShareItem key={item.objectId} shareItemData={item}/>
        ))}
      </div>
    )
  }

}

export default Shares;
