import React, { Component } from 'react';
import './planItem.css'
import { withRouter } from 'react-router-dom';  // 吊啊 这个方法可以在这里获取到 props 上面的router
import config from '../../config/config'
import ZERO from '../../config/zero';
import { postSsLike, deleteSsLike } from '../../config/utils'
import {Toast} from 'antd-mobile'

class PlanItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemData: props.data
    }
  }

  // 跳转到一个人的个人主页
  goPersonalPage = (userId) => {
    // if (this.props.history.location.pathname === '/personalPage') {
    //   this.props.history.push(`/personalPage?userId=${userId}`);
    // }
    this.props.history.push(`/personalPage?userId=${userId}`);

  };

  handleComment = (ssId) => {
    console.log('评论了');
    this.props.history.push(`/ssDetail?ssId=${ssId}`);
  };

  /**
   * 点赞行为的状态
   * @params likeStatus {String} 点赞状态 0 未点赞  其他数字已点赞
   * @params ssUid {String} 说说 uuid
   */
  handleLike = (likeStatus, ssUid) => {
    let uid = ZERO.getUid();
    if (!uid) {
      Toast.info('登录后体验更多权限', 1);

      return this.props.history.push('/login');
    }

    if (likeStatus) {
      // 已经点赞了 取消点赞
      this.cancelSsLike(likeStatus);
    } else {
      // 未点赞，点击进行点赞
      this.likeSs(uid, ssUid);
    }
  };

  /**
   * 取消点赞
   * ssId
   */
  cancelSsLike = async (ssId) => {
    let result = await deleteSsLike(ssId);
    console.log(result);
    if (result.status === 200) {
      Toast.info('取消点赞成功', 1);
      var itemData = this.state.itemData;
      itemData.is_ss_like = 0;
      itemData.like_num = itemData.like_num - 1;
      this.setState({
        itemData: itemData
      });
    } else if (result.status === 251) {
      Toast.info('服务错误，刷新页面再次尝试', 1);
    } else if (result.status === 400) {
      Toast.info('取消点赞失败', 1);
    } else if (result.status === 500) {
      Toast.info('服务器繁忙，请稍后再试', 1);
    }
  };

  /**
   * 对说说进行点赞
   * uid  ssuid
   */
  likeSs = async (uid, ssuid) => {
    let result = await postSsLike(uid, ssuid);
    console.log(result);
    if (result.status === 200) {
      Toast.info('点赞成功', 1);
      let itemData = this.state.itemData;
      itemData.is_ss_like = result.data.id;
      itemData.like_num = itemData.like_num + 1;
      this.setState({
        itemData: itemData
      });
    } else if (result.status === 250) {
      Toast.info('请勿重复点赞', 1);
    } else if (result.status === 400) {
      Toast.info('点赞失败', 1);
    } else if (result.status === 500) {
      Toast.info('服务器繁忙，请稍后再试', 1);
    }
  };

  render() {
    const itemData = this.state.itemData;

    return (
      <div className={'plan_item'}>
        <div className={'pi_header flex'}>
          <div onClick={this.goPersonalPage.bind(this, itemData.uid)} className={'pi_header_avatar'}>
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
        {/* <div className={'pi_imgwrap flex'}> */}
        {/*<div className={'pi_img_one'}>*/}

        {/* <img src={require('../../static/img/home/download1.jpg')} alt="" />
          <img src={require('../../static/img/home/download.jpg')} alt="" />
          <img src={require('../../static/img/home/download2.jpg')} alt="" />
          <img src={require('../../static/img/home/download2.jpg')} alt="" />
        </div> */}

        <div className={'pi_support flex flex-center'}>
          <div className={'pi_support_item'}>
            <i className={'iconfont iconyanjing3'} />
            <span>{itemData.read_count}</span>
          </div>
          <div className={'pi_support_item'} onClick={this.handleComment.bind(this, itemData.s_uid)}>
            <i className={'iconfont iconpinglun'} />
            <span>{itemData.com_count}</span>
          </div>
          <div className={itemData.is_ss_like ? 'pi_support_item pi_support_item_active' : 'pi_support_item'} onClick={this.handleLike.bind(this, itemData.is_ss_like, itemData.s_uid)}>
            <i className={'iconfont icondianzan1'} />
            <span>{itemData.like_num}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PlanItem);
