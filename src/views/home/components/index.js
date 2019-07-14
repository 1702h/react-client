import React, { Component } from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import G2 from '@antv/g2';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
class Index extends Component {
    render() {
        return (
            <div>
                <div className="echartsbox">
                    <div className="echartsbox-title">
                        <h2>统计</h2>
                        <RangePicker
                            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                            format={dateFormat}
                        />
                    </div>
                    <div id="tj" ref="tj">

                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 115 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 }
        ];
        const chart = new G2.Chart({
            container: 'tj', // 指定图表容器 ID
            forceFit: true,  //自适应
            height : 300 // 指定图表高度
        });
      
        chart.line().position('genre*sold').color('genre')
        chart.render();
    }
}


export default Index;