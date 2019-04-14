import React, {Component} from 'react';
import './topTips.css'

class TopTips extends Component {
  render() {
    return (
      <div className={'c_toptips'}>
        {this.props.tips}
      </div>
    );
  }
}

export default TopTips;
