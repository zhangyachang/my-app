import React, {Component} from 'react';
import './plan.css'
import TabBar from '../../components/tabBar/index';
import ZERO from '../../config/zero';
import {searchPlanToday, putPlanStatus, yesterdayPlan} from '../../config/utils';
import { Modal} from 'antd-mobile';
const alert = Modal.alert;

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: 'today',
      pageData: [

      ],
    };
  }

  // 添加新目标
  addNewPlan = () => {
    console.log('添加新目标');
    this.props.history.push('/addNewPlan');
  };

  // 查询今日计划
  searchTodayPlan = async() => {
    let uid = ZERO.getUid();
    let result = await searchPlanToday(uid);
    // console.log(`今日计划`);
    // console.log(result);
    if(result.status === 400){
      return ZERO.Toast('查询失败，请稍后再试');
    }
    if(result.status === 500){
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
    if(result.status === 200){
      this.setState({
        pageData: result.data,
        tabBar: 'today'
      });
    }else{
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 查询昨日计划
  searchYesterdayPlan = async () => {
    let uid = ZERO.getUid();
    let result = await yesterdayPlan(uid);
    console.log(`查询出来的结果`);
    console.log(result);
    if(result.status === 200){
      this.setState({
        pageData: result.data,
        tabBar: 'yesterday'
      });
    }
    if(result.status === 400){
      return ZERO.Toast('查询失败');
    }
    if(result.statsu === 500){
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 页面加载完成
  async componentDidMount() {
    this.searchTodayPlan();
  }

  // 点击改变状态
  handleChangeStatus = (plId, status, title) => {
    // console.log(`改变状态`);
    // console.log(plId, status);
    if(status === 0){
      this.modelAlertStart({plId, status, title});
    }else if(status === 1){
      this.modelAlertSuccess({plId, status, title});
    }else if(status === 2){
      this.props.history.push(`/appPushDetail?planId=${plId}`);
    }
  };

  modelAlertStart = (obj) => {
    alert(`开始${obj.title}`, '是否开始', [
      { text: '再等等', onPress: () => 0, style: 'default' },
      { text: '开始', onPress: () => {this.putPlanStatus(obj)} },
    ]);
  };

  modelAlertSuccess = (obj) => {
    alert(`完成${obj.title}`, '是否完成了此计划？', [
      { text: '还没有', onPress: () => 0, style: 'default' },
      { text: '完成了', onPress: () => {this.putPlanStatus(obj)} },
    ]);
  };

  putPlanStatus = async (obj) => {
    console.log(`改变计划状态`);
    let uid = ZERO.getUid();
    let type = '';
    if(obj.status === 0){
      type = 'start';
    }else if(obj.status === 1){
      type = 'success';
    }else {
      return ZERO.Toast('状态错误,无法开始');
    }
    console.log(obj);
    let result = await putPlanStatus({
      uid: uid,
      id: obj.plId,
      type: type
    });
    console.log(`查询结果`);
    console.log(result);
    if(result.status === 200){
      // window.history.go(0);
      this.searchTodayPlan();
      return ZERO.Toast('修改成功');
    }
    if(result.status === 250){
      return ZERO.Toast('type类型错误');
    }
    if(result.status === 251){
      return ZERO.Toast('不可以修改非本日期的计划');
    }
    
    if(result.status === 400){
      return ZERO.Toast('修改失败');
    }
    if(result.status === 500){
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
  }

  // 查看昨天的计划
  yesterday = async () => {
    console.log(`点击到我了`);
    this.searchYesterdayPlan();
  };
  // 今日的计划
  today = () => {
    if(this.state.tabBar === 'today'){
      return ;
    }
    this.searchTodayPlan();
  };

  render() {
    return (
      <div className={'plan1'}>
        <div className={'plan1_navbar flex'}>
          <p onClick={this.yesterday} className={(this.state.tabBar === 'yesterday')?'plan1_navbar_item plan1_navbar_item_active':'plan1_navbar_item'}>昨</p>
          <p onClick={this.today} className={(this.state.tabBar === 'today')?'plan1_navbar_item plan1_navbar_item_active':'plan1_navbar_item'}>今</p>
          {/* <p className={'plan1_navbar_item'}>明</p> */}
        </div>

        <div className={'plan1_list'}>
        {
          this.state.pageData.map((item) => {
            return (<div onClick={this.handleChangeStatus.bind(this, item.id, item.p_status, item.p_title)} key={item.pid} className={item.p_status === 0 ? 'plan1_list_item': (item.p_status === 1) ? 'plan1_list_item plan1_list_item_nodone':'plan1_list_item plan1_list_item_success'}>
              <i className={item.p_status === 0 ? 'iconfont iconbazi': (item.p_status === 1) ? 'iconfont iconweiwancheng1':'iconfont iconwancheng2'} />
              <p className={'plan1_list_item_title ellipse'}>{item.p_title}</p>
              <p className={'plan1_list_item_time'}>{item.start_time + '-'}{((item.p_status === 0) || (item.p_status === 1))?'23:59':item.end_time}</p>
            </div>
            )
          })
        }

          {/* <div className={'plan1_list_item'}>
            <i className={'iconfont iconbazi'} />
            <p className={'plan1_list_item_title'}>跑步</p>
            <p className={'plan1_list_item_time'}>00:00-23:59</p>
          </div>

          <div className={'plan1_list_item plan1_list_item_success'}>
            <i className={'iconfont iconwancheng2'} />
            <p className={'plan1_list_item_title'}>跑步</p>
            <p className={'plan1_list_item_time'}>00:00-23:59</p>
          </div>

          <div className={'plan1_list_item plan1_list_item_nodone'}>
            <i className={'iconfont iconweiwancheng1'} />
            <p className={'plan1_list_item_title'}>跑步</p>
            <p className={'plan1_list_item_time'}>00:00-23:59</p>
          </div>

          <div className={'plan1_list_item plan1_list_item_nodone'}>
            <i className={'iconfont iconweiwancheng1'} />
            <p className={'plan1_list_item_title'}>跑步</p>
            <p className={'plan1_list_item_time'}>00:00-23:59</p>
          </div>

          <div className={'plan1_list_item plan1_list_item_nodone'}>
            <i className={'iconfont iconweiwancheng1'} />
            <p className={'plan1_list_item_title'}>跑步</p>
            <p className={'plan1_list_item_time'}>00:00-23:59</p>
          </div> */}

        </div>

        <div onClick={this.addNewPlan} className={'plan1_add_plan'}>
          <img src={require('../../static/img/plan/add_plan.png')} alt=""/>
        </div>

        <TabBar />

      </div>
    );
  }
}

export default Plan;
