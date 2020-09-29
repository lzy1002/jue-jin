import React from "react";
import {connect} from "react-redux";

import marked from "marked";

import "../../assets/stylus/article.styl";
import "./Article.styl";

import actionCreator from "../../store/actionCreator/index.js";

import {ArticleCls, UserCls} from "../../assets/js/class.js";
import {levelIcon, defaultAvatar} from "../../assets/js/utils.js";

import {getArticleDetailContent, getArticleDetailRelated, getArticleDetailComment} from "../../api/article.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import UserBox from "../../components/content/UserBox/UserBox.js";
import RelatedItem from "../../components/content/RelatedItem/RelatedItem.js";
import CommentItem from "../../components/content/CommentItem/CommentItem.js";
import Loading from "../../components/content/Loading/Loading.js";
import FollowBtn from "../../components/content/FollowBtn/FollowBtn.js";

marked.setOptions({ // marked 设置
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleDetailContent: {},
      articleDetailRelated: [],
      articleDetailComment: {},
      headerTrans: false
    };

    this.probeType = 3;
    this.pullUpLoad = true;

    this.scroll = React.createRef();
  }

  componentDidMount() {
    const articleId = this.props.match.params.articleId;
    const cursor = "0";
    this.getArticleDetailContent(articleId);
    this.getArticleDetailComment(articleId, cursor);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.location.pathname === nextProps.location.pathname) return;
    const articleId = nextProps.match.params.articleId;
    const cursor = "0";
    this.getArticleDetailContent(articleId);
    this.getArticleDetailComment(articleId, cursor);
    this.scroll.current.scrollTo(0, 0, 0);
  }

  getArticleDetailContent(articleId) {
    getArticleDetailContent(articleId).then(res => {
      res.data.data.article_info.mark_content = marked(res.data.data.article_info.mark_content);  // 由于默认返回的文章内容是markdown语法的 所以要使用marked.js来讲markdown语法转化为html 并替换掉数据中原本的markdown内容
      this.setState({
        articleDetailContent: res.data.data
      });

      const tagIds = this.state.articleDetailContent.tags.map(item => item.tag_id);
      this.getArticleDetailRelated(this.state.articleDetailContent.author_user_info.user_id, this.state.articleDetailContent.articleId, tagIds);

      const article = new ArticleCls(res.data.data);  // 将当前查看的文章存储到浏览历史中
      this.props.addArticleWatchHistory(article);
    })
  }

  getArticleDetailRelated(userId, articleId, tagIds) {
    getArticleDetailRelated(userId, articleId, tagIds).then(res => {
      this.setState({
        articleDetailRelated: res.data.data
      })
    })
  }

  getArticleDetailComment(articleId, cursor) {
    getArticleDetailComment(articleId, cursor).then(res => {
      this.setState({
        articleDetailComment: res.data
      });
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
    if(!this.state.articleDetailComment.has_more) return;
    const articleId = this.props.match.params.articleId;

    getArticleDetailComment(articleId, this.state.articleDetailComment.cursor).then(res => {
      this.setState((prevState) => ({
        articleDetailComment: {
          ...prevState.articleDetailComment,
          data: [...prevState.articleDetailComment.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }));
    })
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleUserClick(e, userData) {
    this.props.history.push(`/user/${userData.user_id}`);
  }

  handleFollowBtnClick(userData) {
    const user = new UserCls(userData);
    this.props.changeUserFollowingState(user);
  }

  userIsActive(userId) {
    const index = this.props.userFollowingList.findIndex(item => item.user_id === userId);
    return index !== -1;
  }

  articleIsThumb(articleId, thumbCount) {
    const index = this.props.articleThumbList.findIndex(item => item.articleId === articleId);
    if(index !== -1) {
      return thumbCount + 1;
    }else {
      return thumbCount;
    }
  }

  render() {
    return (
      <div className="article-wrapper">
        <div className="article-header border-1px">
          <div className="back" onClick={this.handleBack.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="content">
            {this.state.articleDetailContent.author_user_info ?
              <div className="trans-box" style={{transform: this.state.headerTrans ? "translateY(0)" : "translateY(-50%)"}}>
                <div className="user" onClick={e => this.handleUserClick.call(this, e, this.state.articleDetailContent.author_user_info)}>
                  <div className="avatar-box" style={{backgroundImage: `url(${defaultAvatar(this.state.articleDetailContent.author_user_info.avatar_large)})`}}></div>
                  <div className="username">
                    <span>{this.state.articleDetailContent.author_user_info.user_name}</span>
                    <img src={levelIcon(this.state.articleDetailContent.author_user_info.level)} alt=""/>
                  </div>
                  <FollowBtn isFollow={this.userIsActive.call(this, this.state.articleDetailContent.author_user_info.user_id)} handleFollowBtnClick={this.handleFollowBtnClick.bind(this, this.state.articleDetailContent.author_user_info)}/>
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
          {this.state.articleDetailContent.article_info ?
            <div className="article-box">
              <UserBox userData={this.state.articleDetailContent.author_user_info}/>
              <h3 className="title">{this.state.articleDetailContent.article_info.title}</h3>
              {this.state.articleDetailContent.article_info.cover_image ?
                <div className="screenShot" style={{backgroundImage: `url(${this.state.articleDetailContent.article_info.cover_image})`}}></div>
                : undefined}
              <div className="article-content" dangerouslySetInnerHTML={{__html: this.state.articleDetailContent.article_info.mark_content}}></div>
              <div className="tags-box">
                {this.state.articleDetailContent.tags.map((item, index) => (
                  <div key={item.tag_id} className="tags-item">{item.tag_name}</div>
                ))}
              </div>
              <div className="article-info">
                <span>阅读: {this.state.articleDetailContent.article_info.view_count}</span>
                <span> · </span>
                <span>赞: {this.articleIsThumb(this.props.match.params.articleId, this.state.articleDetailContent.article_info.digg_count)}</span>
              </div>
            </div>
          : undefined}

          {this.state.articleDetailRelated.length ?
            <div className="related-box">
              {this.state.articleDetailContent.author_user_info ?
                <div className="related-header border-1px">
                  <span>{this.state.articleDetailContent.author_user_info.user_name}的更多文章</span>
                </div>
              : undefined}
              <div className="related-content">
                {this.state.articleDetailRelated.map((item, index) => (
                  <RelatedItem key={item.article_id} relatedItemData={item}/>
                ))}
              </div>
            </div>
          : undefined}

          {this.state.articleDetailComment.data && this.state.articleDetailComment.data.length ?
            <div className="comment-box">
              {this.state.articleDetailComment.data.map((item, index) => (
                <CommentItem key={item.comment_id} commentItemData={item}/>
              ))}
              <div style={{display: this.state.articleDetailComment.has_more ? "block" : "none"}}>
                <Loading/>
              </div>
            </div>
          : undefined}

          </Scroll>
      </div>
    )
  }

}

export default connect(state => ({...state.profile.userFollowing, ...state.profile.articleThumb}), {...actionCreator.profile})(Article);
