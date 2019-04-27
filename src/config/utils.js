import {$axios} from "./server";
import config from './config'

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



export {sendAuthCode};





