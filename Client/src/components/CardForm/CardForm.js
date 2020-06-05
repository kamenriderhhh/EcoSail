import React from 'react';
import { Card, Button, CardTitle, CardText, Form, 
  FormGroup, Label, Input, Container } from 'reactstrap';

import './CardForm.css';

const CardForm = (props) => {
  return (
    <Card body className="location-form">
      <CardTitle><span style={{fontWeight: "bold"}}> Destination Setup</span></CardTitle>
      {
        !props.sendingLocation && !props.sentLocation && props.haveUsersLocation ?
          <Form onSubmit={props.formSubmitted}>
            <FormGroup>
                <Label>
                    <span style={{fontWeight: "bold"}}>Click </span>on the map and
                    <span style={{fontWeight: "bold"}}> drag </span>the
                    <span style={{color:"lime", fontWeight: "bold"}}> Green marker </span>
                    to desire location and press
                    <span style={{color:"#17a2b8", fontWeight: "bold"}}> send </span>button to submit destination.
                </Label>
                <Label for="slat"><span style={{fontWeight: "bold"}}>Latitude</span>: 
                  <Label id="slat">
                    {Object.keys(props.marker).length !== 0 ?props.marker[0].lat:0}
                  </Label>
                </Label>
                <br/>
                <Label for="slng"><span style={{fontWeight: "bold"}}>Longitude</span>: 
                  <Label id="slng">
                    {Object.keys(props.marker).length !== 0 ?props.marker[0].lng:0}
                  </Label>
                </Label>
            </FormGroup>
            <Container>
              <Button type="cancel" color="danger" onClick={props.cancelLocation}>Cancel</Button>
              <Button className="formbtn" type="submit" color="info" disabled={!props.formIsValid()}>Send</Button>
            </Container>
          </Form> :
          props.sendingLocation || props.haveUsersLocation ? 
            <CardText>Successfully submit a location!</CardText> : 
            <CardText>No boat location is detected!</CardText>
      }
    </Card>
  );
};

export default CardForm;
