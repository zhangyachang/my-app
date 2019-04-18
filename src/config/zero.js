// 初始化 js 封装一些东西
// https://www.npmjs.com/package/babel-plugin-import
// 减少引入体积的，最后再导入吧，看起来挺麻烦的

import {Toast} from "antd-mobile";
import url from 'url'

export default {

  // 展示提示框，默认为 1s
  Toast(info, time=1){
    Toast.info(info, time);
  },

  noNextToast(info = '此功能暂未开放，开发者正在努力开发中-----'){
    Toast.info(info);
  },

  // 切割url传参的内容
  parseUrl(urlString) {
    return url.parse(urlString, true).query;
  },

  // cookie的操作
  setCookie(json, time){
    let timer = new Date(Date.now()+time*365*24*60*60*1000).toUTCString();
    for(let key in json){
      document.cookie = key+'='+json[key]+';expires='+timer;
    }
  },

  /**
   * 获取Cookie
   * @params {String} attr
   */
  getCookie(attr){
    let arr = document.cookie.match( new RegExp('\\b'+attr+'=([^;]+)(;|$)') );
    return arr?arr[1]:"";
  },

  /**
   * 删除Cookie
   * @params {String} attr
   */
  removeCookie(attr){
    let json = {};
    json[attr] = '';
    this.setCookie(json,-1);
  },

  // 封装 LocalStorage 数据
  /**
   * 封装 localstorage 的一些方法
   * @params {Object json}
   */
  setLocaStorage(json){
    for(let key in json){
      let val = JSON.stringify(json[key]);
      window.localStorage.setItem(key, val);
    }
  },

  /**
   * 获取 localStorage 的一些方法
   * @params {String} key
   */
  getLocalStorageItem(key){
    return JSON.parse(window.localStorage.getItem(key));
  },

  /**
   * 删除 localStorage 的某一项
   * @params {String} key
   */
  removeLocalStorageItem(key){
    window.localStorage.removeItem(key);
  },

  // 清空 localStorage 的数据
  clearLocalStorageItem(){
    window.localStorage.clear();
  },


  // 验证身份证号码
  regIdCard(idCard){
    return /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
      idCard
    );
  },

  // 验证手机号码是否合法
  regPhone(phone) {
    return /^1[34578]\d{9}$/.test(phone);
  },

  // 验证邮箱是否合法
  regEmail(email){
    return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email);
  }
}




