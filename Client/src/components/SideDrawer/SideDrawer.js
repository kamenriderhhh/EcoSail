import React from 'react';
import { NavLink } from "react-router-dom";
import './SideDrawer.css';
import logo from '../Image/logo.png'; 
import imgDashboard from "../Image/dashboard.png";
import imgData from "../Image/data.png";
//import imgCamera from "../Image/camera.png";
import imgMap from "../Image/map.png";
import imgLogout from "../Image/logout.png";
//import Divider from '@material-ui/core/Divider';
import { Container, List, ListItem } from '@material-ui/core';

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';
    if (props.show && props.loginStatus) {
        drawerClasses = 'side-drawer open';
    }
    else{
        //props.clsDrawer to close the backdrop...
    }
    

    return (
        <nav className={drawerClasses}>
            <div className="drawerFrame">
            <Container className="try">
                <img className="darwer-img" src={logo} alt="Avatar"/> 
            </Container>
            <List>
                <ListItem><NavLink to="/">
                    <img className="sideDrawer-icon" src={imgDashboard} alt="Dashboard"/>
                    Dashboard
                </NavLink></ListItem>
                <ListItem><NavLink to="/map">
                    <img className="sideDrawer-icon" src={imgMap} alt="Boat"/>
                    Boat
                </NavLink></ListItem>
                
                <ListItem><NavLink to="/data">
                    <img className="sideDrawer-icon" src={imgData} alt="Water"/>
                    Water
                </NavLink></ListItem>
                <ListItem onClick={props.login}><NavLink to="/">
                    <img className="toolbar-icon" src={imgLogout} alt="Logout"/>
                    Logout
                </NavLink></ListItem>  
            </List>
            </div>
        </nav>
    );
};

export default sideDrawer;