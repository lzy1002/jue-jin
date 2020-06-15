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

    this.page = 0;

    this.pullUpLoad = true;

  }

  componentDidMount() {
    this.getTopicsList(this.page);
  }

  getTopicsList(page) {
    getTopicsList(page).then(res => {
      console.log(res);
      this.setState({
        topicsData: res.data.d
      });
      this.page = this.page + 1;
    })
  }

  handlePullUpLoad() {
    if(!this.state.loadMore) return;
    getTopicsList(this.page).then(res => {
      console.log(res);
      this.setState({
        topicsData: {
          list: [...this.state.topicsData.list, ...res.data.d.list],
          total: res.data.d.total
        }
      });
      this.setState({
        loadMore: this.state.topicsData.list.length !== this.state.topicsData.total
      });

      this.page = this.page + 1;
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
              {this.state.topicsData.list ? this.state.topicsData.list.map((item, index) => (
                <TopicItem key={index} topicItemData={item}/>
              )) : undefined}
              <div style={{display: this.state.topicsData.list && this.state.loadMore ? "block" : "none"}}>
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
