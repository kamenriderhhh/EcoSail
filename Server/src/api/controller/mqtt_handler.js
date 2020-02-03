const mqtt = require('mqtt');
const db = require('../db');
const config = require('../config/config');
const { sendFcmMessage } = require('../notification/firebase');
const sensorNodes = db.get('sensorNodes');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = config.MQTT[0];
    this.username = config.MQTT[1];
    this.password = config.MQTT[2];
  }
  
  connect() {
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
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('sensornodes', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      var str = message.toString();
      str = str.substring(0, str.length).split('#');
      const boatID = str[0];
      const latitude = str[1];
      const longitude = str[2];
      const tempValue = str[3];
      const pHValue = str[4];
      const doValue = str[5];
      const ecValue = str[6];
      const turbidity = str[7];
      const sensorData = {
        boatID,
        latitude,
        longitude,
        tempValue,
        pHValue,
        doValue,
        ecValue,
        turbidity,
        date: new Date()
      };
      //console.log(boatLocation);
      sensorNodes.insert(sensorData);
      
      // Check if the values exceed threshold then send notification
      if(str[4]<6.5 || str[4]>9.0){ // 6.5<= pH <=9.0
          sendFcmMessage(config.topic, 'This location is infected(pH out of range)', str);
      } else if(str[6]>=30){
          sendFcmMessage(config.topic, 'This location is infected(EC exceeded 30mg/L)', str);
      }
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

}

module.exports = MqttHandler;