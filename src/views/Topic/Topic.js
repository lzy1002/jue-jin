import React from "react";

import "./Topic.styl";

import {getTopicInfo} from "../../api/topic.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

class Topic extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      topicInfo: {}
    }
  }

  componentDidMount() {
    const topicId = this.props.match.params.topicId;
    this.getTopicInfo(topicId);

  }

  getTopicInfo(topicId) {
    getTopicInfo(topicId).then(res => {
      console.log(res);
      this.setState({
        topicInfo: res.data.d
      })
    })
  }

  render() {
    return (
      <div className="topic-wrapper">
        <div className="topic-header">
          <div className="back">
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            {this.state.topicInfo.title}
          </div>
          <div className="share">
            <i className="iconfont icon-fenxiang"></i>
          </div>
        </div>
        <div className="topic-content">
          <Scroll>
            <div className="topic-info">
              <div className="info-top">
                <div className="img-box" style={{backgroundImage: `url(${this.state.topicInfo.icon})`}}></div>
                <div className="info-content">
                  <h3 className="title">{this.state.topicInfo.title}</h3>
                  <div className="other">
                    <div className="other-item">
                      <p className="count">{this.state.topicInfo.followersCount}</p>
                      <p className="text">关注者</p>
                    </div>
                    <div className="other-item">
                      <p className="count">{this.state.topicInfo.msgsCount}</p>
                      <p className="text">沸点</p>
                    </div>
                  </div>
                </div>
                <div className="follow-box">
                  <div className="follow-btn">
                    <i className="iconfont icon-Add1"></i>
                    <span>关注</span>
                  </div>
                </div>
              </div>

              <div className="info-desc">
                {this.state.topicInfo.description}
              </div>
            </div>
          </Scroll>
        </div>
      </div>
    )
  }

}

export default Topic;
