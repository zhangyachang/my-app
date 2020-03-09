import React, {Component} from 'react';
import './planLogs.css'
import PlanTabBar from '../../components/planTabBar/index'
import ZERO from '../../config/zero'
import {$axios} from "../../config/server";
import config from '../../config/config'
import {Toast} from 'antd-mobile'

class PlanLogs extends Component {
  constructor(props){
    super(props);
    this.state = {
      planLogs: []
    }
  }

  handlePlanDetail = (planId) => {
    // console.log('打印一下计划id');
    this.props.history.push(`/planDetail?planId=${planId}`);
  };
  componentDidMount() {
    const user = ZERO.getSessionStorage('user') || ZERO.getLocalStorageItem('user');
    $axios({
      url: '/bs/api/plan',
      method: 'GET',
      params: {
        uid: user
      }
    })
      .then(res => {
        if(res.status === 200){
          this.setState({
            planLogs: res.data
          });
        }else{
          Toast.info('服务器繁忙，请稍后再试');
        }
      })
      .catch(() => {});
  }

  render() {
    const planLogs = this.state.planLogs;
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
          {
            planLogs.map((item, index) => {
              return (
                <div onClick={this.handlePlanDetail.bind(this, item.pid)} key={item.pid} className={'pl_item'}>
                  <p className={'pl_item_time'}>{item.create_time.split(' ')[0]}</p>
                  <div className={'pl_item_con flex'}>

                    <div className={'pl_item_con_avatar flex-shirink'}>
                      <img src={`${config.url}${item.avatar}`} alt=""/>
                    </div>

                    <div className={'pl_item_con_right flex-one'}>
                      <p className={'pl_item_con_right_user'}>
                        {item.nick}
                        <span className={'pl_item_con_right_time'}>{item.create_time.split(' ')[1]}</span>
                      </p>
                      <div className={'pl_item_con_right_plan'}>
                        <p className={'ellipse'}>完成计划： {item.now}</p>
                        <p className={'ellipse'}>未完成计划： {item.nodone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          {/*<div onClick={this.handlePlanDetail.bind(this, '计划id')} className={'pl_item'}>*/}
          {/*  <p className={'pl_item_time'}>4月15日</p>*/}
          {/*  <div className={'pl_item_con flex'}>*/}

          {/*    <div className={'pl_item_con_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}

          {/*    <div className={'pl_item_con_right flex-one'}>*/}
          {/*      <p className={'pl_item_con_right_user'}>*/}
          {/*        张亚昌*/}
          {/*        <span className={'pl_item_con_right_time'}>17:17</span>*/}
          {/*      </p>*/}
          {/*      <div className={'pl_item_con_right_plan'}>*/}
          {/*        <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>*/}
          {/*        <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className={'pl_item'}>*/}
          {/*  <p className={'pl_item_time'}>4月15日</p>*/}
          {/*  <div className={'pl_item_con flex'}>*/}

          {/*    <div className={'pl_item_con_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}

          {/*    <div className={'pl_item_con_right flex-one'}>*/}
          {/*      <p className={'pl_item_con_right_user'}>*/}
          {/*        张亚昌*/}
          {/*        <span className={'pl_item_con_right_time'}>17:17</span>*/}
          {/*      </p>*/}
          {/*      <div className={'pl_item_con_right_plan'}>*/}
          {/*        <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>*/}
          {/*        <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*</div>*/}

          {/*<div className={'pl_item'}>*/}
          {/*  <p className={'pl_item_time'}>4月15日</p>*/}
          {/*  <div className={'pl_item_con flex'}>*/}

          {/*    <div className={'pl_item_con_avatar flex-shirink'}>*/}
          {/*      <img src={require('../../static/img/home/download.jpg')} alt=""/>*/}
          {/*    </div>*/}

          {/*    <div className={'pl_item_con_right flex-one'}>*/}
          {/*      <p className={'pl_item_con_right_user'}>*/}
          {/*        张亚昌*/}
          {/*        <span className={'pl_item_con_right_time'}>17:17</span>*/}
          {/*      </p>*/}
          {/*      <div className={'pl_item_con_right_plan'}>*/}
          {/*        <p className={'ellipse'}>完成计划： 收银台、付款码功能完成</p>*/}
          {/*        <p className={'ellipse'}>未完成计划： 扫码枪扫码输入时间过长，正在想办法解决</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        <PlanTabBar />

      </div>
    );
  }
}

export default PlanLogs;
