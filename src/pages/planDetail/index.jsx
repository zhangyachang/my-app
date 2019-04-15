import React, {Component} from 'react';
import './planDetail.css'

class PlanDetail extends Component {
  render() {
    return (
      <div className={'plan_detail'}>

        <div className={'pd_header'}>
          <div className={'pd_avatar'}>
            <img src={require('../../static/img/home/download.jpg')} alt=""/>
            <span>我的工作</span>
          </div>

          <div className={'pd_header_time'}>4月1日 20:33</div>
        </div>
      </div>
    );
  }
}

export default PlanDetail;
