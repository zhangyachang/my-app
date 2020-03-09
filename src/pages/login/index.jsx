import React, { Component } from 'react';
import './login.css'
import { Modal, Button, Toast } from "antd-mobile";
import ZERO from '../../config/zero'
import { $axios } from '../../config/server'

const alert = Modal.alert;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '937741304@qq.com',
      password: '111',
      loginHistory: {
        is: false, // 是否显示下拉内容
        icon: 'iconxialajiantou'  // 下拉图标className
      },
      isLoginSuccess: false, // 登录成功
    }
  }

  // 切换下拉列表
  showLoginUser = () => {
    let is = this.state.loginHistory.is;
    let icon = is ? 'iconxialajiantou' : 'iconjiantouxiangshang';
    this.setState({
      loginHistory: {
        is: !is,
        icon: icon
      }
    });
  };

  // 选择下拉列表历史的用户
  chooseUser = (user) => {
    this.setState({
      user: user
    });
    this.showLoginUser();
  };

  // 用户名 密码 input onChange
  handleUserInp = (e) => {
    this.setState({
      user: e.target.value
    });
  };
  handlePassChange = (e) => {
    this.setState({
      password: e.target.value
    })
  };

  // 提交用户名密码
  handleSubmit = () => {
    console.log('点击了登录按钮');
    if (!this.state.user) {
      return Toast.info('用户名不能为空', 1);
    }
    if (!this.state.password) {
      return Toast.info('密码不能为空', 1);
    }
    $axios({
      url: '/bs/api/login',
      method: 'POST',
      data: {
        user: this.state.user,
        password: this.state.password,
        type: 'password'
      }
    })
      .then(res => {
        if (res.status === 200) {
          ZERO.setLoginHistory(this.state.user);
          this.shoeModel(res.data.uid);
        } else if (res.status === 250) {
          Toast.info('请检查用户名是否正确', 1);
        } else if (res.status === 400) {
          Toast.info('用户名或密码错误', 1);
        }
      })
      .catch(err => {
        Toast.info('服务器繁忙，请稍后再试', 1);
      })
  };

  // 点击注册按钮
  handleGoReg = () => {
    console.log('点击了注册按钮');
    console.log(this);
    this.props.history.push('/registType');
  };

  // 忘记密码
  handleForgetPass = () => {
    this.props.history.push('/forgetPas');
  };

  // 通过几种方式登录
  loginGithub = () => {
    console.log('通过github登录');
  };

  loginQQ = () => {
    console.log('通过qq登录');
    Toast.info('此功能暂未开放，等待开发者开发---');
  };

  loginZfb = () => {
    console.log('通过支付宝登录');
    Toast.info('此功能暂未开放，等待开发者开发---');
  };

  shoeModel = (uid) => {
    alert('记住密码', '该设备是否是你的手机或常用设备，是否要记住密码', [
      { text: '取消', onPress: () => { this.notRememberPas(uid) }, style: 'default' },
      { text: '记住密码', onPress: () => { this.rememberPas(uid) }, style: { fontWeight: 'bold' } },
    ]);
  };

  // 记住密码
  rememberPas = (uid) => {
    ZERO.setLocaStorage({ user: uid });
    this.props.history.push('/');
  };
  // 取消记住密码
  notRememberPas = (uid) => {
    ZERO.setSessionStorage({ user: uid });
    this.props.history.push('/');
  };

  loginWx = () => {
    console.log('通过微信登录');
    Toast.info('此功能暂未开放，等待开发者开发---');
  };

  render() {
    let state = this.state;
    return (
      <div className='login'>
        <div className={'lg_logo flex flex-center'}>
          <img src={require('../../static/img/logo/logo.png')} alt="" />
        </div>
        <div className={'lg_wrap'}>
          <div className={'lg_inputwrap lg_user'}>
            <i className={'iconfont iconyonghu'} />
            <input value={state.user} type="text" onChange={this.handleUserInp} placeholder={'请输入邮箱或手机号'} />
            <i className={'lg_downup iconfont ' + state.loginHistory.icon} onClick={this.showLoginUser} />
          </div>

          {
            state.loginHistory.is &&
            <div className={'lg_history'}>
              {
                ZERO.getLoginHistory().map((item, index) => {
                  return <p key={index} onClick={this.chooseUser.bind(this, item)}>{item}</p>
                })
              }
            </div>
          }

          <div className={'lg_inputwrap lg_password'}>
            <i className={'iconfont iconmima1'} />
            <input defaultValue={state.password} type="password" onChange={this.handlePassChange} placeholder={'请输入密码'} />
            <i className={'iconfont '} />
          </div>
        </div>

        <Button className={"lg_submit"} onClick={this.handleSubmit} type={'primary'}>登录</Button>

        <div className={'lg_type flex'}>
          <p onClick={this.handleGoReg}>没有账号，立即注册</p>
          <p onClick={this.handleForgetPass}>忘记密码</p>
        </div>

        {/* 其他登录方式暂时注释掉 */}
        {/* <div className={'lg_login_tips flex flex-item'}>
          <p></p>
          <div>其他登录方式</div>
          <p></p>
        </div>
        <div className={'lg_login_type flex flex-content'}>
          <a href={'http://127.0.0.1:3000/oauth/github/login'}>
            <i onClick={this.loginGithub} className={'iconfont icongithub'} />
          </a>
          <i onClick={this.loginQQ} className={'iconfont iconQQ'} />
          <i onClick={this.loginZfb} className={'iconfont iconzhifubao'} />
          <i onClick={this.loginWx} className={'iconfont iconweixin'} />
        </div> */}
        {/* 其他登录方式暂时注释掉 */}

      </div>

    );
  }
}

export default Login;
