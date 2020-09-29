import React from "react";
import {connect} from "react-redux";

import actionCreator from "../../../../store/actionCreator/index.js";

import "./Recommend.styl";

import HotArticle from "../../../../components/content/HotArticle/HotArticle.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
import Refresh from "../../../../components/content/Refresh/Refresh.js";
import Loading from "../../../../components/content/Loading/Loading.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

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
    if(this.props.articleFeed) return;  // 当路由切换时 当前页面会被销毁 但是redux中已经存储的数据不会被销毁 当再次切换回该组件时 先判断redux中是否已经存在即将要获取的数据了 如果存在则不获取
    this.setState({
      refreshIsShow: true
    });
    this.props.sagaInitHomeRecommendHotArticle();
    this.props.sagaInitHomeRecommend();  // 调用方法派发调用saga的行为标识对象 获取数据修改redux的state
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.hotArticle || !nextProps.recommendList) return;  // 这一步判断是为了解决页面初次渲染时 就算redux中没有数据 也会触发一次该生命周期函数 导致refresh组件不会显示的问题  也就是说只有当redux存在真实的数据之后才会让refresh组件隐藏
    this.setState({
      refreshIsShow: false
    });
  }

  handlePullDownRefresh() {
    this.setState({
      refreshIsShow: true
    });
    window.setTimeout(() => {  // 这里的延迟是为了让refresh组件至少显示一秒 如果不延迟 那么数据的获取会很快 两次setState时间过短 以最后一次为准 导致refresh组件不显示
      this.props.sagaInitHomeRecommendHotArticle();
      this.props.sagaInitHomeRecommend();
    }, 1000)
  }

  handlePullUpLoad() {
    if(!this.props.recommendList.has_more) return;
    this.props.sagaMoreHomeRecommend(this.props.recommendList.cursor);
  }

  render() {
    return (
      <div className="recommend-wrapper">
        <div style={{display: this.state.refreshIsShow ? "block" : "none"}}>
          <Refresh/>
        </div>
        <Scroll pullDownRefresh={this.pullDownRefresh} pullUpLoad={this.pullUpLoad} handlePullDownRefresh={this.handlePullDownRefresh.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.props.hotArticle ? <HotArticle hotArticleList={this.props.hotArticle}/> : undefined}
          {this.props.recommendList ? this.props.recommendList.data.filter(item => item.item_type === 2).map((item, index) => (
            <ArticleItem articleItemData={item.item_info} key={index}/>
          )) : undefined}
          <div style={{display: this.props.recommendList && this.props.recommendList.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.home.recommend}), {...actionCreator.home})(Recommend);
