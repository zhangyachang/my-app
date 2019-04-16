import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './planTabBar.css'

class PlanTabBar extends Component {
  render() {
    return (
      <div className={'ap_type'}>
        <NavLink to={'/addNewPlan'} replace={true} className={'ap_type_add ap_type_add'}>
          <i className={'iconfont iconxinjian'}></i>
          <span>新建</span>
        </NavLink>
        <NavLink to={'/planLogs'} replace={true} className={'ap_type_add ap_type_log'}>
          <i className={'iconfont iconjilu1'}></i>
          <span>记录</span>
        </NavLink>
      </div>
    );
  }
}

export default PlanTabBar;
