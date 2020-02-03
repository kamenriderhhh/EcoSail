import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import { Card, CardTitle } from 'reactstrap';

class LineChart extends Component {
    render() {
        let labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
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
                            label: this.props.name,
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: this.props.color,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: this.props.color,
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: this.props.color,
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.props.data
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