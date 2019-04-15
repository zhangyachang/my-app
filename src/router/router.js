// import {HashRouter as Router , Route, Link} from 'react-router-dom'

import Home from '../pages/home/index'; // 首页
import Login from "../pages/login"; //登录页面
import registType from "../pages/registType"; // 注册方式
import Regist from "../pages/regist";  // 注册页面
import NotFind404 from "../pages/404"; // 404
import ForgetPas from "../pages/forgetPas"; // 忘记密码
import GetpasCheckType from "../pages/getpasCheckType"; // 获取验证码
import SetNewPas from "../pages/setNewPas"; // 设置新密码
import Hot from "../pages/hot"; // 搜索历史
import PersonalPage from "../pages/personalPage"; // 个人主页
import AddNewPlan from "../pages/addNewPlan";
import DayPlan from "../pages/planType/dayPlan";
import PlanLogs from "../pages/planLogs";
import PlanDetail from "../pages/planDetail";  // 设置新密码



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
    path: '/registType',
    component: registType,
    meta: {
      title: '注册方式'
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
    path: '/forgetPas',
    component: ForgetPas,
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/getpasCheckType',
    component: GetpasCheckType,
    meta: {
      title: '验证码找回'
    }
  },
  {
    path: '/setNewPas',
    component: SetNewPas,
    meta: {
      title: '设置新密码'
    }
  },
  {
    path: '/hot',
    component: Hot,
    meta: {
      title: '热门搜索'
    }
  },
  {
    path: '/personalPage',
    component: PersonalPage,
    meta: {
      title: '一个人的名字，进去的时候改一下的个人主页'
    }
  },
  {
    path: '/addNewPlan',
    component: AddNewPlan,
    meta: {
      title: '制定计划'
    }
  },
  {
    path: '/plan/dayPlan',
    component: DayPlan,
    meta: {
      title: '今日计划'
    }
  },
  {
    path: '/planLogs',
    component: PlanLogs,
    meta: {
      title: '我的记录'
    }
  },
  {
    path: '/planDetail',
    component: PlanDetail,
    meta: {
      title: '计划详情'
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