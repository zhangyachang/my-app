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
import AddNewPlan from "../pages/addNewPlan"; // 添加新计划
import DayPlan from "../pages/planType/dayPlan"; // 日计划
import PlanLogs from "../pages/planLogs";  // 记录历史
import PlanDetail from "../pages/planDetail";
import My from "../pages/my"; // 我的
import Message from "../pages/message"; // 消息
import Find from "../pages/find";
import Setting from "../pages/setting";
import AccountManage from "../pages/accountManage";
import Chat from "../pages/chat";  // 设置新密码


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
    path: '/find',
    component: Find,
    auth: true, // 表示该路由需要权限校验
    meta: {
      title: '发现'
    }
  },
  {
    path: '/message',
    component: Message,
    auth: true,
    meta: {
      title: '消息'
    }
  },
  {
    path: '/my',
    component: My,
    auth: true,
    meta: {
      title: '个人中心'
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
    auth: true,
    meta: {
      title: '一个人的名字，进去的时候改一下的个人主页'
    }
  },
  {
    path: '/addNewPlan',
    component: AddNewPlan,
    auth: true,
    meta: {
      title: '制定计划'
    }
  },
  {
    path: '/plan/dayPlan',
    component: DayPlan,
    auth: true,
    meta: {
      title: '今日计划'
    }
  },
  {
    path: '/planLogs',
    component: PlanLogs,
    auth: true,
    meta: {
      title: '我的记录'
    }
  },
  {
    path: '/planDetail',
    component: PlanDetail,
    auth: true,
    meta: {
      title: '计划详情'
    }
  },
  {
    path: '/setting',
    component: Setting,
    auth: true,
    meta: {
      title: '设置'
    }
  },
  {
    path: '/accountManage',
    component: AccountManage,
    auth: true,
    meta: {
      title: '账号管理'
    }
  },
  {
    path: '/chat',
    component: Chat,
    auth: true,
    meta: {
      title: '进入的时候修改这个标题'
    }
  },
  {
    path: '/404',
    component: NotFind404,
    meta: {
      title: '找不到页面啦'
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
