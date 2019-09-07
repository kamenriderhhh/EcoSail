import React from 'react';
import './Switch.css';


class Switch extends React.Component {

    render() {
        return (
            <label className="switch">
                <input className="switch-input" type="checkbox" />
                <span className="switch-label" data-on="On" data-off="Off"></span> 
                <span className="switch-handle"></span> 
            </label>
        );
    }
}

export default Switch;