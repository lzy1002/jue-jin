import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./All.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

// import ShareItem from "../../../../components/content/ShareItem/ShareItem.js";
import ArticleItem from "../../../../components/content/ArticleItem/ArticleItem.js";
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

    this.type = 0;

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
        allData: res.data
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.allData.has_more) return;
    const lastId = this.state.allData.cursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState((prevState) => ({
        allData: {
          ...prevState.allData,
          data: [...prevState.allData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  render() {
    return (
      <div className="resultAll-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.allData.data ? this.state.allData.data.map((item, index) => (
            <Fragment key={index}>
              {item.result_type === 2 ?
                <ArticleItem articleItemData={item.result_model}/>
              : undefined}
              {item.result_type === 1 ?
                <UserItem userItemData={item.result_model}/>
              : undefined}
              {item.result_type === 9 ?
                <TagItem tagItemData={item.result_model}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.allData.data && this.state.allData.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(All);
