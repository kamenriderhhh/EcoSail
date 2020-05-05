import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { Card, CardTitle } from 'reactstrap';

class LineChart extends Component {
    render() {
        let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        let minLine = "green";
        let maxLine = "red";
        let avgLine = "orange";
        if(this.props.filterDays){
            labels = [];
            labels = this.props.date;
        }
        
        return (
            <div>
                <Card body outline color="secondary">
                    <CardTitle style={{fontWeight:'bold'}}>{this.props.name}</CardTitle>
                    <Line data={{
                        labels: labels,
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
                    }} />
                </Card>
            </div>
        );
    }
}

export default LineChart;                        

//this.props.data.slice(0,7)