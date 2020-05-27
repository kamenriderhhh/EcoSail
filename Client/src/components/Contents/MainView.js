import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardColumns, 
    Form, FormGroup, Label, Input } from 'reactstrap';
//import Switch from '../Switch/Switch.js';
import ReactSpeedometer from "react-d3-speedometer"
import { getSensorData } from '../../API';
import './MainView.css';

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempValue: 0,
            pHValue: 0,
            doValue: 0,
            ecValue: 0,
            turbValue: 0,
        };
    }

   // After the component mount, get the location information
    componentDidMount(){
        this.updateSensorData();
        // Every 
        this.timer = setInterval(() => this.updateSensorData(), 10000);
    };

    // Before unmount the component, stop the timer and null it
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    // Get user geolocation and reconfigurate some attributes
    updateSensorData = () => {
        const option = {
            boatID: this.props.selectedBID
        };
        // Get the sensor nodes information
        getSensorData(option).then(sensorNodes => {
            if(sensorNodes.sensorActive){
                let temp = parseFloat(sensorNodes.tempValue);
                let pH = parseFloat(sensorNodes.pHValue);
                let dO = parseFloat(sensorNodes.doValue);
                let ec = parseFloat(sensorNodes.ecValue);
                let turb = parseFloat(sensorNodes.turbidity);
                this.setState({ 
                    tempValue: temp,
                    pHValue: pH,
                    doValue: dO,
                    ecValue: ec >= 80 ? 0 : ec,
                    turbValue: turb === 3000 ? 0 : turb,
                });
            } else {
                this.setState({ 
                    tempValue: 0,
                    pHValue: 0,
                    doValue: 0,
                    ecValue: 0,
                    turbValue: 0,
                }); 
            }   
        });
        /**
         * 31,9.8,1.1,9.0,2360
         * 0,10.5,16,85,3000
         * temp 0 will be not active/failure
         * turb 3000 will be not active/failure
         * ec 80 will be not active/failure
         */
    }
    
    render() {
        const needleColor = '#FF6C40';
        const cardTitleStyle = {fontWeight:'bold', display: 'flex', justifyContent: 'center'};
        const boatIDs = [];
        const boatCount = this.props.boatCount;
        for (var i=1;i<=boatCount;i++){ boatIDs.push(<option>{i}</option>) } 
        return (
            <div className="main">
                <div className='main-item'>
                    <h3 style={{textDecoration: 'underline'}}>Boat Selection Panel</h3>
                    <Form>
                        <FormGroup>
                            <Label for="sailboatSelect">The current selected Sailboat ID: {this.props.selectedBID}</Label>
                            <Input type="select" name="select" id="sailboatSelect" onChange={this.props.selectBoat}>
                                {boatIDs}
                            </Input>
                        </FormGroup>
                    </Form>
                    <div className='borderline'/>
                    <h3 style={{paddingTop:"10px", textDecoration: 'underline'}}>Real Time Data</h3>   
                    <CardColumns>
                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>Temperature Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={60}
                                minValue={-20}
                                value={this.state.tempValue}
                                needleColor= {needleColor}
                                startColor="lightblue"
                                segments={16}
                                endColor="red"
                                currentValueText="Current Value: ${value} &#8451;"
                            />
                            </div><br/> 
                            <CardText style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor : this.state.tempValue ? 'lime' :'orange'
                                }}>{
                                this.state.tempValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>

                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>pH Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={14}
                                minValue={0}
                                value={this.state.pHValue}
                                needleColor={needleColor}
                                startColor="red"
                                segments={15}
                                endColor="green"
                                currentValueText="Current Value: ${value}"
                            />
                            </div><br/>
                            <CardText style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor : this.state.pHValue ? 'lime' :'orange'
                                }}>{
                                this.state.pHValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>

                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>Dissolved Oxygen Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={25} //default max value for DO sensor 20
                                minValue={0}
                                value={this.state.doValue}
                                needleColor={needleColor}
                                startColor="yellow"
                                segments={6}
                                endColor="red"
                                currentValueText="Current Value: ${value} mg/L"
                            />
                            </div><br/> 
                            <CardText style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor : this.state.doValue ? 'lime' :'orange'
                                }}>{
                                this.state.doValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>

                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>Electrical Conductivity/Salinity Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={100}
                                minValue={0}
                                value={this.state.ecValue}
                                needleColor={needleColor}
                                startColor="green"
                                segments={6}
                                endColor="blue"
                                currentValueText="Current Value: ${value} mS/cm"
                            />
                            </div><br/>   
                            <CardText style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor : this.state.ecValue ? 'lime' :'orange'
                                }}>{
                                this.state.ecValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>

                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>Turbidity Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={3000}
                                minValue={0}
                                value={this.state.turbValue}
                                needleColor={needleColor}
                                startColor="white"
                                segments={10}
                                endColor="brown"
                                currentValueText="Current Value: ${value} NTU"
                            />
                            </div><br/>
                            <CardText style={{
                                display: 'flex',
                                justifyContent: 'center',
                                backgroundColor : this.state.turbValue ? 'lime' :'orange'
                                }}>{
                                this.state.turbValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>
                    </CardColumns>
                </div>
            </div>
        );
    }
}

export default MainView;