import React, {Component} from 'react';
import './regist.css'
import url from 'url'
import TopTips from '../../components/topTips/index'
import {Button} from "antd-mobile";
import ZERO from '../../config/zero'
import {server} from '../../config/server'


class Regist extends Component {
  constructor(props){
    super(props);
    const {type} = url.parse(this.props.location.search, true).query;
    this.state = {
      type: type, // 这里的type 就是  email  phone
      user: '', // 账号
      password: '', // 第一次的密码
      password1: '', // 第二次的密码
      checkCode: '', // 验证码
      passShow: [false, false] // 账号和密码是否可以显示

    }
  }

  // 四个input框改变事件
  handleChange = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  // 处理删除按钮
  handleDelete = (key) => {
    this.setState({
      [key]: ''
    });
  };

  // 第二个input框失去焦点
  passpowd1Blur = () => {
    // console.log('失去焦点');
    if(this.state.password !== this.state.password1){
      ZERO.Toast('两次密码输入不一致，请重新输入');
    }
  };

  // 点击注册
  handleRegist = () => {
    if(this.isCheckUndefined()){
      // 所有项不为空
      const {type, user, password, checkCode} = this.state;
      console.log(type, user, password, checkCode);

      /*
      $axios({
        url: '/user',
        method: 'POST',
        data: {
          type,
          user: user,
          password,
          checkCode
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

       */
    }

  };

  // 点击是否可以显示密码
  handleShowPas = (index) => {
    console.log(index);
    this.state.passShow[index] = !this.state.passShow[index] ;
    this.setState({
      passShow: this.state.passShow
    });
  };

  // 获取验证码
  getCheckCode = () => {
    console.log('点击获取验证码');
    if(this.state.type === 'email'){

      if(ZERO.regEmail(this.state.user)){
        // 正确的邮箱
        if(this.isCheckUndefined()){
          // 所有项不为空

        }
      }
      ZERO.Toast('请输入正确的邮箱');
    }else if(this.state.type === 'phone'){
      if(ZERO.regPhone(this.state.user)){
        // 正确的手机号码
        if(this.isCheckUndefined()){
          // 不为空
        }
      }
      ZERO.Toast('请输入正确的手机号码');
    }
  };

  // 检验是否有空值
  isCheckUndefined = () => {
    const state = this.state;
    if(!(this.state.type === 'email' || this.state.type === 'phone')){
      // 这里是从不合法的地方过来的
      return ZERO.Toast('当前网址路径异常!!!请输入正确的网址');
    }
    if(!state.user){
      return ZERO.Toast('请输入正确的邮箱或手机号码');
    }
    if(!state.password){
      return ZERO.Toast('密码不能为空');
    }
    if(state.password !== state.password1){
      return ZERO.Toast('两次密码不一致');
    }
    if(!state.checkCode){
      return ZERO.Toast('验证码不能为空');
    }
    return true;
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
    return (
      <div className={'rg_info'}>
        <TopTips tips={'完善注册信息'} />
        <div className={'ri_wrap'}>

          <div className={'ri_wrap_inpwrap'}>
            <p>邮箱</p>
            <input className={'flex-one'} value={this.state.user} onChange={this.handleChange} name={'user'} placeholder={'请输入您的邮箱'} type="text"/>
            { this.state.user && <i onClick={this.handleDelete.bind(this, 'user')}  className={'iconfont iconfork'} /> }
          </div>
          <div className={'ri_wrap_inpwrap ri_wrap_inpwrap_pass'}>
            <p>输入密码</p>
            <input className={'flex-one'}
                   value={this.state.password}
                   onChange={this.handleChange} name={'password'}
                   placeholder={'请输入您的密码'}
                   type={this.state.passShow[0]?'text':'password'} />
            { this.state.password && <i onClick={this.handleDelete.bind(this, 'password')} className={'iconfont iconfork'} /> }
            {
              this.state.password?
                this.state.passShow[0]?
                  <i onClick={this.handleShowPas.bind(this, 0)} className={'iconfont iconyanjing3'} />:
                  <i onClick={this.handleShowPas.bind(this, 0)} className={'iconfont iconbiyan1'} />
              : ""
            }
          </div>
          <div className={'ri_wrap_inpwrap ri_wrap_inpwrap_pass'}>
            <p>确认密码</p>
            <input className={'flex-one'} value={this.state.password1} onBlur={this.passpowd1Blur} onChange={this.handleChange} name={'password1'} placeholder={'再次确认密码'}
                   type={this.state.passShow[1]?'text':'password'}/>
            { this.state.password1 && <i onClick={this.handleDelete.bind(this, 'password1')} className={'iconfont iconfork'} /> }
            {
              this.state.password1?
                this.state.passShow[1]?
                  <i onClick={this.handleShowPas.bind(this, 1)} className={'iconfont iconyanjing3'} />:
                  <i onClick={this.handleShowPas.bind(this, 1)} className={'iconfont iconbiyan1'} />
                : ""
            }
          </div>
          <div className={'ri_wrap_inpwrap'}>
            <p>验证码</p>
            <input className={'flex-one'} value={this.state.checkCode} onChange={this.handleChange} name={'checkCode'} placeholder={'输入验证码'} type="text"/>
            { this.state.user && <span onClick={this.getCheckCode} className={'ri_get_code'}>获取验证码</span> }
          </div>

        </div>
        <Button onClick={this.handleRegist} className="btn rg_regbtn" type="primary">注册</Button>
      </div>
    );
  }

}

export default Regist;
