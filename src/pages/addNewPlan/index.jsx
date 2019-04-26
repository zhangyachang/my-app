import React, {Component} from 'react';
import './addNewPlan.css'
import PlanTabBar from '../../components/planTabBar/index'
import ZERO from '../../config/zero'

class AddNewPlan extends Component {


  // 点击日计划
  handlePlan = (type) => {
    console.log('点击日计划');
    this.props.history.push(`/plan/dayPlan?type=${type}`);
  };

  noDone = () => {
    console.log('点击了没有开发的功能');
    ZERO.noNextToast();
  };

  render() {
    return (
      <div className={'add_plan'}>

        <div className={'plan_list'}>
          <ul className={'plan_list_ul flex flex-warp'}>

            <li onClick={this.handlePlan.bind(this, 'day')}>
              <i className={'iconfont iconicon-test1'} />
              <span>日计划</span>
            </li>

            <li onClick={this.handlePlan.bind(this, 'week')}>
              <i className={'iconfont iconzhoubao'} />
              <span>周计划</span>
            </li>

            <li onClick={this.handlePlan.bind(this, 'month')}>
              <i className={'iconfont iconyuebao'} />
              <span>月计划</span>
            </li>

            <li onClick={this.noDone}>
              <i className={'iconfont iconxiaoshouqushi'} />
              <span>任务完成度</span>
            </li>

            <li onClick={this.noDone}>
              <i className={'iconfont iconbaogao'} />
              <span>数据报告</span>
            </li>

            <li onClick={this.noDone}>
              <i className={'iconfont iconhome'} />
              <span>记录</span>
            </li>

            <li onClick={this.noDone}>
              <i className={'iconfont icongongzuohuibao'} />
              <span>汇报</span>
            </li>

          </ul>
        </div>

        <PlanTabBar />


        {/*<div className={'ap_type'}>
          <NavLink to={'/addNewPlan'} className={'ap_type_add ap_type_add'}>
            <i className={'iconfont iconxinjian'}></i>
            <span>新建</span>
          </NavLink>
          <NavLink to={'/planLogs'} className={'ap_type_add ap_type_log'}>
            <i className={'iconfont iconjilu1'}></i>
            <span>记录</span>
          </NavLink>
        </div>*/}

      </div>
    );
  }
}

export default AddNewPlan;
