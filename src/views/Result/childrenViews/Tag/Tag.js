import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./Tag.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";
import TagItem from "../../../../components/content/TagItem/TagItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class Tag extends React.Component {
  static defaultProps = {
    searchKey: ""
  };

  static propTypes = {
    searchKey: propTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      tagData: {}
    };

    this.type = "TAG";

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
      console.log(res);
      this.setState({
        tagData: res.data.data.result
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.tagData.pageInfo.hasNextPage) return;
    const lastId = this.state.tagData.pageInfo.endCursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      console.log(res);
      this.setState({
        tagData: {
          edges: [...this.state.tagData.edges, ...res.data.data.result.edges],
          pageInfo: res.data.data.result.pageInfo
        }
      })
    })

  }

  render() {
    return (
      <div className="resultTag-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.tagData.edges ? this.state.tagData.edges.map((item, index) => (
            <Fragment key={index}>
              {item.node.type === "TagSearchResultItem" ?
                <TagItem tagItemData={item.node.tag}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.tagData.edges && this.state.tagData.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(Tag);
