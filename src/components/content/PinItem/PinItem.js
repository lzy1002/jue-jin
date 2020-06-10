import React, {Fragment} from "react";
import propTypes from "prop-types";

import "./PinItem.styl";

import {publishDate} from "../../../assets/js/utils.js";

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

  handleOpenTextClick() {
    this.setState(prevState => ({
      isAll: !prevState.isAll
    }))
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
        <div className="pinItem-content border-1px">
          <div className="text-box">
            <div ref={this.partText}>
              <div className="part-text">
                {this.props.pinItemData.content}
              </div>
            </div>
            <div className="all-text" ref={this.allText}>
              {this.props.pinItemData.content}
            </div>
            <div className="open-text" style={{display: this.state.openTextIsShow ? "block" : "none"}} onClick={this.handleOpenTextClick.bind(this)}>{this.state.isAll ? "收起全文" : "展开全文"}</div>
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
              <div className="tag-item">{this.props.pinItemData.topic.title}</div>
            </div>
          : undefined}
        </div>
        <div className="pinItem-bottom">
          <div className="bottom-item">
            <i className="iconfont icon-dianzan"></i>
            <span>{this.props.pinItemData.likedCount ? this.props.pinItemData.likedCount : "点赞"}</span>
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

export default PinItem;
