import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./PinItem.styl";

import actionCreator from "../../../store/actionCreator/index.js";

import UserBox from "../../../components/content/UserBox/UserBox.js";
import LinkBox from "../../../components/content/LinkBox/LinkBox.js";

class PinItem extends React.Component {
  static defaultProps = {
    pinItemData: {}
  };

  static propTypes = {
    pinItemData: propTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      openTextIsShow: false,
      isAll: false
    };

    this.partText = React.createRef();
    this.allText = React.createRef();
  }

  componentDidMount() {
    const partHeight = this.partText.current.offsetHeight;
    const allHeight = this.allText.current.offsetHeight;
    if(partHeight !== allHeight) {
      this.setState(prevState => ({
        openTextIsShow: true
      }))
    }
    this.partText.current.style.display = "block";
    this.allText.current.style.display = "none";
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.isAll !== nextState.isAll && nextState.isAll) {
      this.partText.current.style.display = "none";
      this.allText.current.style.display = "block";
    }else if(this.state.isAll !== nextState.isAll && !nextState.isAll) {
      this.partText.current.style.display = "block";
      this.allText.current.style.display = "none";
    }
  }

  handleOpenTextClick(e) {
    this.setState(prevState => ({
      isAll: !prevState.isAll
    }));
    e.stopPropagation();
  }

  handlePinItemClick(pinItemData) {
    this.props.history.push(`/pin/${pinItemData.msg_id}`);
  }

  handleTopicClick(e, topic) {
    if(this.props.location.pathname.startsWith("/topic")) {
      if(topic.topic_id === this.props.match.params.topicId) {
        e.stopPropagation();
        return;
      }
    }

    this.props.history.push(`/topic/${topic.topic_id}`);
    e.stopPropagation();
  }

  handleThumbClick(pinId) {
    this.props.changePinThumbState(pinId);
  }

  isThumb(pinId, thumbCount) {
    const index = this.props.pinThumbList.findIndex(item => item === pinId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      if(!thumbCount) {
        return "点赞";
      }else {
        return thumbCount;
      }
    }
  }

  thumbIsActive(pinId) {
    const index = this.props.pinThumbList.findIndex(item => item === pinId);
    return index !== -1;
  }

  render() {
    return (
      <div className="pinItem-wrapper">
        <div className="pinItem-header">
          <div className="user-box">
            <UserBox userData={this.props.pinItemData.author_user_info} createdAt={parseInt(this.props.pinItemData.msg_Info.ctime) * 1000}/>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>
        <div className="pinItem-content border-1px"  onClick={this.handlePinItemClick.bind(this, this.props.pinItemData)}>
          <div className="text-box">
            <div ref={this.partText}>
              <div className="part-text">
                {this.props.pinItemData.msg_Info.content}
              </div>
            </div>
            <div className="all-text" ref={this.allText}>
              {this.props.pinItemData.msg_Info.content}
            </div>
            <div className="open-text" style={{display: this.state.openTextIsShow ? "block" : "none"}} onClick={e => this.handleOpenTextClick.call(this, e)}>{this.state.isAll ? "收起全文" : "展开全文"}</div>
          </div>
          {this.props.pinItemData.msg_Info.pic_list.length ?
            <div className="image-box">
              {this.props.pinItemData.msg_Info.pic_list.map((item, index) => (
                <div key={index} className="img" style={{backgroundImage: `url(${item})`}}></div>
              ))}
            </div>
          : undefined}
          {this.props.pinItemData.msg_Info.url ?
            <div className="link-box">
              <LinkBox linkData={{url: this.props.pinItemData.msg_Info.url, urlPic: this.props.pinItemData.msg_Info.url_pic, urlTitle: this.props.pinItemData.msg_Info.url_title}}/>
            </div>
          : undefined}
          {this.props.pinItemData.topic.title ?
            <div className="tag-box">
              <div className="tag-item" onClick={e => this.handleTopicClick.call(this, e, this.props.pinItemData.topic)}>{this.props.pinItemData.topic.title}</div>
            </div>
          : undefined}
        </div>
        <div className="pinItem-bottom">
          <div className={`bottom-item ${this.thumbIsActive.call(this, this.props.pinItemData.msg_Info.msg_id) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.pinItemData.msg_Info.msg_id)}>
            <i className={`iconfont ${this.thumbIsActive.call(this, this.props.pinItemData.msg_Info.msg_id) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
            <span>{this.isThumb.call(this, this.props.pinItemData.msg_Info.msg_id, this.props.pinItemData.msg_Info.digg_count || 0)}</span>
          </div>
          <div className="bottom-item">
            <i className="iconfont icon-pinglun"></i>
            <span>{this.props.pinItemData.msg_Info.comment_count ? this.props.pinItemData.msg_Info.comment_count : "评论"}</span>
          </div>
          <div className="bottom-item">
            <i className="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </div>
        </div>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.pinThumb}), {...actionCreator.profile})(withRouter(PinItem));
