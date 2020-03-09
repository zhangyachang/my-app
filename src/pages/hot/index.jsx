import React, {Component} from 'react';
import './hot.css';
import HotInput from '../../components/searchInput/index'
import ZERO from '../../config/zero'
import {Toast} from 'antd-mobile'

class Hot extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      searchHistory: ZERO.getLocalStorageItem('searchHistory')
    };
  }

  // 子组件获取焦点触发
  handleOnFocus = () => {
    // console.log('获取焦点事件触发');
  };

  // 子组件input值改变触发
  handleOnchange = (e) => {
    // console.log(e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  };

  // 点击删除搜索历史
  handleDeleteSearchHistory = () => {
    ZERO.removeLocalStorageItem('searchHistory');
    this.setState({
      searchHistory: ZERO.getLocalStorageItem('searchHistory')
    });
  };

  // 点击关键字信息进行搜索
  searchSsByKeyword = (keyword) => {
    console.log();
    this.props.history.push(`/?search=${keyword.trim()}`);
  };

  // 点击搜索按钮
  handleSubmit = () => {
    if(!this.state.searchValue.trim()){
      Toast.info('请输入值再点击搜索哦！');
      return ;
    }
    // 本地存储搜索历史
    let searchArr = ZERO.getLocalStorageItem('searchHistory');
    if(searchArr){
      searchArr.push(this.state.searchValue);
    }else{
      searchArr = [this.state.searchValue];
    }
    // console.log(searchArr);
    searchArr = [...new Set([...searchArr])];
    ZERO.setLocaStorage({
      searchHistory: searchArr
    });
    this.props.history.push(`/?search=${this.state.searchValue.trim()}`);
  };

  render() {
    return (

      <div className={'hot_search'}>

        <div className={'hs_header flex flex-item'}>
          <HotInput onFocus={this.handleOnFocus} onChange={this.handleOnchange} />
          <span onClick={this.handleSubmit} className={this.state.searchValue?'hs_search hs_search_active':'hs_search' }>搜索</span>
        </div>

        <div className={'hs_title'}>
          <p className={'hs_title_title flex'}>
            <span>历史搜索</span>
            <i onClick={this.handleDeleteSearchHistory} className={'iconfont iconziyuan'} />
          </p>
        </div>

        <div className={'hs_history flex'}>
          {
            this.state.searchHistory &&  this.state.searchHistory.map((item, index) => {
              return (<p key={index} onClick={this.searchSsByKeyword.bind(this, item)}>
                {item}
              </p>)
            })
          }
          {/* <p>科比</p>
          <p>张亚昌</p>
          <p>成功</p>
          <p>目标</p>
          <p>javaScript设计模式</p> */}
        </div>

        <div className={'hs_title'}>
          <p className={'hs_title_title flex'}>
            <span>热门搜索</span>
          </p>
        </div>

        <div className={'hs_history flex hs_hot_history'}>
          <p>搜索内容</p>
          <p>66万奔驰</p>
          <p>商品类</p>
          <p>淘宝</p>
          <p>京东</p>
        </div>

      </div>
    );
  }
}

export default Hot;
