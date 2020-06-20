import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./Article.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";
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

    this.type = "ARTICLE";

    this.pullUpLoad = true;
  }

  componentDidMount() {
    const lastId = "";
    this.getResultData(this.type, this.props.searchKey, lastId);

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.searchKey === nextProps.searchKey) return;
    const lastId = "";
    this.getResultData(this.type, nextProps.searchKey, lastId);

  }

  getResultData(type, searchKey, lastId) {
    getResultData(type, searchKey, lastId).then(res => {
      this.setState({
        articleData: res.data.data.result
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.articleData.pageInfo.hasNextPage) return;
    const lastId = this.state.articleData.pageInfo.endCursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState({
        articleData: {
          edges: [...this.state.articleData.edges, ...res.data.data.result.edges],
          pageInfo: res.data.data.result.pageInfo
        }
      })
    })
  }

  render() {
    return (
      <div className="resultArticle-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.articleData.edges ? this.state.articleData.edges.map((item, index) => (
            <Fragment key={index}>
              {item.node.type === "ArticleSearchResultItem" ?
                <ShareItem shareItemData={item.node.entry}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.articleData.edges && this.state.articleData.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(Article);
