import axios from 'axios'
import config from './config'


const server = {
  server(obj){
    return new Promise((resolve, reject) => {
      !obj.method ? (obj.method = 'GET'): false;
      !obj.data ? (obj.data = {}): false;
      !obj.params ? (obj.params = {}): false;

      axios({
        url: config.url + obj.url,
        method: obj.method,
        params: obj.params,
        data: obj.data,
      })
        .then(res => {
          if(res.status == 200){
            resolve(res.data);
          }
        })

    });
  }

};

export default server;
