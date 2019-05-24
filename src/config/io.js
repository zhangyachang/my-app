import config from './config' 
import ZERO from './zero'
// import io from 'socket.io'

// console.log(io);

// const socket = io(config.url);

// socket.on('connect', () => {
//   console.log(`连接成功了吧`);
// });

import io from 'socket.io-client'
const socket = io(config.url);

socket.on('connect', () => {
  console.log(`连接成功`);
});

const uid = ZERO.getUid();

if(uid){
  console.log(`存在用户id吗`);
  socket.emit('userId', uid);
}

socket.on('aa', (...msg) => {
  console.log(`接收到后台的消息`);
  console.log(msg);
});

export default socket;


// const socket = io(config.url);
