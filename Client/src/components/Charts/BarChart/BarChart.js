import React, { Component } from 'react';
import {Chart, Bar} from 'react-chartjs-2';
import { Card, CardTitle } from 'reactstrap';
import Hammer from 'hammerjs';
import * as Zoom from 'chartjs-plugin-zoom'

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class BarChart extends Component {
    render() {
        let minLine = "green";
        let maxLine = "red";
        let avgLine = "orange";
        let dataline = "purple";
        let dataList = [], dateList = [];
        let data, option;
        let type = this.props.type;
        
        // Per day data display format
        if(type === 1){ 
            for(let i=0;i<1;i++){
                if(Array.isArray(this.props.data) && this.props.data.length){
                    this.props.data[i].forEach(data => {
                        dataList.push(data);
                    })
                    this.props.date[i].forEach(date => {
                        dateList.push(date);
                    })
                }
                data =  {
                    labels: dateList,
                    datasets: [
                        {
                        label: "Data Per Day",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: dataline,
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                        hoverBorderColor: 'rgba(255,99,132,1)',
                        data: dataList
                        }
                    ]
                }
                option = {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    second: 'h:mm:ss a MMM DD',
                                    minute: 'h:mm a MMM DD',
                                    hour: 'hA MMM DD',
                                    day: 'MMM DD',
                                }
                            }
                        }]
                    },
                    pan: {
                        enabled: false,
                        mode: 'xy',
                    },
                    zoom: {
                        enabled: false,                   
                        mode: 'x',
                    }    
                }
            }
        } 
        
        return (
            <div>
                <Card body outline color="secondary">
                    <CardTitle style={{fontWeight:'bold'}}>{this.props.name}</CardTitle>
                    <Bar data={ data } width={100} height={100} options={ option }
                    />
                </Card>
            </div>
        );
    }
}

export default BarChart;