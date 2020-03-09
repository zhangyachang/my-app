import React, {Component} from 'react';
import './planDetail.css'
import config from '../../config/config'
import {$axios} from "../../config/server";
import ZERO from '../../config/zero'
import {Toast} from 'antd-mobile'

class PlanDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planDetail: {
        create_time: ''
      }
    }
  }


  componentDidMount() {
    const {planId} = ZERO.parseUrl(this.props.location.search);
    if (planId) {
      $axios({
        url: '/bs/api/planDetail',
        method: 'GET',
        params: {
          pid: planId
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              planDetail: res.data[0]
            })
          } else {
            Toast.info('服务器繁忙，请稍后再试');
          }
        })
    } else {
      Toast.info('缺少查询详情所必需的的参数，请从正常途径进入此页面');
    }
  }

  render() {
    const planDetail = this.state.planDetail;
    return (
      <div className={'plan_detail'}>
        <div className={'pd_header flex flex-item'}>
          <div className={'pd_avatar flex flex-item'}>
            <img src={`${config.url}${planDetail.avatar}`} alt=""/>
            <span className={'pd_header_type'}>{planDetail.p_type && (planDetail.p_type==='day_plan'?'日':(planDetail.p_type==='week_plan')?'周':'月')}计划详情</span>
          </div>
          <div className={'pd_header_time'}>{planDetail.create_time}</div>
        </div>
        <div className={'pd_content'}>
          {
            planDetail.now &&
            <div>
              <p>今日工作： <span>{planDetail.now}</span></p>
              <br/>
            </div>
          }
          {
            planDetail.nodone &&
            <div>
              <p>未完成工作： <span>{planDetail.nodone}</span></p>
              <br/>
            </div>
          }
          {
            planDetail.nodone &&
            <div>
              <p>计划工作： <span>{planDetail.future}</span></p>
              <br/>
            </div>
          }
          {
            planDetail.other &&
            <div>
              <p>其他事项： <span>{planDetail.other}</span></p>
              <br/>
            </div>
          }
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
