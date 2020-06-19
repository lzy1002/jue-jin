import React from "react";

import "./Pin.styl";

import {getPinContent, getPinComment} from "../../api/pin.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import UserBox from "../../components/content/UserBox/UserBox.js";
import LinkBox from "../../components/content/LinkBox/LinkBox.js";
import CommentItem from "../../components/content/CommentItem/CommentItem.js";
import Loading from "../../components/content/Loading/Loading.js";

class Pin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pinContentData: {},
      pinCommentData: {},
      loadMore: true
    };

    this.pullUpLoad = true;

    this.pageNum = 1;
  }

  componentDidMount() {
    const pinId = this.props.match.params.pinId;
    console.log(pinId);
    this.getPinContent(pinId);
    this.getPinComment(pinId, this.pageNum);
  }

  getPinContent(pinId) {
    getPinContent(pinId).then(res => {
      console.log(res);
      this.setState({
        pinContentData: res.data.d
      })
    })
  }

  getPinComment(pinId, pageNum) {
    getPinComment(pinId, pageNum).then(res => {
      console.log(res);
      this.setState({
        pinCommentData: res.data.d
      });

      let nowCount = this.state.pinCommentData.comments.length;
      this.state.pinCommentData.comments.forEach(item => {
        if(item.topComment && item.topComment.length) {
          nowCount += item.topComment.length;
        }
      });

      this.setState({
        loadMore: nowCount !== this.state.pinCommentData.count
      });

      this.pageNum = this.pageNum + 1;
    })
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  handlePullUpLoad() {
    const pinId = this.props.match.params.pinId;
    if(!this.state.loadMore) return;
    getPinComment(pinId, this.pageNum).then(res => {
      this.setState(prevState => ({
        pinCommentData: {
          comments: [...prevState.pinCommentData.comments, ...res.data.d.comments],
        },
        loadMore: res.data.d.comments.length !== 0
      }));
      this.pageNum = this.pageNum + 1
    })
  }

  handleTopicItemClick(topicId) {
    this.props.history.push(`/topic/${topicId}`);
  }

  render() {
    return(
      <div className="pin-wrapper">
        <div className="pin-header border-1px">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            沸点详情
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>
        <div className="pin-content">
          <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
            <div className="detail-box">
              <div className="user-box">
                <UserBox userData={this.state.pinContentData.user}/>
              </div>
              <div className="text">
                {this.state.pinContentData.content}
              </div>
              {this.state.pinContentData.pictures && this.state.pinContentData.pictures.length ?
                <div className="image-box">
                  {this.state.pinContentData.pictures.map((item, index) => (
                    <div className="img" key={item} style={{backgroundImage: `url(${item})`}}></div>
                  ))}
                </div>
              : undefined}

              {this.state.pinContentData.url ?
                <div className="link-box">
                  <LinkBox linkData={{url: this.state.pinContentData.url, urlPic: this.state.pinContentData.urlPic, urlTitle: this.state.pinContentData.urlTitle}}/>
                </div>
              : undefined}

              {this.state.pinContentData.topic ?
                <div className="topic-box">
                  <div className="topic-item" onClick={this.handleTopicItemClick.bind(this, this.state.pinContentData.topic.objectId)}>{this.state.pinContentData.topic.title}</div>
                </div>
              : undefined}
            </div>
            {this.state.pinCommentData.comments && this.state.pinCommentData.comments.length ?
              <div className="comment-box">
                <div className="title border-1px">
                  评论
                </div>
                <div className="comment-content">
                  {this.state.pinCommentData.comments.map((item, index) => (
                    <CommentItem key={index} commentItemData={item}/>
                  ))}
                  <div style={{display: this.state.loadMore ? "block" : "none"}}>
                    <Loading/>
                  </div>
                </div>
              </div>
            : undefined}

          </Scroll>
        </div>

      </div>
    )
  }

}

export default Pin;
