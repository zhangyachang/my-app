import React, { Component } from 'react';
import './myPlanLogs.css'
import ZERO from '../../../config/zero'
import { onPlan, achievePlan, offNoneDonePlan } from '../../../config/utils'
import LoadMore from '../../../components/loadMore'

class MyPlanLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: 'on', // tab的类型
      onPlanList: { // 正在进行的
        page: 1, // 页码
        data: [], // 已经完成的列表计划
        isMore: true // 是否更多按钮显示
      },
      achievePlanList: {  //已经完成的
        page: 1,
        data: [],
        isMore: true
      },
      noDonePlanList: { // 还没有开始的
        page: 1,
        data: [],
        isMore: true
      }
    }
  }

  // 处理导航的点击
  handleTab = (type) => {
    this.setState({
      tabType: type
    });
    if (type === 'on') {
      // 进行中
      if (!this.state.onPlanList.data.length) {
        this.getUserAllPlan();
      }
    } else if (type === 'true') {
      // 已完成
      if (!this.state.achievePlanList.data.length) {
        this.getUserAchievePlan();
      }
    } else if (type === 'off') {
      // 未开始
      if (!this.state.noDonePlanList.length) {
        this.getNoDonePlanList();
      }
    }
  };

  /**
   * 渲染哪一个分组的数据
   */
  whichData = () => {
    if (this.state.tabType === 'on') {
      return this.state.onPlanList;
    } else if (this.state.tabType === 'true') {
      return this.state.achievePlanList;
    } else if (this.state.tabType === 'off') {
      return this.state.noDonePlanList;
    }
  };


  /**
   * 查询用户正在进行的计划
   * @params uid 用户id
   * @params pageIndex 页码
   */
  getUserAllPlan = async () => {
    let uid = ZERO.getUid();
    if (!uid) {
      return ZERO.Toast('用户登录信息过期，请重新登录');
    }

    let result = await onPlan(uid, this.state.onPlanList.page);
    console.log('获取到了用户所有的计划');
    console.log(result);
    if (result.status === 200) {
      let obj = this.state.onPlanList;
      if (result.data.length === 0) {
        obj.isMore = false;
        this.setState({
          onPlanList: obj
        })
        return ;
      }
      obj.page = obj.page + 1;
      obj.data = obj.data.concat(result.data);
      this.setState({
        onPlanList: obj
      });
    } else if (result.status === 400) {
      ZERO.Toast('计划列表获取失败，请稍后再试');
    } else if (result.status === 500) {
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  }

  /**
   * 点击已完成
   */
  getUserAchievePlan = async () => {
    let uid = ZERO.getUid();
    if (!uid) {
      return ZERO.Toast('用户登录信息过期，请重新登录');
    }

    let result = await achievePlan(uid, this.state.achievePlanList.page);
    if (result.status === 200) {
      let obj = this.state.achievePlanList;
      if (result.data.length === 0) {
        obj.isMore = false;
        this.setState({
          achievePlanList: obj
        })
        return ;
      }
      obj.page = obj.page + 1;
      obj.data = obj.data.concat(result.data);
      this.setState({
        achievePlanList: obj
      });
    } else if (result.status === 400) {
      ZERO.Toast('计划列表获取失败，请稍后再试');
    } else if (result.status === 500) {
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  /**
   * 点击未开始
   */
  getNoDonePlanList = async () => {
    let uid = ZERO.getUid();
    if (!uid) {
      return ZERO.Toast('用户登录信息过期，请重新登录');
    }
    let result = await offNoneDonePlan(uid, this.state.noDonePlanList.page);
    if (result.status === 200) {
      let obj = this.state.noDonePlanList;
      if (result.data.length === 0) {
        obj.isMore = false;
        this.setState({
          noDonePlanList: obj
        })
        return ;
      }
      obj.page = obj.page + 1;
      obj.data = obj.data.concat(result.data);
      this.setState({
        noDonePlanList: obj
      });
    } else if (result.status === 400) {
      ZERO.Toast('计划列表获取失败，请稍后再试');
    } else if (result.status === 500) {
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  /**
   * 点击加载更多
   */
  loadMoreBtn = () => {
    // console.log('点击加载更多');
    let type = this.state.tabType;
    if(type === 'on'){ // 进行中
      if(this.state.onPlanList.isMore){
        this.getUserAllPlan();
      }
    }else if(type === 'true'){ // 已完成
      // console.log(2);
      if(this.state.achievePlanList.isMore){
        this.getUserAchievePlan();
      }
    }else if(type === 'off'){ // 未开始
      // console.log(3);
      if(this.state.noDonePlanList.isMore){
        this.getNoDonePlanList();
      }
    }
  };

  // 点击编辑按钮
  handleChangePlan = (planId) => {
    this.props.history.push(`/addNewPlan?changePlanId=${planId}`);
  };

  // 获取历史
  componentDidMount() {
    this.getUserAllPlan();
  }

  render() {
    return (
      <div className='my_plan_logs'>
        <div className='mpl_tab'>
          <p onClick={this.handleTab.bind(this, 'on')} className={this.state.tabType === 'on' ? 'ml_tabitem ml_active' : 'ml_tabitem'}>进行中</p>
          <p onClick={this.handleTab.bind(this, 'true')} className={this.state.tabType === 'true' ? 'ml_tabitem ml_active' : 'ml_tabitem'}>已完成</p>
          <p onClick={this.handleTab.bind(this, 'off')} className={this.state.tabType === 'off' ? 'ml_tabitem ml_active' : 'ml_tabitem'}>未开始</p>
        </div>
        <div className='mpl_list'>
          {
            this.whichData().data.map((item) => {
              return (
                <div className='mpl_item' key={item.plan_id}>
                  <div className='mpl_item_header'>
                    <p className='mpl_item_title'>{item.p_title}</p>
                    <p onClick={this.handleChangePlan.bind(this, item.plan_id)}>
                      编辑
                <i className='iconfont iconiconfonticonfonti2copycopy'></i>
                    </p>
                  </div>
                  <div className='mpl_item_con'>
                    <p className='mpl_item_p'>开始时间：<span>{item.p_start_date}</span></p>
                    <p className='mpl_item_p'>已完成次数：<span>{item.acheve_num}</span></p>
                  </div>
                  <div className='mpl_item_con'>
                    <p className='mpl_item_p'>结束时间：<span>{item.p_end_date}</span></p>
                    <p className='mpl_item_p'>应完成次数：<span>{item.should_day}</span></p>
                  </div>
                  <div className='mpl_item_con'>
                    <p className='mpl_item_p'>预估开始时间：<span>{item.plan_time}</span></p>
                    <p className='mpl_item_p'>总次数：<span>{item.all_day}</span></p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <LoadMore loadTips={ this.whichData().isMore ? '点击加载更多' : '已经没有更多了' } loadMore={this.loadMoreBtn} />
        {/* 我的计划历史 */}

      </div>
    );
  }
}

export default MyPlanLogs;