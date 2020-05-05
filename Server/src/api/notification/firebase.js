const config = require('../config/config.js');
const admin = require('firebase-admin');
const serviceAccount = require(config.servacc);
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
    
    // Send notification via Token
    
    const webpush = {
        'headers': {
            'TTL': '0'
        },
        /*'notification': {
            //'icon': 'config.logo',
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
    //fcmMessage['tokens'] = tokens;
    fcmMessage['webpush'] = webpush;
    //fcmMessage['android'] = android;
    //console.log(fcmMessage);
    return fcmMessage;
}

async function getTokens(){
    //var tokens = [];
    return await Subscription.find({}).then(function(docs){
        var tokens = [];
        docs.forEach(function(doc) {
          tokens.push(doc.token);
        });
        return tokens;
        //console.log("num of docs:"+docs.length);
        //console.log("last doc:\n"+docs[docs.length-1]); can use for historical data
    }).catch(function(err){
        if (err) {
            console.log("Retrieve tokens error: "+err);
            //throw new Error(err.message);
        }
    });
}

async function storeAppInstanceToken(reqToken, res) {
    const subscriptionModel = new Subscription({token: reqToken});
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
        if(await messaging.unsubscribeFromTopic(token, topic)){
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
    const fcmMessage = buildPlatformMessage(topic, title, body);   
    
    /*try {    
        await messaging.send(fcmMessage);{
            console.log("\nSuccessfully sent notification: ", response);
        }
    } catch(err) {
        console.log('\nNotification Error: '+err);
    }*/
    await messaging.send(fcmMessage).then((response)=>{
        console.log("\nSuccessfully sent notification: ", response);
    }).catch((error)=>{
        console.log('\nNotification Error: '+error);
    });
    
    /*getTokens().then((tokens)=>{
        const fcmMessage = buildPlatformMessage(topic, tokens, title, body);   
        messaging.sendMulticast(fcmMessage).then((response)=>{
            console.log("Successfully sent notification: ", response);
        }).catch((error)=>{
            console.log('Notification Error: '+error);
        });
    });*/
}

module.exports = {
    storeAppInstanceToken,
    deleteAppInstanceToken,
    subscribeAppInstanceToTopic,
    unsubscribeAppInstanceFromTopic,
    sendFcmMessage,
}