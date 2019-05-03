import React, {Component} from 'react';
import './plan.css'
import TabBar from '../../components/tabBar/index'

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabBar: {
        yesterday: '',
        today: '',
        tomorrow: ''
      }
    };
  }

  // 添加新目标
  addNewPlan = () => {
    console.log('添加新目标');
    this.props.history.push('/addNewPlan');
  };

  // 点击目标开始

  // 点击目标完成

  render() {
    return (
      <div className={'plan1'}>

        <div className={'plan1_navbar flex'}>
          <p className={'plan1_navbar_item'}>昨</p>
          <p className={'plan1_navbar_item plan1_navbar_item_active'}>今</p>
          <p className={'plan1_navbar_item'}>明</p>
        </div>

        <div className={'plan1_list'}>

          <div className={'plan1_list_item'}>
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
          </div>

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
