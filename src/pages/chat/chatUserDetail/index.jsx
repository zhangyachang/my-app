import React, { Component } from 'react';
import './chatUserDetail.css'
import { Toast } from 'antd-mobile'

class ChatUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      ignore: false
    }
  }

  handleSeeUser = () => {
    Toast.info('暂时还未开放查看用户信息功能，开发者正在努力,等候版本通知');
  };

  // 切换选项
  toggleItem = (id) => {
    const is = this.state[id];
    console.log('还触发吗？');
    console.log(is);
    this.setState({
      [id]: !is
    });
  };

  render() {
    return (
      <div className={'chat_user_detail'}>

        <div onClick={this.handleSeeUser} className={'cud_header'}>
          <div className={'cud_header_avatar'}>
            <div className={'cud_h_avatar'}>
              <img src={require('../../../static/img/home/download.jpg')} alt="" />
            </div>
            <div className={'cud_h_info'}>
              <p className={'cud_h_info_name'}>风一样自由</p>
              <p className={'cud_h_info_signature'}>努力，加油</p>
            </div>
          </div>
          <i className={'iconfont iconiconfonticonfonti2copycopy'} />
        </div>

        <div className={'cud_config'}>

          <div className={'cud_config_item'}>
            <div className={'cud_config_item_con'}>
              <p>置顶聊天</p>
              <i onClick={this.toggleItem.bind(this, 'top')}
                className={this.state.top ? 'iconfont iconkaiguan4' : 'iconfont iconkaiguan3'}
              />
            </div>
          </div>

          <div className={'cud_config_item'}>
            <div className={'cud_config_item_con'}>
              <div>
                <p>屏蔽聊天</p>
                <div className={'cud_config_item_tips'}>开启后将不再接收他的消息和计划</div>
              </div>
              <i onClick={this.toggleItem.bind(this, 'ignore')}
                className={this.state.ignore ? 'iconfont iconkaiguan4' : 'iconfont iconkaiguan3'}
              />
            </div>
          </div>
        </div>

        <div className={'cud_cleat_chat_log'}>
          清空聊天记录
        </div>

      </div>
    );
  }
}

export default ChatUserDetail;
