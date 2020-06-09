import React from "react";

import "../../assets/stylus/article.styl";
import "./Article.styl";

import {levelIcon} from "../../assets/js/utils.js";

import {getArticleDetailContent, getArticleDetailView, getArticleDetailRelated, getArticleDetailComment} from "../../api/article.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import UserBox from "../../components/content/UserBox/UserBox.js";
import RelatedItem from "../../components/content/RelatedItem/RelatedItem.js";
import CommentItem from "../../components/content/CommentItem/CommentItem.js";
import Loading from "../../components/content/Loading/Loading.js";

class Article extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      articleDetailContent: {},
      articleDetailView: {},
      articleDetailRelated: [],
      articleDetailComment: {},
      headerTrans: false,
      loadMore: true
    };

    this.probeType = 3;
    this.pullUpLoad = true;

    this.scroll = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.match.params.articleId);
    const articleId = this.props.match.params.articleId;
    this.getArticleDetailContent(articleId);
    this.getArticleDetailView(articleId);
    this.getArticleDetailRelated(articleId);
    this.getArticleDetailComment(articleId);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.location.pathname, nextProps.location.pathname);
    if(this.props.location.pathname === nextProps.location.pathname) return;
    const articleId = nextProps.match.params.articleId;
    this.getArticleDetailContent(articleId);
    this.getArticleDetailView(articleId);
    this.getArticleDetailRelated(articleId);
    this.getArticleDetailComment(articleId);
    this.scroll.current.scrollTo(0, 0, 0);
  }

  getArticleDetailContent(articleId) {
    getArticleDetailContent(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailContent: res.data.d
      });
      console.log(this.state);
    })
  }

  getArticleDetailView(articleId) {
    getArticleDetailView(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailView: res.data.d
      });
      console.log(this.state);
    })
  }

  getArticleDetailRelated(articleId) {
    getArticleDetailRelated(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailRelated: res.data.d.entrylist
      })
    })

  }

  getArticleDetailComment(articleId) {
    getArticleDetailComment(articleId).then(res => {
      console.log(res);
      this.setState({
        articleDetailComment: res.data.d
      })
    })

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

  handlePullUpLoad() {
    if(!this.state.loadMore) return;
    const articleId = this.props.match.params.articleId;
    const createdAt = this.state.articleDetailComment.comments[this.state.articleDetailComment.comments.length - 1].createdAt || "";
    getArticleDetailComment(articleId, createdAt).then(res => {
      console.log(res);
      this.setState((prevState) => ({
        articleDetailComment: {
          ...prevState.articleDetailComment,
          comments: [...prevState.articleDetailComment.comments, ...res.data.d.comments]
        },
        loadMore: res.data.d.comments.length !== 0
      }))
    })

  }

  handleBack() {
    this.props.history.goBack();
  }

  handleAvatarBoxClick(e, userData) {
    this.props.history.push(`/user/${userData.objectId}`);
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
                  <div className="avatar-box" onClick={e => this.handleAvatarBoxClick.call(this, e, this.state.articleDetailContent.entrylist[0].user)}>
                    <img src={this.state.articleDetailContent.entrylist[0].user.avatarLarge} alt=""/>
                  </div>
                  <div className="username">
                    <span>{this.state.articleDetailContent.entrylist[0].user.username}</span>
                    <img src={levelIcon(this.state.articleDetailContent.entrylist[0].user.level)} alt=""/>
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


        <Scroll ref={this.scroll} probeType={this.probeType} pullUpLoad={this.pullUpLoad} handleScrolling={this.handleScrolling.bind(this)} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.articleDetailContent.entrylist && this.state.articleDetailView.content ?
            <div className="article-box">
              <UserBox userData={this.state.articleDetailContent.entrylist[0].user}/>
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

          {this.state.articleDetailComment.comments ?
            <div className="comment-box">
              {this.state.articleDetailComment.comments.map((item, index) => (
                <CommentItem key={item.id} commentItemData={item}/>
              ))}
              <div style={{display: this.state.loadMore ? "block" : "none"}}>
                <Loading/>
              </div>
            </div>
          : undefined}

          </Scroll>


      </div>

    )
  }

}

export default Article;
