import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { Card, CardTitle } from 'reactstrap';

class LineChart extends Component {
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
            for(let i=0;i<this.props.filterDays;i++){
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
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: dataline,
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: dataline,
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
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
                    }    
                }
            }
        } else { // min, max, mean data display format
            if(this.props.filterDays && this.props.filterDays!==1){
                option = {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: { 
                                displayFormats: {
                                    hour: 'hA MMM DD',
                                },
                            },
                        }]
                    }
                }
            }
            else if(this.props.filterDays===1){
                option = {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: { 
                                displayFormats: {
                                    millisecond: 'MMM DD',
                                },
                            },
                        }]
                    }
                }
            }
            dateList = this.props.date;
            data =  {
                labels: dateList,
                datasets: [
                    {
                    label: "Mean",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: avgLine,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: avgLine,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: avgLine,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data[0]
                    },{
                    label: "Min",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: minLine,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: minLine,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: minLine,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data[1]
                    },{
                    label: "Max",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: maxLine,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: maxLine,
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: maxLine,
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.data[2]
                    }
                ]
            }
            
        }
        
        return (
            <div>
                <Card body outline color="secondary">
                    <CardTitle style={{fontWeight:'bold'}}>{this.props.name}</CardTitle>
                    <Line data={ data } options={ option }
                    />
                </Card>
            </div>
        );
    }
}

export default LineChart;                        

//this.props.data.slice(0,7)