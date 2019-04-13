// 初始化 js 封装一些东西
// https://www.npmjs.com/package/babel-plugin-import
// 减少引入体积的，最后再导入吧，看起来挺麻烦的

import {Toast} from "antd-mobile";

export default {

  Toast(info){
    Toast.info(info, 1);
  }

}




