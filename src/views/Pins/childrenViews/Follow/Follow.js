import React from "react";
import {connect} from "react-redux";

import "./Follow.styl";

import actionCreator from "../../../../store/actionCreator/index.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import LoginTip from "../../../../components/content/LoginTip/LoginTip.js";
import UserItem from "../../../../components/content/UserItem/UserItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";

class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshIsShow: false
    };

    this.tipText = "登录后可查看关注动态";
  }

  componentDidMount() {
    if(this.props.items) return;
    this.setState({
      refreshIsShow: true
    });
    const extensions = [];
    this.props.sagaInitPinsFollow(extensions);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.items) return;
    this.setState({
      refreshIsShow: false
    })
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  handleChange() {
    const extensions = this.props.items.map(item => item.id);
    this.props.sagaInitPinsFollow(extensions);
  }

  render() {
    return (
      <div className="pinsFollow-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll>
          <div className="loginTip-box">
            <LoginTip tipText={this.tipText}/>
          </div>

          <div className="followUser-box">
            <div className="title border-1px">
              你可能感兴趣的人
            </div>
            <div className="content">
              {this.props.items ? this.props.items.map((item, index) => (
                <UserItem key={index} userItemData={{user: item.user, title: item.description, info: item.achievement}}/>
              )) : undefined}
            </div>
            <div className="change" onClick={this.handleChange.bind(this)}>
              <i className="iconfont icon-shuaxin"></i>
              <span>换一批</span>
            </div>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.pins.follow}), {...actionCreator.pins})(Follow);
