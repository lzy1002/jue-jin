import React from "react";
import propTypes from "prop-types";
import BScroll from "better-scroll";

class Scroll extends React.Component {
  static defaultProps = {
    click: true,
    probeType: 0,
    pullUpLoad: false,
    pullDownRefresh: false,
    handleScrolling: () => {},
    handlePullUpLoad: () => {},
    handlePullDownRefresh: () => {}
  };

  static propTypes = {
    click: propTypes.bool,
    probeType: propTypes.number,
    pullUpLoad: propTypes.bool,
    pullDownRefresh: propTypes.bool,
    handleScrolling: propTypes.func,
    handlePullUpLoad: propTypes.func,
    handlePullDownRefresh: propTypes.func
  };

  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.initBScroll.call(this);
  }

  initBScroll() {
    this.BScroll = new BScroll(this.wrapper.current, {
      click: this.props.click,
      probeType: this.props.probeType,
      pullUpLoad: this.props.pullUpLoad,
      pullDownRefresh: this.props.pullDownRefresh,
      stopPropagation: true,
      preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO|CODE|PRE)$/}
    });

    if(this.props.probeType >= 2) {
      this.BScroll.on("scroll", (position) => {
        this.props.handleScrolling(position);
      })
    }

    if(this.props.pullUpLoad) {
      this.BScroll.on("pullingUp", () => {
        this.props.handlePullUpLoad();
        this.BScroll.finishPullUp();
      })
    }

    if(this.props.pullDownRefresh) {
      this.BScroll.on("pullingDown", () => {
        this.props.handlePullDownRefresh();
        this.BScroll.finishPullDown();
      })
    }
  }

  refresh() {
    this.BScroll.refresh();
  }

  scrollTo() {
    this.BScroll.scrollTo(...arguments);
  }

  render() {
    return (
      <div className="scroll-wrapper" ref={this.wrapper} style={{width: "100%", height: "100%"}}>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default Scroll;
