import React, {Component} from 'react';
import './personalPage.css'
import PlanItem from '../../components/planItem/index'
import SearchInput from '../../components/searchInput/index'

class PersonalPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isShowCover: false, // 是否展示遮罩层

    }
  }

  // 点击搜索键
  handleSearch = () => {
    console.log('点击了搜索键');
    this.setState({
      isShowCover: true
    });
  };

  // 点击了三个点
  handleMore = () => {
    console.log('点击了更多');

  };

  // 取消遮罩层
  handleCancelCover = () => {
    console.log('取消遮罩层');
    this.setState({
      isShowCover: false
    });
  };

  // 点击手机键盘上面的搜索键看一下是哪一个


  render() {
    return (
      <div className={'personal_page'}>

        <div className={'pp_header'}>

          <div className={'pp_header_top clearfix'}>
            <div className={'pp_header_top_right'}>
              <i onClick={this.handleSearch} className={'iconfont iconsousuo'} />
              <i onClick={this.handleMore} className={'iconfont iconmore'} />
            </div>
          </div>

          <div className={'pp_avatar flex flex-center'}>
            <img src={require('../../static/img/home/download.jpg')} alt=""/>
          </div>

          <div className={'pp_nick'}>三只小狗</div>

          <div className={'pp_signature ellipse'}>这个人很懒，什么都没有留下</div>

        </div>
        <div className={'plan_list'}>
          <PlanItem />
          <PlanItem />
        </div>

        {/*遮罩层*/}
        {
          this.state.isShowCover && <div className={'pp_cover flex'}>
            <div className={'pp_cover_header flex'}>
              <SearchInput />
              <span onClick={this.handleCancelCover} className={'pp_cover_header_cancel'}> 取消 </span>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default PersonalPage;
