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

    this.state = {
      refreshIsShow: false
    };

    this.pullDownRefresh = true;
    this.pullUpLoad = true;

  }

  componentDidMount() {
    if(this.props.data) return;
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitPinsRecommend();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.data) return;
    this.setState({
      refreshIsShow: false
    })
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
    if(!this.props.has_more) return;
    this.props.sagaMorePinsRecommend(this.props.cursor);
  }

  render() {
    return (
      <div className="pinsRecommend-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.props.data ? this.props.data.map((item, index) => (
            <Fragment key={index}>
              <PinItem pinItemData={item}/>
            </Fragment>
          )) : undefined}
          <div style={{display: this.props.data && this.props.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.pins.recommend}), {...actionCreator.pins})(Recommend);
