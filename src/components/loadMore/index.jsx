import React, { Component } from 'react';
import './loadMore.css'

class LoadMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: this.props.loadMore
    }
  }
  
  load = () => {
    this.state.loadMore();
  };

  render() {
    return (
      <div className='com_load_more' onClick={this.load}>
        {this.props.loadTips}
      </div>
    );
  }
}

export default LoadMore;