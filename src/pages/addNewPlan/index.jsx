import React, { Component } from 'react';
import './addNewPlan.css';
import Toptips from '../../components/topTips/index';
import {Button, DatePicker, List} from 'antd-mobile';
import {$axios} from '../../config/server'
import ZERO from '../../config/zero';

import {addPlan} from '../../config/utils'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class AddNewPlan extends Component {
  constructor(props){
    super(props);
    this.state = {
      // cover: false, // 遮罩层是否显示
      // firstType: 'no', // 优先级类型
      title: '', // 标题
      con: '', // 内容
      date: now, // 开始时间
      endDate: now, // 结束日期
      wantStartTime: now, // 想要开始时间
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
    const {title, con, date, endDate, wantStartTime} = this.state;
    // 标题 内容 开始日期 结束日期 想要开始的时间
    console.log(title, con, date, endDate, wantStartTime);
    console.log(1);
    
    let uid = ZERO.getUid();

    if(!title){
      return ZERO.Toast('标题不能为空');
    }
    
    let result = await addPlan({
      uid: uid,
      title: title,
      con,
      planTime: ZERO.formatWantTime(wantStartTime),
      startDate: ZERO.formatStartDate(date),
      endDate: ZERO.formatEndtDate(endDate)
    });
    console.log(`返回值`);

    if(result.status === 200){
      ZERO.Toast('计划制定成功');
      return this.props.history.goBack();
    }
    if(result.status === 201){
      return ZERO.Toast('开始时间格式不正确');
    }
    if(result.status === 400){
      return ZERO.Toast('计划制定失败');
    }
    if(result.status === 500){
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 控制改变
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
          value={new Date(Date.now())}
          onChange={time => this.setState({ wantStartTime:time })}
        >
          <List.Item arrow="horizontal">预估开始时间</List.Item>
        </DatePicker>

        
        {/* 加入一下选择时间的 end */}

        <div className='anp_con'>

          <div className='anp_con_title'>
            <input name='title' defaultValue={this.state.title} onChange={this.handleChange} type="text" placeholder='请输入标题' />
          </div>

          <div className='anp_con_con'>
            <textarea name='con' defaultValue={this.state.con} onChange={this.handleChange} className='anp_con_con_textarea' cols="30" rows="10" placeholder='请输入正文描述'>
            </textarea>
          </div>
        </div>
        
        <Button onClick={this.submitPlan} className="anp_submit" type="primary">制定计划</Button>

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
