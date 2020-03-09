import React, { Component } from 'react';
import './regist.css'
import url from 'url'
import TopTips from '../../components/topTips/index'
import { Button, Toast } from "antd-mobile";
import ZERO from '../../config/zero'
import { $axios } from '../../config/server'



class Regist extends Component {
  constructor(props) {
    super(props);
    const { type } = url.parse(this.props.location.search, true).query;
    this.state = {
      type: type, // 这里的type 就是  email  phone
      user: '', // 账号 邮箱 或 手机号 根据type来区分
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
    if (this.state.password !== this.state.password1) {
      Toast.info('两次密码输入不一致，请重新输入');
    }
  };

  // 点击注册
  handleRegist = () => {
    if (this.isCheckUndefined()) {
      // 所有项不为空
      const { type, user, password, checkCode } = this.state;
      console.log(type, user, password, checkCode);
      $axios({
        url: '/bs/api/user',
        method: 'POST',
        data: {
          type,
          user: user,
          password,
          checkCode
        }
      })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            Toast.info('注册成功');
            window.history.go(-2);
          } else if (res.status === 251) {
            Toast.info('验证码错误，请输入正确的验证码', 1.5);
          } else if (res.status === 300) {
            Toast.info('用户名已被注册，请填写未被注册的用户名', 1.5);
          } else {
            Toast.info('服务器繁忙，请稍后再试', 1.5);
          }
        })
        .catch(err => {
          // console.log(err);
          Toast.info('服务器繁忙，请稍后再试', 1.5);
        });
    }
  };

  // 点击是否可以显示密码
  handleShowPas = (index) => {
    // console.log(index);
    // 使用下面的方法替换了直接改变 state 的内容，如果报注释下面两行换回来
    let obj = this.state.passShow;
    obj[index] = !obj[index]
    // this.state.passShow[index] = !this.state.passShow[index];
    this.setState({
      passShow: obj
    });
  };

  // 获取验证码
  getCheckCode = () => {
    // console.log('点击获取验证码');
    if (this.state.type === 'email') {
      if (ZERO.regEmail(this.state.user)) {
        // 正确的邮箱
        return this.sendEmail(this.state.user);
      }
      Toast.info('请输入正确的邮箱');
    } else if (this.state.type === 'phone') {
      if (ZERO.regPhone(this.state.user)) {
        // 正确的手机号码
        return;
      }
      Toast.info('请输入正确的手机号码');
    }
  };

  // 给邮箱发邮件
  sendEmail = (email) => {
    $axios({
      url: '/bs/api/email',
      method: 'POST', 
      data: {
        to: email,
        type: 1
      }
    })
      .then(res => {
        if (res.status === 200) {
          Toast.info('邮件已发送至您的邮箱，请查收验证码', 2);
        } else if (res.status === 400) {
          Toast.info('邮件发送失败，请稍后再试', 2);
        }
      })
      .catch(err => {
        ZERO('服务器错误，请稍后再试');
      })
  };


  // 检验是否有空值 提交之前的检查
  // 有空值 undefined 没有空值 true
  isCheckUndefined = () => {
    const state = this.state;
    if (!(this.state.type === 'email' || this.state.type === 'phone')) {
      // 这里是从不合法的地方过来的
      return Toast.info('当前网址路径异常!!!请输入正确的网址');
    }
    if (!state.user) {
      return Toast.info('请输入正确的邮箱或手机号码');
    }
    if (!state.password) {
      return Toast.info('密码不能为空');
    }
    if (state.password !== state.password1) {
      return Toast.info('两次密码不一致');
    }
    if (!state.checkCode) {
      return Toast.info('验证码不能为空');
    }
    return true;
  };

  render() {
    const state = this.state;
    let info = {};
    if (state.type === 'email') {
      info.value = '邮箱';
    } else if (state.type === 'phone') {
      info.value = '手机号';
    } else {

    }
    return (
      <div className={'rg_info'}>
        <TopTips tips={'完善注册信息'} />
        <div className={'ri_wrap'}>

          <div className={'ri_wrap_inpwrap'}>
            <p>邮箱</p>
            <input className={'flex-one'} value={this.state.user} onChange={this.handleChange} name={'user'} placeholder={'请输入您的邮箱'} type="text" />
            {this.state.user && <i onClick={this.handleDelete.bind(this, 'user')} className={'iconfont iconfork'} />}
          </div>
          <div className={'ri_wrap_inpwrap ri_wrap_inpwrap_pass'}>
            <p>输入密码</p>
            <input className={'flex-one'}
              value={this.state.password}
              onChange={this.handleChange} name={'password'}
              placeholder={'请输入您的密码'}
              type={this.state.passShow[0] ? 'text' : 'password'} />
            {this.state.password && <i onClick={this.handleDelete.bind(this, 'password')} className={'iconfont iconfork'} />}
            {
              this.state.password ?
                this.state.passShow[0] ?
                  <i onClick={this.handleShowPas.bind(this, 0)} className={'iconfont iconyanjing3'} /> :
                  <i onClick={this.handleShowPas.bind(this, 0)} className={'iconfont iconbiyan1'} />
                : ""
            }
          </div>
          <div className={'ri_wrap_inpwrap ri_wrap_inpwrap_pass'}>
            <p>确认密码</p>
            <input className={'flex-one'} value={this.state.password1} onBlur={this.passpowd1Blur} onChange={this.handleChange} name={'password1'} placeholder={'再次确认密码'}
              type={this.state.passShow[1] ? 'text' : 'password'} />
            {this.state.password1 && <i onClick={this.handleDelete.bind(this, 'password1')} className={'iconfont iconfork'} />}
            {
              this.state.password1 ?
                this.state.passShow[1] ?
                  <i onClick={this.handleShowPas.bind(this, 1)} className={'iconfont iconyanjing3'} /> :
                  <i onClick={this.handleShowPas.bind(this, 1)} className={'iconfont iconbiyan1'} />
                : ""
            }
          </div>
          <div className={'ri_wrap_inpwrap'}>
            <p>验证码</p>
            <input className={'flex-one'} value={this.state.checkCode} onChange={this.handleChange} name={'checkCode'} placeholder={'输入验证码'} type="text" />
            {this.state.user && <span onClick={this.getCheckCode} className={'ri_get_code'}>获取验证码</span>}
          </div>

        </div>
        <Button onClick={this.handleRegist} className="btn rg_regbtn" type="primary">注册</Button>
      </div>
    );
  }
  componentDidMount() {
    // console.log(this.props)
    // this.props.history.goForward(-2);

  }
}

export default Regist;
