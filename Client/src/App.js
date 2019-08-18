import React, { Component } from 'react';
import { Route, HashRouter } from "react-router-dom";

// Component for side drawer and toolbar
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import MainView from './components/Contents/MainView';
import MapView from './components/Contents/MapView';
import CameraView from './components/Contents/CameraView';
import DataView from './components/Contents/DataView';
//import classnames from 'classnames';

class App extends Component {

  state = {
    //sideDrawer 
    sideDrawerOpen: false
  }
  
  // Sidedrawer function
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  render(){
    // sidedrawer backdrop variable
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    
    return (
      <HashRouter>
        <div style={{height: '100%'}}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/> 
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
          <div className="content">
            <Route exact path="/" component={MainView}/>
            <Route path="/map" component={MapView}/>
            <Route path="/camera" component={CameraView}/>
            <Route path="/data" component={DataView}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
