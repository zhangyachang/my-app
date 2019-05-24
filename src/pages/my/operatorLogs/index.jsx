import React, { Component } from 'react';
import './operatorLogs.css'

class OperatorLogs extends Component {
  render() {
    return (
      <div className="operator_logs">

        <div className='opl_day'>
          <div className='opl_day_title'>今天</div>
          <ul className='opl_day_list'>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
          </ul>
        </div>

        <div className='opl_day'>
          <div className='opl_day_title'>昨天</div>
          <ul className='opl_day_list'>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
            <li>
              <p>打卡:羽毛球</p>
              <p className='opl_day_list_item_time'>15:56</p>
            </li>
          </ul>
        </div>


      </div>
    );
  }
}

export default OperatorLogs;