import React, {Component} from 'react';
import './regist.css'
import url from 'url'
import TopTips from '../../components/topTips/index'
import {Button} from "antd-mobile";
import ZERO from '../../config/zero'


class Regist extends Component {
  constructor(props){
    super(props);
    const {type} = url.parse(this.props.location.search, true).query;
    this.state = {
      type: type, // 这里的type 就是  email  phone
      user: '',
      password: '',
      password1: '',
      checkCode: ''
    }
  }

  handleChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  // 处理删除按钮
  handleDelete = (e) => {
    console.log(e.target);
    console.log(e.target);
    e.target.value = '';
  };

  // 点击注册
  handleRegist = () => {
    console.log('点击注册');
  };

  // 获取验证码
  getCheckCode = () => {
    console.log('点击获取验证码');
    if(this.state.type === 'email'){
      let a = ZERO.regEmail(this.state.user);
      console.log(a);

    }else if(this.state.type === 'phone'){
      ZERO.regPhone(this.state.user);
    }

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

          <div className={'ri_wrap_inpwrap flex flex-item'}>
            <p>邮箱</p>
            <input className={'flex-one'} value={this.state.user} onChange={this.handleChange} name={'user'} placeholder={'请输入您的邮箱'} type="text"/>
            { this.state.user && <i onClick={this.handleDelete} name="user" className={'iconfont iconfork'} /> }
          </div>
          <div className={'ri_wrap_inpwrap flex flex-item'}>
            <p>输入密码</p>
            <input className={'flex-one'} value={this.state.password} onChange={this.handleChange} name={'password'} placeholder={'请输入您的邮箱'} type="text"/>
            { this.state.password && <i className={'iconfont iconfork'} /> }
          </div>
          <div className={'ri_wrap_inpwrap flex flex-item'}>
            <p>确认密码</p>
            <input className={'flex-one'} value={this.state.password1} onChange={this.handleChange} name={'password1'} placeholder={'请输入您的邮箱'} type="text"/>
            { this.state.password1 && <i className={'iconfont iconfork'} /> }
          </div>
          <div className={'ri_wrap_inpwrap flex flex-item'}>
            <p>验证码</p>
            <input className={'flex-one'} value={this.state.checkCode} onChange={this.handleChange} name={'checkCode'} placeholder={'请输入您的邮箱'} type="text"/>
            { this.state.user && <span onClick={this.getCheckCode} className={'ri_get_code'}>获取验证码</span> }
            { this.state.checkCode && <i className={'iconfont iconfork'} /> }
          </div>

        </div>
        <Button onClick={this.handleRegist} className="btn rg_regbtn" type="primary">注册</Button>
      </div>
    );
  }

}

export default Regist;
