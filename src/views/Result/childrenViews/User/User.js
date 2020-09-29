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

    this.type = 1;

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
        userData: res.data
      })
    })
  }

  handlePullUpLoad() {
    if(!this.state.userData.has_more) return;
    const lastId = this.state.userData.cursor;
    getResultData(this.type, this.props.searchKey, lastId).then(res => {
      this.setState((prevState) => ({
        userData: {
          ...prevState.userData,
          data: [...prevState.userData.data, ...res.data.data],
          cursor: res.data.cursor,
          has_more: res.data.has_more
        }
      }))
    })
  }

  render() {
    return (
      <div className="resultUser-wrapper">
        <Scroll pullUpLoad={this.pullUpLoad} handlePullUpLoad={this.handlePullUpLoad.bind(this)}>
          {this.state.userData.data ? this.state.userData.data.map((item, index) => (
            <Fragment key={index}>
              {item.result_type === 1 ?
                <UserItem userItemData={item.result_model}/>
              : undefined}
            </Fragment>
          )) : undefined}
          <div style={{display: this.state.userData.data && this.state.userData.has_more ? "block" : "none"}}>
            <Loading/>
          </div>
        </Scroll>
      </div>
    )
  }

}

export default withRouter(User);
