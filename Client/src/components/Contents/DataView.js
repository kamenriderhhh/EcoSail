import React, { Component } from 'react';
import LineChart from '../Charts/LineChart/LineChart';
import DatePicker from 'react-datepicker';
import { CardColumns, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
//import { getSensorHistData } from '../../API';
import './DataView.css';
import "react-datepicker/dist/react-datepicker.css";

class DataView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempValue: [30, 20, 25, 26, 18, 28, 19],
            pHValue: [4, 3, 4, 2, 5, 6, 4],
            dOValue: [8.25, 8.79, 9.21, 7.90, 7.81, 8.33, 8.52],
            conducValue: [12.3, 11.5, 13.2, 11.5, 12.5, 12.8, 13.0],
            turbValue: [2435, 2391, 2600, 2680, 2750, 2512, 2480],
            filterBased: NaN,
            filterDays: 2,
            startDate: new Date(),
            dateList: [],
        };
    }

    selectFilterBased = (event) => {
        this.setState({
            filterBased: document.getElementById("filterBased").value
            // plot the data according to either months or days
        }, ()=>{
            if(this.state.filterBased === "Days"){
                this.updateDateList();
            } 
            // update based on months...........
        });
    }
    
    selectFilterDays = (event) => {
        this.setState({
            filterDays: document.getElementById("filterDays").value
            // plot the data according to either months or days
        }, ()=>{
            this.updateDateList();
        });
    }

    handleChange = startDate => {
        this.setState({
            startDate,
            //strDate: startDate.getDate()+'/'+(startDate.getMonth()+1)+'/'+startDate.getFullYear()
        }, ()=>{
            this.updateDateList();
            //console.log(this.state.startDate); 
        });
    };

    updateDateList = () => {
        let date = [];
        // Deep copy, JSON does not have a primitive representation of Date objects so need to cast it manually.
        let tempDate = new Date(JSON.parse(JSON.stringify(this.state.startDate)));
        for(let i=0;i<this.state.filterDays;i++){
            date.push(tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear());
            tempDate.setDate(tempDate.getDate()+1);
            //console.log('try '+ this.props.date);
        }
        // Get the sensor historical data
        /*
        getSensorHistData().then(HistData => {        
            this.setState({ 
                tempValue: HistData.tempValue,
                pHValue: HistData.pHValue,
                doValue: HistData.doValue,
                ecValue: HistData.ecValue,
                turbValue: HistData.turbValue
                // min,max,avg sensor value
            });
        });*/
        this.setState({
            dateList: date,
        }, ()=>{
            //console.log(this.state.startDate); 
        });
    };

    render() {
        const startDate = this.state.startDate;
        const dateList = this.state.dateList;
        const filterBased = this.state.filterBased;
        const filterDays = this.state.filterDays;
        return (
            <div className="dataView">
                <h3 style={{textDecoration: 'underline'}}>Historical Data</h3>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="filterBased">Filter based on Months/Days:</Label>
                                <Input type="select" name="select" id="filterBased" onChange={this.selectFilterBased}>
                                    <option>Months</option>
                                    <option>Days</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label for="filterDays">Show data for days:</Label>
                                <Input type="select" name="select" id="filterDays" onChange={this.selectFilterDays} 
                                disabled={filterBased !== "Days" ? true : false}>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>5</option>
                                    <option>7</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label for="filterDate">Select the date:</Label><br/>
                                <DatePicker
                                    id='datePicker' 
                                    dateFormat="dd/MM/yyyy"
                                    selected={startDate}
                                    disabled={filterBased !== "Days" ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
                    {
                        this.state.filterBased === "Days" ? 
                        <CardColumns>
                            <LineChart name={"Temperature"} data={this.state.tempValue} date={dateList} filterDays={filterDays} color={"red"}/>
                            <LineChart name={"pH"} data={this.state.pHValue} date={dateList} filterDays={filterDays} color={"blue"}/>
                            <LineChart name={"Dissolve Oxygen"} data={this.state.dOValue} date={dateList} filterDays={filterDays} color={"green"}/>
                            <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue} date={dateList} filterDays={filterDays} color={"orange"}/>
                            <LineChart name={"Turbidity"} data={this.state.turbValue} date={dateList} filterDays={filterDays} color={"purple"}/> 
                        </CardColumns>
                        : 
                        <CardColumns>
                            <LineChart name={"Temperature"} data={this.state.tempValue} color={"red"}/>
                            <LineChart name={"pH"} data={this.state.pHValue} color={"blue"}/>
                            <LineChart name={"Dissolve Oxygen"} data={this.state.dOValue} color={"green"}/>
                            <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue} color={"orange"}/>
                            <LineChart name={"Turbidity"} data={this.state.turbValue} color={"purple"}/> 
                        </CardColumns>
                        
                    }          
            </div>
        );
    }
}

export default DataView;