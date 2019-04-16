import React, {Component} from 'react';
import './planDetail.css'

class PlanDetail extends Component {
  render() {
    return (
      <div className={'plan_detail'}>

        <div className={'pd_header flex flex-item'}>
          <div className={'pd_avatar flex flex-item'}>
            <img src={require('../../static/img/home/download.jpg')} alt=""/>
            <span className={'pd_header_type'}>我的工作</span>
          </div>
          <div className={'pd_header_time'}>4月16日 9:43</div>
        </div>
        <div className={'pd_content'}>
          <p>未完成工作: <span>提醒微信版本更新功能，顶部的导航功能还未完成。</span></p>
          <br/>
          <p>计划工作：提醒微信版本更新功能，顶部的导航功能尽快完成，并将逻辑优化。</p>
        </div>
        <div className={'pd_logo flex flex-item'}>
          <img src={require('../../static/img/logo/logo.png')} alt=""/>
          <span>已记录到助手</span>
        </div>
      </div>
    );
  }
}

export default PlanDetail;
