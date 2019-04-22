import React, {Component} from 'react';
import './userInfo.css'
import ZERO from '../../../config/zero'
import {$axios} from "../../../config/server";
import config from '../../../config/config'
import {Redirect} from 'react-router-dom'

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  handleGo = (name) => {
    console.log(name);
    console.log(this.state);
    const value = this.state.userInfo.name;
    this.props.history.push({
      pathname: `/changeUserInfo`,
      state: {
        [name]: value
      }
    });
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
      <div className={'user_info'}>

        <div onClick={this.handleGo.bind(this, 'avatar')} className={'uin_item'}>
          <p className={'uin_item_ti'}>头像</p>
          <div className={'uni_item_more'}>
            <img src={`${config.url}${userInfo.avatar}`} alt=""/>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>

        <div onClick={this.handleGo.bind(this, 'nick')} className={'uin_item'}>
          <p className={'uin_item_ti'}>昵称</p>
          <div className={'uni_item_more'}>
            <p>{userInfo.nick}</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>

        <div onClick={this.handleGo.bind(this, 'sex')} className={'uin_item'}>
          <p className={'uin_item_ti'}>性别</p>
          <div className={'uni_item_more'}>
            <p>{userInfo.sex?'男':'女'}</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>

        <div onClick={this.handleGo.bind(this, 'signature')} className={'uin_item uni_signature'}>
          <p className={'uin_item_ti'}>签名</p>
          <div className={'uni_item_more'}>
            <p>{userInfo.signature}</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>

      </div>
    );
  }
}

export default UserInfo;
