import React, {Component} from 'react';
import './setting.css'
import SettingList from '../../components/settingList/index'

import ZERO from '../../config/zero'

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [
        {name: '账号管理', id: 'userManage'},
        {name: '账号与安全', id: 'userSecurity'}
      ],
      list2: [
        {name: '推送通知管理', id: 'sPush'},
        {name: '屏蔽设置', id: 'sIgnore'},
        {name: '隐私设置', id: 'sSelf'},
        {name: '通用设置', id: 'sCommon'},
      ],
      list3: [
        {name: '退出登录', id: 'logout'},
      ]
    }
  }

  // 处理按钮的点击
  handlePostMsg = (name) => {
    console.log(name);
    if(name === 'userManage'){
      return this.props.history.push('/accountManage');
    }else if(name == 'userSecurity'){
      return this.props.history.push('/userSecurity');
    }
    ZERO.Toast('该权限暂时还未开放，请等待版本更新通知', 1.5);
  };

  // 退出登录
  handleLogout = () => {
    ZERO.clearLoginInfo();
    this.props.history.push('/');
  };


  render() {
    return (
      <div className={'setting'}>
        <SettingList handlePostMsg={this.handlePostMsg} list={this.state.list1} />
        <SettingList handlePostMsg={this.handlePostMsg} list={this.state.list2} />
        <div onClick={this.handleLogout} className={'setting_logout'}>
          退出登录
        </div>
      </div>
    );
  }
}

export default Setting;
