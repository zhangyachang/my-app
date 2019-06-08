import React, {Component} from 'react';
import './getpasCheckType.css'
import ZERO from '../../config/zero'
import TopTips from '../../components/topTips/index'
import {Button} from "antd-mobile";
import {$axios} from "../../config/server";
import {sendAuthCode} from '../../config/utils'

class GetpasCheckType extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ZERO.parseUrl(this.props.location.search),
      time: 10,
      authCode: ''
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

  handleOnChange = (e) => {
    this.setState({
      authCode: e.target.value
    });
  };


  // 点击获取验证码
  handleGetCode = async () => {
    console.log(this.state.query);
    const {user, type} = this.state.query;

    if(!user || !type){
      return ZERO.Toast('请从正常的渠道进入此页面');
    }

    let result = await sendAuthCode({to: user, type});
    console.log(result);
    if(result.status === 200){
      ZERO.Toast('邮件发送成功');
      this.setState({
        time: 10
      });
      this.handleTimeChange();
    }else{
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 清除定时器
  clearTimer = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({
      time: 0
    });
  };

  // 点击下一步，验证验证码
  handleNext = () => {
    console.log('点击下一步');
    const {user, type} = ZERO.parseUrl(this.props.location.search);
    if(!user){
      return ZERO.Toast('请从正常的渠道进入此页面');
    }else if(!type){
      return ZERO.Toast('请从正常的渠道进入此页面');
    }
    if(!this.state.authCode || this.state.authCode.length !== 4){
      return ZERO.Toast('请输入正确的验证码');
    }

    $axios({
      url: '/bs/api/authCode',
      method: 'POST',
      data: {
        user: user,
        authCode: this.state.authCode
      }
    })
      .then(res => {
        if(res.status === 200){
          this.props.history.push({
            pathname: '/setNewPas',
            state: {
              user,
              type
            }
          });
        }else{
          return ZERO.Toast('验证失败，请输入正确的验证码');
        }
      })
      .catch(err => {});
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
          <input type="text" onChange={this.handleOnChange} defaultValue={this.state.authCode} placeholder={'请输入接收到的验证码'} />
          {
            this.state.time > 0 &&<span className={'gt_time'}>{this.state.time} S</span>
          }
          {
            this.state.time === 0 && <span className={'gt_getcode'} onClick={this.handleGetCode}>点击获取验证码</span>
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
