import React, { Component } from 'react';
import './addNewPlan.css';
import Toptips from '../../components/topTips/index';
import { Button, DatePicker, List, Toast } from 'antd-mobile';
import ZERO from '../../config/zero';

import { addPlan, getPlanByPid, updatePlanById } from '../../config/utils'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class AddNewPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cover: false, // 遮罩层是否显示
      // firstType: 'no', // 优先级类型
      title: '', // 标题
      con: '', // 内容
      date: now, // 开始时间
      endDate: now, // 结束日期
      wantStartTime: now, // 想要开始时间
      isAdd: true,
      // minDate: new Date(Date.now() - 1e7), // 预估开始的最少时间
      // maxDate: new Date(Date.now() + 1e7), // 预估开始的最大时间

    }
  }

  // 点击选择预估完成时长
  handleTime = () => {

  };

  // 点击制定计划
  submitPlan = async () => {
    console.log(this.state);
    const { title, con, date, endDate, wantStartTime } = this.state;
    // 标题 内容 开始日期 结束日期 想要开始的时间
    console.log(title, con, date, endDate, wantStartTime);

    if (endDate.getTime() < date.getTime()) {
      return Toast.info('结束日期不能小于开始日期', 1);

    }
    let uid = ZERO.getUid();
    if (!title) {
      return Toast.info('标题不能为空', 1);
    }

    if (this.state.isAdd) {
      // 添加
      let result = await addPlan({
        uid: uid,
        title: title,
        con,
        planTime: ZERO.formatWantTime(wantStartTime),
        startDate: ZERO.formatStartDate(date),
        endDate: ZERO.formatEndtDate(endDate)
      });

      if (result.status === 200) {
        Toast.info('计划制定成功', 1);
        return this.props.history.goBack();
      }
      if (result.status === 201) {
        return Toast.info('开始时间格式不正确', 1);
      }
      if (result.status === 400) {
        return Toast.info('计划制定失败', 1);
      }
      if (result.status === 500) {
        return Toast.info('服务器繁忙，请稍后再试', 1);
      }
    } else {
      // 修改
      let search = this.props.history.location.search;
      let { changePlanId } = ZERO.parseUrl(search)

      let resut = await updatePlanById({
        uid: uid,
        title: this.state.title,
        con: this.state.con,
        planTime: ZERO.formatWantTime(wantStartTime),
        startDate: ZERO.formatStartDate(date),
        endDate: ZERO.formatEndtDate(endDate),
        pid: changePlanId
      });
      if (resut.status === 200) {
        Toast.info('修改成功', 1);
        return this.props.history.goBack();
      } else if (resut.status === 400) {
        return Toast.info('计划修改失败', 1);
      } else if (resut.status === 500) {
        Toast.info('服务器繁忙，请稍后再试', 1);
      }
    }
  };



  // 控制改变
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  // 通过计划 id 查询计划
  searchPlanByPid = async (pid) => {
    let result = await getPlanByPid(pid);
    console.log('获取到的结果');
    console.log(result);
    // 把时间化为时间戳
    let reqObj = result.data[0];
    // 处理请求到的结果中的时间
    let now = new Date();
    const [year, month, day] = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    console.log(year, month, day);

    // 处理计划时间
    let [plan_time_hours, plan_time_minutes] = reqObj.plan_time.split(':');
    reqObj.plan_time = new Date(`${year} ${month} ${day} ${plan_time_hours}:${plan_time_minutes}`);

    // 处理开始时间
    let [start_date_year, start_date_month, start_data_day] = reqObj.p_start_date.split(' ')[0].split('-');
    reqObj.p_start_date = new Date(`${start_date_year} ${start_date_month} ${start_data_day} 00:00:00`);
    // 处理结束时间
    let [end_date_year, end_date_month, end_date_day] = reqObj.p_end_date.split(' ')[0].split('-');
    reqObj.p_end_date = new Date(`${end_date_year} ${end_date_month} ${end_date_day} 23:59:59`);

    console.log(reqObj);

    this.setState({
      title: reqObj.p_title,
      con: reqObj.p_con,
      wantStartTime: reqObj.plan_time,
      date: reqObj.p_start_date, // 开始时间
      endDate: reqObj.p_end_date
    });

  };

  componentDidMount() {
    let search = this.props.history.location.search;
    let { changePlanId } = ZERO.parseUrl(search)
    if (changePlanId) {
      this.searchPlanByPid(changePlanId);
      this.setState({
        isAdd: false
      })
    }
  }


  // ****** 优先级的一些事件 start
  // 点击选择优先级
  // showCover = () => {
  //   this.setState({
  //     cover: true
  //   });
  // };

  // // 阻止事件冒泡
  // preventDetault = (e) => {
  //   e.stopPropagation();
  // };

  // // 隐藏遮罩层
  // hideCover = () => {
  //   this.setState({
  //     cover: false
  //   });
  // };

  // // 选择优先级
  // selectFirst = (type) => {
  //   this.setState({
  //     firstType: type
  //   });
  //   this.hideCover();
  // };

  // 改变内容中的东西
  // firstCon = () => {
  //   var type = this.state.firstType;
  //   if(type === 'no'){
  //     return '无';
  //   }else if(type === 'high'){
  //     return '高';
  //   }else if(type === 'middle'){
  //     return '中';
  //   }else if(type === 'low'){
  //     return '低';
  //   }
  // };

  // ******** 优先级的一些事件 end


  render() {
    return (
      <div className={'add_new_plan'}>

        <Toptips tips="建议将一天中要做的事情分为一个一个的制定" />

        {/* <div className='anp_tab'>
          <div onClick={this.handleTime} className='anp_tab_item'>
            <div className='anp_tab_item_con'>
              <p className='anp_tab_item_tips'>预估完成时长</p>
              <p>10分钟</p> */}

        {/* <p>
                <span>难度</span>
                {
                  <i className='iconfont iconxingxing'></i>
                }
              </p> */}
        {/* </div>
            <div className='anp_tab_item_arrow'>
              <i className='iconfont iconyoujiantou1'></i>
            </div>

          </div>

          <div onClick={this.showCover} className='anp_tab_item'>
            <div className='anp_tab_item_con'>
              <p className='anp_tab_item_tips'>优先级</p>
              <p>{
                this.firstCon()
              }</p>
            </div>
            <div className='anp_tab_item_arrow'>
              <i className='iconfont iconyoujiantou1'></i>
            </div>
          </div>
        </div> */}

        {/* 加入一下选择时间的 start */}

        <DatePicker
          mode="date"
          title="开始日期"
          extra="Optional"
          disabled={this.state.isAdd ? false : true}
          minDate={new Date(Date.now())}
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">开始日期</List.Item>
        </DatePicker>
        <DatePicker
          mode="date"
          title="结束日期"
          minDate={new Date(Date.now())}
          extra="Optional"
          value={this.state.endDate}
          onChange={date => this.setState({ endDate: date })}
        >
          <List.Item arrow="horizontal">结束日期</List.Item>
        </DatePicker>

        {/* <DatePicker
          mode="date"
          title="开始日期"
          extra="Optional"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">预估开始时间</List.Item>
        </DatePicker> */}

        <DatePicker
          mode="time"
          title="预估开始时间"
          // minDate={this.state.minDate}
          // maxDate={this.state.maxDate}
          value={this.state.isAdd ? new Date(Date.now()) : this.state.wantStartTime}
          onChange={time => this.setState({ wantStartTime: time })}
        >
          <List.Item arrow="horizontal">预估开始时间</List.Item>
        </DatePicker>


        {/* 加入一下选择时间的 end */}

        <div className='anp_con'>

          <div className='anp_con_title'>
            <input name='title' defaultValue={this.state.title} onChange={this.handleChange} type="text" placeholder='请输入标题' />
          </div>

          <div className='anp_con_con'>
            <textarea name='con' value={this.state.con} onChange={this.handleChange} className='anp_con_con_textarea' cols="30" rows="10" placeholder='请输入正文描述'>
            </textarea>
          </div>
        </div>

        <Button onClick={this.submitPlan} className="anp_submit" type="primary">
          {
            this.state.isAdd ? '制定计划' : '确认修改'
          }
        </Button>

        {/* 选择优先级遮罩层 */}
        {/* {
          this.state.cover && <div onClick={this.hideCover} className='anp_cover flex flex-center'>
            <div onClick={this.preventDetault} className='anp_first'>
              <div className='anp_first_title'>优先级</div>

              <div onClick={this.selectFirst.bind(this, 'high')} className='anp_first_item flex flex-between'>
                <div className='flex'>
                  <p className='anp_first_item_bg red'></p>
                  <span>高</span>
                </div>
                <i className={this.state.firstType==='high'?'iconfont iconwancheng':'iconfont iconcircle'}></i>
              </div>

              <div onClick={this.selectFirst.bind(this, 'middle')} className='anp_first_item flex flex-between'>
                <div className='flex'>
                  <p className='anp_first_item_bg yellow'></p>
                  <span>中</span>
                </div>
                <i className={this.state.firstType==='middle'?'iconfont iconwancheng':'iconfont iconcircle'}></i>
              </div>

              <div onClick={this.selectFirst.bind(this, 'low')} className='anp_first_item flex flex-between'>
                <div className='flex'>
                  <p className='anp_first_item_bg blue'></p>
                  <span>低</span>
                </div>
                <i className={this.state.firstType==='low'?'iconfont iconwancheng':'iconfont iconcircle'}></i>
              </div>

              <div onClick={this.selectFirst.bind(this, 'no')} className='anp_first_item flex flex-between'>
                <div className='flex'>
                  <p className='anp_first_item_bg no'></p>
                  <span>无</span>
                </div>
                <i className={this.state.firstType==='no'?'iconfont iconwancheng':'iconfont iconcircle'}></i>
              </div>
              
            </div>
          </div>
        } */}

      </div>
    );
  }
}

export default AddNewPlan;
