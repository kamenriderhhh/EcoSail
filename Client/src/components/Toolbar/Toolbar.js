import React from 'react';
import { NavLink } from "react-router-dom";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
    <header className="toolbar border">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar__logo"><NavLink to="/">ECOSAIL</NavLink></div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
                <ul>
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/map">Map</NavLink></li>
                    <li><NavLink to="/camera">Camera</NavLink></li>
                    <li><NavLink to="/data">Data</NavLink></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default toolbar;