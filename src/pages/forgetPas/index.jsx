import React, {Component} from 'react';
import './forgetPas.css'
import Toptips from '../../components/topTips/index'
import {Button} from "antd-mobile";

class ForgetPas extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: '',
      code: '',
      type: '', // 这里的这个类型通过正则表达式判断修改
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
    let {user, type} = this.state;
    this.props.history.push(`/getpasCheckType?user=${user}&type=${type}`)
  };

  render() {
    return (
      <div className={'getPas'}>
        <Toptips tips={'请输入你注册账号的邮箱或手机号'} />

        <div className={'gp_item flex flex-item'}>
          <input type="text" placeholder={'请输入手机号或邮箱'} defaultValue={this.state.user} onChange={this.handleChange} />
        </div>
        <div className={'gp_item flex flex-item'}>
          <input type="text" placeholder={'点击图片可更换'} defaultValue={this.state.code} onChange={this.handleCheck} />
          <img src={require('../../static/img/getpassword/checkcode.png')} alt=""/>
        </div>

        <Button className="btn" type="primary" onClick={this.handleNext}>下一步</Button>
      </div>

    );
  }
}

export default ForgetPas;
