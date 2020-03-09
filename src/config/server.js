import axios from 'axios'
import config from './config'
import ZERO from "./zero";
import { Toast } from 'antd-mobile'

const $axios = (obj) => {
  return new Promise((resolve, reject) => {
    obj.method = obj.method ? obj.method : 'GET';
    obj.data = obj.data ? obj.data : {};
    obj.params = obj.params ? obj.params : {};
    obj.headers = obj.headers ? obj.headers : 'application/json;charset=utf-8';
    // 这里的是我的用户id
    obj.data.openid = ZERO.getSessionStorage('user') || ZERO.getLocalStorageItem('user');
    obj.noLoadding || Toast.loading('加载中', 0);  // ZERO.Loadding('加载中', 0);
    axios({
      url: config.url + obj.url,
      method: obj.method,
      header: obj.header,
      params: obj.params,
      data: obj.data,
    })
      .then(res => {
        Toast.hide();
        if (res.status === 200) {
          return resolve(res.data);
        } else if (res.data.status === 50001) {
          Toast.info('登录信息已过期，请重新登录', 1);
          ZERO.removeSessionStorage('user');
          ZERO.removeLocalStorageItem('user');
          return reject(res);
        } else {
          Toast.info('服务器繁忙，请稍后再试...', 1);
          return reject(res);
        }
      })
      .catch(err => {
        Toast.hide();
        Toast.info('客户端错误，请稍后再试...', 1);
        return reject(err);
      })
  });
};

const server = {
  axios: $axios
};

export { $axios };

export default server;
