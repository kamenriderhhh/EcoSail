import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel, Row, Col} from "react-bootstrap";
import { Snackbar } from '@material-ui/core';
import { sendSignup, sendSignin, secret } from '../../API';
import CryptoJS from "crypto-js";
import "./Login.css";

// For notification
import Notification from "../Notification/Notification";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLogin, setLoadingLogin] = useState(false);
  const [isLoadingSignup, setLoadingSignup] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function validateForm() {
    return email.length > 2 && password.length > 5;
  }

  function displayMessage(message) {
    setSnackbar(true);
    setSnackbarMessage(message);
  }

  function simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  useEffect(() => {
    if (isLoadingLogin) {
      simulateNetworkRequest().then(() => {
        setLoadingLogin(false);
      });
    }
    if (isLoadingSignup) {
      simulateNetworkRequest().then(() => {
        setLoadingSignup(false);
      });
    }
  }, [isLoadingLogin, isLoadingSignup]);

  // Login function
  const handleLoginClick = () => {
    setLoadingLogin(true);
    console.log(typeof(process.env.REACT_APP_TR));
    const sgnin = {
      email: document.getElementById("email").value, 
      password: CryptoJS.AES.encrypt(document.getElementById("password").value, secret).toString()
    };
    // Post the signin request
    sendSignin(sgnin).then((result) => {     
      if(result.message){
        // Email not found!
        displayMessage(<span>Email not found</span>);
      }
      else if(result.accessToken == null){
        // Invalid password!
        displayMessage(<span>Invalid password</span>);
        //console.log("Invalid password!");
      }
      else{
        // Login successful
        displayMessage(<span>Successfully login</span>);
        //console.log("Successfully login!");
        props.setToken(result.accessToken);
        props.userLogin();
      }
      setTimeout(() => {setLoadingLogin(false);}, 4000);
      setPassword("");
    });
  };

  // Signup function
  const handleSignupClick = () => {
    setLoadingSignup(true);
    const sgnup = {
      email: document.getElementById("email").value, 
      password: CryptoJS.AES.encrypt(document.getElementById("password").value, secret).toString()
    };
    // Post the signup request
    sendSignup(sgnup).then((result) => {
      //console.log(result.message);
      if(result.message === "Email is already in use!"){
        // Email already registered
        displayMessage(<span>The email is already in use</span>);
        //console.log("The email is already in use!");
      }
      else if(result.message === "User registered successfully!"){
        // Email registered successfully
        displayMessage(<span>User registered successfully</span>);
        //console.log("User registered successfully!");
      }
      else{
        // Errors
        displayMessage(<span>Error occurs</span>);
        //console.log("Error occurs!");
      }
      setTimeout(() => {setLoadingSignup(false);}, 5000);
      setPassword("");
    });
  };

  return (
    <div className="Login">
      <form>
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            controlid="email"
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            controlid="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Row>
          <Col>
            <Button id="loginBtn" block bssize="large" disabled={!validateForm() || isLoadingLogin || isLoadingSignup} type="submit" onClick={!isLoadingLogin ? handleLoginClick : null}>
              {isLoadingLogin ? 'Loading…' : 'Login'}
            </Button>
          </Col>
          <Col>
            <Button id="signupBtn" block bssize="large" disabled={!validateForm() || isLoadingLogin || isLoadingSignup} type="submit" onClick={!isLoadingSignup ? handleSignupClick : null}>
              {isLoadingSignup ? 'Loading…' : 'Signup'}
            </Button>
          </Col>
        </Row>
      </form>
      <Notification/>
      <Snackbar 
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        open={snackbar}
        autoHideDuration={2000}
        onClose={() => {setSnackbar(false); setSnackbarMessage("");}}
        message={snackbarMessage}
      />
    </div>
  );
}