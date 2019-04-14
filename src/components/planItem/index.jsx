import React, {Component} from 'react';
import './planItem.css'

class PlanItem extends Component {
  render() {
    return (
      <div className={'plan_item'}>

        <div className={'pi_header flex'}>
          <div className={'pi_header_avatar'}>
            <img src={require('../../static/img/home/download1.jpg')} alt=""/>
          </div>

          <div className={'pi_timewrap'}>
            <p>张亚昌</p>
            <p className={'pi_time'}>1分钟前定制了计划</p>
          </div>
        </div>

      </div>
    );
  }
}

export default PlanItem;
