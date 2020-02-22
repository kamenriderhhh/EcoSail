import React, { Component } from 'react';
import './Mainpage.css';

class Mainpage extends Component {
    render() {
        return (
            <div className="mainpage">
                <section className="sections">
                    <div style={{padding:"100px"}}>
                        <h3><i>ECOSAIL, AUTONOMOUS SAILBOAT & SEA ENVIRONMENT MONITOR</i></h3>
                        <p>An autonomous sailboat to gather the water quality data for sea environment monitoring.</p>
                    </div>
                </section>
                <section>
                    <div style={{margin:"30px"}}>
                        <h3><i>ABOUT THE PROJECT</i></h3>
                        <p>An autonomous sailboat that utilised the Internet of Things (IoT) technology and Artificial 
                        Intelligence (AI) to collect ocean water quality data for marine environment 
                        monitoring.</p>
                    </div>
                </section>
                <footer>    
                <div>
                    <ul className="listed">
                        <li>
                            <h4>Ng Wey Kean</h4>
                        </li>
                        <li>
                            <p>School of Computer Sciences, USM, PG, MY</p>
                        </li>
                        <li>
                            <p>email: ngweykean95@student.usm.my</p>
                        </li>
                    </ul>
                </div>
                </footer>
            </div>
        );
    }
}

export default Mainpage;