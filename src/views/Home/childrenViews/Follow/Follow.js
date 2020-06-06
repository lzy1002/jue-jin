import React from "react";
import {connect} from "react-redux";

import actionCreator from "../../../../store/actionCreator/index.js";

import "./Follow.styl";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import LoginTip from "../../../../components/content/LoginTip/LoginTip.js";
import ColumnItem from "../../../../components/content/ColumnItem/ColumnItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Follow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshIsShow: false
    };

    this.pullDownRefresh = true;
    this.pullUpLoad = true;
  }

  componentDidMount() {
    if(this.props.entrylist) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitHomeFollow();

  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.entrylist) return;
    this.setState({
      refreshIsShow: false
    });
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitHomeFollow();
    }, 1000);
  }

  handlePullUpLoad() {
    const lastId = this.props.entrylist[this.props.entrylist.length - 1].hotIndex;
    this.props.sagaMoreHomeFollow(lastId);
  }

  render() {
    return (
      <div className="follow-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          <LoginTip/>
          {this.props.entrylist ? this.props.entrylist.map((item, index) => (
            <ColumnItem key={index} columnItemData={item}/>
          )) : undefined}
          <div style={{display: this.props.entrylist ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.home.follow}), {...actionCreator.home})(Follow);
