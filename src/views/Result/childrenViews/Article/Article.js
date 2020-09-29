import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./Article.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

// import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Article extends React.Component {
  static defaultProps = {
    searchKey: ""
  };

  static propTypes = {
    searchKey: propTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      articleData: {}
    };

    this.type = 2;

    this.pullUpLoad = true;
  }

  componentDidMount() {
    const lastId = "0";
    this.getResultData(this.type, this.props.searchKey, lastId);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.searchKey === nextProps.searchKey) return;
    const lastId = "0";
    this.getResultData(this.type, nextProps.searchKey, lastId);
  }

  getResultData(type, searchKey, lastId) {
    getResultData(type, searchKey, lastId).then(res => {
      this.setState({
        articleData: res.data
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.articleData.has_more) return;
    const lastId = this.state.articleData.cursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState((prevState) => ({
        articleData: {
          ...prevState.articleData,
          data: [...prevState.articleData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  render() {
    return (
      <div className="resultArticle-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.articleData.data ? this.state.articleData.data.map((item, index) => (
            <Fragment key={index}>
              {item.result_type === 2 ?
                <ArticleItem articleItemData={item.result_model}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.articleData.data && this.state.articleData.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(Article);
