import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/antd-mobile/dist/antd-mobile.min.css'
import './static/css/common.css'
import './config/io'

// 引入 redux 这里只是测试使用 现在还不用 等之后加上这个功能
// import './redux/redux'

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
