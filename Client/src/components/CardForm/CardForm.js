import React from 'react';
import { Card, Button, CardTitle, CardText, Form, 
  FormGroup, Label, Input, Container } from 'reactstrap';

import './CardForm.css';

const CardForm = (props) => {
  return (
    <Card body className="location-form">
      <CardTitle>Destination's Coordinates</CardTitle>
      {
        !props.sendingLocation && !props.sentLocation && props.haveUsersLocation ?
          <Form onSubmit={props.formSubmitted}>
            <FormGroup>
                <Label for="slat">Latitude</Label>
                <Input 
                    value={Object.keys(props.marker).length !== 0 ?props.marker[0].lat:0}
                    type="number" 
                    name="slat" 
                    id="slat" 
                    placeholder="Enter the latitude" />
            </FormGroup>
            <FormGroup>
                <Label for="slng">Longitude</Label>
                <Input 
                    value={Object.keys(props.marker).length !== 0 ?props.marker[0].lng:0}
                    type="number"
                    name="slng" 
                    id="slng" 
                    placeholder="Enter the longitude" />
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
