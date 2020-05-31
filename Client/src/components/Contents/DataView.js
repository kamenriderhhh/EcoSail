import React, { Component } from 'react';
import LineChart from '../Charts/LineChart/LineChart';
import BarChart from '../Charts/BarChart/BarChart';
import DatePicker from 'react-datepicker';
import { Card, CardColumns, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { getSensorHistData } from '../../API';
import './DataView.css';
import "react-datepicker/dist/react-datepicker.css";
// For Map Usage
import { Map, TileLayer, CircleMarker, Circle, Polyline, Tooltip, } from 'react-leaflet';

class DataView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempValue: [], tempValuePerDay: [],
            pHValue: [], pHValuePerDay: [],
            dOValue: [], dOValuePerDay: [],
            conducValue: [], conducValuePerDay: [],
            turbValue: [], turbValuePerDay: [],
            filterBased: "Days", //NaN
            filterDays: 1,
            startDate: new Date(),
            dateList: [], // for average data date
            dataTime: [], // for per day data time
            sensDataBucket: [],
            location: {
                lat: 5.354482, 
                lng: 100.301226,
            },
            sensDataList: [],
            selectedTripID: "", tripIDList: [],
            presentation: "Graph", 
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
        let tempValue, pHValue, doValue, ecValue, turbValue, avg, min, max, interCounter; // for mean, min , max
        let sensorUsed = 5; // 5 is the amount of sensors that used
        let days = 7; // 7 here represented days
        let counter = 0; // Initialize the counter
        let tempDest;
        let tempValue2, pHValue2, doValue2, ecValue2, turbValue2, dataTime; // for one day data
        let sensDataList;

        (tempValue2 = []).length = days; 
        (pHValue2 = []).length = days; 
        (doValue2 = []).length = days; 
        (ecValue2 = []).length = days; 
        (turbValue2 = []).length = days; 
        (tempValue = []).length = days; tempValue.fill(0);
        (pHValue = []).length = days; pHValue.fill(0);
        (doValue = []).length = days; doValue.fill(0);
        (ecValue = []).length = days; ecValue.fill(0);
        (turbValue = []).length = days; turbValue.fill(0);
        (interCounter = []).length = days; interCounter.fill(0); 
        (avg = []).length = sensorUsed; 
        (min = []).length = sensorUsed; 
        (max = []).length = sensorUsed;
        (tempDest = []).length = days; 
        (dataTime = []).length = days;
        (sensDataList = []).length = days; 


        // Create two dimensional array for gathering average, min, max sensors values
        for (i = 0; i < sensorUsed; i++) {
            (avg[i] = []).length = days; avg[i].fill(0);
            (min[i] = []).length = days; min[i].fill(0);
            (max[i] = []).length = days; max[i].fill(0);
        }
        for (i = 0; i < days; i++) {
            tempValue2[i] = []; tempValue2[i].fill(0);
            pHValue2[i] = []; pHValue2[i].fill(0);
            doValue2[i] = []; doValue2[i].fill(0);
            ecValue2[i] = [];ecValue2[i].fill(0);
            turbValue2[i] = []; turbValue2[i].fill(0);
            dataTime[i] = []; sensDataList[i] = [];
        }

        // Calculate the Max, Min, Average values
        this.state.sensDataBucket.forEach(element => {
            // Setup the temporaly date for calculation
            let tempDay = new Date(JSON.parse(JSON.stringify(element.date))).getDate();
            /*let time = new Date(JSON.parse(JSON.stringify(element.date))).getHours()+':'+ 
                new Date(JSON.parse(JSON.stringify(element.date))).getMinutes()+':'+
                new Date(JSON.parse(JSON.stringify(element.date))).getSeconds()*/
            //console.log("day:"+day.getDate()+" - elemdate:"+tempDay);
            if( day.getDate() !== tempDay ){
                day.setDate(Number(day.getDate())+Number(1));
                counter += 1;
            } else{
                sensDataList[counter].push(element);
                dataTime[counter].push(new Date(JSON.parse(JSON.stringify(element.date))).getTime());
                tempValue2[counter].push(parseFloat(element.tempValue));
                tempValue[counter] = tempValue[counter]+parseFloat(element.tempValue);
                if(min[0][counter] > element.tempValue || min[0][counter]===0){min[0][counter] = element.tempValue}
                if(max[0][counter] < element.tempValue){max[0][counter] = element.tempValue}
                pHValue2[counter].push(parseFloat(element.pHValue));
                pHValue[counter] = pHValue[counter]+parseFloat(element.pHValue);
                if(min[1][counter] > element.pHValue || min[1][counter]===0){min[1][counter] = element.pHValue}
                if(max[1][counter] < element.pHValue){max[1][counter] = element.pHValue}
                doValue2[counter].push(parseFloat(element.doValue));
                doValue[counter] = doValue[counter]+parseFloat(element.doValue);
                if(min[2][counter] > element.doValue || min[2][counter]===0){min[2][counter] = element.doValue}
                if(max[2][counter] < element.doValue){max[2][counter] = element.doValue}
                ecValue2[counter].push(parseFloat(element.ecValue));
                ecValue[counter] = ecValue[counter]+parseFloat(element.ecValue);
                if(min[3][counter] > element.ecValue || min[3][counter]===0){min[3][counter] = element.ecValue}
                if(max[3][counter] < element.ecValue){max[3][counter] = element.ecValue}
                turbValue2[counter].push(parseFloat(element.turbidity));
                turbValue[counter] = turbValue[counter]+parseFloat(element.turbidity);
                if(min[4][counter] > element.turbidity || min[4][counter]===0){min[4][counter] = element.turbidity}
                if(max[4][counter] < element.turbidity){max[4][counter] = element.turbidity}
                interCounter[counter]++;
                // push the last collected data destination
                tempDest[counter] = [element.latitude, element.longitude];
            }
        });//console.log(tempValue2);console.log(dataTime);
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
            tempValuePerDay: tempValue2,
            pHValuePerDay: pHValue2,
            dOValuePerDay: doValue2,
            conducValuePerDay: ecValue2,
            turbValuePerDay: turbValue2,
            dataTime: dataTime,
            sensDataList: sensDataList,
        }, ()=>{
            if(this.state.presentation === "AnalyticsMap"){ this.setSelectedTripID() }
            //console.log(this.state.conducValue);
            //console.log(this.state.sensDataList);
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
            filterDays: parseInt(document.getElementById("filterDays").value)
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
            date.push((tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear());
            tempDate.setDate(tempDate.getDate()+1);
            //console.log('try '+ this.props.date);
        }
        this.setState({
            dateList: date,
        }, ()=>{
            //console.log(this.state.startDate); 
        });
    };

    setSelectedTripID = (event) => { 
        this.setState({
          selectedTripID: document.getElementById("tripIDSelect").value
        },()=>{
          //console.log('trip: '+this.state.selectedTripID)
        });
    };
    
    setPresentation = (event) => { 
        this.setState({
          presentation: document.getElementById("presentationSelect").value
        },()=>{
          //console.log('Presentation: '+this.state.presentation)
        });
    };
    /**
     * Calculate the center/average of multiple GeoLocation coordinates
     * Expects an array of objects with .latitude and .longitude properties
     *
     * @url http://stackoverflow.com/a/14231286/538646
     */
    averageGeolocation = (coords) => {
        if (coords.length === 1) {
            return coords[0];
        }
      
        let x = 0.0;
        let y = 0.0;
        let z = 0.0;
      
        for (let coord of coords) {
            let latitude = coord.latitude * Math.PI / 180;
            let longitude = coord.longitude * Math.PI / 180;
      
            x += Math.cos(latitude) * Math.cos(longitude);
            y += Math.cos(latitude) * Math.sin(longitude);
            z += Math.sin(latitude);
        }
      
        let total = coords.length;
      
        x = x / total;
        y = y / total;
        z = z / total;
      
        let centralLongitude = Math.atan2(y, x);
        let centralSquareRoot = Math.sqrt(x * x + y * y);
        let centralLatitude = Math.atan2(z, centralSquareRoot);
      
        return {
            latitude: centralLatitude * 180 / Math.PI,
            longitude: centralLongitude * 180 / Math.PI
        };
    }      

    analyticsMap = () => {
        var sensDataList = this.state.sensDataList;
        var i,j; var circles=[], line=[]; 
        var circleColor; var tripIDList=[]; var firstOpt; 
        var infectedArray=[]; var infectedAvgGeoLoc; var infectedCircle=[]; 
        var tipTemp, tipPH, tipDO, tipEC, tipTurb;
        var pos = [this.state.location.lat, this.state.location.lng];   
        for(i=0;i<1;i++){
            if(Array.isArray(sensDataList[i]) && sensDataList[i].length){ 
                for(j=0;j<sensDataList[i].length;j++){
                    // collect unique trip id
                    if (tripIDList.indexOf(sensDataList[i][j].tripID) === -1){
                        tripIDList.push(sensDataList[i][j].tripID);
                    }
                    if(this.state.selectedTripID ? this.state.selectedTripID === sensDataList[i][j].tripID 
                        : tripIDList[0] === sensDataList[i][j].tripID){
                        // CircleMarker color
                        if(circles.length === 0){
                            circleColor = "red"; firstOpt = sensDataList[i][j].tripID;
                        } else if (j === sensDataList[i].length-1){
                            circleColor = "blue"; 
                        } else if (this.state.selectedTripID ? this.state.selectedTripID !== sensDataList[i][j+1].tripID 
                            : tripIDList[0] !== sensDataList[i][j].tripID){
                            circleColor = "blue";  
                        } else {
                            circleColor = "lime"
                        }
                        // Analytics part
                        if(sensDataList[i][j].pHValue<3.5 || sensDataList[i][j].pHValue>9.0){ // pH 
                            tipPH = <span style={{color:"red", fontWeight: "bold"}}>
                                pH: {JSON.stringify(sensDataList[i][j].pHValue)}</span>;
                            circleColor = "violet";
                        } 
                        else {
                            tipPH = <span>pH: {JSON.stringify(sensDataList[i][j].pHValue)}</span>
                        }
                        if(sensDataList[i][j].ecValue>28){ // EC
                            tipEC = <span style={{color:"red", fontWeight: "bold"}}>
                                EC: {JSON.stringify(sensDataList[i][j].ecValue)}</span>;
                            circleColor = "violet";
                        }
                        else {
                            tipEC = <span>EC: {JSON.stringify(sensDataList[i][j].ecValue)}</span>
                        } 
                        if(sensDataList[i][j].doValue<4){ // DO
                            tipDO = <span style={{color:"red", fontWeight: "bold"}}>
                                DO: {JSON.stringify(sensDataList[i][j].doValue)}</span>;
                            circleColor = "violet";
                        }
                        else {
                            tipDO = <span>DO: {JSON.stringify(sensDataList[i][j].doValue)}</span>
                        }
                        if(sensDataList[i][j].tempValue<15 || sensDataList[i][j].tempValue>30){ // Temperature
                            tipTemp = <span style={{color:"red", fontWeight: "bold"}}>
                                Temperature: {JSON.stringify(sensDataList[i][j].tempValue)}</span>;
                            circleColor = "violet";
                        }
                        else {
                            tipTemp = <span>Temperature: {JSON.stringify(sensDataList[i][j].tempValue)}</span>
                        }
                        if(sensDataList[i][j].turbidity>2800){ // Turbidity
                            tipTurb = <span style={{color:"red", fontWeight: "bold"}}>
                                Turbidity: {JSON.stringify(sensDataList[i][j].turbidity)}</span>;
                            circleColor = "violet";
                        }
                        else {
                            tipTurb = <span>Turbidity: {JSON.stringify(sensDataList[i][j].turbidity)}</span>
                        }
                        // Push to the infectedArea if the circle is violet/infected
                        if(circleColor === "violet"){
                            infectedArray.push({
                                latitude: parseFloat(sensDataList[i][j].latitude),
                                longitude: parseFloat(sensDataList[i][j].longitude)
                            }); 
                        }

                        // Create path and circlemarker
                        circles.push(
                            <div>
                                <CircleMarker center={ [sensDataList[i][j].latitude, sensDataList[i][j].longitude] } 
                                color={circleColor} radius={5}>
                                    <Tooltip>
                                        BoatID: {JSON.stringify(sensDataList[i][j].boatID)}<br/>
                                        TripID: {JSON.stringify(sensDataList[i][j].tripID)}<br/>
                                        Latitude: {JSON.stringify(sensDataList[i][j].latitude)}<br/>
                                        Longitude: {JSON.stringify(sensDataList[i][j].longitude)}<br/>
                                        {tipTemp}<br/>
                                        {tipPH}<br/>
                                        {tipDO}<br/>
                                        {tipEC}<br/>
                                        {tipTurb}<br/>
                                        Date: {JSON.stringify(sensDataList[i][j].date)}
                                    </Tooltip>
                                </CircleMarker>
                            </div>
                        )
                        pos = [sensDataList[i][j].latitude, sensDataList[i][j].longitude];
                        line.push([sensDataList[i][j].latitude, sensDataList[i][j].longitude]);
                        if(j===sensDataList[i].length-1){
                            infectedAvgGeoLoc = this.averageGeolocation(infectedArray);
                            if(!isNaN(infectedAvgGeoLoc.latitude)){
                                infectedCircle.push(
                                <div>
                                    <Circle center={ [infectedAvgGeoLoc.latitude, infectedAvgGeoLoc.longitude] } 
                                    color={"purple"} radius={30}>
                                    </Circle>
                                </div>
                                )
                            }                            
                        }
                    }
                }
                for(i=0;i<tripIDList.length;i++){ tripIDList[i] = <option>{tripIDList[i]}</option> }
            }
        }
        return([tripIDList,circles,infectedCircle,line,firstOpt])
    }

    componentDidMount(){
        this.updateDateList();
        this.setAndGetHistData();
    }

    render() {
        const startDate = this.state.startDate;
        const dateList = this.state.dateList;
        const filterBased = this.state.filterBased;
        const filterDays = this.state.filterDays;
        const sensDataList = this.state.sensDataList; 
        var pos = [this.state.location.lat, this.state.location.lng];   
        var i,j; var circles=[], line=[]; 
        var circleColor; var tripIDList=[]; var firstOpt; 
        var infectedArray=[]; var infectedAvgGeoLoc; var infectedCircle=[]; 
        var tipTemp, tipPH, tipDO, tipEC, tipTurb;

        if(this.state.presentation === "AnalyticsMap"){
            for(i=0;i<1;i++){
                if(Array.isArray(sensDataList[i]) && sensDataList[i].length){ 
                    for(j=0;j<sensDataList[i].length;j++){
                        // collect unique trip id
                        if (tripIDList.indexOf(sensDataList[i][j].tripID) === -1){
                            tripIDList.push(sensDataList[i][j].tripID);
                        }
                        if(this.state.selectedTripID ? this.state.selectedTripID === sensDataList[i][j].tripID 
                            : tripIDList[0] === sensDataList[i][j].tripID){
                            // CircleMarker color
                            if(circles.length === 0){
                                circleColor = "red"; firstOpt = sensDataList[i][j].tripID;
                            } else if (j === sensDataList[i].length-1){
                                circleColor = "blue"; 
                            } else if (this.state.selectedTripID ? this.state.selectedTripID !== sensDataList[i][j+1].tripID 
                                : tripIDList[0] !== sensDataList[i][j].tripID){
                                circleColor = "blue";  
                            } else {
                                circleColor = "lime"
                            }
                            // Analytics part
                            if(sensDataList[i][j].pHValue<3.5 || sensDataList[i][j].pHValue>9.0){ // pH 
                                tipPH = <span style={{color:"red", fontWeight: "bold"}}>
                                    pH: {JSON.stringify(sensDataList[i][j].pHValue)}</span>;
                                circleColor = "violet";
                            } 
                            else {
                                tipPH = <span>pH: {JSON.stringify(sensDataList[i][j].pHValue)}</span>
                            }
                            if(sensDataList[i][j].ecValue>28){ // EC
                                tipEC = <span style={{color:"red", fontWeight: "bold"}}>
                                    EC: {JSON.stringify(sensDataList[i][j].ecValue)}</span>;
                                circleColor = "violet";
                            }
                            else {
                                tipEC = <span>EC: {JSON.stringify(sensDataList[i][j].ecValue)}</span>
                            } 
                            if(sensDataList[i][j].doValue<4){ // DO
                                tipDO = <span style={{color:"red", fontWeight: "bold"}}>
                                    DO: {JSON.stringify(sensDataList[i][j].doValue)}</span>;
                                circleColor = "violet";
                            }
                            else {
                                tipDO = <span>DO: {JSON.stringify(sensDataList[i][j].doValue)}</span>
                            }
                            if(sensDataList[i][j].tempValue<15 || sensDataList[i][j].tempValue>30){ // Temperature
                                tipTemp = <span style={{color:"red", fontWeight: "bold"}}>
                                    Temperature: {JSON.stringify(sensDataList[i][j].tempValue)}</span>;
                                circleColor = "violet";
                            }
                            else {
                                tipTemp = <span>Temperature: {JSON.stringify(sensDataList[i][j].tempValue)}</span>
                            }
                            if(sensDataList[i][j].turbidity>2800){ // Turbidity
                                tipTurb = <span style={{color:"red", fontWeight: "bold"}}>
                                    Turbidity: {JSON.stringify(sensDataList[i][j].turbidity)}</span>;
                                circleColor = "violet";
                            }
                            else {
                                tipTurb = <span>Turbidity: {JSON.stringify(sensDataList[i][j].turbidity)}</span>
                            }
                            // Push to the infectedArea if the circle is violet/infected
                            if(circleColor === "violet"){
                                infectedArray.push({
                                    latitude: parseFloat(sensDataList[i][j].latitude),
                                    longitude: parseFloat(sensDataList[i][j].longitude)
                                }); 
                            }
    
                            // Create path and circlemarker
                            circles.push(
                                <div>
                                    <CircleMarker center={ [sensDataList[i][j].latitude, sensDataList[i][j].longitude] } 
                                    color={circleColor} radius={5}>
                                        <Tooltip>
                                            BoatID: {JSON.stringify(sensDataList[i][j].boatID)}<br/>
                                            TripID: {JSON.stringify(sensDataList[i][j].tripID)}<br/>
                                            Latitude: {JSON.stringify(sensDataList[i][j].latitude)}<br/>
                                            Longitude: {JSON.stringify(sensDataList[i][j].longitude)}<br/>
                                            {tipTemp}<br/>
                                            {tipPH}<br/>
                                            {tipDO}<br/>
                                            {tipEC}<br/>
                                            {tipTurb}<br/>
                                            Date: {JSON.stringify(sensDataList[i][j].date)}
                                        </Tooltip>
                                    </CircleMarker>
                                </div>
                            )
                            pos = [sensDataList[i][j].latitude, sensDataList[i][j].longitude];
                            line.push([sensDataList[i][j].latitude, sensDataList[i][j].longitude]);
                            if(j===sensDataList[i].length-1){
                                infectedAvgGeoLoc = this.averageGeolocation(infectedArray);
                                if(!isNaN(infectedAvgGeoLoc.latitude)){
                                    infectedCircle.push(
                                    <div>
                                        <Circle center={ [infectedAvgGeoLoc.latitude, infectedAvgGeoLoc.longitude] } 
                                        color={"purple"} radius={30}>
                                        </Circle>
                                    </div>
                                    )
                                }                            
                            }
                        }
                    }
                    for(i=0;i<tripIDList.length;i++){ tripIDList[i] = <option>{tripIDList[i]}</option> }
                }
            }
        }
        return (
            <div className="dataView">
                <h3 style={{textDecoration: 'underline'}}>Historical Data</h3>
                <Label for="sailboatSelect">The current selected Sailboat ID: {this.props.selectedBID}</Label>
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
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
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
                <Input type="select" name="select" id="presentationSelect" onChange={this.setPresentation}>
                    <option>Graph</option>
                    <option>AnalyticsMap</option>
                </Input>
                <br/>
                { 
                    this.state.presentation === "Graph" ? 
                        this.state.filterBased === "Days" ? 
                            <CardColumns>
                                <BarChart name={"Temperature/Day"} data={this.state.tempValuePerDay} date={this.state.dataTime} filterDays={filterDays} type={1}/> 
                                <LineChart name={"Temperature"} data={this.state.tempValue} date={dateList} filterDays={filterDays} type={2}/>
                                <BarChart name={"pH/Day"} data={this.state.pHValuePerDay} date={this.state.dataTime} filterDays={filterDays} type={1}/>
                                <LineChart name={"pH"} data={this.state.pHValue} date={dateList} filterDays={filterDays} type={2}/>
                                <BarChart name={"Dissolved Oxygen/Day"} data={this.state.dOValuePerDay} date={this.state.dataTime} filterDays={filterDays} type={1}/>
                                <LineChart name={"Dissolved Oxygen"} data={this.state.dOValue} date={dateList} filterDays={filterDays} type={2}/>
                                <BarChart name={"Electrical Conductivity/Day"} data={this.state.conducValuePerDay} date={this.state.dataTime} filterDays={filterDays} type={1}/>
                                <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue} date={dateList} filterDays={filterDays} type={2}/>
                                <BarChart name={"Turbidity/Day"} data={this.state.turbValuePerDay} date={this.state.dataTime} filterDays={filterDays} type={1}/>
                                <LineChart name={"Turbidity"} data={this.state.turbValue} date={dateList} filterDays={filterDays} type={2}/>
                            </CardColumns>
                            : 
                            <CardColumns>
                                <LineChart name={"Temperature"} data={this.state.tempValue}/>
                                <LineChart name={"pH"} data={this.state.pHValue}/>
                                <LineChart name={"Dissolve Oxygen"} data={this.state.dOValue}/>
                                <LineChart name={"Electrical Conductivity/Salinity"} data={this.state.conducValue}/>
                                <LineChart name={"Turbidity"} data={this.state.turbValue}/> 
                            </CardColumns>    
                    :
                    <div>
                        <Card>
                            <Label>
                                <span style={{fontWeight: "bold"}}>NOTE: </span>
                                The <span style={{color:"violet", fontWeight: "bold"}}>violet circle</span> in map
                                and <span style={{color:"red", fontWeight: "bold"}}>red font </span> 
                                inside the tooltip indicate that sensor value has <span style={{fontWeight: "bold"}}>exceeded</span> threshold or safe value range.
                            </Label>
                            <Label>
                                <span style={{color:"red", fontWeight: "bold"}}>Red circle</span> : Starting location ||
                                <span style={{color:"blue", fontWeight: "bold"}}> Blue circle </span> : Last location ||
                                <span style={{color:"lime", fontWeight: "bold"}}> Lime/Green circle </span> : traversed locations 
                            </Label>
                            <Label for="tripSelect">Boat {this.props.selectedBID}, current selected trip ID: {this.state.selectedTripID?this.state.selectedTripID:firstOpt}</Label>
                        </Card>
                        <br/>
                        <Input type="select" name="select" id="tripIDSelect" onChange={this.setSelectedTripID}>
                            {tripIDList}
                        </Input>
                        <Map className="map" center={pos} maxZoom={20} zoom={18}>
                            <TileLayer
                            maxZoom={20}
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {infectedCircle}
                            {circles}
                            <Polyline positions={line} color="black"/>
                        </Map>
                    </div>
                }
            </div>
        );
    }
}

export default DataView;