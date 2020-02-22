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
            tempValue: NaN,
            pHValue: NaN,
            doValue: NaN,
            ecValue: NaN,
            turbValue: NaN,
        };
    }

   // After the component mount, get the location information
    componentDidMount(){
        this.updateSensorData();
        // Every 
        this.timer = setInterval(() => this.updateSensorData(), 5000);
    };

    // Before unmount the component, stop the timer and null it
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    // Get user geolocation and reconfigurate some attributes
    updateSensorData = () => {
        // Get the sensor nodes information
        getSensorData()
            .then(sensorNodes => {        
                this.setState({ 
                    tempValue: sensorNodes.tempValue,
                    pHValue: sensorNodes.pHValue,
                    doValue: sensorNodes.doValue,
                    ecValue: sensorNodes.ecValue,
                    turbValue: sensorNodes.turbidity
                });
            }
        );
    }
    
    render() {
        const needleColor = '#FF6C40';
        const cardTitleStyle = {fontWeight:'bold', display: 'flex', justifyContent: 'center'};
        return (
            <div className="main">
                <div className='main-item'>
                    <h3 style={{textDecoration: 'underline'}}>Boat Selection Panel</h3>
                    <Form>
                        <FormGroup>
                            <Label for="sailboatSelect">The current selected Sailboat ID: {this.props.selectedBID}</Label>
                            <Input type="select" name="select" id="sailboatSelect" onChange={this.props.selectBoat}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
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
                            <CardText style={{display: 'flex',justifyContent: 'center'}}>{
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
                            <CardText style={{display: 'flex',justifyContent: 'center'}}>{
                                this.state.pHValue ? 'Active' : 'Not Active'
                            }</CardText>
                        </Card>

                        <Card body outline color="secondary">
                            <CardTitle style={cardTitleStyle}>Dissolved Oxygen Sensor</CardTitle>
                            <div className='gauge'>
                            <ReactSpeedometer 
                                fluidWidth={true}
                                maxValue={20}
                                minValue={0}
                                value={this.state.doValue}
                                needleColor={needleColor}
                                startColor="yellow"
                                segments={6}
                                endColor="red"
                                currentValueText="Current Value: ${value} mg/L"
                            />
                            </div><br/> 
                            <CardText style={{display: 'flex',justifyContent: 'center'}}>{
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
                            <CardText style={{display: 'flex',justifyContent: 'center'}}>{
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
                            <CardText style={{display: 'flex',justifyContent: 'center'}}>{
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