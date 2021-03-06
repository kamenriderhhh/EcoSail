const express = require('express');
const dataController = require('../controller/dataController');
const controller = require('../controller/controller');
const verifySignUp = require('../controller/verifySignUp');
const authJwt = require('../controller/verifyJwtToken');
const { storeAppInstanceToken, deleteAppInstanceToken, subscribeAppInstanceToTopic, unsubscribeAppInstanceFromTopic } = require('../notification/firebase');

const router = express.Router();

router.post('/auth/signup', verifySignUp.checkDuplicateUserNameOrEmail, controller.signup);
router.post('/auth/signin', controller.signin);
router.post('/authed/data/postDestination', dataController.postDestination);
router.post('/authed/data/getHistoricalData', dataController.getSensorHistData);
router.post('/authed/data/getDestination', dataController.getDestination);
router.post('/authed/data/getSensorNodes', dataController.getSensorNodes);

// Notification functions
router.post('/notification/storetoken', async (req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        await storeAppInstanceToken(req.body.token, res);
    } else {
        res.status(400).send({
            message: "The request token not define!"
        });
    }
});

router.delete('/notification/deletetoken', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        await deleteAppInstanceToken(req.body.token, res);
    } else {
        res.status(400).send({
            message: "The request token not define!"
        });
    }
});

router.post('/notification/subscribe', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await subscribeAppInstanceToTopic(req.body.token, req.body.topic, res);
        //console.log('\nSubscribing: '+result);
    } else {
        res.status(400).send({
            message: "The request token not define!"
        });
    }
});

router.post('/notification/unsubscribe', async(req, res) => {
    if (!req.body) res.sendStatus(400);
    if(req.body.token) {
        result = await unsubscribeAppInstanceFromTopic(req.body.token, req.body.topic, res);
        //console.log('\nUnscuscribing: '+result);
    } else {
        res.status(400).send({
            message: "The request token not define!"
        });
    }
});

//router.get('/authed/user', authJwt.verifyToken, controller.userContent);
//router.get('/authed/admin', authJwt.verifyToken, authJwt.isPmOrAdmin, controller.adminBoard);
router.get('/authed/data/getBoatCount', dataController.getBoatCount);

module.exports = router;