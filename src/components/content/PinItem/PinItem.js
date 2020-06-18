import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import propTypes from "prop-types";

import "./PinItem.styl";

import {publishDate} from "../../../assets/js/utils.js";

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
    console.log(this.partText.current.offsetHeight, "===", this.allText.current.offsetHeight);
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
    console.log(pinItemData);
    this.props.history.push(`/pin/${pinItemData.objectId || pinItemData.id}`);
  }

  handleTopicClick(e, topic) {
    this.props.history.push(`/topic/${topic.id || topic.objectId}`);
    e.stopPropagation();
  }

  handleThumbClick(objectId) {
    this.props.changePinThumbState(objectId);
  }

  isThumb(objectId, thumbCount) {
    const index = this.props.pinThumbList.findIndex(item => item === objectId);
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

  thumbIsActive(objectId) {
    const index = this.props.pinThumbList.findIndex(item => item === objectId);
    return index !== -1;
  }

  render() {
    return (
      <div className="pinItem-wrapper">
        <div className="pinItem-header">
          <div className="user-box">
            <UserBox userData={this.props.pinItemData.user} createdAt={publishDate(this.props.pinItemData.createdAt)}/>
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>
        <div className="pinItem-content border-1px"  onClick={this.handlePinItemClick.bind(this, this.props.pinItemData)}>
          <div className="text-box">
            <div ref={this.partText}>
              <div className="part-text">
                {this.props.pinItemData.content}
              </div>
            </div>
            <div className="all-text" ref={this.allText}>
              {this.props.pinItemData.content}
            </div>
            <div className="open-text" style={{display: this.state.openTextIsShow ? "block" : "none"}} onClick={e => this.handleOpenTextClick.call(this, e)}>{this.state.isAll ? "收起全文" : "展开全文"}</div>
          </div>
          {this.props.pinItemData.pictures.length ?
            <div className="image-box">
              {this.props.pinItemData.pictures.map((item, index) => (
                <div key={index} className="img" style={{backgroundImage: `url(${item})`}}></div>
              ))}
            </div>
          : undefined}
          {this.props.pinItemData.url ?
            <div className="link-box">
              <LinkBox linkData={{url: this.props.pinItemData.url, urlPic: this.props.pinItemData.urlPic, urlTitle: this.props.pinItemData.urlTitle}}/>
            </div>
          : undefined}
          {this.props.pinItemData.topic ?
            <div className="tag-box">
              <div className="tag-item" onClick={e => this.handleTopicClick.call(this, e, this.props.pinItemData.topic)}>{this.props.pinItemData.topic.title}</div>
            </div>
          : undefined}
        </div>
        <div className="pinItem-bottom">
          <div className={`bottom-item ${this.thumbIsActive.call(this, this.props.pinItemData.id || this.props.pinItemData.objectId) ? "active" : ""}`} onClick={this.handleThumbClick.bind(this, this.props.pinItemData.id || this.props.pinItemData.objectId)}>
            <i className={`iconfont ${this.thumbIsActive.call(this, this.props.pinItemData.id || this.props.pinItemData.objectId) ? "icon-dianzan1" : "icon-dianzan"}`}></i>
            <span>{this.isThumb.call(this, this.props.pinItemData.id || this.props.pinItemData.objectId, this.props.pinItemData.likeCount)}</span>
          </div>
          <div className="bottom-item">
            <i className="iconfont icon-pinglun"></i>
            <span>{this.props.pinItemData.commentCount ? this.props.pinItemData.commentCount : "评论"}</span>
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
