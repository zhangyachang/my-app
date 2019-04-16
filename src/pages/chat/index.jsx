import React, {Component} from 'react';
import './chat.css'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: 'aa'
    };

    this.init();
  }

  init =  () => {
    var self = this;
    var isValue = this.state.textareaValue;
    console.log(isValue);

    document.onclick = function () {
      self.setState({
        textareaValue: !isValue
      });
    }

  };






  render() {
    return (
      <div className={'chat_room'}>

        <div className={'cr_list flex-one'}>

          <div className={'cr_list_item cr_list_friend'}>
            <div className={'cr_list_item_time'}>4月12日 下午17:52</div>
            <div className={'cr_list_item_info'}>
              <div className={'cr_list_item_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>
              <div className={'cr_content'}>
                你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？
                你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？
                你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？
                你在哪呢.如果信息过多超出去会怎么样的呢你在哪呢？
              </div>
            </div>
          </div>

          <div className={'cr_list_item cr_list_friend'}>
            <div className={'cr_list_item_info'}>
              <div className={'cr_list_item_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>
              <div className={'cr_content'}>
                好的
              </div>
            </div>
          </div>

          {/*自己的聊天记录*/}
          <div className={'cr_list_item cr_list_item_self'}>
            <div className={'cr_list_item_info'}>
              <div className={'cr_list_item_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>
              <div className={'cr_content'}>
                这个呢我曹这么厉害的吗
              </div>
            </div>
          </div>

          <div className={'cr_list_item cr_list_item_self'}>
            <div className={'cr_list_item_info'}>
              <div className={'cr_list_item_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>
              <div className={'cr_content'}>
                这里的第二句聊天记录
              </div>
            </div>
          </div>

        </div>


        <div className={'cr_input flex-shirink flex flex-item'}>
          <i className={'iconfont iconyuyin'} />

          <textarea className={'cr_inp flex-one'} cols={1} />

          {/*<textarea className={'cr_inp flex-one'} rows="1" contentEditable="true">111</textarea>*/}
          {/*<div id={'textarea'} className="textarea flex-one" contentEditable="true"><br/>{this.state.textareaValue}</div>*/}
          <i className={'iconfont iconbiaoqing1'} />
          {
            !this.state.textareaValue && <i className={'iconfont icontianjia'} />
          }
          {
            this.state.textareaValue && <p className={'cr_inp_submit'}>发送</p>
          }
        </div>

      </div>
    );
  }
}

export default Chat;
