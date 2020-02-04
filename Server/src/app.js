const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mqttHandler = require('./api/controller/mqtt_handler');
const bodyParser = require('body-parser');
const config = require('./api/config/config.js');
const router = require('./api/router/router.js');
const Role = require('./api/model/role.js');
const mongoose = require('mongoose');

// App configuration
const middlewares = require('./api/middlewares');
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', router);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// End here

// For HTTPS
//app.use(express.static(__dirname, { dotfiles: 'allow' } ));
const https = require('https');
const fs = require('fs');
const options = {
    key: fs.readFileSync(config.Key),
    cert: fs.readFileSync(config.Cert)
}
// End here

// MQTT Client Initialize the connection
const mqttClient = new mqttHandler();
mqttClient.connect();
// End here

// Connecting to the Authentication database
mongoose.Promise = global.Promise; // This is needed for mongoose to globally connected
mongoose.connect(config.DBurl)
  .then(() => {
    console.log("Successfully connected to EcoSail MongooseDB.");    
    //initial();
  })
  .catch(err => {
      console.log('Could not connect to EcoSail MongooseDB.');
      process.exit();  
  });
// End here

// Create a Server
/*const server = app.listen(config.port, function () {
  //var host = server.address().address
  //var port = server.address().port
  console.log("App listening at http://localhost:%s", config.port)
})*/
https.createServer(options, app).listen(config.port, ()=>{
  console.log("App listening at https://localhost:%s", config.port)
});


//const {sendFcmMessage}= require('./api/notification/firebase');
//sendFcmMessage(config.topic, "Alohaas5", "could it be5");
//setTimeout(()=>{sendFcmMessage(config.topic, "Ecosail", "New");}, 3000);

/*
function initial(){
  Role.count( (err, count) => {
    if(!err && count === 0) {
      // ADMIN Role ->
      new Role({
        name: 'ADMIN'
      }).save( err => {
        if(err) return console.error(err.stack)
        console.log("ADMIN_ROLE is added")
      });
    }
  });
}*/