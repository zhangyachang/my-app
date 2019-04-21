import axios from 'axios'
import config from './config'
import ZERO from "./zero";


const $axios = (obj) => {
  return new Promise((resolve, reject) => {
    obj.method = obj.method?obj.method:'GET';
    obj.data = obj.data ? obj.data: {};
    obj.params = obj.params ?obj.params:{};
    console.log(obj);
    ZERO.Loadding('加载中...', 0);
    axios({
      url: config.url + obj.url,
      method: obj.method,
      params: obj.params,
      data: obj.data,
    })
      .then(res => {
        console.log('执行到这里了吗');
        if(res.status === 200){
          console.log('这个里面没有执行到吗111111111111');
          ZERO.hideToast();
          return resolve(res.data);
        }else{
          reject(res);
        }
      })
      .catch(err => {
        ZERO.hideToast();
        ZERO.Toast('服务器繁忙，请稍后再试...');
        return reject(err);
      })
  });
};

const server = {
  axios: $axios
};

export {$axios};

export default server;
