import React from "react";

import "./Rank.styl";

import {getTopicRank} from "../../../../api/topic.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";

class Rank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicRank: {}
    }

  }

  componentDidMount() {
    const topicId = this.props.match.params.topicId;
    this.getTopicRank(topicId);
  }

  getTopicRank(topicId) {
    getTopicRank(topicId).then(res => {
      this.setState({
        topicRank: res.data
      })
    })
  }

  render() {
    return (
      <div className="rank-wrapper">
        {this.state.topicRank.data ? this.state.topicRank.data.map((item, index) => (
          <PinItem key={item.msg_id} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Rank;
