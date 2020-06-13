import React, {Fragment} from "react";
import {connect} from "react-redux";

import "./Recommend.styl";

import actionCreator from "../../../../store/actionCreator/index.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import PinItem from "../../../../components/content/PinItem/PinItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";

class Recommend extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      refreshIsShow: false
    };

    this.pullDownRefresh = true;
    this.pullUpLoad = true;

  }

  componentDidMount() {
    if(this.props.items) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitPinsRecommend();
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

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {
      this.props.sagaInitPinsRecommend();
    }, 1000);
  }

  handlePullUpLoad() {
    this.props.sagaMorePinsRecommend(this.props.items.pageInfo.endCursor);
  }

  render() {
    return (
      <div className="pinsRecommend-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.props.items ? this.props.items.userActivities.map((item, index) => (
            <Fragment key={index}>
              {item.userActivity.action === "PUBLISH_PIN" ?
                <PinItem pinItemData={{user: item.userActivity.actors[0], ...item.userActivity.pins[0]}}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.props.items ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.pins.recommend}), {...actionCreator.pins})(Recommend);
