import React, {Component} from 'react';
import './searchInp.css'

class SearchInp extends Component {

  // 子组件触发input焦点事件，直行父组件
  handleOnFocus = () => {
    // console.log('子组件触发了函数');
    this.props.onFocus && this.props.onFocus();
  };

  // 子组件 onChange 事件
  handleChange = (e) => {
    this.props.onChange && this.props.onChange(e);
  };

  render() {
    return (
      <div className={'ho_input_wrap flex-one flex flex-item'}>
        <input className={'flex-one'} onFocus={this.handleOnFocus} onChange={this.handleChange} defaultValue={this.props.searchValue} type="text" placeholder={'您要搜索的内容'}/>
        <i className={'p_icon iconfont iconsousuo'}></i>
    </div>
    );
  }
}

export default SearchInp;
