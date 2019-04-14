import React, {Component} from 'react';
import './regist.css'
import TopTips from '../../components/topTips/index'
import {Button} from 'antd-mobile'


class Regist extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: '1'
    };
  }

  // 点击注册方式按钮
  handleEmail = () => {
    this.props.history.push('/regist?type=email');
  };

  handlePhone = () => {
    this.props.history.push('/regist?type=phone');
  };

  render() {
    return (
      <div className={'regist_type'}>
        <TopTips tips={'选择您的注册方式'} />

        <div className={'rt_btn'}>
          <Button onClick={this.handleEmail} className="btn" type="primary">邮箱注册</Button>
          <Button onClick={this.handlePhone} className="btn" type="primary">手机验证码注册</Button>
        </div>


      </div>
    );
  }
}

export default Regist;
