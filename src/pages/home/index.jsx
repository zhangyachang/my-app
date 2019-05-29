import React, { Component } from 'react';
import './home.css'
import HotSearch from '../../components/searchInput/index'
import PlanItem from '../../components/planItem/index'
import TabBar from '../../components/tabBar/index'
import { getSs, getSsLogin } from '../../config/utils'
import LoadMore from '../../components/loadMore/index.jsx'
import ZERO from '../../config/zero';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssList: [],
      page: 1,
      isLoadMoreShow: false, // 是否显示loadMore
      loadTips: '点击加载更多'
    }
  }

  // 获取焦点跳转到搜索列表历史中
  handleOnFocus = () => {
    // console.log('父组件触发了事件');
    this.props.history.push('/hot');
  };

  // 添加说说  
  addSS = () => {
    this.props.history.push('/ss');
  };

  /**
   * 获取说说列表 分为登录和未登录情况
   */
  getSsList = async (page, uid) => {
    let result;
    if (uid) {
      result = await getSsLogin(page, uid);
    } else {
      result = await getSs(page);
    }
    if (result.status === 200) {
      if (result.data.length === 0) {
        this.setState({
          isLoadMoreShow: true,
          loadTips: '没有更多数据了'
        });
      } else {
        var c = this.state.ssList.concat(result.data);
        this.setState({
          ssList: c,
          page: this.state.page + 1,
          isLoadMoreShow: true
        });
      }
    };

    if (result.status === 400) {
      return ZERO.Toast('获取说说列表失败');
    }
    if (result.status === 500) {
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
  }

  handleLoadMore = () => {
    console.log('点击加载更多');
    let uid = ZERO.getUid();
    this.getSsList(this.state.page, uid);
  };

  componentDidMount() {
    console.log('查询用户说说的发表');
    let uid = ZERO.getUid();
    console.log(uid);
    if (uid) {
      console.log('用户id存在');
      this.getSsList(1, uid);
    } else {
      console.log('用户id不存在');
      this.getSsList(1); // 获取页面中的数据
    }
  }


  render() {
    return (
      <div className={'home'}>

        <div className={'ho_header flex flex-item'}>
          <div className={'ho_logo'}>
            <img src={require('../../static/img/logo/logo.png')} alt="" />
          </div>
          <HotSearch onFocus={this.handleOnFocus} />
          <i onClick={this.addSS} className={'iconfont iconjiahao'}></i>

          {/*<div className={'ho_input_wrap flex-one flex flex-item'}>*/}
          {/*  <input className={'flex-one'} onFocus={this.handleOnFocus} type="text" placeholder={'您要搜索的内容'}/>*/}
          {/*  <i className={'p_icon iconfont iconsousuo'}></i>*/}
          {/*</div>*/}
        </div>

        <div className={'ho_list'}>
          {
            this.state.ssList.map((item) => <PlanItem key={item.id} data={item} />)
          }

          {
            this.state.isLoadMoreShow && <LoadMore loadTips={this.state.loadTips} loadMore={this.handleLoadMore} />
          }
        </div>


        <TabBar />

      </div>
    );
  }
}

export default Home;
