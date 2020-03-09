import React, {Component} from 'react';
import './forgetPas.css'
import Toptips from '../../components/topTips/index'
import {Button} from "antd-mobile";
import ZERO from '../../config/zero';
import {$axios} from "../../config/server";
import {Toast} from 'antd-mobile'

class ForgetPas extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ''
    }
  }

  // 手机号或邮箱的受控改变
  handleChange = (e) => {
    this.setState({
      user: e.target.value
    });
  };

  //
  handleCheck = (e) => {
    this.setState({
      code: e.target.value
    })
  };

  // 下一步 1. 验证手机号和邮箱合法性  2. 验证验证码 3. 然后跳转
  handleNext = () => {
    console.log(`点击了下一步`);
    console.log(this.state);
    let {user} = this.state;
    let type = '';
    if(ZERO.regPhone(this.state.user)){
      type = 'phone';
    }else if(ZERO.regEmail(this.state.user)){
      type = 'email';
    }else{
      return Toast.info('请输入正确的手机号或者邮箱');
    }

    $axios({
      url: '/bs/api/email',
      method: 'POST',
      data: {
        to: user,
        type: type
      }
    })
      .then(res => {
        if(res.status === 200){
          Toast.info('验证码已发送至您的邮箱，请查看并填写');
          this.props.history.push(`/getpasCheckType?user=${user}&type=${type}`)
        }else{
          Toast.info('服务器繁忙，请稍后再试');
        }
      })
      .catch(err => {});


  };

  render() {
    return (
      <div className={'getPas'}>
        <Toptips tips={'请输入你注册账号的邮箱或手机号'} />

        <div className={'gp_item flex flex-item'}>
          <input type="text" placeholder={'请输入手机号或邮箱'} defaultValue={this.state.user} onChange={this.handleChange} />
        </div>
        {/*<div className={'gp_item flex flex-item'}>*/}
        {/*  <input type="text" placeholder={'点击图片可更换'} defaultValue={this.state.code} onChange={this.handleCheck} />*/}
        {/*  <img src={require('../../static/img/getpassword/checkcode.png')} alt=""/>*/}
        {/*</div>*/}

        <Button className="btn" type="primary" onClick={this.handleNext}>下一步</Button>
      </div>

    );
  }
}

export default ForgetPas;
