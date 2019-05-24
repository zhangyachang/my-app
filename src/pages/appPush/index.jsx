import React, { Component } from 'react';
import './appPush.css';
import TabBar from '../../components/tabBar/index';
import { getAppPushLogs } from '../../config/utils'
import ZERO from '../../config/zero';

class AppPush extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pushArr: [
      ],
      noPushTips: false,
    }
  }

  // 重置一下页面滚动，让滚动到最下面
  // resetScroll = () => {
  //   console.log(`函数执行了几次`);

  //   if(this.wrap){
  //     this.wrap.scrollTop = this.wrap.scrollHeight;
  //   }
  // };

  // 查询推送历史
  searchAppPushLogs = () => {
    let user = ZERO.getUid();
    console.log(`查询的的uid`);
    console.log(user);

    getAppPushLogs({ uid: user, page: 1 })
      .then(res => {
        console.log(`拿到的数据为`);
        console.log(res);
        if (res.status === 200) {
          if (res.data.length === 0) {
            this.setState({
              noPushTips: true
            })
          }
          this.setState({
            pushArr: res.data
          });
        } else if (res.status === 400) {
          ZERO.Toast('查询失败');
        } else if (res.status === 500) {
          ZERO.Toast('服务器繁忙，请稍后再试');
        }
      })
      .catch(err => {
        console.log(err);
        ZERO.Toast('客户端错误，请稍后再试');
      })
  };

  // 跳转到详情页面
  handleGoDetail = (id) => {
    console.log(id);
    this.props.history.push(`/appPushDetail?planId=${id}`);
  };

  componentDidMount() {
    this.searchAppPushLogs();
  }

  render() {
    return (
      <div className={'app_push'} ref={el => this.wrap = el}>
        {/* 渲染这些东西 */}
        {
          this.state.pushArr.map((item) => {
            return (<div key={item.id} className='app_push_itemwrap'>
              <p className='app_push_item_push_time'>{item.push_time}</p>
              <div onClick={this.handleGoDetail.bind(this, item.id)} className={'app_push_item'}>
                {/*顶部标题*/}
                <div className={'app_push_item_header'}>
                  <div className={'app_push_item_h_con'}>
                    <img src={require('../../static/img/logo/logo.png')} alt="" />
                    <span>管理助手</span>
                  </div>
                  <i className={'iconfont icondiandian'} />
                </div>
                {/*推送主体内容*/}
                <div className={'app_push_item_main'}>
                  <p className={'app_push_item_main_title'}>{item.push_title}</p>
                  <div className={'apppi_item app_push_item_main_time'}>
                    <p className='app_push_item_main_time_p'>{item.push_time}</p>
                  </div>
                  <div className={'apppi_item'}>
                    <p className={''}>完成目标</p>
                    <span>{item.title}</span>
                  </div>
                  <div className={'apppi_item'}>
                    <p className={''}>开始时间</p>
                    <span>{item.start_time}</span>
                  </div>
                  <div className={'apppi_item'}>
                    <p className={''}>完成时间</p>
                    <span>{item.end_time}</span>
                  </div>
                  <div className={'apppi_item'}>
                    <p className={''}>所花时间</p>
                    <span>{item.time_length} 分</span>
                  </div>
                  <div className={'apppi_item'}>
                    <p className={''}>助手评价</p>
                    <span>{item.push_con}</span>
                  </div>
                </div>
                {/**/}
                <div className={'app_push_more'}>
                  <p>查看详情</p>
                  <i className={'iconfont iconiconfonticonfonti2copycopy'} />
                </div>
              </div>
            
            </div>)
          })
        }

        {
              this.state.noPushTips && (<div>
                还没有消息推送给你哦
          </div>)
            }


        {/* <div className={'app_push_item'}>
         
          <div className={'app_push_item_header'}>
            <div className={'app_push_item_h_con'}>
              <img src={require('../../static/img/logo/logo.png')} alt="" />
              <span>管理助手</span>
            </div>
            <i className={'iconfont icondiandian'} />
          </div>
          
          <div className={'app_push_item_main'}>
            <p className={'app_push_item_main_title'}>计划完成通知</p>
            <div className={'apppi_item app_push_item_main_time'}>
              <p className={''}>4月7日 17:40</p>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>完成目标</p>
              <span>跑步</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>开始时间</p>
              <span>2019-5-18 22:18</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>完成时间</p>
              <span>2019-5-18 22:20</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>所花时间</p>
              <span>2分</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>助手评价</p>
              <span>持之以恒，你会收获你想要的东西！加油</span>
            </div>
          </div>
         
          <div className={'app_push_more'}>
            <p>查看详情</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>
      
     
        <div className={'app_push_item'}>
         
          <div className={'app_push_item_header'}>
            <div className={'app_push_item_h_con'}>
              <img src={require('../../static/img/logo/logo.png')} alt="" />
              <span>管理助手</span>
            </div>
            <i className={'iconfont icondiandian'} />
          </div>
          
          <div className={'app_push_item_main'}>
            <p className={'app_push_item_main_title'}>计划完成通知</p>
            <div className={'apppi_item app_push_item_main_time'}>
              <p className={''}>4月7日 17:40</p>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>完成目标</p>
              <span>跑步</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>开始时间</p>
              <span>2019-5-18 22:18</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>完成时间</p>
              <span>2019-5-18 22:20</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>所花时间</p>
              <span>2分</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>助手评价</p>
              <span>持之以恒，你会收获你想要的东西！加油</span>
            </div>
          </div>
          <div className={'app_push_more'}>
            <p>查看详情</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div> */}


            < TabBar />
      </div>
      );
    }
  }
  
  export default AppPush;
