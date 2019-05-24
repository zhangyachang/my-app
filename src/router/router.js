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
import AddNewPlan from "../pages/addNewPlan/index"; // 添加新计划
import DayPlan from "../pages/planType/dayPlan"; // 日计划
import PlanLogs from "../pages/planLogs";  // 记录历史
import PlanDetail from "../pages/planDetail";
import My from "../pages/my"; // 我的
import Message from "../pages/message"; // 消息
import Find from "../pages/find"; // 发现
import Setting from "../pages/setting"; // 设置
import AccountManage from "../pages/accountManage"; // 账号管理 添加新账号
import Chat from "../pages/chat"; // 聊天
import UserSecurity from "../pages/setting/userSecurity"; // 设置 --> 账号与安全
import LoginLogs from "../pages/setting/loginLogs"; // 登录设备历史
import UserInfo from "../pages/my/userInfo"; // 我的 --> 点击顶部头像查看到的信息
import ChatUserDetail from "../pages/chat/chatUserDetail"; // 聊天中点击用户头像的用户详细信息
import AppPush from "../pages/appPush";
import ChangeUserInfo from "../pages/my/changeUserInfo";
import Plan from "../pages/plan";  // 计划Tab
import OperatorLogs from '../pages/my/operatorLogs'; // 个人操作记录

import Ss from '../pages/ss';
import AppPushDetail from '../pages/appPushDetail';  //查看推送详情
import MyPlanLogs from '../pages/my/myPlanLogs';
import MySsLogs from '../pages/my/mySsLogs';


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
    path: '/plan',
    component: Plan,
    auth: true,
    meta: {
      title: '计划'
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
    path: '/operatorLogs',
    component: OperatorLogs,
    auth: true,
    meta: {
      title: '操作记录'
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
    path: '/chatUserDetail',
    component: ChatUserDetail,
    meta: {
      title: '某个人的名字'
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
    path: '/userSecurity',
    component: UserSecurity,
    meta: {
      title: '账号与安全'
    }
  },
  {
    path: '/loginLogs',
    component: LoginLogs,
    meta: {
      title: '登录记录'
    }
  },
  {
    path: '/userInfo',
    component: UserInfo,
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/changeUserInfo',
    component: ChangeUserInfo,
    meta: {
      title: '修改个人信息'
    }
  },
  {
    path: '/appPush',
    component: AppPush,
    auth: true,
    meta: {
      title: '推送消息'
    }
  },
  {
    path: '/appPushDetail',
    component: AppPushDetail,
    auth: true,
    meta: {
      title: '推送详情'
    }
  },
  {
    path: '/ss',
    component: Ss,
    auth: true,
    meta: {
      title: '发心情'
    }
  },
  {
    path: '/myPlanLogs',
    component: MyPlanLogs,
    auth: true,
    meta: {
      title: '我的计划'
    }
  },
  {
    path: '/mySsLogs',
    component: MySsLogs,
    auth: true,
    meta: {
      title: '我的说说'
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
