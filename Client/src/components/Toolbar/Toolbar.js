import React from 'react';
import { NavLink } from "react-router-dom";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import imgLogo from "../Image/logo.png";
import imgDashboard from "../Image/dashboard.png";
import imgData from "../Image/data.png";
import imgCamera from "../Image/camera.png";
import imgMap from "../Image/map.png";
import imgLogout from "../Image/logout.png";

const toolbar = props => (
    <header className="toolbar border">
        { 
            props.loginStatus === true ? 
            <nav className="toolbar__navigation">
                <div className="toolbar__toggle-button">
                    <DrawerToggleButton click={props.drawerClickHandler}/>
                </div>
                <div className="toolbar__logo">
                    <img className="toolbar-logo" src={imgLogo} alt="Logo"/>
                </div>
                <div className="toolbar__title">
                    <h2>ECOSAIL</h2>
                </div>
                <div className="spacer" />
                <div className="toolbar_navigation-items">
                    <ul>
                        <li><NavLink to="/">
                            <img className="toolbar-icon" src={imgDashboard} alt="Dashboard"/>
                            Dashboard
                        </NavLink></li>
                        <li><NavLink to="/map">
                            <img className="toolbar-icon" src={imgMap} alt="Map"/>
                            Map
                        </NavLink></li>
                        <li><NavLink to="/camera">
                            <img className="toolbar-icon" src={imgCamera} alt="Camera"/>
                            Camera
                        </NavLink></li>
                        <li><NavLink to="/data">
                            <img className="toolbar-icon" src={imgData} alt="Data"/>
                            Data
                        </NavLink></li>
                        <li onClick={props.login}><NavLink to="/">
                            <img className="toolbar-icon" src={imgLogout} alt="Logout"/>
                            Logout
                        </NavLink></li>
                    </ul>
                </div>
            </nav>
            :
            <nav className="toolbar__navigation" style={{display:"flex", justifyContent:"center"}}>
                <h2>Welcome to ECOSAIL</h2>
            </nav>
        }
        
    </header>
);

export default toolbar;