import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from "react-router-dom";

import "./Result.styl";

import actionCreator from "../../store/actionCreator/index.js";

import All from "./childrenViews/All/All.js";
import Article from "./childrenViews/Article/Article.js";
import Tag from "./childrenViews/Tag/Tag.js";
import User from "./childrenViews/User/User.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import TabControl from "../../components/content/TabControl/TabControl.js";

class Result extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      searchKey: "",
      searchVal: ""
    };

    this.titleList = [
      {path: "/result/all", title: "综合"},
      {path: "/result/article", title: "文章"},
      {path: "/result/tag", title: "标签"},
      {path: "/result/user", title: "用户"}
    ];
    this.arrowIsShow = false;

  }

  handleInputChange(e) {
    const searchVal = e.target.value.trim();
    this.setState({
      searchVal
    });

    if(!searchVal) {
      this.setState({
        searchKey: ""
      })
    }
  }

  handleInputKeyUp(e) {
    if(e.nativeEvent.keyCode !== 13) return;
    const searchKey = e.target.value.trim();
    if(!searchKey) return;
    this.setState({
      searchKey
    });
    this.props.addSearchHistory(searchKey);
  }

  handleClearInputClick() {
    this.setState({
      searchKey: "",
      searchVal: ""
    })
  }

  handleHistoryItemClick(searchKey) {
    this.setState({
      searchKey,
      searchVal: searchKey
    });
    this.props.addSearchHistory(searchKey);
  }

  handleRemoveHistoryClick(e, historyIndex) {
    this.props.removeSearchHistory(historyIndex);
    e.stopPropagation();
  }

  handleClearHistoryClick() {
    this.props.clearSearchHistory();
  }

  handleBackClick() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="result-wrapper">
        <div className="result-header">
          <div className="back" onClick={this.handleBackClick.bind(this)}>
            <i className="iconfont icon-fanhui"></i>
          </div>
          <div className="search-box">
            <input type="text" placeholder="搜索文章、用户、标签" value={this.state.searchVal} onChange={this.handleInputChange.bind(this)} onKeyUp={this.handleInputKeyUp.bind(this)}/>
          </div>
          {this.state.searchVal ?
            <div className="clear" onClick={this.handleClearInputClick.bind(this)}>
              <i className="iconfont icon-chuyidong1-copy"></i>
            </div>
          : undefined}
        </div>

        {this.state.searchKey ?
          <div className="result-box">
            <div className="tabControl-box">
              <TabControl titleList={this.titleList} arrowIsShow={this.arrowIsShow}/>

              <Switch>
                <Route path="/result/all" render={() => (
                  <All searchKey={this.state.searchKey}/>
                )}/>
                <Route path="/result/article" render={() => (
                  <Article searchKey={this.state.searchKey}/>
                )}/>
                <Route path="/result/tag" render={() => (
                  <Tag searchKey={this.state.searchKey}/>
                )}/>
                <Route path="/result/user" render={() => (
                  <User searchKey={this.state.searchKey}/>
                )}/>
                <Redirect from="/result" to="/result/all"/>
              </Switch>

            </div>
          </div>
        : <div className="history-box">
            {this.props.searchHistory && this.props.searchHistory.length ?
              <Scroll>
                <ul>
                  {this.props.searchHistory.map((item, index) => (
                    <li key={index} className="history-item border-1px" onClick={this.handleHistoryItemClick.bind(this, item)}>
                      <i className="iconfont icon-history"></i>
                      <p>{item}</p>
                      <i className="iconfont icon-chuyidong1-copy" onClick={e => this.handleRemoveHistoryClick.call(this, e, index)}></i>
                    </li>
                  ))}
                </ul>
                <div className="clear-history" onClick={this.handleClearHistoryClick.bind(this)}>
                  清空搜索历史
                </div>
              </Scroll>
              : undefined}
            </div>
        }

      </div>
    )
  }

}

export default connect(state => ({...state.result}), {...actionCreator.result})(Result);
