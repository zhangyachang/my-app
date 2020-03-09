import React, { Component } from 'react';
import './chatUserDetail.css'
import ZERO from '../../config/zero'
import socket from '../../config/io.js'
import { getUserInfoByUid } from '../../config/utils'
import config from '../../config/config'
import { Toast } from 'antd-mobile'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      avatar: '',
      msgLog: [
        // {
        //   id: 'aaaaaaa',
        //   con: '你好吗',
        //   time: 1555467986458,
        //   who: 'friend'
        // },
        // {
        //   id: 'aaaaaaa',
        //   con: '最近怎么样',
        //   time: 1555467981458,
        //   who: 'friend'
        // },
        // {
        //   id: 'bbbbbb',
        //   con: '我还好',
        //   time: 1555467919458,
        //   who: 'self'
        // }
      ]
    };
    this.elChatbox = React.createRef();
    this.elInp = React.createRef();
  }

  searchUserInfo = async () => {
    let uid = ZERO.getUid();
    if (!uid) {
      Toast.info('用户信息过期，请重新登录', 1);
    }
    let result = await getUserInfoByUid(uid);
    console.log('获取的用户信息');
    console.log(result);
    if (result.status === 200) {
      this.setState({
        avatar: result.data[0].avatar
      });
    } else if (result.status === 400) {
      Toast.info('用户信息获取失败', 1);
    } else if (result.status === 500) {
      Toast.info('服务器繁忙，请稍后再试', 1);
    }
  };

  // 处理 input 改变事件
  handleOnChange = () => {
    this.zeroInpHeight();
    this.setState({
      message: this.elInp.current.value
    });
  };

  // 发送数据
  handlePost = () => {
    const self = this;
    let newMsg = {
      con: self.state.message,
      time: new Date().getTime(),
      who: 'self',
      avatar: this.state.avatar
    };
    const msgLog = this.state.msgLog.push(newMsg);
    // console.log(msgLog);
    this.setState({
      msgLog: this.state.msgLog
    });
    socket.emit('all', newMsg);

    const current = this.elChatbox.current;
    current.scrollTop = current.scrollHeight - current.offsetHeight + 700;
    this.clearMessage();
  };

  // 查看好友的详细信息
  handleSeeFriendMessage = (id) => {
    console.log('查看好友的详细信息');
    console.log(id);
    if (id) {
      return this.props.history.push(`/chatUserDetail?userId=${id}`);
    }
    Toast.info('此功能暂未开放，开发者正在努力开发中-----', 1);
  };

  // 清空输入框
  clearMessage = () => {
    // console.log('清空了数据框吧');
    this.setState({
      message: ''
    });
    this.zeroInpHeight();
  };

  // 处理 输入框的高度
  zeroInpHeight = () => {
    // console.log(this.elInp);
    const target = this.elInp.current;
    target.style.height = 'auto';
    //如果高度不够，再重新设置
    if (target.scrollHeight >= target.offsetHeight) {
      target.style.height = target.scrollHeight + 'px';
      // console.log('这里也成立了？');
    }
  };

  // handleTime 处理时间戳
  handleTime = (time) => {
    let nowTime = new Date(time);
    let [year, month, day, hours, minute, second] = [nowTime.getFullYear(), nowTime.getMonth() + 1,
    nowTime.getDate(), nowTime.getHours(), nowTime.getMinutes(), nowTime.getSeconds()];
    // console.log(`${year}-${month}-${day} ${hours}:${minute}:${second}`);
    return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
  };

  componentDidMount() {
    // console.log('11111');
    socket.on('all', (msg) => {
      // console.log('我本身可以监听我自己吗');
      // console.log(msg);
      var obj = this.state.msgLog;
      obj.push(msg);
      this.setState({
        msgLog: obj
      });
    });

    // 获取用户信息
    this.searchUserInfo();
  }


  render() {
    return (
      <div className={'chat_room'}>
        <div className='chat_room_tips'>此功能仅供交流，请勿泄露您个人的身份信息</div>
        <div className={'cr_list flex-one'} ref={this.elChatbox}>
          {
            this.state.msgLog.map((item, index) => {
              return (
                <div key={item.time} className={item.who === 'self' ? ' cr_list_item_self' : ' cr_list_friend'}>
                  <div className={'cr_list_item_time'}>{this.handleTime(item.time)}</div>
                  <div className={'cr_list_item_info'}>
                    <div onClick={this.handleSeeFriendMessage.bind(this, item.id)} className={'cr_list_item_avatar flex-shirink'}>
                      <img src={config.url + item.avatar} alt="" />
                    </div>
                    <div className={'cr_content'}>
                      {item.con}
                    </div>
                  </div>
                </div>
              )
            })
          }

          {/*参考结构*/}
          {/*<div className={'cr_list_friend'}>*/}
          {/*  <div className={'cr_list_item_time'}>4月12日 下午17:52</div>*/}
          {/*  <div className={'cr_list_item_info'}>*/}
          {/*    <div className={'cr_list_item_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}
          {/*    <div className={'cr_content'}>*/}
          {/*      你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？*/}
          {/*      你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？*/}
          {/*      你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？*/}
          {/*      你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className={'cr_list_item cr_list_friend'}>*/}
          {/*  <div className={'cr_list_item_info'}>*/}
          {/*    <div className={'cr_list_item_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}
          {/*    <div className={'cr_content'}>*/}
          {/*      好的*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*自己的聊天记录*/}
          {/*<div className={'cr_list_item_self'}>*/}
          {/*  <div className={'cr_list_item_info'}>*/}
          {/*    <div className={'cr_list_item_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}
          {/*    <div className={'cr_content'}>*/}
          {/*      这个呢我曹这么厉害的吗*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className={'cr_list_item_self'}>*/}
          {/*  <div className={'cr_list_item_info'}>*/}
          {/*    <div className={'cr_list_item_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}
          {/*    <div className={'cr_content'}>*/}
          {/*      这里的第二句聊天记录*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

        </div>

        <div className={'cr_input flex-shirink flex flex-item'}>
          <i className={'iconfont iconyuyin'} />
          <textarea ref={this.elInp} onChange={this.handleOnChange} rows={1} value={this.state.message} className={'cr_inp flex-one cr_inp_import'} />
          {/*<div id={'textarea'} className="textarea flex-one" contentEditable="true"><br/>{this.state.textareaValue}</div>*/}
          <i className={'iconfont iconbiaoqing1'} />
          <div className={'cr_right_icon'}>
            {
              !this.state.message && <i className={'iconfont icontianjia'} />
            }
            {
              this.state.message && <p onClick={this.handlePost} className={'cr_inp_submit'}>发送</p>
            }
          </div>
        </div>

      </div>
    );
  }
}

export default Chat;
