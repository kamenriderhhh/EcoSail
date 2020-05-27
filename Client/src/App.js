import React, { Component } from 'react';
import { Route, HashRouter, Redirect } from "react-router-dom";
// Component for side drawer and toolbar
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import MainView from './components/Contents/MainView';
import MapView from './components/Contents/MapView';
import CameraView from './components/Contents/CameraView';
import DataView from './components/Contents/DataView';
import Login from "./components/Login/Login";
import Mainpage from "./components/Mainpage/Mainpage";

class App extends Component {

  state = {
    sideDrawerOpen: false,
    boatID: 1,
    boatCount: 1,
    login: false, //default fault
    token: null, //notification feed
    //need to gather the list of boatID from database
  }

  setToken = (value) => {
    this.setState({
      token: value
    },()=>{
      //console.log('token: '+this.state.token)
    });
  };

  setBoatCount = (value) => {
    this.setState({
      boatCount: value
    },()=>{
      //console.log('boatcount:'+this.state.boatCount)
    });
  };
  
  // Sidedrawer function
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  selectBoat = (event) => {
    this.setState({
      boatID: document.getElementById("sailboatSelect").value
      // update the sensor data according to selected boat ID
    }, ()=>{
        //console.log(this.state.boatID);  
    });
  }

  userLogin = () => {
    this.setState({
      login: !this.state.login
    }, ()=>{
      //console.log(this.state.login);
    });
  }

  render(){
    // sidedrawer backdrop variable
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    
    return (
      <HashRouter>
        <div style={{height: '100%'}}>
          <Toolbar loginStatus={this.state.login} login={this.userLogin} drawerClickHandler={this.drawerToggleClickHandler} token={this.state.token}/> 
          <SideDrawer show={this.state.sideDrawerOpen} clsDrawer={backdrop} loginStatus={this.state.login} login={this.userLogin}/>
          {backdrop}
          {
            this.state.login === false ?
            <div className="content">
              <Route exact path="/" render={(props)=><Mainpage {...props}/>}/>
              <Route path="/login" render={(props)=><Login {...props} userLogin={this.userLogin} loginStatus={this.state.login} 
                setToken={this.setToken} setBoatCount={this.setBoatCount}
              />}/>
            </div>
            :
            <div className="content">
              <Route exact path="/" render={(props)=><MainView {...props} selectBoat={this.selectBoat} 
                selectedBID={this.state.boatID} boatCount={this.state.boatCount}
                />}/>
              <Route path="/map" render={(props)=><MapView {...props} selectedBID={this.state.boatID}/>}/>
              <Route path="/camera" render={(props)=><CameraView {...props} selectedBID={this.state.boatID}/>}/>
              <Route path="/data" render={(props)=><DataView {...props} selectedBID={this.state.boatID}/>}/>
              <Redirect to="/"/>
            </div>
          }
        </div>
      </HashRouter>
    );
  }
}

export default App;
