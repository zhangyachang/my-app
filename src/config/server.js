import axios from 'axios'
import config from './config'
import ZERO from "./zero";


const $axios = (obj) => {
  return new Promise((resolve, reject) => {
    obj.method = obj.method?obj.method:'GET';
    obj.data = obj.data ? obj.data: {};
    obj.params = obj.params ?obj.params:{};
    obj.headers = obj.headers?obj.headers:'application/json;charset=utf-8';
    // 这里的是我的用户id
    obj.data.openid = ZERO.getSessionStorage('user') || ZERO.getLocalStorageItem('user');
    ZERO.Loadding('加载中...', 0);
    axios({
      url: config.url + obj.url,
      method: obj.method,
      header: obj.header,
      params: obj.params,
      data: obj.data,
    })
      .then(res => {
        if(res.status === 200){
          ZERO.hideToast();
          return resolve(res.data);
        }else if(res.data.status === 50001){
          ZERO.hideToast();
          ZERO.Toast('登录信息已过期，请重新登录');
          ZERO.removeSessionStorage('user');
          ZERO.removeLocalStorageItem('user');
        } else{
          ZERO.hideToast();
          ZERO.Toast('服务器繁忙，请稍后再试...');
          reject(res);
        }
      })
      .catch(err => {
        ZERO.hideToast();
        ZERO.Toast('客户端错误，请稍后再试...');
        return reject(err);
      })
  });
};

const server = {
  axios: $axios
};

export {$axios};

export default server;
