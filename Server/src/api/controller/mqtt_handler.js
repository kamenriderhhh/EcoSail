const mqtt = require('mqtt');
const db = require('../db');
const config = require('../config/config');
const { sendFcmMessage } = require('../notification/firebase');
const sensorNodes = db.get('sensorNodes');
const { client } = require('../controller/controller');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = config.MQTT[0];
    this.username = config.MQTT[1];
    this.password = config.MQTT[2];
    this.holdForNotification = new Number();
  }
  
  connect() {
    this.holdForNotification = 0;
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password }, config.MQTT[3]);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log("mqtt client connected");
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('sensornodes', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {   
      var str = message.toString();
      str = str.substring(0, str.length).split('#');
      const boatID = str[0];
      const tripID = str[1];
      const latitude = str[2];
      const longitude = str[3];
      const windDirection = str[4];
      const tempValue = str[5];
      const pHValue = str[6];
      const doValue = str[7];
      const ecValue = str[8];
      const turbidity = str[9];
      const sensorData = {
        boatID,
        tripID,
        latitude,
        longitude,
        windDirection,
        tempValue,
        pHValue,
        doValue,
        ecValue,
        turbidity,
        date: new Date()
      };
      console.log("New data insert to database...");
      sensorNodes.insert(sensorData);
      
      // Check is it past the period for the next notification to send
      if(this.holdForNotification == 0){ 
          console.log("Notification setup...");
          var alarmMesg = "ALERT:";
          var alarmData = new Object();
          var sendAlarm = false;
          
          // To get same data but not affect the old data
          Object.assign(alarmData, sensorData);
          delete alarmData.latitude; delete alarmData.longitude; delete alarmData.windDirection;
          //console.log("data:"+ JSON.stringify(alarmData)); 
          // Check if the values exceed threshold then send notification  
          if(pHValue<3.5 || pHValue>9.0){ // pH  5.5-9.0
              alarmMesg = alarmMesg.concat(" pH");
              sendAlarm = true;
          } 
          else {
              delete alarmData.pHValue;
          }
          if(ecValue>28){ // EC
              alarmMesg = alarmMesg.concat(" EC");
              sendAlarm = true;
          }
          else {
              delete alarmData.ecValue;
          } 
          if(doValue<4){ // DO
              alarmMesg = alarmMesg.concat(" DO");
              sendAlarm = true;
          }
          else {
              delete alarmData.doValue;
          }
          if(tempValue<15 || tempValue>30){ // Temperature 15 - 26
              alarmMesg = alarmMesg.concat(" Temp");
              sendAlarm = true;
          }
          else {
              delete alarmData.tempValue;
          }
          if(turbidity>2800){ // Turbidity
              alarmMesg = alarmMesg.concat(" Turb");
              sendAlarm = true;
          }
          else {
              delete alarmData.turbidity;
          }
          console.log("send alarm? "+sendAlarm);
          if(sendAlarm){
              console.log("~~ Allowed notification\n");
              alarmData.date=alarmData.date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
              // Send FCM notification
              var res = sendFcmMessage(config.topic, alarmMesg, JSON.stringify(alarmData));
              // Send Stream notification feed
              const ecosail = client.feed('notification', 'Ecosail');
              ecosail.addActivity({
                  actor: 'Ecosail',
                  verb: 'post',
                  object: JSON.stringify(alarmData),
                  foreign_id: 'boatID:'+boatID,
              }).then((err)=>{
                  console.log("~~ Stream feed notification:");
                  console.log(err);
              });
              console.log("~~ Sent notification:\n"+res);
              this.holdForNotification = 60; // 10 seconds per data income, 60 seconds per notification if triggered
          }      
          
      } else {    
          this.holdForNotification = this.holdForNotification - 10 ; // minus 10 seconds means  1 min per notification
          Number.isNaN(this.holdForNotification)?this.holdForNotification=0:"";
          console.log("NaN? "+Number.isNaN(this.holdForNotification));
          console.log("~~ Delayed for notification: "+this.holdForNotification);
      }
     
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }
  
  post() {
    console.log('mqtt post ok');
    /*// mqtt subscriptions
    this.mqttClient.subscribe('destination', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      var str = message.toString();
    });*/
  }

}

module.exports = MqttHandler;