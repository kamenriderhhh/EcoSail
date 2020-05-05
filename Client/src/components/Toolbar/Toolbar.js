import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';
import imgLogo from "../Image/logo.png";
import imgDashboard from "../Image/dashboard.png";
import imgData from "../Image/data.png";
//import imgCamera from "../Image/camera.png";
import imgMap from "../Image/map.png";
import imgLogout from "../Image/logout.png";
import imgLogin from "../Image/login.png";
// Notification feed
import { StreamApp, NotificationDropdown } from 'react-activity-feed';
import { ListGroup, ListGroupItem } from 'reactstrap';
import 'react-activity-feed/dist/index.es.css';

class toolbar extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          feedCount: 0,
        };
    }

    // After the component mount, get the location information
    componentDidMount(){
        this.updateData();
        // Every 
        this.timer = setInterval(() => this.updateData(), 10000);
    };

    // Before unmount the component, stop the timer and null it
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    updateData = () => (    
        <StreamApp
            apiKey={process.env.REACT_APP_STREAM_KEY}
            appId={process.env.REACT_APP_STREAM_ID}
            token={this.props.token}
        >
            <NotificationDropdown
                notify={true}
                right
                feedGroup="notification"
                Group={(notifyFeed) => 
                    notifyFeed.activityGroup.activities.map((feedObj)=>
                        <ListGroup>
                            <ListGroupItem color="warning" className="feedItem">
                                <p>
                                    <strong>[Alert]</strong>
                                    <br/>{feedObj.object}
                                </p> 
                            </ListGroupItem>
                        </ListGroup>
                    )   
                }
            />
        </StreamApp>
    )

    render(){
        return(
            <header className="toolbar border">
            { 
                this.props.loginStatus === true ? 
                <nav className="toolbar__navigation">
                    <div className="toolbar__toggle-button">
                        <DrawerToggleButton click={this.props.drawerClickHandler}/>
                    </div>
                    <div className="toolbar__logo">
                        <img className="toolbar-logo" src={imgLogo} alt="Logo"/>
                    </div>
                    <div className="toolbar__title">
                        <h2>ECOSAIL</h2>
                    </div>
                    <div className="spacer" />
                    <div style={{margin: '0 auto', marginTop: "0px", marginRight: "20px" }}>
                        {this.updateData()}
                    </div>
                    <div className="toolbar_navigation-items">
                        <ul>
                            <li><NavLink to="/">
                                <img className="toolbar-icon" src={imgDashboard} alt="Dashboard"/>
                                Dashboard
                            </NavLink></li>
                            <li><NavLink to="/map">
                                <img className="toolbar-icon" src={imgMap} alt="Boat"/>
                                Boat
                            </NavLink></li>
                            <li><NavLink to="/data">
                                <img className="toolbar-icon" src={imgData} alt="Water"/>
                                Water
                            </NavLink></li>
                            <li onClick={this.props.login}><NavLink to="/">
                                <img className="toolbar-icon" src={imgLogout} alt="Logout"/>
                                Logout
                            </NavLink></li>
                        </ul>
                    </div>
                </nav>
                :
                <nav className="toolbar__navigation" style={{display:"flex", justifyContent:"center"}}>
                    <div className="toolbar__logo">
                        <img className="toolbar-logo" src={imgLogo} alt="Logo"/>
                    </div>
                    <div className="toolbar__title">
                        <h2>ECOSAIL</h2>
                    </div>
                    <div className="spacer" />
                    <div className="toolbar_navigation-item">
                        <NavLink to="/login" style={{color: "black", textDecoration: 'none'}}>
                            <img className="toolbar-icon" src={imgLogin} alt="Login"/>
                            Login       
                        </NavLink>
                    </div>    
                </nav>
            }       
            </header>
        )
    }
}

export default toolbar;