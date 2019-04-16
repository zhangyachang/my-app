import React, {Component} from 'react';
import './my.css'
import TabBar from '../../components/tabBar/index'

class My extends Component {


  handleGoSetting = () => {
    this.props.history.push('/setting');
  };

  render() {
    return (
      <div className={'my'}>
        <div className={'my_info'}>

          <div className={'my_info_top flex'}>

            <div className={'my_info_top_avatar'}>
              <img src={require('../../static/img/home/download.jpg')} alt=""/>
            </div>

            <div className={'my_info_person flex'}>
              <span className={'my_info_username'}>像风一样自由</span>
              <p>id号 sdjkfjsdkfjskdjfksd</p>
            </div>

          </div>

          <div className={'my_info_list'}>

            <div className={'my_info_list_item'}>
              <span>1</span>
              <p>计划</p>
            </div>
            <div className={'my_info_list_item'}>
              <span>1</span>
              <p>关注</p>
            </div>
            <div className={'my_info_list_item'}>
              <span>1</span>
              <p>好友</p>
            </div>
            <div className={'my_info_list_item'}>
              <span>0</span>
              <p>粉丝</p>
            </div>

          </div>
        </div>

        <div className={'my_item'}>
          <i className={'iconfont iconcaogaoxiang'} />
          <span className={'my_item_con'}>草稿箱</span>
        </div>

        <div onClick={this.handleGoSetting} className={'my_item'}>
          <i className={'iconfont iconshezhi'} />
          <span className={'my_item_con'}>设置</span>
        </div>



        <TabBar />
      </div>
    );
  }
}

export default My;
