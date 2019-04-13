import React, {Component} from 'react';

class Regist extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: '1'
    };
  }


  // componentDidMount() {
  //   console.log('加载完成');
  //   console.log(this);
  // }

  render() {
    return (
      <div>
        注册路由
      </div>
    );
  }
}

export default Regist;
