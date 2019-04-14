import React, {Component} from 'react';
import './setNewPas.css'
import TopTips from '../../components/topTips/index'
import {Button} from "antd-mobile";
import ZERO from '../../config/zero'

class SetNewPas extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: '',
      eye: {
        isShow: false,
        icon: 'iconbiyan1'
      }
    }
  }

  // input框改变
  handleChange = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  // 改变可以显示密码还是不可以显示
  changeIcon = () => {
    console.log('是否可以改变密码');
    const isSHow = this.state.eye.isShow;
    const icon = isSHow?'iconbiyan1':'iconyanjing3';
    this.setState({
      eye: {
        isShow: !isSHow,
        icon: icon
      }
    });
  };

  // 确认提交
  handleSubmit = () => {
    ZERO.Toast('修改成功');
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className={'set_newpas'}>
        <TopTips tips={'设置新密码'} />

        <div className={'gp_item flex flex-item'}>
          <input className='flex-one' type={this.state.eye.isShow?'text':'password'} defaultValue={this.state.password} onChange={this.handleChange} placeholder={'8-16位，至少数字/字母/字符2种组合'} />
          <i className={'p_icon iconfont ' + this.state.eye.icon} onClick={this.changeIcon}></i>
        </div>

        <Button className="btn" type="primary" onClick={this.handleSubmit}>修改密码</Button>
      </div>
    );
  }
}

export default SetNewPas;
