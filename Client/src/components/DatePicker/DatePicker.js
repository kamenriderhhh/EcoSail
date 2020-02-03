import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

class DatePick extends Component {

    state = {
        startDate: new Date()
    };

    handleChange = startDate => {
        this.setState({
          startDate
        });
    };

    render() {
        const { startDate } = this.state;
        return (
            <DatePicker 
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                disabled={this.props.dateDisable}
                onChange={this.handleChange}
            />
        );
    }
}

export default DatePick;