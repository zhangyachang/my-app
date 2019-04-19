import React, {Component} from 'react';
import './appPush.css'

class AppPush extends Component {
  render() {
    return (
      <div className={'app_push'}>

        {/* ********************** */}
        <div className={'app_push_item'}>
          {/*顶部标题*/}
          <div className={'app_push_item_header'}>
            <div className={'app_push_item_h_con'}>
              <img src={require('../../static/img/logo/logo.png')} alt=""/>
              <span>管理助手</span>
            </div>
            <i className={'iconfont icondiandian'} />
          </div>
          {/*推送主体内容*/}
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
              <p className={''}>所花时间</p>
              <span>30分</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>目标类型</p>
              <span>锻炼身体</span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>难度</p>
              <span>
                <i className={'iconfont iconxingxing1'} />
                <i className={'iconfont iconxingxing1'} />
              </span>
            </div>
            <div className={'apppi_item'}>
              <p className={''}>助手评价</p>
              <span>持之以恒，你会收获你想要的东西！加油</span>
            </div>
          </div>
          {/**/}
          <div className={'app_push_more'}>
            <p>查看详情</p>
            <i className={'iconfont iconiconfonticonfonti2copycopy'} />
          </div>
        </div>
        {/* ***********************  */}
      </div>
    );
  }
}

export default AppPush;
