import React, {Component} from 'react';
import './settingList.css'

class SettingList extends Component {

  handlePostMsg = (name) => {
    this.props.handlePostMsg(name);
  };



  render() {
    const list = this.props.list;
    return (
      <div className={'c_setlist'}>
        {
          list.map((item) => (
            <div className={'c_set_item'} onClick={this.handlePostMsg.bind(this, item.id)} key={item.id} >{item.name}</div>
            )
          )
        }
      </div>
    );
  }
}

export default SettingList;
