import React, {Component} from 'react';
import './loginLogs.css'
import {Toast} from 'antd-mobile'

class LoginLogs extends Component {


  handleLogout = () => {
    console.log('退出用户');
    Toast.info('此功能暂时未开发，请等待开发者开发---');
  };


  render() {
    return (
      <div className={'login_logs'}>

        <div className={'ll_item'}>
          <div className={'ll_item_icon'}>
            <i className={'iconfont iconshouji'} />
          </div>
          <div className={'ll_item_con flex-one'}>
            <p>HONOR LLD-AL20(本机)</p>
            <span>昨天 18:19</span>
          </div>
        </div>

        <div className={'ll_item'}>
          <div className={'ll_item_icon'}>
            <i className={'iconfont iconshouji'} />
          </div>
          <div className={'ll_item_con flex-one'}>
            <p>OPPO R9</p>
            <span>今天 10:47</span>
          </div>
          <div onClick={this.handleLogout} className={'log_out'}>退出</div>
        </div>

      </div>
    );
  }
}

export default LoginLogs;
