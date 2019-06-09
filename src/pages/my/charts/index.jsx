import React, { Component } from 'react';
import './charts.css'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

// import echarts from 'echarts';
console.log(echarts);


class Charts extends Component {


  getDataToCharts = async () => {
    let result = await 
  }
  

  componentDidMount() {
    console.log('执行了吗');
    var option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };
    var myChart = echarts.init(document.getElementById('my_charts'));
    console.log(myChart);

    myChart.setOption(option);
  }

  render() {
    return (
      <div className='my_charts' id='my_charts'>
        图形
      </div>
    );
  }
}

export default Charts;