import React, {Component} from 'react';
import './dayPlan.css'
import {Button} from "antd-mobile";
import ZERO from '../../../config/zero'
import {$axios} from "../../../config/server";

class DayPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planType: '', // 对应数据库中的type类型  day_plan week_plan month_plan
      todayPlan: '', // 今日计划
      noComplete: '', // 未完成
      tomorrowPlan: '', // 明日计划
      other: '', // 其他事项
    }
  }

  // 今日计划改变
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // 制定计划提交
  submitPlan = () => {
    console.log('提交');
    console.log(this.state);
    const state = this.state;
    const user = ZERO.getLocalStorageItem('user') || ZERO.getSessionStorage('user');
    // 向后台发送请求
    if(this.state.planType){
      $axios({
        url: '/bs/api/plan',
        method: 'POST',
        data: {
          uid: user,
          planType: state.planType,
          now: state.todayPlan,
          nodone: state.noComplete,
          future: state.tomorrowPlan,
          other: state.other
        }
      })
        .then(res => {
          console.log(res);
          if(res.status === 400){
            ZERO.Toast('执行计划错误，请稍后再试');
          }else if(res.status === 500){
            ZERO.Toast('服务器繁忙，请稍后再试');
          }else if(res.status === 200){
            ZERO.Toast('计划指定成功');
            this.props.history.goBack();
          }else{
            ZERO.Toast('服务器繁忙，请稍后再试');
          }
        })
        .catch(err => {})
    }else{
      ZERO.Toast('计划类型错误，请返回上一个页面重新来制定计划');
    }
  };


  render() {
    return (
      <div className={'plan_con'}>

        <div className={'pc_com pc_today'}>
          <p className={'pc_title'}>今日计划 <span className={'pc_need'}>*</span></p>
          <textarea name={'todayPlan'} defaultValue={this.state.todayPlan} placeholder={'请输入'} onChange={this.handleChange}></textarea>
        </div>

        <div className={'pc_com pc_nocomplete'}>
          <p className={'pc_title'}>未完成</p>
          <textarea name={'noComplete'} defaultValue={this.state.todayPlan} placeholder={'请输入'} onChange={this.handleChange}></textarea>
        </div>

        <div className={'pc_com pc_tomorrow'}>
          <p className={'pc_title'}>明日计划</p>
          <textarea name={'tomorrowPlan'} defaultValue={this.state.todayPlan} placeholder={'请输入'} onChange={this.handleChange}></textarea>
        </div>

        <div className={'pc_com other'}>
          <p className={'pc_title'}>其他事项</p>
          <textarea name={'other'} defaultValue={this.state.todayPlan} placeholder={'请输入'} onChange={this.handleChange}></textarea>
        </div>

        <Button onClick={this.submitPlan} className="btn pc_des_plan" type="primary">制定计划</Button>

      </div>
    );
  }

  componentDidMount() {
    const {type} = ZERO.parseUrl(this.props.location.search);
    let changeType = '';
    if(type === 'day'){
      changeType = 'day_plan';
    }else if(type === 'week'){
      changeType = 'week_plan';
    }else if(type === 'month'){
      changeType = 'month_plan';
    }else{
      changeType = false;
    }
    this.setState({
      planType: changeType
    });
  }

}

export default DayPlan;
