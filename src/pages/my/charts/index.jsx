import React, { Component } from 'react';
import './charts.css'

import { getChartsData } from '../../../config/utils'
import ZERO from '../../../config/zero'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

// import echarts from 'echarts';
console.log(echarts);


class Charts extends Component {
  
  getDataToCharts = async () => {
    let uid = ZERO.getUid();
    if (!uid) {
      return ZERO.Toast('登录信息过期，请重新登录');
    }

    let result = await getChartsData(uid);
    console.log('请求结果');
    console.log(result);
    if (result.status === 200) {
      var myChart = echarts.init(document.getElementById('my_charts'));
      console.log(myChart);
      myChart.setOption(result.data);
    }else if(result.status === 400){
      ZERO.Toast('请求失败, 请稍后再试');
    }else if(result.status === 200){
      ZERO.Toast('服务器繁忙，请稍后再试');
    }
    
  }


  componentDidMount() {
    this.getDataToCharts();
    // console.log('执行了吗');
    // var option = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [{
    //     data: [820, 932, 901, 934, 1290, 1330, 1320],
    //     type: 'line'
    //   }]
    // };
  }

  render() {
    return (
      <div className='my_charts' id='my_charts'>
        
      </div>
    );
  }
}

export default Charts;