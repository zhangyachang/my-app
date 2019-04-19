import React, {Component} from 'react';
import './userSecurity.css'
import ZERO from '../../../config/zero'

class UserSecurity extends Component {
  constructor(props){
    super(props);
    this.state = {
      list1: [
        {name: '账号昵称', val: '向风一样自由', id: 'nick'},
        {name: '手机号码', val: '150****6065', next: true, id: 'phone'},
        {name: '绑定邮箱', val: '93****41304', next: true, id: 'email'}
      ],

      list2: [
        {name: '修改密码', next:true, id: 'changePas'},
        {name: '最近登录记录', next: true, val: '2条', id: 'logHistory'},
        {name: '新设备登录验证', next: true, val:'未开启',  id: 'newPhoneCheck'},
        {name: '助手安全中心', next: false, id: 'securityCenter'}
      ]

    }
  }

  handleGo = (id) => {
    console.log(id);
    if(id === 'logHistory'){
      return this.props.history.push('/loginLogs');
    }
    ZERO.noNextToast();
  };

  render() {
    return (
      <div className={'user_security'}>
        <div className={'uus_list'}>
          {
            this.state.list1.map((item, index) => {
              return(
                <div key={item.id} onClick={this.handleGo.bind(this, item.id)} className={'uus_list_item'}>
                  <span>{item.name}</span>
                  <p>
                    {item.val}
                    {item.next && <i className={'iconfont iconiconfonticonfonti2copycopy'} /> }
                  </p>
                </div>
              )
            })
          }
        </div>

        <div className={'uus_list'}>
          {
            this.state.list2.map((item, index) => {
              return(
                <div key={item.id} onClick={this.handleGo.bind(this, item.id)} className={'uus_list_item'}>
                  <span>{item.name}</span>
                  <p>
                    {item.val}
                    {item.next && <i className={'iconfont iconiconfonticonfonti2copycopy'} /> }
                  </p>
                </div>
              )
            })
          }
        </div>
        <div className={'tips'}>
          如果遇到账号被盗，忘记密码等问题，请前往安全中心
        </div>

      </div>
    );
  }
}

export default UserSecurity;
