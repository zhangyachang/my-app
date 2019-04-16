import React, {Component} from 'react';
import './accountManage.css'

class AccountManage extends Component {


  // 添加其他账号
  handleAddNewUser = () => {
    console.log('添加新用户');
    this.props.history.push('/login', '这里面可以加状态？');
  };

  // 退出当前账号
  handleExit = () => {
    console.log('退出当前账号');
  };

  render() {
    return (
      <div className={'accountManage'}>

        <div className={'ac_item'}>
          <img src={require('../../static/img/home/download.jpg')} alt=""/>
          <span className={'ac_item_user'}>向风一样自由</span>
        </div>
        <div className={'ac_item'}>
          <img src={require('../../static/img/home/download.jpg')} alt=""/>
          <span className={'ac_item_user'}>向风一样自由</span>
        </div>
        <div onClick={this.handleAddNewUser} className={'ac_item ac_add'}>
          <i className={'iconfont icontianjia1'} />
          <span className={'ac_item_user'}>添加账号</span>
        </div>

        <div onClick={this.handleExit} className={'ac_exit'}>退出当前账号</div>

      </div>
    );
  }
}


export default AccountManage;
