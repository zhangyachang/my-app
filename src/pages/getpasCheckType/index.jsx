import React, {Component} from 'react';
import './getpasCheckType.css'
import ZERO from '../../config/zero'
import TopTips from '../../components/topTips/index'
import {Button} from "antd-mobile";

class GetpasCheckType extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: ZERO.parseUrl(this.props.location.search),
      time: 10
    };
    this.timer = null;

    this.handleTimeChange(); // 触发 秒
  }

  // 改变右边的数据
  handleTimeChange = () => {
    const timer = setInterval(() => {
      let time = this.state.time;
      this.setState({
        time: --time
      });
      if(time < 0){
        this.clearTimer();
      }
    }, 1000);
    this.timer = timer;
  };

  // 点击获取验证码
  handleGetCode = () => {
    console.log('点击获取验证码');
    this.setState({
      time: 10
    });
    // 发起后台请求
    this.handleTimeChange();
  };

  // 清除定时器
  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      time: 0
    });
  };

  // 点击下一步，验证验证码和发送送的手机号码
  handleNext = () => {
    console.log('点击下一步');
    this.props.history.push('/setNewPas');
  };

  // 点击其他验证方式
  handleOtherType = () => {
    console.log('其他验证方式');
    console.log(this.props.history.goBack());
  };

  render() {
    return (
      <div className={'getpas_type'}>
        <TopTips tips={`请通过${this.state.query.user}号码获取6位数字验证码`} />
        <div className={'gp_item flex flex-item'}>
          <input type="text" placeholder={'请输入接收到的验证码'} />
          {
            this.state.time > 0 &&<span className={'gt_time'}>{this.state.time} S</span>
          }
          {
            this.state.time == 0 && <span className={'gt_getcode'} onClick={this.handleGetCode}>点击获取验证码</span>
          }

        </div>
        <Button className="btn" type="primary" onClick={this.handleNext}>确定</Button>

        <div className={'gt_other_type'}>
          <p>收不到验证码？<span onClick={this.handleOtherType}>其他找回方式</span></p>
        </div>

      </div>
    );
  }

  componentWillUnmount() {
    this.clearTimer();
  }

}

export default GetpasCheckType;
