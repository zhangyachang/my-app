import React, {Component} from 'react';
import './changeUserInfo.css'
import {Button} from "antd-mobile";
import ZERO from '../../../config/zero'
import {$axios} from "../../../config/server";

class ChangeUserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: '', // 通过type来显示不同的信息
      value: ''
    }
  }

  // 修改姓名
  handleChangeName = (e) => {
    console.log('修改姓名');
  };

  handleChange = () => {
    if(this.state.type){
      if(this.state.type !== 'avatar'){
        $axios({
          url: '',
          method: '/bs/api/userInfo',
          data: {
            [this.state.type]: this.state.value
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
        console.log('修改用户头像');
      }
    }else{
      ZERO.Toast('请重新进入此页面，请勿刷新');
    }
  };

  // 处理 input框的变化
  handleChangeNick = (e) => {
    this.setState({
      value: e.target.value
    })
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
    }
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
          type === 'sex' && <div> 显示修改用户性别 </div>
        }

        {
          type === 'avatar' && <div> 显示修改用户头像 </div>
        }

        {
          type === 'signature' && <div className={'cui_nick'}>
            <input type="text" defaultValue={this.state.value} onChange={this.handleChangeNick} />
          </div>
        }

        <Button className="btn" type="primary" onClick={this.handleChange}>确认修改</Button>
      </div>
    );
  }
}

export default ChangeUserInfo;
