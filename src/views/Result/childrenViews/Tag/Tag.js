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

    this.type = 9;

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
        tagData: res.data
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.tagData.has_more) return;
    const lastId = this.state.tagData.cursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState((prevState) => ({
        tagData: {
          ...prevState.tagData,
          data: [...prevState.tagData.data, res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  render() {
    return (
      <div className="resultTag-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.tagData.data ? this.state.tagData.data.map((item, index) => (
            <Fragment key={index}>
              {item.result_type === 9 ?
                <TagItem tagItemData={item.result_model}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.tagData.data && this.state.tagData.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(Tag);
