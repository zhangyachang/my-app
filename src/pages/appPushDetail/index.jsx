import React, { Component } from 'react';
import './appPushDetail.css'
import ZERO from '../../config/zero'
import { getPlanDetail } from '../../config/utils'
import { Toast } from 'antd-mobile';

class AppPushDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushDetail: {}
    }
  }

  searchDetailByPlanId = (planId) => {
    getPlanDetail(planId)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if(res.data[0]){
            this.setState({
              pushDetail: res.data[0]
            })
          }else{
            Toast.info('详情查询失败，请稍后再试', 1);
          }
        } else if (res.status === 400) {
          Toast.info('获取推送消息详情失败，请稍后再试', 1);
        } else if (res.status === 500) {
          Toast.info('服务器繁忙，请稍后再试', 1);
        }
      })
      .catch(err => {
        Toast.info('获取推送消息详情失败，请稍后再试', 1);
      })
  };

  componentDidMount() {
    let { planId } = ZERO.parseUrl(this.props.location.search);
    if (planId) {
      this.searchDetailByPlanId(planId);
    } else {
      Toast.info('请从正常的渠道进入此页面', 1);
    }
  }

  render() {
    const pushDetail = this.state.pushDetail;
    return (
      <div className='app_push_detail'>
        {/* 头部内容 */}
        <div className='apd_header'>
          <img src={require('../../static/img/logo/logo.png')} alt="" />
          <p className='apd_header_title'>{pushDetail.push_title}</p>
          <span className='apd_header_pushtime'>{pushDetail.push_time}</span>
        </div>

        {/* 
          目标名称
          目标描述
          开始时间
          结束时间
          所花时间
          目标开始日期
          目标结束日期
          助手评价
        */}

        {/* 状态信息 */}
        <div className='apd_detail'>

          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>完成目标</p>
            <span>{pushDetail.p_title}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>当前状态</p>
            <span>{pushDetail.p_status === 2 ? '已完成' : (pushDetail.p_stasus === 1) ? '未完成' : ''}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>开始时间</p>
            <span>{pushDetail.start_time}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>结束时间</p>
            <span>{pushDetail.end_time}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>所花时间</p>
            <span>{pushDetail.time_length} 分</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>开始日期</p>
            <span>{pushDetail.start_date}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>结束日期</p>
            <span>{pushDetail.end_date}</span>
          </div>
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>预开始时间</p>
            <span>{pushDetail.plan_time}</span>
          </div>
          {
            pushDetail.p_con && <div className='apd_detail_item'>
              <p className='apd_detail_item_des'>描述信息</p>
              <span>{pushDetail.p_con}</span>
            </div>
          }
          <div className='apd_detail_item'>
            <p className='apd_detail_item_des'>助手评价</p>
            <span>{pushDetail.push_con}</span>
          </div>

        </div>

      </div>
    );
  }
}

export default AppPushDetail;