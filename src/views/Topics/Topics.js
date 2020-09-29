import React from "react";

import "./Topics.styl";

import {getTopicsList} from "../../api/topics.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import TopicItem from "../../components/content/TopicItem/TopicItem.js";
import Loading from "../../components/content/Loading/Loading.js";

class Topics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topicsData: {},
      loadMore: true
    };

    this.pullUpLoad = true;

  }

  componentDidMount() {
    const cursor = "0";
    this.getTopicsList(cursor);
  }

  getTopicsList(cursor) {
    getTopicsList(cursor).then(res => {
      this.setState({
        topicsData: res.data
      });
    })
  }

  handlePullUpLoad() {
    if(!this.state.topicsData.has_more) return;
    getTopicsList(this.state.topicsData.cursor).then(res => {
      this.setState((prevState) => ({
        topicsData: {
          ...prevState.topicsData,
          data: [...prevState.topicsData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="topics-wrapper">
        <div className="topics-header">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            话题广场
          </div>
        </div>
        <div className="topics-content">
          <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
            <div className="topics-box">
              {this.state.topicsData.data ? this.state.topicsData.data.map((item, index) => (
                <TopicItem key={index} topicItemData={item}/>
              )) : undefined}
              <div style={{display: this.state.topicsData.data && this.state.topicsData.has_more ? "block" : "none"}}>
                <Loading/>
              </div>
            </div>
          </Scroll>
        </div>

      </div>
    )
  }

}

export default Topics;
