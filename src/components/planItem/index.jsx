import React, {Component} from 'react';
import './planItem.css'
import {withRouter} from 'react-router-dom';  // 吊啊 这个方法可以在这里获取到 props 上面的router

class PlanItem extends Component {
  // constructor(props){
  //   super(props);
  // }

  // 跳转到一个人的个人主页
  goPersonalPage = (userId) => {
    if(this.props.history.location.pathname === '/personalPage'){
      console.log('不要跳转');
      return ;
    }
    this.props.history.push(`/personalPage?userId=${userId}`);
  };

  render() {
    return (
      <div className={'plan_item'}>
        <div onClick={this.goPersonalPage.bind(this,'useId')} className={'pi_header flex'}>
          <div className={'pi_header_avatar'}>
            <img src={require('../../static/img/home/download1.jpg')} alt=""/>
          </div>
          <div className={'pi_timewrap'}>
            <p className={'pi_user'}>张亚昌</p>
            <p className={'pi_time ellipse'}>1分钟前定制了计划</p>
          </div>
        </div>

        <div className={'pi_con'}>
          学习更多的东西，毕业设计取得一个好的成绩。
        </div>

        <div className={'pi_imgwrap flex'}>
        {/*<div className={'pi_img_one'}>*/}
          <img src={require('../../static/img/home/download1.jpg')} alt=""/>
          <img src={require('../../static/img/home/download.jpg')} alt=""/>
          <img src={require('../../static/img/home/download2.jpg')} alt=""/>
          <img src={require('../../static/img/home/download2.jpg')} alt=""/>
        </div>

        <div className={'pi_support flex flex-center'}>
          <div className={'pi_support_item'}>
            <i className={'iconfont iconyanjing3'} />
            <span>39</span>
          </div>
          <div className={'pi_support_item'}>
            <i className={'iconfont iconpinglun'} />
            <span>345</span>
          </div>
          <div className={'pi_support_item'}>
            <i className={'iconfont iconunie60b'} />
            <span>10</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlanItem);
