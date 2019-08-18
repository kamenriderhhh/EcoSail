import React from 'react';
import { NavLink } from "react-router-dom";
import './SideDrawer.css';

const sideDrawer = props => {
    
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses = 'side-drawer open';
    }

    return (
        <nav className={drawerClasses}>
            <div className="picture">
                <label>picture here</label>
            </div>
            <ul>
                <li><NavLink to="/">Main</NavLink></li>
                <li><NavLink to="/map">Map</NavLink></li>
                <li><NavLink to="/camera">Camera</NavLink></li>
                <li><NavLink to="/data">Data</NavLink></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;