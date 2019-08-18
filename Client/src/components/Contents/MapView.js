import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from 'reactstrap';
import Joi from 'joi';
import pin from '../../pinpoint.png'; 
import pin2 from '../../pinpoint2.png'; 
import './MapView.css';
import CardForm from '../CardForm/CardForm';
import { getDestination, getCurLocation, sendLocation } from '../../API';

var myIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 41],
    iconAnchor: [12.5, 40],
    popupAnchor: [0, -45],
})
  
var myIcon2 = L.icon({
    iconUrl: pin2,
    iconSize: [30, 41],
    iconAnchor: [12.5, 40],
    popupAnchor: [0, -45],
})

const schema = Joi.object().keys({
    latitude: Joi.number().min(-90).max(90).required(),
    longitude: Joi.number().min(-180).max(180).required()
});  

class MapView extends Component {

    state = {
        location: {
          lat: 5.354482, 
          lng: 100.301226,
        },
        haveUsersLocation: false,
        zoom: 1,
        userSetDest: {
          slat: '',
          slng: '',
        },
        curLocations: [],
        destinations: [],
        showLocationForm: false,
        sendingLocation: false,
        sentLocation: false,
    };
    
    /*  
    // Get user geolocation and reconfigurate some attributes
    componentDidMount(){
        // Location from the database
        getDestination()
            .then(destinations => {
                this.setState({
                    destinations,
                });
            });
        
        getCurLocation()
            .then(curLocations => {        
                //console.log(Object.keys(curLoc));
                //console.log("that: "+curLocations);
                this.setState({
                    curLocations,
                    haveUsersLocation: true,
                    zoom: 18
                });
            });
        
        
    };*/
    
    // Get user geolocation and reconfigurate some attributes
    updateLocation = () => {
        getDestination()
            .then(destinations => {
                this.setState({
                    destinations,
                });
            });
        
        getCurLocation()
            .then(curLocations => {        
                this.setState({
                    curLocations,
                    haveUsersLocation: true,
                    zoom: 18
                });
            });
    }
    
    showLocationForm = () => {
        this.setState({
        showLocationForm: true
        });
    }
    
    cancelLocation = () => {
        this.setState({
            showLocationForm: false
        });
    }
    
    formIsValid = () => {
        const userSetDest = {
            latitude: this.state.userSetDest.slat,
            longitude: this.state.userSetDest.slng
        };
        const result = Joi.validate(userSetDest, schema);
        //console.log(userSetDest);
        return !result.error && userSetDest ? true : false;
    };
    
    formSubmitted = (event) => {
        event.preventDefault();
        //console.log(this.state.userSetDest);
        
        if (this.formIsValid()){
            //if no error
            this.setState({
                sendingLocation: true
            });
    
        const dest = {
            latitude: this.state.userSetDest.slat,
            longitude: this.state.userSetDest.slng
        };
    
        sendLocation(dest)
            .then((result) => {
                setTimeout(() => {
                    this.setState({
                    sendingLocation: false,
                    sentLocation: true
                    });
                }, 4000);
            });
        }
    };
    
    valueChanged = (event) => {
        const { name, value } = event.target; 
        this.setState((prevState) => ({
            userSetDest: {
                ...prevState.userSetDest,
                [name]: value,
            }
        }))
    };

    render() {
        this.updateLocation();

        var pos = [this.state.location.lat, this.state.location.lng];
        var dest = [this.state.location.lat, this.state.location.lng];
        if (Object.keys(this.state.curLocations).length != 0){
            var temp = this.state.curLocations;
            //console.log("thit: "+this.state.curLocations);
            pos[0] = parseFloat(temp.latitude);
            pos[1] = parseFloat(temp.longitude);
        }
        if (Object.keys(this.state.destinations).length != 0){
            //var temp = this.state.destinations[this.state.destinations.length-1];
            //console.log("thit: "+this.state.curLocations);
            dest[0] = parseFloat(this.state.destinations.latitude);
            dest[1] = parseFloat(this.state.destinations.longitude);
            //console.log(" ~ "+parseFloat(this.state.destinations.latitude));
        }
        //console.log("ye "+dest[0]);
        //console.log(Object.values(pos));
        return (
            <div>
                <Map className="map" center={pos} zoom={this.state.zoom}>
                    <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { 
                    this.state.haveUsersLocation ?
                    <Marker 
                        position={pos} 
                        icon={myIcon}>
                        <Popup>
                            lat:{pos[0]}, lng:{pos[1]}
                        </Popup>
                    </Marker> : ""
                    }
                    {
                    this.state.haveUsersLocation ?                    
                    <Marker 
                        position={dest} 
                        icon={myIcon2}>
                        <Popup>
                            lat:{dest[0]}, lng:{dest[1]}
                        </Popup>
                    </Marker> : ""
                    } 
                </Map>
                {
                  !this.state.showLocationForm ?
                  <Button className="location-form" onClick={this.showLocationForm} color="info">Add a location</Button> :
                  !this.state.sentLocation ?
                  <CardForm
                      cancelLocation={this.cancelLocation}
                      showLocationForm={this.state.showLocationForm}
                      sendingLocation={this.state.sendingLocation}
                      sentLocation={this.state.sentLocation}
                      haveUsersLocation={this.state.haveUsersLocation}
                      formSubmitted={this.formSubmitted}
                      valueChanged={this.valueChanged}
                      formIsValid={this.formIsValid}
                  /> :
                  this.setState({
                      sentLocation: false,
                      showLocationForm: false
                  })
                } 
            </div>
        );
    }
}

export default MapView;

