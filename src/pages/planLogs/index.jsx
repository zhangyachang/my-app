import React, {Component} from 'react';
import './planLogs.css'
import PlanTabBar from '../../components/planTabBar/index'

class PlanLogs extends Component {


  handlePlanDetail = (planId) => {
    // console.log('打印一下计划id');
    this.props.history.push(`/planDetail?planId=${planId}`);
  };

  render() {
    return (
      <div className={'plan_logs'}>

        <div className={'pl_header flex'}>
          <div className={'pl_see'}>
            <span>全部类型</span>
            <i className={'iconfont iconxialajiantou'}></i>
          </div>
          <div className={'pl_see'}>
            <span>所有日期</span>
            <i className={'iconfont iconxialajiantou'}></i>
          </div>
        </div>

        <div className={'pl_list'}>

          <div onClick={this.handlePlanDetail.bind(this, '计划id')} className={'pl_item'}>
            <p className={'pl_item_time'}>4月15日</p>
            <div className={'pl_item_con flex'}>

              <div className={'pl_item_con_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>

              <div className={'pl_item_con_right flex-one'}>
                <p className={'pl_item_con_right_user'}>
                  张亚昌
                  <span className={'pl_item_con_right_time'}>17:17</span>
                </p>
                <div className={'pl_item_con_right_plan'}>
                  <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>
                  <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>
                </div>
              </div>
            </div>
          </div>

          <div className={'pl_item'}>
            <p className={'pl_item_time'}>4月15日</p>
            <div className={'pl_item_con flex'}>

              <div className={'pl_item_con_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>

              <div className={'pl_item_con_right flex-one'}>
                <p className={'pl_item_con_right_user'}>
                  张亚昌
                  <span className={'pl_item_con_right_time'}>17:17</span>
                </p>
                <div className={'pl_item_con_right_plan'}>
                  <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>
                  <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>
                </div>
              </div>
            </div>

          </div>

          <div className={'pl_item'}>
            <p className={'pl_item_time'}>4月15日</p>
            <div className={'pl_item_con flex'}>

              <div className={'pl_item_con_avatar flex-shirink'}>
                <img src={require('../../static/img/home/download.jpg')} alt=""/>
              </div>

              <div className={'pl_item_con_right flex-one'}>
                <p className={'pl_item_con_right_user'}>
                  张亚昌
                  <span className={'pl_item_con_right_time'}>17:17</span>
                </p>
                <div className={'pl_item_con_right_plan'}>
                  <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>
                  <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <PlanTabBar />
        
      </div>
    );
  }
}

export default PlanLogs;
