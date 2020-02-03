import React from 'react';
import { NavLink } from "react-router-dom";
import './SideDrawer.css';
import logo from '../Image/logo.png'; 
import imgDashboard from "../Image/dashboard.png";
import imgData from "../Image/data.png";
import imgCamera from "../Image/camera.png";
import imgMap from "../Image/map.png";
import imgLogout from "../Image/logout.png";

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
            <div className="picture">
                <img className="darwer-img" src={logo} alt="Avatar"/>   
            </div>
            <div className="drawerFrame">
            <ul>
                <li><NavLink to="/">
                    <img className="sideDrawer-icon" src={imgDashboard} alt="Dashboard"/>
                    Dashboard
                </NavLink></li>
                <li><NavLink to="/map">
                    <img className="sideDrawer-icon" src={imgMap} alt="Map"/>
                    Map
                </NavLink></li>
                <li><NavLink to="/camera">
                    <img className="sideDrawer-icon" src={imgCamera} alt="Camera"/>
                    Camera
                </NavLink></li>
                <li><NavLink to="/data">
                    <img className="sideDrawer-icon" src={imgData} alt="Data"/>
                    Data
                </NavLink></li>
                <li onClick={props.login}><NavLink to="/">
                    <img className="toolbar-icon" src={imgLogout} alt="Logout"/>
                    Logout
                </NavLink></li>  
            </ul>
            </div>
        </nav>
    );
};

export default sideDrawer;