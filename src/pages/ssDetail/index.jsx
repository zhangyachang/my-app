import React, { Component } from 'react';
import './ssDetail.css'
import PlanItem from '../../components/planItem'
import ZERO from '../../config/zero'
import { getSsDetailById, getSsComments, userComSs } from '../../config/utils'
import config from '../../config/config'

class SsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: config.url,
      ssData: '',
      comValue: '', // 评论内容
      comPage: 1,
      comContent: [], // 评论内容
    }
  }

  // 通过 id 查询说说详情
  searchSsDetailByid = async () => {
    // console.log(this.props.location.search);
    let { ssId } = ZERO.parseUrl(this.props.location.search);
    if (!ssId) {
      return ZERO.Toast('无法查询说说详情，请输入正确的网址');
    }
    let result = await getSsDetailById(ssId);
    console.log('查询结果');
    console.log(result);
    if (result.status === 200) {
      this.setState({
        ssData: result.data[0]
      })
    } else if (result.status === 400) {
      return ZERO.Toast('说说详情查询失败，请稍后再试');
    } else if (result.status === 500) {
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 获取评论内容
  searchCommentsList = async () => {
    let { ssId } = ZERO.parseUrl(this.props.location.search);
    if (!ssId) {
      return ZERO.Toast('无法查询说说详情，请输入正确的网址');
    }
    let result = await getSsComments(ssId, this.state.comPage, true);
    console.log('显示评论内容');

    console.log(result);
    if(result.status === 200){
      this.setState({
        comContent: result.data
      });
    }else if(result.status === 400){
      ZERO.Toast('查询评论内容失败');
    }else if(result.status === 500){
      ZERO.Toast('服务器繁忙，请稍后再试');
    }

  };

  handleChange = (e) => {
    this.setState({
      comValue: e.target.value
    });
  };

  handleComSubmit = async () => {
    let comValue = this.state.comValue.trim();
    let { ssId } = ZERO.parseUrl(this.props.location.search);
    if (!ssId) {
      return ZERO.Toast('无法查询说说详情，请输入正确的网址');
    }
    if(!comValue){
      return ZERO.Toast('请输入内容后评价');
    }
    let uid = ZERO.getUid();
    if(!uid){
      return ZERO.Toast('用户信息过期，请重新登录');
    }
    console.log(ssId, comValue, uid)
    console.log('点击确认评论');
    let result = await userComSs({
      uid: uid,
      ssId: ssId, 
      content: comValue
    });
    if(result.status === 200){
      ZERO.Toast('评论成功');
      this.setState({
        comValue: ''
      });
      this.searchCommentsList();
    }else if(result.status === 400){
      ZERO.Toast('评论失败,请稍后再试');
    }else if(result.status === 500){
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
  };

  // 查询
  componentDidMount() {
    this.searchSsDetailByid();
    this.searchCommentsList();
  }

  render() {
    const itemData = this.state.ssData;
    return (
      <div className='ss_detail'>
        {
          itemData && (<div className={'plan_item'}>
            <div className={'pi_header flex'}>
              <div className={'pi_header_avatar'}>
                <img src={config.url + itemData.avatar} alt="" />
              </div>
              <div className={'pi_timewrap'}>
                <p className={'pi_user'}>{itemData.nick}</p>
                <p className={'pi_time ellipse'}>{itemData.create_time}</p>
              </div>
            </div>

            <div className={'pi_con'}>
              {itemData.content}
            </div>

            {
              itemData.img_arr && JSON.parse(itemData.img_arr).length === 1 && (<div className={'pi_img_one'}>
                <img src={config.url + '/' + JSON.parse(itemData.img_arr)[0]} alt="" />
              </div>)
            }
            {
              itemData.img_arr && JSON.parse(itemData.img_arr).length !== 1 && (<div className={'pi_imgwrap flex'}>
                {JSON.parse(itemData.img_arr).map((imgItem, index) =>
                  (<img src={config.url + '/' + imgItem} key={index} alt="" />)
                )}
              </div>)
            }
          </div>)
        }

        <div className='ss_detail_com_header'>评论区</div>

        {/* 评论列表 */}
        <div className='ss_detail_comment'>
          {
            (this.state.comContent.length || '')  && (this.state.comContent.map((item) => {
              return ( <div className='sdc_item' key={item.id}>
              <div className='sdc_item_wrap flex'>
                <div className='sdc_item_avatar'>
                  <img src={config.url + item.avatar} alt="" />
                </div>
                <div className='sdc_item_content'>
                  <p className='sdc_item_name'>{item.nick}</p>
                  <p>{item.content}</p>
                </div>
              </div>
              <div className='sdc_time'>{item.create_time}</div>
            </div>)
            }))
          }
          {
            (this.state.comContent.length || '无评论信息') && ''
          }
          {/* <div className='sdc_item'>
            <div className='sdc_item_wrap flex'>
              <div className='sdc_item_avatar'>
                <img src='http://127.0.0.1:3000/img/4/1cefc4394104382a2f61a903c1d15afe.png' alt="" />
              </div>
              <div className='sdc_item_content'>
                <p className='sdc_item_name'>长衫造纸农</p>
                <p>加油啊，你写的不错哦加油啊，你写的不错哦加油啊，你写的不错哦加油啊，你写的不错哦加油啊，你写的不错哦加油啊，你写的不错哦</p>
              </div>
            </div>
            <div className='sdc_time'>2019-6-12 23:25</div>
          </div> */}
        </div>

        <div className='sdc_cominput flex'>
          <input type="text" onChange={this.handleChange} value={this.state.comValue} placeholder='来评论两句吧！'/>
          <div onClick={this.handleComSubmit} className='flex-shrink sdc_cominput_btn'>评论</div>
        </div>

      </div>
    );
  }
}

export default SsDetail;
