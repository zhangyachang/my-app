import React, { Component } from 'react';
import './personalPage.css'
import PlanItem from '../../components/planItem/index'
import SearchInput from '../../components/searchInput/index'
import LoadMore from '../../components/loadMore/index'
import { getUserInfoByUid, getAllSs, getSsSearchUser } from '../../config/utils'
import ZERO from '../../config/zero'
import config from '../../config/config'

class PersonalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCover: false, // 是否展示遮罩层
      userInfo: {},
      pageIndex: 1,
      planList: [],
      isMore: true,
      searchValue: '', // 搜索框的内容
    }
  }

  // 点击搜索键
  handleSearch = () => {
    console.log('点击了搜索键');
    this.setState({
      isShowCover: true
    });
  };

  // 点击了三个点
  handleMore = () => {
    console.log('点击了更多');
  };

  // 取消遮罩层
  handleCancelCover = () => {
    console.log('取消遮罩层');
    this.setState({
      isShowCover: false
    });
  };

  // 获取用户信息
  searchUserInfo = async () => {
    let { userId } = ZERO.parseUrl(this.props.location.search);
    if (!userId) {
      return ZERO.Toast('请输入正确的网址');
    }
    console.log(userId);
    let result = await getUserInfoByUid(userId);
    console.log('获取到的结果');
    console.log(result);
    if (result.status === 200) {
      this.setState({
        userInfo: result.data[0]
      });
    } else if (result.status === 400) {
      ZERO.Toast('查询用户信息失败');
    } else if (result.status === 500) {
      return ZERO.Toast('服务器繁忙，获取用户信息失败');
    }
  };

  // 获取列表项
  searchSsList = async () => {
    let { userId } = ZERO.parseUrl(this.props.location.search);
    if (!userId) {
      return ZERO.Toast('请输入正确的网址');
    }
    if(!this.state.isMore){
      return ;
    }
    let result = await getAllSs(userId, this.state.pageIndex, true);
    if (result.status === 200) {
      let obj = this.state.planList;
      // 没有更多了
      if(!result.data.length){
        return this.setState({
          isMore: false
        });
      }
      this.setState({
        planList: obj.concat(result.data),
        isMore: true,
        pageIndex: this.state.pageIndex + 1
      });
    } else if (result.status === 400) {
      return ZERO.Toast('查询说说列表失败');
    } else if (result.status === 500) {
      return ZERO.Toast('服务器繁忙，获取说说列表失败');
    }
  };

  // 点击加载更多
  loadMore = () => {
    this.searchSsList();
  };

  // 搜索一个用户的一些说说
  searchUserSsByKeyword = async () => {
    let uid = ZERO.getUid();
    if(!uid){
      return ZERO.Toast('用户信息过期，请重新登录');
    }
    if(!this.state.searchValue.trim()){
      return ZERO.Toast('搜索内容不能为空');
    }
    let result = await getSsSearchUser({
      search: this.state.searchValue,
      page: 1,
      uid: uid
    });
    console.log('搜索结果');
    console.log(result);
    if(result.status === 200){

    }else if(result.status === 400){
      ZERO.Toast('搜索失败请稍后再试');
    }else if(result.status === 500){
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
    
  };

  // 获得焦点
  handleFocus = () => {
    console.log('获得焦点');
    document.onkeydown =(e) => {
      console.log(e.keyCode === 13);
      this.searchUserSsByKeyword();
    }
  };

  // input框的事件
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      searchValue: e.target.value
    });
  };

  handleBlur = () => {
    document.onkeydown = null;
  };

  componentDidMount() {
    // 查询用户信息
    this.searchUserInfo();
    this.searchSsList();
  };

  render() {
    const userInfo = this.state.userInfo;

    return (
      <div className={'personal_page'}>

        <div className={'pp_header'}>

          <div className={'pp_header_top clearfix'}>
            <div className={'pp_header_top_right'}>
              <i onClick={this.handleSearch} className={'iconfont iconsousuo'} />
              <i onClick={this.handleMore} className={'iconfont iconmore'} />
            </div>
          </div>

          <div className={'pp_avatar flex flex-center'}>
            <img src={config.url + userInfo.avatar} alt="" />
          </div>
          <div className={'pp_nick'}>{userInfo.nick}</div>
          <div className={'pp_signature ellipse'}>{userInfo.signature}</div>
        </div>
        <div className={'plan_list'}>
          {
            this.state.planList.map(item => {
              return (<PlanItem key={item.id} data={item}/>)
            })
          }
        </div>
        
        <LoadMore loadTips={ this.state.isMore?'点击加载更多':'已经没有更多了'} loadMore={this.loadMore} />

        {/*遮罩层*/}
        {
          this.state.isShowCover && <div className={'pp_cover flex'}>
            <div className={'pp_cover_header flex'}>
              <SearchInput onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.handleBlur} />
              <span onClick={this.handleCancelCover} className={'pp_cover_header_cancel'}> 取消 </span>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default PersonalPage;
