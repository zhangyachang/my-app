import React, { Component } from 'react';
import './ss.css'
import { Button } from 'antd-mobile'
import ZERO from '../../config/zero'
import {postSs} from '../../config/utils'

class Ss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: '',

      imgArr: [], // 这里是存放本地的blob图片地址
      files: [], // 真实发送的文件
    }
  }

  // 点击发表按钮
  addSs = async () => {
    let uid = ZERO.getUid();
    if(!uid){
      return ZERO.Toast('登录信息过期，请重新登录');
      
    }
    let content = this.state.textareaValue;
    if(!content){
      return ZERO.Toast('内容不能为空');
    }
    
    let formData = new FormData();
    formData.append('uid', uid);
    formData.append('content', content);
    for(let i=0;i<this.state.files.length;i++){
      formData.append('imgArr', this.state.files[i]);
    }

    console.log('最终的结果');
    console.log(formData);
    let result = await postSs(formData);
    console.log('请求结果');
    console.log(result);
    if(result.status === 200){
      ZERO.Toast('发表成功');
      return this.props.history.goBack();
    }
    if(result.status === 400){
      return ZERO.Toast('发表失败');
    }
    if(result.status === 500){
      return ZERO.Toast('服务器繁忙，请稍后再试');
    }
    ZERO.Toast('发表失败');
  };

  handleOnchange = (e) => {
    this.setState({
      textareaValue: e.target.value
    });
  };

  // 选择图片
  selectImg = (e) => {
    let url = this.createObject(e.target.files[0]);
    var c = this.state.imgArr;
    var files = this.state.files;
    files.push(e.target.files[0]);
    c.push(url);
    this.setState({
      imgArr: c,
      files: files
    });
  };

  /**
   * 将文件生成 Blob 地址
   * @params {Object} 文件  e.target.files[0]
   *
   * @return {String} blob:http://localhost:8080/71661062-2241-4c50-a7d2-7bddf17b5788
   *  一种地址，可以放到图片的src上
   */
  createObject = (blob) => {
    if (window.URL) {
      return window.URL.createObjectURL(blob);
    } else if (window.webkitURL) {
      return window.webkitURL.createObjectURL(blob);
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className='ss'>
        <div className='ss_textarea'>
          <textarea cols="30" rows="10" defaultValue={this.state.textareaValue} onChange={this.handleOnchange} placeholder='分享你的心情吧...'></textarea>
        </div>
        <div className='ss_add_img'>
          {
            this.state.imgArr.map((item, index) => {
              return (<div key={index} className='ss_add_img_wrap'>
                <img src={item} alt="" />
              </div>)
            })
          }
          <div className='ss_add_img_wrap'>
            <img src={require('../../static/img/user/upload.png')} alt="" />
            <input type="file" className='ss_add_img_wrap_input' onChange={this.selectImg} accept="image/*" />
          </div>
        </div>

        <Button onClick={this.addSs} className="ss_add_ss_submit" type="primary">发表</Button>
      </div>
    );
  }
}

export default Ss;