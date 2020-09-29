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
      pinCommentData: {}
    };

    this.pullUpLoad = true;

  }

  componentDidMount() {
    const pinId = this.props.match.params.pinId;
    this.getPinContent(pinId);
    this.getPinComment(pinId);
  }

  getPinContent(pinId) {
    getPinContent(pinId).then(res => {
      this.setState({
        pinContentData: res.data
      })
    })
  }

  getPinComment(pinId, cursor) {
    getPinComment(pinId, cursor).then(res => {
      this.setState({
        pinCommentData: res.data
      });
    })
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  handlePullUpLoad() {
    const pinId = this.props.match.params.pinId;
    if(!this.state.pinCommentData.has_more) return;
    getPinComment(pinId, this.state.pinCommentData.cursor).then(res => {
      this.setState(prevState => ({
        pinCommentData: {
          ...prevState.pinCommentData,
          data: [...prevState.pinCommentData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }));
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
            {this.state.pinContentData.data ?
              <div className="detail-box">
                <div className="user-box">
                  <UserBox userData={this.state.pinContentData.data.author_user_info} createdAt={parseInt(this.state.pinContentData.data.msg_Info.ctime) * 1000}/>
                </div>
                <div className="pin-text">
                  {this.state.pinContentData.data.msg_Info.content}
                </div>

                {this.state.pinContentData.data.msg_Info.pic_list && this.state.pinContentData.data.msg_Info.pic_list.length ?
                  <div className="image-box">
                    {this.state.pinContentData.data.msg_Info.pic_list.map((item, index) => (
                      <div className="img" key={item} style={{backgroundImage: `url(${item})`}}></div>
                    ))}
                  </div>
                : undefined}

                {this.state.pinContentData.data.msg_Info.url ?
                  <div className="link-box">
                    <LinkBox linkData={{url: this.state.pinContentData.data.msg_Info.url, urlPic: this.state.pinContentData.data.msg_Info.url_pic, urlTitle: this.state.pinContentData.data.msg_Info.url_title}}/>
                  </div>
                : undefined}

                {this.state.pinContentData.data.topic.title ?
                  <div className="topic-box">
                    <div className="topic-item" onClick={this.handleTopicItemClick.bind(this, this.state.pinContentData.data.topic.topic_id)}>{this.state.pinContentData.data.topic.title}</div>
                  </div>
                : undefined}
              </div>
            : undefined}

            {this.state.pinCommentData.data && this.state.pinCommentData.data.length ?
              <div className="comment-box">
                <div className="title border-1px">
                  评论
                </div>
                <div className="comment-content">
                  {this.state.pinCommentData.data.map((item, index) => (
                    <CommentItem key={index} commentItemData={item}/>
                  ))}
                  <div style={{display: this.state.pinCommentData.has_more ? "block" : "none"}}>
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
