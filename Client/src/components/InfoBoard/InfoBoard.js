import React from 'react';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

import './InfoBoard.css';

const InfoBoard = (props) => {
  return (
    <Container className="infoboard">
    <ListGroup>
      <ListGroupItem className="boatInfo">
        <ListGroupItemHeading>Boat {props.selectedBID} Location</ListGroupItemHeading>
        Lat:{props.boatLoc[0]}
            <br/>
        Lng:{props.boatLoc[1]}
      </ListGroupItem>
      <ListGroupItem className="windInfo">
      <ListGroupItemHeading>Wind Direction</ListGroupItemHeading>
        {props.windData[0]}&deg;
        { 
          (()=>{
            var heading="";
            if(parseFloat(props.windData[0]) < 22)
              heading=" N";
            else if (parseFloat(props.windData[0]) < 67)
              heading=" NE";
            else if (parseFloat(props.windData[0]) < 112)
              heading=" E";
            else if (parseFloat(props.windData[0]) < 157)
              heading=" SE";
            else if (parseFloat(props.windData[0]) < 212)
              heading=" S";
            else if (parseFloat(props.windData[0]) < 247)
              heading=" SW";
            else if (parseFloat(props.windData[0]) < 292)
              heading=" W";
            else if (parseFloat(props.windData[0]) < 337)
              heading=" NW";
            else
              heading=" N";
            return(heading);
          })() 
        }
      </ListGroupItem>
    </ListGroup>
    </Container>
  );
};

export default InfoBoard;
//RAD_TO_DEG 57.295779513082320876798154814105

/*
<h6>Wind Speed:</h6>
<p>{props.windData[1]}</p>
*/ 