const express = require('express');
const Joi = require('joi');

const db = require('../db');
const Destination = db.get('destination');//db.get('destination');
const SensorNodes = db.get('sensorNodes');//db.get('cursensorNodes');

//const mqttClient = require('../../app.js');
// Schema
const locSchema = require('../model/location');
var sensorActive = false;

/*
// Self revoking function to set boat inactive
(function(){
  setInterval(()=>{
    if(sensorActive){
      sensorActive=false;
      console.log("Is sensor active: "+sensorActive);
    }
  }, 15000); 
})()*/

// Get the boat count
exports.getBoatCount = (req, res) => {
  SensorNodes.distinct('boatID').then( 
    boatArray => { 
      res.json(JSON.stringify(boatArray.length));
    }
  );
}

// Get the sensornodes data from the boat
exports.getSensorNodes = (req, res) => {
  SensorNodes.find({
    boatID: JSON.stringify(req.body.boatID)
    }).then(sensorData => {
        var sensorArray = sensorData[sensorData.length-1];
        // Check if the data has passed more than 20 second, if not the sensor is not active
        var dataTime = new Date(JSON.parse(JSON.stringify(sensorArray.date))).getTime();
        var todayTime = new Date().getTime();
        if(((todayTime-dataTime)/1000) > 20) { 
          sensorActive = false; 
        } else {
          sensorActive = true; 
        }
        sensorArray.sensorActive = sensorActive;
        //console.log(sensorArray);
        res.json(sensorArray);
    });
}

// Get the sensornodes historical data from the MongoDB
exports.getSensorHistData = (req, res) => {
  const reqStartDate = new Date(req.body.startDate);
  const reqEndDate = new Date(req.body.endDate);
  SensorNodes.find(
    {
      date: {$gte: reqStartDate, $lte: reqEndDate},
      boatID: JSON.stringify(req.body.boatID)
    }, 
    {
      sort: {date: 1} 
    }).then(sensorData => {
        res.json(sensorData); 
        //console.log(sensorData.length);
        //get min,max,avg value for each sensors
    });
  /*  
  res.status(200).send({ auth: true, accessToken: token });
  return res.status(500).send({
        message: "Error retrieving email = " + req.body.email
  });*/
}

// Get the destination for the boat
exports.getDestination = (req, res) => {
    Destination.find({
      boatID: JSON.stringify(req.body.boatID)
    })
      .then(dest => {
          res.json(dest[dest.length-1]);
      });
}

// Post a new destination for the boat
exports.postDestination = (req, res) => {
    const result = Joi.validate(req.body, locSchema);
    if (result.error === null) {
        const { boatID, latitude, longitude } = req.body;
        const boatLocation = {
          boatID,
          latitude,
          longitude,
          date: new Date()
        };
        Destination
          .insert(boatLocation)
          .then(insertedMessage => {
            res.json(insertedMessage);
            // Update the destination file for linefollowing.txt in node
            //mqttClient.post();
          });
    } else {
        next(result.error);
    }
}
/*
exports.userContent = (req, res) => {
  User.findOne({ _id: req.userId })
  .select('-_id -__v -password')
  .populate('roles', '-_id -__v')
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with _id = " + req.userId
        });                
      }
      return res.status(500).send({
        message: "Error retrieving User with _id = " + req.userId  
      });
    }
          
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  });
}*/