import React, { Component } from 'react';
import './plan.css'
import TabBar from '../../components/tabBar/index';
import ZERO from '../../config/zero';
import { searchPlanToday, putPlanStatus, yesterdayPlan, getPlanByDate } from '../../config/utils';
import { Modal, Calendar, Toast } from 'antd-mobile';
const alert = Modal.alert;


/*日历相关 */
const now = new Date();
/*日历相关 */

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: 'today',
      pageData: [
      ],
      isShowNoPlan: false, // 是否显示没有计划提示
      // 日历的一些
      show: false,
      config: {},
      selectDate: '',
    };
  }

  // 添加新目标
  addNewPlan = () => {
    console.log('添加新目标');
    this.props.history.push('/addNewPlan');
  };

  // 查询今日计划
  searchTodayPlan = async () => {
    let uid = ZERO.getUid();
    let result = await searchPlanToday(uid);
    // console.log(`今日计划`);
    // console.log(result);
    if (result.status === 400) {
      return Toast.info('查询失败，请稍后再试');
    }
    if (result.status === 500) {
      return Toast.info('服务器繁忙，请稍后再试');
    }
    if (result.status === 200) {
      this.setState({
        pageData: result.data,
        tabBar: 'today'
      });
      if (result.data.length === 0) {
        this.setState({
          isShowNoPlan: true
        });
      } else {
        this.setState({
          isShowNoPlan: false
        });
      }
    } else {
      return Toast.info('服务器繁忙，请稍后再试');
    }
  };

  // 查询昨日计划
  searchYesterdayPlan = async () => {
    let uid = ZERO.getUid();
    let result = await yesterdayPlan(uid);
    console.log(`查询出来的结果`);
    console.log(result);
    if (result.status === 200) {
      this.setState({
        pageData: result.data,
        tabBar: 'yesterday'
      });
      if (result.data.length === 0) {
        this.setState({
          isShowNoPlan: true
        });
      } else {
        this.setState({
          isShowNoPlan: false
        });

        // 这里的路由要修改一下
        // console.log('执行了吗');
        // console.log(this.props.history);
        // this.props.history.replace('/plan?type=yestoday');
      }
    }
    if (result.status === 400) {
      return Toast.info('查询失败');
    }
    if (result.statsu === 500) {
      return Toast.info('服务器繁忙，请稍后再试');
    }
  };

  // 根据日期查询计划
  searchDatePlan = async (date) => {
    let uid = ZERO.getUid();
    let result = await getPlanByDate(uid, date);
    console.log(`查询出来的结果`);
    console.log(result);
    if (result.status === 200) {
      this.setState({
        pageData: result.data,
        tabBar: 'date',
        selectDate: date
      });
      if (result.data.length === 0) {
        this.setState({
          isShowNoPlan: true
        });
      } else {
        this.setState({
          isShowNoPlan: false
        });
      }
    }
    if (result.status === 400) {
      return Toast.info('查询失败');
    }
    if (result.statsu === 500) {
      return Toast.info('服务器繁忙，请稍后再试');
    }
  };

  // 页面加载完成
  async componentDidMount() {
    this.searchTodayPlan();
    console.log(ZERO.regPhone(15566666661));
  }

  // 点击改变状态
  handleChangeStatus = (plId, status, title) => {
    // console.log(`改变状态`);
    // console.log(plId, status);
    if (status === 0) {
      this.modelAlertStart({ plId, status, title });
    } else if (status === 1) {
      this.modelAlertSuccess({ plId, status, title });
    } else if (status === 2) {
      this.props.history.push(`/appPushDetail?planId=${plId}`);
    }
  };

  modelAlertStart = (obj) => {
    alert(`开始${obj.title}`, '是否开始', [
      { text: '再等等', onPress: () => 0, style: 'default' },
      { text: '开始', onPress: () => { this.putPlanStatus(obj) } },
    ]);
  };

  modelAlertSuccess = (obj) => {
    alert(`完成${obj.title}`, '是否完成了此计划？', [
      { text: '还没有', onPress: () => 0, style: 'default' },
      { text: '完成了', onPress: () => { this.putPlanStatus(obj) } },
    ]);
  };

  putPlanStatus = async (obj) => {
    console.log(`改变计划状态`);
    let uid = ZERO.getUid();
    let type = '';
    if (obj.status === 0) {
      type = 'start';
    } else if (obj.status === 1) {
      type = 'success';
    } else {
      return Toast.info('状态错误,无法开始');
    }
    console.log(obj);
    let result = await putPlanStatus({
      uid: uid,
      id: obj.plId,
      type: type
    });
    console.log(`查询结果`);
    console.log(result);
    if (result.status === 200) {
      // window.history.go(0);
      this.searchTodayPlan();
      // ZERO.shakePhone();
      return Toast.info('计划完成,有一条新的推送消息');
    }
    if (result.status === 250) {
      return Toast.info('type类型错误');
    }
    if (result.status === 251) {
      return Toast.info('不可以修改非本日期的计划');
    }

    if (result.status === 400) {
      return Toast.info('修改失败');
    }
    if (result.status === 500) {
      return Toast.info('服务器繁忙，请稍后再试');
    }
  }

  // 查看昨天的计划
  yesterday = async () => {
    console.log(`点击到我了`);
    this.searchYesterdayPlan();
  };
  // 今日的计划
  today = () => {
    if (this.state.tabBar === 'today') {
      return;
    }
    this.searchTodayPlan();
  };

  /* 日历相关 */
  // 选择日期
  selectCanlendar = () => {
    this.setState({
      show: true
    });
  }

  onSelectHasDisableDate = (dates) => {
    console.warn('onSelectHasDisableDate', dates);
  }

  onConfirm = (startTime, endTime) => {
    console.log('确认的回调函数');
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime,
      endTime,
    });
    var date = ZERO.formatDate(startTime).split(' ')[0];

    // 调用查询日期的函数
    this.searchDatePlan(date);
  }

  onCancel = () => {
    document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
    this.setState({
      show: false,
      startTime: undefined,
      endTime: undefined,
    });
  }
  /* 日历相关 */


  render() {
    return (
      <div className={'plan1'}>
        <div className={'plan1_navbar flex'}>
          <p onClick={this.yesterday} className={(this.state.tabBar === 'yesterday') ? 'plan1_navbar_item plan1_navbar_item_active' : 'plan1_navbar_item'}>昨</p>
          <p onClick={this.today} className={(this.state.tabBar === 'today') ? 'plan1_navbar_item plan1_navbar_item_active' : 'plan1_navbar_item'}>今</p>
          <p className={(this.state.tabBar === 'date') ? 'plan1_navbar_item plan1_navbar_item_active' : 'plan1_navbar_item'}><i onClick={this.selectCanlendar} className='iconfont iconcalendar'></i></p>
          <span className='plan1_navbar_item_active_date'>{this.state.selectDate}</span>
          {/* <p className={'plan1_navbar_item'}>明</p> */}
        </div>

        <div className={'plan1_list'}>
          {
            this.state.pageData.map((item) => {
              return (<div onClick={this.handleChangeStatus.bind(this, item.id, item.p_status, item.p_title)} key={item.pid} className={item.p_status === 0 ? 'plan1_list_item' : (item.p_status === 1) ? 'plan1_list_item plan1_list_item_nodone' : 'plan1_list_item plan1_list_item_success'}>
                <i className={item.p_status === 0 ? 'iconfont iconbazi' : (item.p_status === 1) ? 'iconfont iconweiwancheng1' : 'iconfont iconwancheng2'} />
                <p className={'plan1_list_item_title ellipse'}>{item.p_title}</p>
                <p className={'plan1_list_item_time'}>{item.start_time + '-'}{((item.p_status === 0) || (item.p_status === 1)) ? '23:59' : item.end_time}</p>
              </div>
              )
            })
          }
          {
            this.state.isShowNoPlan && <p className='plan_no_plan_tips'>今日没有计划哦</p>
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

        {/* 日历 */}
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          type={'one'}
          minDate={new Date(+now - 31536000000)}
          maxDate={new Date(+now)}
        />

        <div onClick={this.addNewPlan} className={'plan1_add_plan'}>
          <img src={require('../../static/img/plan/add_plan.png')} alt="" />
        </div>

        <TabBar />

      </div>
    );
  }
}

export default Plan;
