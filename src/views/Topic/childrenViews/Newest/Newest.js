import React from "react";

import "./Newest.styl";

import {getTopicNewest} from "../../../../api/topic.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";

class Newest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicNewest: {}
    }

  }

  componentDidMount() {
    const topicId = this.props.match.params.topicId;
    this.getTopicNewest(topicId);
  }

  getTopicNewest(topicId) {
    getTopicNewest(topicId).then(res => {
      this.setState({
        topicNewest: res.data
      })
    })
  }

  render() {
    return (
      <div className="newest-wrapper">
        {this.state.topicNewest.data ? this.state.topicNewest.data.map((item, index) => (
          <PinItem key={item.msg_id} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Newest;
