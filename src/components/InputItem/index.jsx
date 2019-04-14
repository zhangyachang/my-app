import React, {Component} from 'react';
import './inputItem.css'
class InputItem extends Component {
  render() {
    return (
      <div className={'c_input_item flex'}>
        <div className={'cii_label'}>这里的</div>
        <input className={'flex-one'} type="text"/>
      </div>
    );
  }
}

export default InputItem;
