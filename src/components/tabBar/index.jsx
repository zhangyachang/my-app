import React, {Component} from 'react';
import './tabBar.css'
import {NavLink} from "react-router-dom";

class TabBar extends Component {
  render() {
    return (
      <div className={'tabbar flex'}>
        <NavLink to={'/'} exact>
          <i className={'iconfont iconshouyex'}></i>
          <span>首页</span>
        </NavLink>
        <NavLink to={'/plan'}>
          <i className={'iconfont iconfaxian1'}></i>
          <span>计划</span>
        </NavLink>
        <NavLink to={'/message'}>
          <i className={'iconfont iconxiaoxi'}></i>
          <span>消息</span>
        </NavLink>
        <NavLink to={'/my'}>
          <i className={'iconfont iconwodedangxuan'}></i>
          <span>我的</span>
        </NavLink>

      </div>
    );
  }
}

export default TabBar;
