const config = require('../config/config');
const Role = require('../model/role');
const User = require('../model/user');
const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var CryptoJS = require("crypto-js");
 
exports.signup = (req, res) => {
  
    //verifySignUp.checkDuplicateUserNameOrEmail(req, res, next());
    //verifySignUp.checkRolesExisted();
    
    // Save User to Database
    console.log("Processing func -> SignUp");
    
    const user = new User({
        //name: req.body.name,
        //username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(
          CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8),
          bcrypt.genSaltSync(config.saltRounds)
        )
        /*bcrypt.hash(req.body.password, config.saltRounds).then(function(hash){
            password: hash;
        });*/
    });
  
    // Save a User to the MongoDB
    user.save().then(savedUser => {
    /*Role.find({
        'name': { $in: req.body.roles.map(role => role.toUpperCase()) }
    }, (err, roles) => {
      if(err) 
        res.status(500).send("Error -> " + err);
 
      // update User with Roles
      savedUser.roles = roles.map(role => role._id);
      savedUser.save(function (err) {
        if (err) 
          res.status(500).send("Error -> " + err);
 
        res.send("User registered successfully!");
      });
    });*/

    savedUser.save(function (err) {
      if (err) 
        res.status(500).send({message: "Error -> " + err});

      res.send({message: "User registered successfully!"});
    });
    }).catch(err => {
        res.status(500).send({message: "Fail! Error -> " + err});
    });
}
 
exports.signin = (req, res) => {
  console.log("Sign-In");
  // Check whether the user exist in DB
  User.findOne({ email: req.body.email })
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId' || !user) {
        return res.status(404).send({
          message: "Email not found = " + req.body.email
        });                
      }
      return res.status(500).send({
        message: "Error retrieving email = " + req.body.email
      });
    }

    // Check is the password tally or not
    /*bcrypt.compare(req.body.password, user.password).then(function(err, res) {
      if (err) {
        // Failed to login due to invalid password
        return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
      }
    });*/
    var passwordIsValid = bcrypt.compareSync(
      CryptoJS.AES.decrypt(req.body.password, config.secret).toString(CryptoJS.enc.Utf8), 
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }      
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, accessToken: token });
  });
}
 
exports.userContent = (req, res) => {
  authJwt.verifyToken;
  
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
}
/* 
exports.adminBoard = (req, res) => {

  authJwt.verifyToken;
  authJwt.isAdmin;

  User.findOne({ _id: req.userId })
  .select('-_id -__v -password')
  .populate('roles', '-_id -__v')
  .exec((err, user) => {
    if (err){
      if(err.kind === 'ObjectId') {
        res.status(404).send({
          message: "User not found with _id = " + req.userId
        });                
        return;
      }
 
      res.status(500).json({
        "description": "Can not access Admin Board",
        "error": err
      });
 
      return;
    }
          
    res.status(200).json({
      "description": "Admin Board",
      "user": user
    });
  });
}*/
