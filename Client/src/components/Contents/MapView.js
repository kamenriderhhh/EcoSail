import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Button } from 'reactstrap';
import Joi from 'joi';
import pin from '../Image/pinpoint.png'; 
import pin2 from '../Image/pinpoint2.png'; 
import pin3 from '../Image/pinpoint3.png'; 
import './MapView.css';
import CardForm from '../CardForm/CardForm';
import InfoBoard from '../InfoBoard/InfoBoard';
import { getDestination, getSensorData, sendLocation } from '../../API';

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

var myIcon3 = L.icon({
    iconUrl: pin3,
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
        windDir: NaN,
        windSpd: NaN,
        haveUsersLocation: true,
        zoom: 18,
        maxZoom: 25,
        userSetDest: {
          slat: '',
          slng: '',
        },
        markerData: [],
        curLocations: [],
        destinations: [],
        showLocationForm: false,
        sendingLocation: false,
        sentLocation: false,
        destDraggable: true,
    };
    
      
    // After the component mount, get the location information
    componentDidMount(){
        this.updateLocation();
        // Every 
        this.timer = setInterval(() => this.updateLocation(), 10000);
    };
    
    // Before unmount the component, stop the timer and null it
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }
    
    // Get user geolocation and reconfigurate some attributes
    updateLocation = () => {
        const option = {
            boatID: this.props.selectedBID
        };
        getDestination(option)
            .then(destinations => {
                this.setState({
                    destinations,
                });
            });
        // Get the boat information
        getSensorData(option)
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
        // Check the form data is it valid or not  
        if (this.formIsValid()){
            //if no error
            this.setState({
                sendingLocation: true  
            });
    
            const dest = {
                boatID: JSON.stringify(this.props.selectedBID), 
                latitude: this.state.userSetDest.slat,
                longitude: this.state.userSetDest.slng
            };
            
            // Upload the new destination
            sendLocation(dest)
                .then((result) => {
                    setTimeout(() => {
                        this.setState({
                        sendingLocation: false,
                        sentLocation: true
                        });
                    }, 4000);
                }
            );

            // After submited form reset the marker
            this.setState({
                markerData: [],
            });

            // Update the locations
            this.updateLocation()
        }
    };
    /*
    valueChanged = (event) => {
        const { name, value } = event.target; 
        this.setState((prevState) => ({
            userSetDest: {
                ...prevState.userSetDest,
                [name]: value,
            }
        }))
    };
    */
    

    toggleDraggable = () => {
        this.setState({ destDraggable: !this.state.destDraggable })
    }

    updateMarker = (event) => {
        const latLng = event.target.getLatLng(); //get updated marker LatLng
        const markerIndex = event.target.options.marker_index; //get marker index
        latLng.lat = latLng.lat.toFixed(6);
        latLng.lng = latLng.lng.toFixed(6);
        //console.log(this.props.selectedBID);
        //update the state
        this.setState(prevState => {
            const markerData = [...prevState.markerData];
            markerData[markerIndex] = latLng;
            return { markerData: markerData };
        },()=>{
            this.setState(prevState => {
                var userSetDest = prevState.userSetDest;
                userSetDest.slat=document.getElementById("slat").value;
                userSetDest.slng=document.getElementById("slng").value;
                return { userSetDest: userSetDest };
            }, ()=>{
                //console.log(this.state.userSetDest);
            })
            //console.log(this.state.userSetDest);
            //console.log(document.getElementById("slat").value);
        });
    }

    addMarker = (event) => {
        //console.log(this.state.userSetDest);
        if (Object.keys(this.state.markerData).length === 0){
            const {markerData} = this.state;
            var {userSetDest} = this.state;
            const coords = event.latlng;
            coords.lat = coords.lat.toFixed(6);
            coords.lng = coords.lng.toFixed(6);
            markerData.push(coords);
            userSetDest.slat=coords.lat;
            userSetDest.slng=coords.lng;
            this.setState({
                markerData,
                userSetDest
            },()=>{//console.log(this.state.userSetDest)
            });
        }
    }

    render() {
        var pos = [this.state.location.lat, this.state.location.lng];
        var dest = [this.state.location.lat, this.state.location.lng];
        var marker = [];
        var windData = [this.state.windDir, this.state.windSpd];
        if (Object.keys(this.state.curLocations).length !== 0){
            var temp = this.state.curLocations;
            if(temp.sensorActive){
                //console.log("thit: "+this.state.curLocations);
                pos[0] = parseFloat(temp.latitude);
                pos[1] = parseFloat(temp.longitude);
                windData[0] = parseFloat(temp.windDirection);
                //windData[1] = parseFloat(temp.windSpeed);
            }
        }
        if (Object.keys(this.state.destinations).length !== 0){
            //var temp = this.state.destinations[this.state.destinations.length-1];
            //console.log("thit: "+this.state.curLocations);
            dest[0] = parseFloat(this.state.destinations.latitude);
            dest[1] = parseFloat(this.state.destinations.longitude);
            //console.log(" ~ "+parseFloat(this.state.destinations.latitude));
        }
        if (Object.keys(this.state.markerData).length !== 0){
            marker[0] = parseFloat(this.state.markerData[0].lat);
            marker[1] = parseFloat(this.state.markerData[0].lng);
        }

        return (
            <div>
                <Map className="map" center={pos} maxZoom={20} zoom={this.state.zoom} onClick={this.addMarker}>
                    <TileLayer
                    maxZoom={20}
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { 
                    this.state.haveUsersLocation ?
                    <Marker 
                        position={pos} 
                        icon={myIcon}>
                        <Tooltip >
                            lat:{pos[0]}, lng:{pos[1]}
                        </Tooltip>
                    </Marker> : ""
                    }
                    {
                    this.state.haveUsersLocation ?                    
                    <Marker 
                        position={dest} 
                        icon={myIcon2}>
                        <Tooltip>
                            lat:{dest[0]}, lng:{dest[1]}
                        </Tooltip>
                    </Marker> : ""
                    } 
                    {this.state.markerData.map((element, index) =>
                    <Marker
                        key={index}
                        marker_index={index}
                        position={element}
                        icon={myIcon3}
                        draggable={this.state.destDraggable}
                        onDragend={this.updateMarker}
                        >
                        <Tooltip autoClose={false}>
                            <span onClick={this.toggleDraggable}>
                                lat:{marker[0]}, lng:{marker[1]}
                            </span>
                        </Tooltip>
                    </Marker>
                    )} 
                </Map>
                <InfoBoard 
                    boatLoc={pos}
                    windData={windData}
                    selectedBID={this.props.selectedBID}
                />
                { 
                  !this.state.showLocationForm ?
                  <Button className="location-form" onClick={this.showLocationForm} color="info">Insert Destination</Button> :
                  !this.state.sentLocation ?
                  <CardForm
                      cancelLocation={this.cancelLocation}
                      showLocationForm={this.state.showLocationForm}
                      sendingLocation={this.state.sendingLocation}
                      sentLocation={this.state.sentLocation}
                      haveUsersLocation={this.state.haveUsersLocation}
                      formSubmitted={this.formSubmitted}
                      formIsValid={this.formIsValid}
                      marker={this.state.markerData}
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

