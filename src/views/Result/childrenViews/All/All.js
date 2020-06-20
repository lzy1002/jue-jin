import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./All.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";
import UserItem from "../../../../components/content/UserItem/UserItem.js";
import TagItem from "../../../../components/content/TagItem/TagItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class All extends React.Component {
  static defaultProps = {
    searchKey: ""
  };

  static propTypes = {
    searchKey: propTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      allData: {}
    };

    this.type = "ALL";

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
        allData: res.data.data.result
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.allData.pageInfo.hasNextPage) return;
    const lastId = this.state.allData.pageInfo.endCursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState({
        allData: {
          edges: [...this.state.allData.edges, ...res.data.data.result.edges],
          pageInfo: res.data.data.result.pageInfo
        }
      })
    })
  }

  render() {
    return (
      <div className="resultAll-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.allData.edges ? this.state.allData.edges.map((item, index) => (
            <Fragment key={index}>
              {item.node.type === "ArticleSearchResultItem" ?
                <ShareItem shareItemData={item.node.entry}/>
              : undefined}
              {item.node.type === "UserSearchResultItem" ?
                <UserItem userItemData={{user: item.node.user}}/>
              : undefined}
              {item.node.type === "TagSearchResultItem" ?
                <TagItem tagItemData={item.node.tag}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.allData.edges && this.state.allData.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(All);
