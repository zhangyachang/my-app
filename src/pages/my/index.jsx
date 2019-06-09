import React, { Component } from 'react';
import './my.css'
import TabBar from '../../components/tabBar/index'
import ZERO from '../../config/zero'
import config from '../../config/config'
import { Redirect } from 'react-router-dom'
import { getUserInfoByUid, getUserPlanNumAndMore } from '../../config/utils'

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
      },
      planInfo: {
        planNum: '',
        ssNum: '',
        friendNum: '',
        fansNum: '',
      }
    }
  }

  handleUserInfo = () => {
    this.props.history.push('/userInfo');
  };

  // 点击上面四个tabbar
  handleList = (type) => {
    if (type === 'plan') {
      this.props.history.push('/myPlanLogs');
    } else if (type === 'ss') {
      this.props.history.push('/mySsLogs');
    } else {
      ZERO.noNextToast();
    }
  };

  // 点击成长记录
  handleGoLogs = () => {
    console.log(`111`);
    // this.props.history.push('/operatorLogs');
    this.props.history.push('/charts');
  };

  // 点击设置
  handleGoSetting = () => {
    this.props.history.push('/setting');
  };

  // 查询用户信息 byId
  searchUserInfoById = (uid) => {
    getUserInfoByUid(uid)
      .then(res => {
        ZERO.hideToast();
        if (res.data.length === 0) {
          // 清空登录信息 重定向到登录页面
          ZERO.clearLoginInfo();
          ZERO.Toast('登录信息过期，请重新登录');
          return <Redirect to='/404' />
        } else {
          this.setState({
            userInfo: res.data[0]
          });
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

  // 检测是否可以实现手机震动
  handleShake = () => {
    if (navigator.vibrate) {
      navigator.vibrate(300);
    } else if (navigator.webkitVibrate) {
      navigator.webkitVibrate(300);
    }
  };

  // 查询个人发表计划和说说和好友的数量
  getMyPlanInfo = (user) => {
    getUserPlanNumAndMore(user)
      .then(res => {
        ZERO.hideToast();
        if (res.status === 200) {
          return this.setState({
            planInfo: {
              planNum: res.data.plan_num,
              ssNum: res.data.ss_num,
              friendNum: 0,
              fansNum: 0
            }
          });
        }
        if (res.status === 400) {
          ZERO.Toast('获取用户计划数量等信息失败');
        }
        if (res.status === 500) {
          ZERO.Toast('服务器繁忙，请稍后再试');
        }
      })
      .catch(err => {
        console.log(`报错信息`);
        console.log(err);
      })
  };

  componentDidMount() {
    let user = ZERO.getLocalStorageItem('user') || ZERO.getSessionStorage('user');
    this.searchUserInfoById(user);
    this.getMyPlanInfo(user);
  }

  render() {
    const userInfo = this.state.userInfo;
    const planInfo = this.state.planInfo;
    return (
      <div className={'my'}>
        <div className={'my_info'}>

          <div onClick={this.handleUserInfo} className={'my_info_top flex'}>

            <div className={'my_info_top_avatar flex-shirink'}>
              <img src={`${config.url}${userInfo.avatar}`} alt="" />
            </div>

            <div className={'my_info_person flex'}>
              <span className={'my_info_username'}>{userInfo.nick}</span>
              <p className='my_info_person_id'>
                <span className='my_info_person_iddes'>id号 </span>
                <span className='my_info_person_idval ellipse'> {userInfo.uid}</span>
              </p>
            </div>

          </div>

          <div className={'my_info_list'}>
            <div onClick={this.handleList.bind(this, 'plan')} className={'my_info_list_item'}>
              <span>{planInfo.planNum}</span>
              <p>计划</p>
            </div>
            <div onClick={this.handleList.bind(this, 'ss')} className={'my_info_list_item'}>
              <span>{planInfo.ssNum}</span>
              <p>说说</p>
            </div>
            <div onClick={this.handleList.bind(this, 'friend')} className={'my_info_list_item'}>
              <span>{planInfo.friendNum}</span>
              <p>好友</p>
            </div>
            <div onClick={this.handleList.bind(this, 'fans')} className={'my_info_list_item'}>
              <span> {planInfo.fansNum}</span>
              <p>粉丝</p>
            </div>

          </div>
        </div>

        <div onClick={this.handleShake} className={'my_item'}>
          <i className={'iconfont iconcaogaoxiang'} />
          <span className={'my_item_con'}>草稿箱</span>
        </div>

        <div onClick={this.handleGoLogs} className={'my_item'}>
          <i className={'iconfont icondengyu'} />
          <span className={'my_item_con'}>成长记录</span>
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
