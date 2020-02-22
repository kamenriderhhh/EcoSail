require('dotenv').config(); // environment variable 

module.exports = {
  'secret': process.env.AUTHSECRET,
  saltRounds : parseInt(process.env.SALTROUNDS, 10),
  port : parseInt(process.env.PORT, 10),
  DBurl: process.env.AUTHDB,
  LOCurl: process.env.SENSORSDB,
  //ROLEs: ['USER', 'ADMIN'],
  ROLEs: ['USER'],
  MQTT: [
    host = process.env.MQTTHOST,
    username = process.env.MQTTUSER, // mqtt credentials if these are needed to connect
    password = process.env.MQTTPASSWD,
    port = parseInt(process.env.MQTTPORT)
  ],
  // HTTPS
  Cert: process.env.CERT,
  Key: process.env.KEY,
  // Notification web push
  servacc: process.env.SRVACC,
  SUBSurl: process.env.SUBSDB,
  topic: process.env.TOPIC,
  // Logo
  logo: process.env.LOGO,
  //notification feed with stream
  streamKey: process.env.STREAMKEY,
  streamSec: process.env.STREAMSECRET,
};