import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import './MainView.css';

class MainView extends Component {
    render() {
        return (
            <div className="main">
                <h2>Dashboard</h2>    
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="5">
                            <Card body inverse className="main-item">
                                <CardTitle>Add New Boat</CardTitle>
                                <CardText>Adding a new boat id.</CardText>
                                <Button>Add</Button>
                            </Card>
                        </Col>
                        <Col xs lg="5">
                            <Card body inverse color="success">
                                <CardTitle>Boat activation</CardTitle>
                                <CardText>Activate boats</CardText>
                                <Button color="secondary">Button</Button>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default MainView;