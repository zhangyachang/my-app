import React, {Component} from 'react';
import './dayPlan.css'
import {Button} from "antd-mobile";
import ZERO from '../../../config/zero'

class DayPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // 向后台发送请求

    ZERO.Toast('计划指定成功');
    this.props.history.goBack();
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
}

export default DayPlan;
