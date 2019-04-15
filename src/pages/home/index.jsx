import React, {Component} from 'react';
import './home.css'
import HotSearch from '../../components/searchInput/index'
import PlanItem from '../../components/planItem/index'

class Home extends Component {

  // 获取焦点跳转到搜索列表历史中
  handleOnFocus = () => {
    // console.log('父组件触发了事件');
    this.props.history.push('/hot');
  };



  render() {
    return (
      <div className={'home'}>

        <div className={'ho_header flex flex-item'}>
          <div className={'ho_logo'}>
            <img src={require('../../static/img/logo/logo.png')} alt=""/>
          </div>
          <HotSearch onFocus={this.handleOnFocus} />

          {/*<div className={'ho_input_wrap flex-one flex flex-item'}>*/}
          {/*  <input className={'flex-one'} onFocus={this.handleOnFocus} type="text" placeholder={'您要搜索的内容'}/>*/}
          {/*  <i className={'p_icon iconfont iconsousuo'}></i>*/}
          {/*</div>*/}
        </div>

        <div className={'ho_list'}>
          <PlanItem />
          <PlanItem />
          <PlanItem />
        </div>

      </div>
    );
  }
}

export default Home;
