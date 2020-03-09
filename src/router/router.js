// import {HashRouter as Router , Route, Link} from 'react-router-dom'
import { lazy } from "react";
const Home = lazy(() => import('../pages/home/index')); // 首页
const Login = lazy(() => import('../pages/login')); // 登录页面
const registType = lazy(() => import('../pages/registType')); // 登录页面
const Regist = lazy(() => import("../pages/regist"));  // 注册页面
const NotFind404 = lazy(() => import("../pages/404")); // 404
const ForgetPas = lazy(() => import("../pages/forgetPas")); // 忘记密码
const GetpasCheckType = lazy(() => import("../pages/getpasCheckType")); // 获取验证码
const SetNewPas = lazy(() => import("../pages/setNewPas")); // 设置新密码
const Hot = lazy(() => import("../pages/hot")); // 搜索历史
const PersonalPage = lazy(() => import("../pages/personalPage")); // 个人主页
const AddNewPlan = lazy(() => import("../pages/addNewPlan/index")); // 添加新计划
const DayPlan = lazy(() => import("../pages/planType/dayPlan")); // 日计划
const PlanLogs = lazy(() => import("../pages/planLogs")); // 记录历史
const PlanDetail = lazy(() => import("../pages/planDetail")); // 计划详情
const My = lazy(() => import("../pages/my")); // 我的
const Message = lazy(() => import("../pages/message")); // 消息
const Find = lazy(() => import("../pages/find")); // 发现
const Setting = lazy(() => import("../pages/setting")); // 设置
const AccountManage = lazy(() => import("../pages/accountManage")); // 账号管理 添加新账号
const Chat = lazy(() => import("../pages/chat")); // 聊天
const UserSecurity = lazy(() => import("../pages/setting/userSecurity")); // 设置 --> 账号与安全
const LoginLogs = lazy(() => import("../pages/setting/loginLogs")); // 登录设备历史
const UserInfo = lazy(() => import("../pages/my/userInfo")); // 我的 --> 点击顶部头像查看到的信息
const ChatUserDetail = lazy(() => import("../pages/chat/chatUserDetail")); //  聊天中点击用户头像的用户详细信息
const AppPush = lazy(() => import("../pages/appPush")); // 我的 --> 点击顶部头像查看到的信息
const ChangeUserInfo = lazy(() => import("../pages/my/changeUserInfo")); // 我的 --> 点击顶部头像查看到的信息
const Plan = lazy(() => import("../pages/plan")); // 计划Tab
const OperatorLogs = lazy(() => import("../pages/my/operatorLogs")); // 个人操作记录
const Charts = lazy(() => import("../pages/my/charts")); // 折线图表
const Ss = lazy(() => import("../pages/ss")); // 说说
const AppPushDetail = lazy(() => import("../pages/appPushDetail")); // 查看推送详情
const MyPlanLogs = lazy(() => import("../pages/my/myPlanLogs"));
const MySsLogs = lazy(() => import("../pages/my/mySsLogs"));
const SsDetail = lazy(() => import("../pages/ssDetail")); // 说说详情


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
    path: '/ssDetail',
    component: SsDetail,
    auth: true,
    meta: {
      title: '说说详情'
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
      title: '个人主页'
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
    path: '/charts',
    component: Charts,
    auth: true,
    meta: {
      title: '成长轨迹'
    }
  },
  {
    path: '/chat',
    component: Chat,
    auth: true,
    meta: {
      title: '助手群聊'
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
