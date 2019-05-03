import React, {Component} from 'react';
import './changeUserInfo.css'
import {Button} from "antd-mobile";
import ZERO from '../../../config/zero'
import {$axios} from "../../../config/server";
import {Redirect} from 'react-router-dom';
import {changeUserAvatar} from "../../../config/utils";

class ChangeUserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: '', // 通过type来显示不同的信息
      value: '',
      avatarImgUrl: '', // 这个里面存放的是选择头像暂时存放的文件
      files: [], // 这个里面存放的是真实的文件
    }
  }

  // 修改姓名
  handleChangeName = (e) => {
    console.log('修改姓名');
  };

  // 修改性别
  changeSex = (sex) => {
    console.log('点击了按钮');
    if(this.state.value === sex){
      return ;
    }
    let changeResult = '';
    if(this.state.value === 0) {
      changeResult = 1;
    }else if(this.state.value === 1) {
      changeResult = 0;
    }else {
      ZERO.Toast('请从正常渠道修改');
    }
    const uid = ZERO.getLocalStorageItem('user') || ZERO.getSessionStorage('user');
    if(!uid){
      ZERO.Toast('登录信息过期，请重新登录');
      return <Redirect to='/404'/>;
    }

    $axios({
      url: '/bs/api/userInfo',
      method: 'POST',
      data: {
        [this.state.type]: changeResult,
        uid: uid
      }
    })
      .then(res => {
        if(res.status === 200){
          ZERO.Toast('修改成功');
          this.props.history.goBack();
        }else{
          ZERO.Toast('服务器繁忙，请稍后再试');
        }
      })
      .catch(err => {})
  };

  // 确认修改
  handleSubmit = async () => {
    const uid = ZERO.getSessionStorage('user') || ZERO.getLocalStorageItem('user');

    if(this.state.type){
      if(this.state.type !== 'avatar'){
        $axios({
          url: '/bs/api/userInfo',
          method: 'POST',
          data: {
            [this.state.type]: this.state.value,
            uid: uid
          }
        })
          .then(res => {
            if(res.status === 200){
              ZERO.Toast('修改成功');
              this.props.history.goBack();
            }else{
              ZERO.Toast('服务器繁忙，请稍后再试');
            }
          })
          .catch(err => {})
      }else{
        let uid = ZERO.getUid();
        if(this.state.files.length === 0){
          return ZERO.Toast('请选择头像');
        }
        let result = await changeUserAvatar({uid, avatar: this.state.files[0]});
        console.log(result);
        if(result.status === 200){
          ZERO.Toast('头像修改成功');
          this.props.history.goBack();
        }else{
          ZERO.Toast('服务器繁忙，头像修改失败，请稍后再试');
        }
      }
    }else{
      ZERO.Toast('请重新进入此页面进行修改');
    }
  };

  // 修改头像 选择图片
  selectImg = (e) => {
    let fileImg = e.target.files[0];
    this.setState({
      files: [fileImg]
    });
    let blogUrl = this.createObject(fileImg);
    this.setState({
      avatarImgUrl: blogUrl
    });
  };

  // 删除选择的头像
  deleteAvatar = () => {
    this.setState({
      avatarImgUrl: ''
    });
    this.setState({
      files: []
    });
  };

  /**
   * 将文件生成 Blob 地址
   * @params {Object} 文件  e.target.files[0]
   *
   * @return {String} blob:http://localhost:8080/71661062-2241-4c50-a7d2-7bddf17b5788
   *  一种地址，可以放到图片的src上
   */
  createObject = (blob) => {
    if (window.URL) {
      return window.URL.createObjectURL(blob);
    } else if (window.webkitURL) {
      return window.webkitURL.createObjectURL(blob);
    } else {
      return null;
    }
  };

  // 处理 input框的变化
  handleChangeNick = (e) => {
    this.setState({
      value: e.target.value
    });
  };


  componentDidMount() {
    if(this.props.location.query){
      let {type} = this.props.location.query;
      let value = this.props.location.state[type];

      this.setState({
        type: type
      });
      this.setState({
        value: value
      });
    }else{
      ZERO.Toast('请个人信息详情页面进入此页面');
    }
    console.log(this.props);
  }

  render() {
    const {type} = this.state;
    return (
      <div className={'change_user_info'}>
        {
          type === 'nick' && (<div className={'cui_nick'}>
              <input type="text" defaultValue={this.state.value} onChange={this.handleChangeNick} />
          </div>
          )
        }
        {
          type === 'sex' && <div className={'cui_sex'}>
            <p onClick={this.changeSex.bind(this, 1)}>
              <span>男</span>
              {
                this.state.value === 1 && <i className={'iconfont icondui1'} />
              }
            </p>
            <p onClick={this.changeSex.bind(this, 0)}>
              <span>女</span>
              {this.state.value === 0 && <i className={'iconfont icondui1'} />}
            </p>
          </div>
        }

        {
          type === 'avatar' && <div>
            <div className={'cui_upload_avatar'}>
              <img src={this.state.avatarImgUrl? this.state.avatarImgUrl:require('../../../static/img/user/upload.png')} alt=""/>
              <input className="vq_fileInput" type="file" onChange={this.selectImg} accept="image/*" />
              {this.state.avatarImgUrl && <i onClick={this.deleteAvatar} className={'iconfont iconfork'} />}
            </div>

          </div>
        }

        {
          type === 'signature' && <div className={'cui_nick'}>
            <textarea type="text" defaultValue={this.state.value} onChange={this.handleChangeNick} />
          </div>
        }

        {
          this.state.type === 'sex' || <Button className="btn" type="primary" onClick={this.handleSubmit}>确认修改</Button>
        }
      </div>
    );
  }
}

export default ChangeUserInfo;
