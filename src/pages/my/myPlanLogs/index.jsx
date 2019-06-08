import React, { Component } from 'react';
import './myPlanLogs.css'
import ZERO from '../../../config/zero'
import { getAllPlan } from '../../../config/utils'

class MyPlanLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  /**
   * 查询用户的所有计划
   * @params uid 用户id
   * @params pageIndex 页码
   */
  getUserAllPlan = async (uid, pageIndex) => {
    let result = await getAllPlan(uid, pageIndex);
    console.log('获取到了用户所有的计划');
    console.log(result);
  }

  // 获取历史
  componentDidMount() {
    let uid = ZERO.getUid();
    if(uid){
      // console.log(uid);
      this.getUserAllPlan(uid, 1);
    }else{
      ZERO.Toast('用户登录信息过期，请重新登录');
    }
  }


  render() {
    return (
      <div className='my_plan_logs'>
        <div className='mpl_list'>
          
        </div>
        我的计划历史
      </div>
    );
  }
}

export default MyPlanLogs;