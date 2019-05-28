import {$axios} from "./server";

/*
 前端全局错误码
    60000 所调接口的前端的必填项为空
*/

// 发送邮件的接口
const sendAuthCode = ({type, to}) => {
  return new Promise((resolve, reject) => {
    if(!type || !to){
      reject({status: 60000, data: '必填信息为空'});
    }
    $axios({
      url: '/bs/api/email',
      method: 'POST',
      data: {
        to: to,
        type: type
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


// 修改用户头像接口
/**
 * @params {String} uid
 * @params {String} avatar 文件信息数据
 *
 * @return PromiseFn
 */
const changeUserAvatar = ({uid, avatar}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('avatar', avatar);
    $axios({
      url: '/bs/api/avatar',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        uid: uid,
      },
      data: formData
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

// 制定计划的接口
/**
 * @params obj
 *  obj.uid 用户id
 *  obj.planTime 预估开始时间
 *  obj.startDate 开始日期 2019-5-14
 *  obj.endDate 结束日期 2019-5-14 23:59:59
 *  obj.title 标题
 *  obj.con 内容
 */
const addPlan = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/plan',
      method: 'POST',
      data: obj
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};


/**
 * 查询一个人今日的计划
 * @params uid {String} 用户id 
 */
const searchPlanToday = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'GET',
      url: '/bs/api/todayPlan',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询一个人昨天的计划
 * @params uid {String} 用户id
 * 
 */
const yesterdayPlan = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/yesterdayPlan',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};


/**
 * 改变计划状态
 * @params obj
 *  obj.uid {String} 用户名
 *  obj.pid {String} 计划 id
 *  obj.type {String} 开始 start 完成 success
 */
const putPlanStatus = (obj) => {
  return new Promise((resovle, reject) => {
    $axios({
      url: '/bs/api/plan',
      method: 'PUT',
      data: obj
    })
      .then(res => {
        resovle(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询用户信息 通过 uid
 */
const getUserInfoByUid = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/user',
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  })
};

/**
 * 查询用户的计划、关注、好友、粉丝信息
 */
const getUserPlanNumAndMore = (uid) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/myInfo',
      method: 'GET',
      noLoadding: true,
      params: {
        uid: uid
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 查询用户推送的所有的记录
 * @params obj {Object}
 *  obj.uid
 *  obj.page
 */
const getAppPushLogs = (obj) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planPushMsg',
      method: 'GET',
      params: {
        uid: obj.uid,
        page: obj.page
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 通过 planId 拿取计划详情
 */
const getPlanDetail = (planId) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planPushMsgDetail',
      method: 'GET',
      params: {
        pushId: planId
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};

/**
 * 根据日期和用户id查询用户当日计划的完成情况
 * @params uid {String} 用户id
 * @params date {String} 2019-5-27
 */
const getPlanByDate = (uid, date) => {
  return new Promise((resolve, reject) => {
    $axios({
      url: '/bs/api/planByDate',
      method: 'GET',
      params: {
        uid,
        date,
      }
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
  });
};


export {
  sendAuthCode, // 
  changeUserAvatar, // 修改用户头像
  addPlan,  // 添加计划
  searchPlanToday, // 查询用户今日计划
  yesterdayPlan, // 查询用户昨日的计划
  putPlanStatus, // 修改计划状态
  getUserInfoByUid, // 获取用户信息
  getUserPlanNumAndMore, // 查询用户的计划、关注、好友、粉丝信息
  getAppPushLogs, // 查询用户的历史推送记录
  getPlanDetail, // 根据计划 id 获取计划详情
  getPlanByDate, // 根据日期和用户id查询用户当日计划的完成情况
};

