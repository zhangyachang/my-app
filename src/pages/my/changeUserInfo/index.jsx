import React, {Component} from 'react';
import './changeUserInfo.css'
import ZERO from '../../../config/zero'

class ChangeUserInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: '' // 通过type来显示不同的信息
    }
  }

  // 修改姓名
  handleChangeName = (e) => {
    console.log('修改姓名');
  };


  componentDidMount() {
    let {type} = ZERO.parseUrl(this.props.location.search);
    console.log('查看传递过来的参数是什么');
    console.log(this.props);

    this.setState({
      type: type
    });
  }

  render() {
    const {type} = this.state;

    return (
      <div className={'change_user_info'}>
        {
          type === 'nick' && (<div className={'cui_nick'}>
              <input type="text" value={111} onChange={this.handleChangeName} />

          </div>
          )
        }

        {
          type === 'sex' && <div> 显示修改用户性别 </div>
        }

        {
          type === 'avatar' && <div> 显示修改用户头像 </div>
        }

        {
          type === 'signature' && <div> 显示修改用户签名 </div>
        }


      </div>
    );
  }
}

export default ChangeUserInfo;
