import React, { Component } from 'react';
import './mySsLogs.css'
import ZERO from '../../../config/zero'
import { getAllSs } from '../../../config/utils'
import PlanItem from '../../../components/planItem'
import LoadMore from '../../../components/loadMore/index.jsx'

class MySsLogs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 1,
      planList: [],
      isShowLoadMoreTips: false,
      Tips: '点击加载更多',
      isMore: true, // 是否还有更多
    }
  }

  /**
   * 获取用户所有的说说记录
   * @params uid {String} 用户 id
   * @params pageIndex {String} 页码
   */
  getUserAllSs = async (pageIndex) => {
    let uid = ZERO.getUid();
    if (!uid) {
      return ZERO.Toast('用户登录信息过期，请重新登录');
    }
    let result = await getAllSs(uid, pageIndex);
    if (result.status === 200) {
      if (result.data.length === 0) {
        // 已经没有多余的数据了
        this.setState({
          Tips: '已经没有更多了',
          isMore: false
        })
      } else {
        // 还有更多
        this.setState({
          planList: this.state.planList.concat(result.data),
          isShowLoadMoreTips: true,
          pageIndex: pageIndex + 1,
          Tips: '点击加载更多'
        })
      }
    } else if (result.status === 400) {
      ZERO.Toast('获取说说列表失败，请稍后再试');
    } else if (result.status === 500) {
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  }

  componentDidMount() {
    // 获取说说列表
    this.getUserAllSs(1);
  }

  // 点击加载更多
  handleLoadMore = () => {
    if (!this.state.isMore) {
      return;
    }
    this.getUserAllSs(this.state.pageIndex);
  }

  render() {
    return (
      <div className='my_ss_logs'>
        <div className='msl_list'>
          {
            this.state.planList.map((item) => <PlanItem key={item.id} data={item} />)
          }
        </div>
        {
          this.state.isShowLoadMoreTips && <LoadMore loadTips={this.state.Tips} loadMore={this.handleLoadMore} />
        }
      </div>
    );
  }
}

export default MySsLogs;