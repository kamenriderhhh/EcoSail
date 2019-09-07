import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './MainView.css';
import Switch from '../Switch/Switch.js';
import ReactSpeedometer from "react-d3-speedometer"

class MainView extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeContent(name) {
        this.setState({
            dropdownContent: name
        });
    }

    render() {
        let dropdownContent = "Boat's ID";
        return (
            <div className="main">
                <h2>Dashboard</h2>   
                <div className='borderline'/>
                <div className='main-item'>
                    <h5 style={{textDecoration: 'underline'}}>Boat Activation Panel</h5>
                    <Row>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret color="info">
                                    {dropdownContent}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Boat 1</DropdownItem>
                                    <DropdownItem>Boat 2</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                        <br/>
                        <Col>
                            <div style={{display: 'flex', justifyContent: 'center'}} >
                                <Switch/>
                            </div>
                        </Col>
                    </Row>
                    <div className='borderline'/>
                    <h5 style={{paddingTop:"10px", textDecoration: 'underline'}}>Real Time Data</h5>   
                    <Container className="justify-content-md-center">
                        <Row>
                            <Col xs lg="5">
                                <Card body outline color="secondary">
                                    <CardTitle>pH Sensor</CardTitle>
                                    <div className='gauge'>
                                    <ReactSpeedometer 
                                        fluidWidth={true}
                                        maxValue={14}
                                        minValue={1}
                                        value={NaN}
                                        needleColor="red"
                                        startColor="red"
                                        segments={14}
                                        endColor="green"
                                    />
                                    </div> 
                                    <CardText>Offline...</CardText>
                                    <Button className='button'>Activate</Button>
                                </Card>
                            </Col>
                            <br/>
                            <Col xs lg="5">
                                <Card body outline color="secondary">
                                    <CardTitle>Dissolved Oxygen Sensor</CardTitle>
                                    <div className='gauge'>
                                    <ReactSpeedometer 
                                        fluidWidth={true}
                                        maxValue={300}
                                        value={103}
                                        needleColor="red"
                                        startColor="yellow"
                                        segments={6}
                                        endColor="red"
                                    />
                                    </div> 
                                    <CardText>Online and Displaying</CardText>
                                    <Button className='button'>Deactivate</Button>
                                </Card>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs lg="5">
                                <Card body outline color="secondary">
                                    <CardTitle>Conductivity/Salinity Sensor</CardTitle>
                                    <div className='gauge'>
                                    <ReactSpeedometer 
                                        fluidWidth={true}
                                        maxValue={500}
                                        value={273}
                                        needleColor="red"
                                        startColor="green"
                                        segments={6}
                                        endColor="blue"
                                    />
                                    </div>   
                                    <CardText>Online and Displaying</CardText>
                                </Card>
                            </Col>
                            <br/>
                            <Col xs lg="5">
                            <Card body outline color="secondary">
                                    <CardTitle>Turbidity Sensor</CardTitle>
                                    <div className='gauge'>
                                    <ReactSpeedometer 
                                        fluidWidth={true}
                                        maxValue={100}
                                        value={40}
                                        needleColor="red"
                                        startColor="white"
                                        segments={6}
                                        endColor="blue"
                                    />
                                    </div>   
                                    <CardText>Online and Displaying</CardText>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default MainView;