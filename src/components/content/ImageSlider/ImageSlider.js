import React from "react";
import BScroll from "better-scroll";

import "./ImageSlider.styl";

class ImageSlider extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
    this.content = React.createRef();

  }

  componentWillReceiveProps() {
    this.timeId = window.setTimeout(() => {
      this.setSliderWidth.call(this);
      this.initSlider.call(this);

      this.play();
    }, 20);
  }

  componentWillUnmount() {  // 组件销毁之前清除掉componentWillReceiveProps中创建的定时器 避免在组件销毁之后定时器还会执行 导致定时器中调用的方法中 在组件销毁之后拿取ref引用 组件销毁后ref引用也会被销毁 所以拿引用调用属性时会报错  解决页面快速切换时定时器在组件销毁之后执行导致报错的问题
    window.clearTimeout(this.timeId);
  }

  setSliderWidth() {
    let itemWidth = this.wrapper.current.offsetWidth;
    let contentWidth = 0;

    for(let i = 0; i< this.content.current.children.length; i++) {
      let item = this.content.current.children[i];
      item.className = "slider-item";
      item.style.width = itemWidth + "px";
      contentWidth += itemWidth;
    }

    this.content.current.style.width = contentWidth + (itemWidth * 2) + "px";
  }

  initSlider() {
    this.slider = new BScroll(this.wrapper.current, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: {
        loop: true,
        threshold: 0.3,
        speed: 400
      }
    });

    this.slider.on("scrollEnd", () => {
      window.clearTimeout(this.timeId);
      this.play();
    })

  }

  play() {
    this.timeId = window.setTimeout(() => {
      this.slider.next();
    }, 3000);
  }

  render() {
    return (
      <div className="imageSlider-wrapper" ref={this.wrapper}>
        <div className="imageSlider-content" ref={this.content}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

export default ImageSlider;
