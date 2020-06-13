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
      console.log(res);
      this.setState({
        topicRank: res.data.d
      })
    })
  }

  render() {
    return (
      <div className="rank-wrapper">
        {this.state.topicRank.list ? this.state.topicRank.list.map((item, index) => (
          <PinItem key={item.objectId} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Rank;
