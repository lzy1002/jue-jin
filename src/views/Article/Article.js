import React from "react";

import "../../assets/stylus/article.styl";
import "./Article.styl";

import {getArticleDetailContent, getArticleDetailView, getArticleDetailRelated, getArticleDetailComment} from "../../api/article.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import User from "../../components/content/User/User.js";
import RelatedItem from "../../components/content/RelatedItem/RelatedItem.js";

class Article extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      articleDetailContent: {},
      articleDetailView: {},
      articleDetailRelated: [],
      headerTrans: false
    };

    this.probeType = 3;

  }

  componentDidMount() {
    console.log(this.props.match.params.articleId);
    this.getArticleDetailContent();
    this.getArticleDetailView();
    this.getArticleDetailRelated();
    this.getArticleDetailComment();
  }

  getArticleDetailContent() {
    const articleId = this.props.match.params.articleId;
    getArticleDetailContent(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailContent: res.data.d
      });
      console.log(this.state);
    })
  }

  getArticleDetailView() {
    const articleId = this.props.match.params.articleId;
    getArticleDetailView(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailView: res.data.d
      });
      console.log(this.state);
    })
  }

  getArticleDetailRelated() {
    const articleId = this.props.match.params.articleId;
    getArticleDetailRelated(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailRelated: res.data.d.entrylist
      })
    })

  }

  getArticleDetailComment() {
    const articleId = this.props.match.params.articleId;
    getArticleDetailComment(articleId).then(res => {
      console.log(res);
    })

  }

  levelIcon(level) {
    switch (level) {
      case 1: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-1.636691c.svg";
      case 2: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-2.f597b88.svg";
      case 3: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-3.e108c68.svg";
      case 4: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-4.2c3fafd.svg";
      case 5: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-5.f8d5198.svg";
      case 6: return "https://b-gold-cdn.xitu.io/v3/static/img/lv-6.74bd93a.svg";
    }
  }

  handleScrolling(position) {
    const {x, y} = position;
    if(-y >= 60 && this.state.headerTrans === false) {
      this.setState({
        headerTrans: true
      })
    }else if(-y < 60 && this.state.headerTrans === true) {
      this.setState({
        headerTrans: false
      })
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="article-wrapper">
        <div className="article-header border-1px">
          <div className="back" onClick={this.handleBack.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            {this.state.articleDetailContent.entrylist ?
              <div className="trans-box" style={{transform: this.state.headerTrans ? "translateY(0)" : "translateY(-50%)"}}>
                <div className="user">
                  <div className="avatar-box">
                    <img src={this.state.articleDetailContent.entrylist[0].user.avatarLarge} alt=""/>
                  </div>
                  <div className="username">
                    <span>{this.state.articleDetailContent.entrylist[0].user.username}</span>
                    <img src={this.levelIcon(this.state.articleDetailContent.entrylist[0].user.level)} alt=""/>
                  </div>
                  <div className="follow-btn">
                    <i className="iconfont icon-Add1"></i>
                    <span>关注</span>
                  </div>
                </div>
              <div className="title">
                <span>文章详情页</span>
              </div>
            </div> : undefined}
          </div>
          <div className="more">
            <i className="iconfont icon-unie644"></i>
          </div>
        </div>


        <Scroll probeType={this.probeType} handleScrolling={this.handleScrolling.bind(this)}>
          {this.state.articleDetailContent.entrylist && this.state.articleDetailView.content ?
            <div className="article-box">
              <User userData={this.state.articleDetailContent.entrylist[0].user}/>
              <h3 className="title">{this.state.articleDetailContent.entrylist[0].title}</h3>
              {this.state.articleDetailContent.entrylist[0].screenshot ?
                <div className="screenShot" style={{backgroundImage: `url(${this.state.articleDetailContent.entrylist[0].screenshot})`}}></div>
                : undefined}
              <div className="article-content" dangerouslySetInnerHTML={{__html: this.state.articleDetailView.content}}></div>
              <div className="tags-box">
                {this.state.articleDetailContent.entrylist[0].tags.map((item, index) => (
                  <div key={item.id} className="tags-item">{item.title}</div>
                ))}
              </div>
              <div className="article-info">
                <span>阅读: {this.state.articleDetailContent.entrylist[0].viewsCount}</span>
                <span> · </span>
                <span>赞: {this.state.articleDetailContent.entrylist[0].collectionCount}</span>
              </div>
            </div>
          : undefined}

          {this.state.articleDetailRelated.length ?
            <div className="related-box">
              {this.state.articleDetailContent.entrylist ?
                <div className="related-header border-1px">
                  <span>{this.state.articleDetailContent.entrylist[0].user.username}的更多文章</span>
                </div>
              : undefined}
              <div className="related-content">
                {this.state.articleDetailRelated.map((item, index) => (
                  <RelatedItem key={item.objectId} relatedItemData={item}/>
                ))}
              </div>

            </div>
          : undefined}

          </Scroll>


      </div>

    )
  }

}

export default Article;
