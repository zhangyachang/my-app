import React, {Component} from 'react';
import './home.css'
import PlanItem from '../../components/planItem/index'

class Home extends Component {
  render() {
    return (
      <div className={'home'}>

        <div className={'ho_header flex flex-item'}>
          <div className={'ho_logo'}>
            <img src={require('../../static/img/logo/logo.png')} alt=""/>
          </div>
          <div className={'ho_input_wrap flex-one flex flex-item'}>
            <input className={'flex-one'} type="text" placeholder={'您要搜索的内容'}/>
            <i className={'p_icon iconfont iconsousuo'}></i>
          </div>
        </div>

        <div className={'ho_list'}>
          <PlanItem />
        </div>

      </div>
    );
  }
}

export default Home;
