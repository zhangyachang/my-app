import React, {Component} from 'react';
import './message.css'
import TabBar from '../../components/tabBar/index'
class Message extends Component {

  // 点击查看当前人的聊天
  handleChat = (userId) => {
    console.log('点击的按钮');
    console.log(userId);
    this.props.history.push('/chat');
  };

  // app 推送
  handleAppPush = () => {
    console.log('app推送');
    this.props.history.push('/appPush');
  };

  render() {
    return (
      <div className={'message'}>

        <div onClick={this.handleChat.bind(this, '用户的id')} className={'me_item flex'}>
          <div className={'me_avatar flex-shirink'}>
            <img src={require('../../static/img/logo/logo.png')} alt=""/>
          </div>
          <div className={'me_user_info ellipse'}>
            <div className={'me_user_info_title flex'}>
              <p className={'me_user_info_name'}>助手群聊</p>
              <span>15:43</span>
            </div>
            <p className={'me_user_info_con ellipse'}>此功能仅供交流使用</p>
          </div>
        </div>

        {/* <div onClick={this.handleChat.bind(this, '用户的id')} className={'me_item flex'}>
          <div className={'me_avatar flex-shirink'}>
            <img src={require('../../static/img/home/download.jpg')} alt=""/>
          </div>

          <div className={'me_user_info ellipse'}>
            <div className={'me_user_info_title flex'}>
              <p className={'me_user_info_name'}>益达口香糖</p>
              <span>15:43</span>
            </div>
            <p className={'me_user_info_con ellipse'}>你还在吗？？</p>
          </div>
        </div> */}


        {/* <div onClick={this.handleAppPush} className={'me_item flex'}>
          <div className={'me_avatar flex-shirink'}>
            <img src={require('../../static/img/logo/logo.png')} alt=""/>
          </div>

          <div className={'me_user_info ellipse'}>
            <div className={'me_user_info_title flex'}>
              <p className={'me_user_info_name'}>管理助手</p>
              <span>15:43</span>
            </div>
            <p className={'me_user_info_con ellipse'}>您有一个计划已完成</p>
          </div>
        </div> */}
        
        <TabBar />
      </div>
    );
  }
}

export default Message;
