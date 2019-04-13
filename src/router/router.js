// import {HashRouter as Router , Route, Link} from 'react-router-dom'

import Home from '../pages/home/index'; // 首页
import Login from "../pages/login"; //登录页面
import Regist from "../pages/regist";
import NotFind404 from "../pages/404"; // 注册页面


const routes = [

  {
    path: '/',
    exact: true,
    component: Home,
    meta: {
      title: '管理助手'
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/regist',
    component: Regist,
    meta: {
      title: '注册'
    }
  },
  {
    path: '*',
    component: NotFind404,
    meta: {
      title: '404找不到页面啦'
    }
  }
];

export default routes;
