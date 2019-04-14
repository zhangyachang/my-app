import React, {Component} from 'react';
import './regist.css'
import url from 'url'
import TopTips from '../../components/topTips/index'
import {InputItem} from "antd-mobile";


class Regist extends Component {
  constructor(props){
    super(props);
    const {type} = url.parse(this.props.location.search, true).query;
    this.state = {
      type: type,
      user: ''
    }
  }

  // 用户名  / 手机号 / 密码
  handleUser = (e) => {
    console.log('用户名改变了');
    // console.log(e.target);
    console.log(this);

    // this.setState({
    //   user: e.target.value
    // })
  };

  handleChange = (e) => {
    console.log('触发了');
    console.log(e.target);
  };


  render() {
    const state = this.state;
    let info = {};
    if(state.type === 'email'){
      info.value = '邮箱';
    }else if(state.type === 'phone'){
      info.value = '手机号';
    }else{

    }
    console.log('render');
    console.log(this);
    return (
      <div className={'rg_info'}>
        <TopTips tips={'完善注册信息'} />
        <div className={'ri_wrap'}>
          <InputItem placeholder={`请请输入您的${info.value}`} ref={(user) => this.user = user} onChange={this.handleUser}>{info.value}</InputItem>
          {
            state[state.type] && <div className={'rg_checkcode'}>获取验证码</div>
          }
          <InputItem type={"password"} placeholder={`请请输入您的密码`} name={'password'} onChange={this.handleChange} >输入密码</InputItem>
          <InputItem type={"password"} placeholder={`再次输入您的密码`} name={'repetpas'} onChange={this.handleChange}>确认密码</InputItem>
          <InputItem type={'number'} placeholder={`输入验证码`} name={'checkCode'} onChange={this.handleChange}>验证码</InputItem>
        </div>

      </div>
    );
  }

}

export default Regist;
