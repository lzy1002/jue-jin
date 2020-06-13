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
      console.log(res);
      this.setState({
        topicNewest: res.data.d
      })
    })
  }

  render() {
    return (
      <div className="newest-wrapper">
        {this.state.topicNewest.list ? this.state.topicNewest.list.map((item, index) => (
          <PinItem key={item.objectId} pinItemData={item}/>
        )) : undefined}
      </div>
    )
  }

}

export default Newest;
