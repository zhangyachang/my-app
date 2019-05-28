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
      ], // 推送的内容都在这个里面
      noPushTips: false,
      page: 1, // 查询推送的页码
      loadMoreTips: '点击查看更多',
      isLoadMore: false, // 是否还有加载更多
    }
  }

  // 查询推送历史
  searchAppPushLogs = () => {
    let user = ZERO.getUid();
    console.log(`查询的的uid`);
    console.log(user);

    getAppPushLogs({ uid: user, page: 1 })
      .then(res => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            this.setState({
              noPushTips: true
            })
          } else {
            this.setState({
              page: this.state.page + 1,
              isLoadMore: true
            });
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

  // 点击加载更多
  handleLoadMore = () => {
    if(!this.state.isLoadMore || this.state.isLoadMore === 2){
      return ;
    }

    let user = ZERO.getUid();
    getAppPushLogs({ uid: user, page: this.state.page })
      .then(res => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            this.setState({
              loadMoreTips: '没有更多数据了',
              isLoadMore: 2
            });
          }else{
            this.setState({
              page: this.state.page + 1
            });
          }
          var c = this.state.pushArr.concat(res.data);
          this.setState({
            pushArr: c
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
      });
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
          this.state.isLoadMore && <div className="app_push_load_more" onClick={this.handleLoadMore}>{this.state.loadMoreTips}</div>
        }

        {
          this.state.noPushTips && (<div>
            还没有消息推送给你哦
          </div>)
        }

        < TabBar />
      </div>
    );
  }
}

export default AppPush;
