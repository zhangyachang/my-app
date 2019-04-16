import React, {Component} from 'react';
import './login.css'
import {Button} from "antd-mobile";
import ZERO from '../../config/zero'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      password: '',
      loginHistory: {
        is: false, // 是否显示下拉内容
        icon: 'iconxialajiantou'  // 下拉图标className
      },
    }
  }

  // 切换下拉列表
  showLoginUser = () =>{
    let is = this.state.loginHistory.is;
    let icon = is?'iconxialajiantou':'iconjiantouxiangshang';
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
    if(!this.state.user){
      return ZERO.Toast('用户名不能为空');
    }
    if(!this.state.password){
      return ZERO.Toast('密码不能为空');
    }
    // 这里提交吧，等之后在写一下请求
    this.props.history.push('/');
  };

  // 点击注册按钮
  handleGoReg = () => {
    console.log('点击了注册按钮');
    console.log(this);
    this.props.history.push('/registType');
    // this.props.history.push({
    //   pathname: '/registType',
    //   query: {
    //     name: 'aaa',
    //     age: 12
    //   },
    //   state: {
    //     post: 'post传递'
    //   },
    //   zidingyi: {
    //     "aaa": '自定义的可以传递过去吗'
    //   }
    // });
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
    console.log('通过qq登录')
  };

  loginZfb = () => {
    console.log('通过支付宝登录');
  };

  loginWx = () => {
    console.log('通过微信登录');
  };


  render() {
    let state = this.state;
    return (
      <div className='login'>

        <div className={'lg_logo flex flex-center'}>
          <img src={require('../../static/img/logo/logo.png')} alt=""/>
        </div>
        <div className={'lg_wrap'}>
          <div className={'lg_inputwrap lg_user'}>
            <i className={'iconfont iconyonghu'}></i>
            <input value={state.user} type="text" onChange={this.handleUserInp} placeholder={'请输入用户名'}/>
            <i className={'lg_downup iconfont ' + state.loginHistory.icon} onClick={this.showLoginUser}></i>
          </div>

          {
            state.loginHistory.is &&
            <div className={'lg_history'}>
              {
                ['937741304@qq.com', '15081166065'].map((item, index) => {
                  return <p key={index} onClick={this.chooseUser.bind(this, item)}>{item}</p>
                })
              }
            </div>
          }

          <div className={'lg_inputwrap lg_password'}>
            <i className={'iconfont iconmima1'}></i>
            <input defaultValue={state.password} type="password" onChange={this.handlePassChange} placeholder={'请输入密码'} />
            <i className={'iconfont '}></i>
          </div>
        </div>

        <Button className={"lg_submit"} onClick={this.handleSubmit} type={'primary'}>登录</Button>

        <div className={'lg_type flex'}>
          <p onClick={this.handleGoReg}>没有账号，立即注册</p>
          <p onClick={this.handleForgetPass}>忘记密码</p>
        </div>

        <div className={'lg_login_tips flex flex-item'}>
          <p></p>
          <div>其他登录方式</div>
          <p></p>
        </div>
        <div className={'lg_login_type flex flex-content'}>
          <i onClick={this.loginGithub} className={'iconfont icongithub'}></i>
          <i onClick={this.loginQQ} className={'iconfont iconQQ'}></i>
          <i onClick={this.loginZfb} className={'iconfont iconzhifubao'}></i>
          <i onClick={this.loginWx} className={'iconfont iconweixin'}></i>
        </div>
      </div>

    );
  }

  componentDidMount() {
    console.log('这里的这个地方');

    console.log(this.props);

  }

}

export default Login;
