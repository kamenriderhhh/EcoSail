const config = require('../config/config.js');
const admin = require('firebase-admin');
const serviceAccount = require(config.servacc);
const mongoose = require('mongoose');
const Subscription = require('../model/subscribers');

/* initialise app */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


/* initialise firestore and messaging */
const firestore = admin.firestore();
firestore.settings({
    timestampsInSnapshots: true
});
const FIRESTORE_TOKEN_COLLECTION = 'instance_tokens';
const messaging = admin.messaging();


function dbConnect(){
  // Connecting to the Authentication database
  mongoose.Promise = global.Promise; // This is needed for mongoose to globally connected
  mongoose.connect(config.SUBSurl)
    .then(() => {
      console.log("Successfully connected to MongooseDB for Subscriber.");    
      //initial();
    })
    .catch(err => {
        console.log('Could not connect to MongooseDB for Subscriber.');
        process.exit();  
    });
}

function buildCommonMessage(title, body) {
    return {
        'notification': {
            'title': title,
            'body': body
        }
    };
}

function buildPlatformMessage(topic, title, body) {
    const fcmMessage = buildCommonMessage(title, body);
    
    const webpush = {
        'headers': {
            'TTL': '0'
        },
        'notification': {
            'icon': 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.medic.usm.my%2Fradiology%2Findex.php%2Fen%2F&psig=AOvVaw1jyiEM7FCQjdQgcpCXpIn0&ust=1580825193972000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCi8PXGtecCFQAAAAAdAAAAABAD',
        },
        /*
        'fcm_options': {
            'link': 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
        }*/
    };/*
    const android = {
        //'ttl': '86400s', //default 4 weeks, set to 0 if want immediately
        'notification': {
            'icon': config.logo,
        },
    };*/

    fcmMessage['topic'] = topic;
    fcmMessage['webpush'] = webpush;
    //fcmMessage['android'] = android;
    //console.log(fcmMessage);
    return fcmMessage;
}

async function storeAppInstanceToken(reqToken, res) {
    const subscriptionModel = new Subscription({token: reqToken});
    dbConnect();
    var text = "";
    await subscriptionModel.save((err, subscription) => {
        if (err) {
            res.status(500).send({
                message: "Error while storing token in database."
            });
            text = "Error while storing token "+reqToken+" in database, Err: "+err;
        } else {
            res.status(200).send({ 
                message: "Subscription saved." 
            });
            text = "Subscription saved: "+subscription;
        }
        console.log("\nStore token: "+text);
    });
}

async function deleteAppInstanceToken(reqToken, res) {
    dbConnect();
    // Search the request token from database
    var text = "";
    await Subscription.findOneAndDelete({ token: reqToken }).exec((err, subscription) => {
        if (err){
            if(err.kind === 'ObjectId' || !subscription) {
                res.status(404).send({
                    message: "Error subscriber's token not found!"
                });
                text = "Error subscriber's token "+reqToken+" not found!"                
            }
            res.status(500).send({
                message: "Error while deleting token in database."
            });
            text = "Error while deleting token"+reqToken+" in database, Err: "+err;
        } else {
            console.log();
            res.status(200).send({ 
                message: "Subscription deleted." 
            });
            text = "Subscription deleted"+subscription;
        }
        console.log("Delete token: "+text);
    });
}

async function subscribeAppInstanceToTopic(token, topic, res) {
    try {
        if(await messaging.subscribeToTopic(token, topic)){
            res.status(200).send({
                message: "Subscribe notification successfully"
            });
            return "Successfully subscribing token "+token+" to topic "+topic;
        } else {
            res.status(500).send({
                message: "Subscribe notification failed"
            });
            return "Error subscribing token "+token+" to topic.";
        }
    } catch(err) {
        res.status(500).send({
            message: "Subscribe notification failed"
        });
        return "Error subscribing token "+token+" to topic: "+err;
    }
}

async function unsubscribeAppInstanceFromTopic(token, topic, res) {
    try {
        if(await await messaging.unsubscribeFromTopic(token, topic)){
            res.status(200).send({
                message: "Unsubscribe notification successfully"
            });
            return "Successfully unsubscribing token "+token+" to topic "+topic;
        } else {
            res.status(500).send({
                message: "Unsubscribe notification failed"
            });
            return "Error unsubscribing token "+token+" to topic.";
        }
    } catch(err) {
        res.status(500).send({
            message: "Unsubscribe notification failed"
        });
        return "Error unsubscribing token "+token+" to topic: "+err;
    }
}

async function sendFcmMessage(topic, title, body) {
    const fcmMessage = buildPlatformMessage(topic, title, body)   
    await messaging.send(fcmMessage).then((response)=>{
        console.log("Successfully sent notification: ", response);
    }).catch((error)=>{
        console.log('Notification Error: '+error);
    });
}

module.exports = {
    storeAppInstanceToken,
    deleteAppInstanceToken,
    subscribeAppInstanceToTopic,
    unsubscribeAppInstanceFromTopic,
    sendFcmMessage
}