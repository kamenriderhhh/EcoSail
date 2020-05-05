import React, { Component } from 'react';
import LineChart from '../Charts/LineChart/LineChart';
import DatePicker from 'react-datepicker';
import { CardColumns, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { getSensorHistData } from '../../API';
import './DataView.css';
import "react-datepicker/dist/react-datepicker.css";
// For Map Usage
import { Map, TileLayer, Circle, CircleMarker, Popup } from 'react-leaflet';

class DataView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempValue: [],//[30, 20, 25, 26, 18, 28, 19],
            pHValue: [],//[4, 3, 4, 2, 5, 6, 4],
            dOValue: [],//[8.25, 8.79, 9.21, 7.90, 7.81, 8.33, 8.52],
            conducValue: [],//[12.3, 11.5, 13.2, 11.5, 12.5, 12.8, 13.0],
            turbValue: [],//[2435, 2391, 2600, 2680, 2750, 2512, 2480],
            filterBased: "Days", //NaN
            filterDays: 2,
            startDate: new Date(),
            dateList: [],
            sensDataBucket: [],
            location: {
                lat: 5.354482, 
                lng: 100.301226,
            },
            hisDestination: [],
        };
    }

    setAndGetHistData = () => {
        let boatID = this.props.selectedBID;
        let tmpDat = new Date(JSON.parse(JSON.stringify(this.state.startDate)));
        let strtDate = tmpDat.getFullYear()+'-'+(tmpDat.getMonth()+1)+'-'+tmpDat.getDate();
        tmpDat.setDate(Number(tmpDat.getDate())+Number(7));
        let edDate = tmpDat.getFullYear()+'-'+(tmpDat.getMonth()+1)+'-'+tmpDat.getDate();
        const histOption = {
            startDate: strtDate,
            endDate: edDate,
            boatID: boatID
        };

        getSensorHistData(histOption).then((result) => {
            this.setState({ 
                sensDataBucket: result,
            }, ()=>{
                this.calAverageValue();
            });
        });
    }

    calAverageValue = () => {
        let day = new Date(JSON.parse(JSON.stringify(this.state.startDate))); 
        var i;
        let tempValue, pHValue, doValue, ecValue, turbValue, avg, min, max, interCounter;
        let sensorUsed = 5; // 5 is the amount of sensors that used
        let days = 7; // 7 here represented days
        let counter = 0; // Initialize the counter
        let tempDest;

        (tempValue = []).length = days; tempValue.fill(0);
        (pHValue = []).length = days; pHValue.fill(0);
        (doValue = []).length = days; doValue.fill(0);
        (ecValue = []).length = days; ecValue.fill(0);
        (turbValue = []).length = days; turbValue.fill(0);
        (interCounter = []).length = days; interCounter.fill(0); 
        (avg = []).length = sensorUsed; 
        (min = []).length = sensorUsed; 
        (max = []).length = sensorUsed;
        (tempDest = []).length = days; tempValue.fill(0);

        // Create two dimensional array for gathering average, min, max sensors values
        for (i = 0; i < sensorUsed; i++) {
            (avg[i] = []).length = days; avg[i].fill(0);
            (min[i] = []).length = days; min[i].fill(0);
            (max[i] = []).length = days; max[i].fill(0);
        }
        // Calculate the Max, Min, Average values
        this.state.sensDataBucket.forEach(element => {
            // Setup the temporaly date for calculation
            let tempDay = new Date(JSON.parse(JSON.stringify(element.date))).getDate();
            //console.log("day:"+day.getDate()+" - elemdate:"+tempDay);
            if( day.getDate() !== tempDay ){
                day.setDate(Number(day.getDate())+Number(1));
                counter += 1;
            } else{
                tempValue[counter] = tempValue[counter]+parseFloat(element.tempValue);
                if(min[0][counter] > element.tempValue || min[0][counter]===0){min[0][counter] = element.tempValue}
                if(max[0][counter] < element.tempValue){max[0][counter] = element.tempValue}
                pHValue[counter] = pHValue[counter]+parseFloat(element.pHValue);
                if(min[1][counter] > element.pHValue || min[1][counter]===0){min[1][counter] = element.pHValue}
                if(max[1][counter] < element.pHValue){max[1][counter] = element.pHValue}
                doValue[counter] = doValue[counter]+parseFloat(element.doValue);
                if(min[2][counter] > element.doValue || min[2][counter]===0){min[2][counter] = element.doValue}
                if(max[2][counter] < element.doValue){max[2][counter] = element.doValue}
                ecValue[counter] = ecValue[counter]+parseFloat(element.ecValue);
                if(min[3][counter] > element.ecValue || min[3][counter]===0){min[3][counter] = element.ecValue}
                if(max[3][counter] < element.ecValue){max[3][counter] = element.ecValue}
                turbValue[counter] = turbValue[counter]+parseFloat(element.turbidity);
                if(min[4][counter] > element.turbidity || min[4][counter]===0){min[4][counter] = element.turbidity}
                if(max[4][counter] < element.turbidity){max[4][counter] = element.turbidity}
                interCounter[counter]++;
                // push the last collected data destination
                tempDest[counter] = [element.latitude, element.longitude];
            }
        });
        // Calculate average value 
        for(i=0;i<=6;i++){
            if(interCounter[i] !== 0){
                avg[0][i]=//Math.round( // Temperatre average
                    (tempValue[i]/interCounter[i]
                ).toFixed(2);
                avg[1][i]=//Math.round( // pH average
                    (pHValue[i]/interCounter[i]
                ).toFixed(2);
                avg[2][i]=//Math.round( // DO average
                    (doValue[i]/interCounter[i]
                ).toFixed(2);
                avg[3][i]=//Math.round( // EC average
                    (ecValue[i]/interCounter[i]
                ).toFixed(2);
                avg[4][i]=//Math.round( // Turbidity average
                    (turbValue[i]/interCounter[i]
                ).toFixed(2);
                //console.log("Average:\n"+avg[0][i]+"\n"+avg[1][i]+"\n"+avg[2][i]+"\n"+avg[3][i]+"\n"+avg[4][i]);
            }  
        }
        this.setState({ 
            tempValue:  [avg[0],min[0],max[0]],
            pHValue:  [avg[1],min[1],max[1]],
            dOValue:  [avg[2],min[2],max[2]],
            conducValue:  [avg[3],min[3],max[3]],
            turbValue:  [avg[4],min[4],max[4]],
            hisDestination: tempDest,
        }, ()=>{
            console.log(this.state.conducValue);
            console.log(this.state.turbValue);
            // Something to do after the data changed
        });
    }

    selectFilterBased = (event) => {
        this.setState({
            filterBased: document.getElementById("filterBased").value
            // plot the data according to either months or days
        }, ()=>{
            if(this.state.filterBased === "Days"){
                // Get 7 days data for render when Days mode selected 
                this.setAndGetHistData();
                this.updateDateList();
            } 
            // update based on months...........
        });
    }
    
    selectFilterDays = (event) => {
        this.setState({
            filterDays: document.getElementById("filterDays").value
            // plot the data according to either months or days
        }, ()=>{
            this.updateDateList();
        });
    }

    handleChange = (startDate) => {
        this.setState({
            startDate,
            //strDate: startDate.getDate()+'/'+(startDate.getMonth()+1)+'/'+startDate.getFullYear()
        }, ()=>{
            // Get 7 days data for render when date changed
            this.updateDateList();
            this.setAndGetHistData();
        });
    };

    updateDateList = () => {
        let date = [];
        // Deep copy, JSON does not have a primitive representation of Date objects so need to cast it manually.
        let tempDate = new Date(JSON.parse(JSON.stringify(this.state.startDate)));
        for(let i=0;i<this.state.filterDays;i++){
            date.push(tempDate.getDate()+'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear());
            tempDate.setDate(tempDate.getDate()+1);
            //console.log('try '+ this.props.date);
        }
        this.setState({
            dateList: date,
        }, ()=>{
            //console.log(this.state.startDate); 
        });
    };

    componentDidMount(){
        this.updateDateList();
        this.setAndGetHistData();
    }

    render() {
        const startDate = this.state.startDate;
        const dateList = this.state.dateList;
        const filterBased = this.state.filterBased;
        const filterDays = this.state.filterDays;
        const histDest = this.state.hisDestination;
        var pos = [this.state.location.lat, this.state.location.lng];   
        var i; var circles=[];
        // To circle up the destination of the collected historical data
        for(i=0;i<filterDays;i++){
            if(Array.isArray(histDest[i])){
                circles.push(
                    <div>
                        <Circle center={histDest[i]} fillColor="red" radius={15} />
                        <CircleMarker center={histDest[i]} color="red" radius={10}>
                        <Popup>Destination Area with date: {dateList[i]}</Popup>
                        </CircleMarker>
                    </div>
                )   
            }
        }
        return (
            <div className="dataView">
                <h3 style={{textDecoration: 'underline'}}>Historical Data</h3>
                <Form>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label for="filterBased">Filter based on Months/Days:</Label>
                                <Input type="select" name="select" id="filterBased" onChange={this.selectFilterBased}>
                                    <option>Days</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label for="filterDays">Display data based on days:</Label>
                                <Input type="select" name="select" id="filterDays" onChange={this.selectFilterDays} 
                                disabled={filterBased !== "Days" ? true : false}>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>5</option>
                                    <option>7</option>
                                </Input>
                            </Col>
                            <Col>
                                <Label for="filterDate">Select the date:</Label><br/>
                                <DatePicker
                                    id='datePicker' 
                                    dateFormat="dd/MM/yyyy"
                                    selected={startDate}
                                    disabled={filterBased !== "Days" ? true : false}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
                    {
                        this.state.filterBased === "Days" ? 
                        <CardColumns>
                            <LineChart name={"Temperature"} data={this.state.tempValue} date={dateList} filterDays={filterDays}/>
                            <LineChart name={"pH"} data={this.state.pHValue} date={dateList} filterDays={filterDays}/>
                            <LineChart name={"Dissolve Oxygen"} data={this.state.dOValue} date={dateList} filterDays={filterDays}/>
                            <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue} date={dateList} filterDays={filterDays}/>
                            <LineChart name={"Turbidity"} data={this.state.turbValue} date={dateList} filterDays={filterDays}/> 
                        </CardColumns>
                        : 
                        <CardColumns>
                            <LineChart name={"Temperature"} data={this.state.tempValue}/>
                            <LineChart name={"pH"} data={this.state.pHValue}/>
                            <LineChart name={"Dissolve Oxygen"} data={this.state.dOValue}/>
                            <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue}/>
                            <LineChart name={"Turbidity"} data={this.state.turbValue}/> 
                        </CardColumns>
                        
                    }
                <Map className="map" center={pos} maxZoom={20} zoom={15}>
                    <TileLayer
                    maxZoom={20}
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {circles}
                </Map>          
            </div>
        );
    }
}

export default DataView;