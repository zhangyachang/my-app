import React, {Component} from 'react';
import './my.css'
import TabBar from '../../components/tabBar/index'
import ZERO from '../../config/zero'
import {$axios} from "../../config/server";
import config from '../../config/config'
import {Redirect} from 'react-router-dom'

class My extends Component {
  constructor(props){
    super(props);

    this.state = {
      userInfo: {

      }
    }

  }

  handleUserInfo = () => {
    this.props.history.push('/userInfo');
  };


  // 点击上面四个tabbar
  handleList = () => {
    console.log('1111');
    ZERO.noNextToast();
  };

  // 点击设置
  handleGoSetting = () => {
    this.props.history.push('/setting');
  };

  searchUserInfoById = (uid) => {
    $axios({
      url: '/bs/api/user',
      params: {
        uid: uid
      }
    })
      .then(res => {
        if(res.data.length === 0){
          // 清空登录信息 重定向到登录页面
          ZERO.clearLoginInfo();
          ZERO.Toast('登录信息过期，请重新登录');
          return <Redirect to='/404'/>
        }else{
          this.setState({
            userInfo: res.data[0]
          })
        }
      })
      .catch(() => {})
  };

  componentDidMount() {
    let user = ZERO.getLocalStorageItem('user') || ZERO.getSessionStorage('user');
    this.searchUserInfoById(user);
  }

  render() {
    const userInfo = this.state.userInfo;
    return (
      <div className={'my'}>
        <div className={'my_info'}>

          <div onClick={this.handleUserInfo} className={'my_info_top flex'}>

            <div className={'my_info_top_avatar flex-shirink'}>
              <img src={`${config.url}${userInfo.avatar}`} alt=""/>
            </div>

            <div className={'my_info_person flex'}>
              <span className={'my_info_username'}>{userInfo.nick}</span>
              <p>id号 {userInfo.uid}</p>
            </div>

          </div>

          <div className={'my_info_list'}>
            <div onClick={this.handleList.bind(this, 'plan')} className={'my_info_list_item'}>
              <span>1</span>
              <p>计划</p>
            </div>
            <div onClick={this.handleList.bind(this, 'hero')} className={'my_info_list_item'}>
              <span>1</span>
              <p>关注</p>
            </div>
            <div onClick={this.handleList.bind(this, 'friend')} className={'my_info_list_item'}>
              <span>1</span>
              <p>好友</p>
            </div>
            <div onClick={this.handleList.bind(this, 'fans')} className={'my_info_list_item'}>
              <span>0</span>
              <p>粉丝</p>
            </div>

          </div>
        </div>

        <div className={'my_item'}>
          <i className={'iconfont iconcaogaoxiang'} />
          <span className={'my_item_con'}>草稿箱</span>
        </div>

        <div onClick={this.handleGoSetting} className={'my_item'}>
          <i className={'iconfont iconshezhi'} />
          <span className={'my_item_con'}>设置</span>
        </div>

        <TabBar />
      </div>
    );
  }
}

export default My;
