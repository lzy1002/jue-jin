import React from "react";
import {Link} from "react-router-dom";

import "./Search.styl";

import {getSearchSlider} from "../../api/search.js";

import Scroll from "../../components/common/Scroll/Scroll.js";

import SearchBar from "../../components/content/SearchBar/SearchBar.js";
import ImageSlider from "../../components/content/ImageSlider/ImageSlider.js";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderData: []
    };

    this.tagBoxIsShow = false;
  }

  componentDidMount() {
    this.getSearchSlider();
  }

  getSearchSlider() {
    getSearchSlider().then(res => {
      console.log(res);
      this.setState({
        sliderData: res.data.data.advertisementCard.items
      })
    })
  }

  render() {
    return (
      <div className="search-wrapper">
        <SearchBar tagBoxIsShow={this.tagBoxIsShow}/>
        <div className="search-content">
          <Scroll>
            <ImageSlider>
              {this.state.sliderData.map((item, index) => (
                <div key={item.id} style={{backgroundImage: `url(${item.imageUrl})`}}></div>
              ))}
            </ImageSlider>

            <div className="option-box">
              <div className="option-item">
                <i className="iconfont icon-wenzhang"></i>
                <span>文章榜</span>
              </div>
              <Link to="/authors" className="option-item">
                <i className="iconfont icon-huangguan"></i>
                <span>作者榜</span>
              </Link>
              <div className="option-item">
                <i className="iconfont icon-kanyikantubiao"></i>
                <span>看一看</span>
              </div>
              <Link to="/topics" className="option-item">
                <i className="iconfont icon-huati"></i>
                <span>话题广场</span>
              </Link>
              <div className="option-item">
                <i className="iconfont icon-laba"></i>
                <span>活动</span>
              </div>
            </div>

          </Scroll>
        </div>
      </div>
    )
  }

}

export default Search;
