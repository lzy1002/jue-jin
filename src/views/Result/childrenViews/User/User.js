import React, {Fragment} from "react";
import {withRouter} from "react-router-dom";
import propTypes from "prop-types";

import "./User.styl";

import {getResultData} from "../../../../api/result.js";

import Scroll from "../../../../components/common/Scroll/Scroll.js";

import UserItem from "../../../../components/content/UserItem/UserItem.js";
import Loading from "../../../../components/content/Loading/Loading.js";

class User extends React.Component {
  static defaultProps = {
    searchKey: ""
  };

  static propTypes = {
    searchKey: propTypes.string
  };


  constructor(props) {
    super(props);

    this.state = {
      userData: {}
    };

    this.type = "USER";

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
        userData: res.data.data.result
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.userData.pageInfo.hasNextPage) return;
    const lastId = this.state.userData.pageInfo.endCursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      console.log(res);
      this.setState({
        userData: {
          edges: [...this.state.userData.edges, ...res.data.data.result.edges],
          pageInfo: res.data.data.result.pageInfo
        }
      })
    })

  }

  render() {
    return (
      <div className="resultUser-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.userData.edges ? this.state.userData.edges.map((item, index) => (
            <Fragment key={index}>
              {item.node.type === "UserSearchResultItem" ?
                <UserItem userItemData={{user: item.node.user}}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.userData.edges && this.state.userData.pageInfo.hasNextPage ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(User);
