import React, {Component} from 'react';
import './userInfo.css'
import ZERO from '../../../config/zero'

class UserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      list1: [
        {name: '昵称', val: '张亚昌', next: true, id: 'nick'},
        {name: '性别', val: '男', next: true, id: 'sex'}
      ],
      list2: [
        {name: '签名', val: '加油', next: true, id: 'signature'}
      ]
    }
  }

  // 处理下一个页面
  handleGo = (id) => {
    console.log('处理下一个页面');
    console.log(id);

    ZERO.noNextToast();
  };


  render() {
    return (
      <div className={'user_info'}>
        <div className={'uin_item'}>
          <p>头像</p>
          <div className={'uni_item_more'}>
            <img src={require('../../../static/img/home/download.jpg')} alt=""/>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>

        {
          this.state.list1.map((item, index) => {
            return (
              <div onClick={this.handleGo.bind(this, item.id)} key={item.id} className={'uin_item'}>
                <p>{item.name}</p>
                <div className={'uni_item_more'}>
                  <p>{item.val}</p>
                  { item.next && <i className={'iconfont iconiconfonticonfonti2copycopy'} />}
                </div>
              </div>
            )
          })
        }

        {
          this.state.list2.map((item, index) => {
            return (
              <div onClick={this.handleGo.bind(this, item.id)} key={item.id} className={'uin_item uin_item_sign'}>
                <p>{item.name}</p>
                <div className={'uni_item_more'}>
                  <p>{item.val}</p>
                  { item.next && <i className={'iconfont iconiconfonticonfonti2copycopy'} />}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default UserInfo;
