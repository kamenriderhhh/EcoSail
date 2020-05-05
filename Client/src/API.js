//const API_URL = process.env.REACT_APP_WEBHOST;
const API_URL = window.location.hostname === 'localhost' ? process.env.REACT_APP_LOCALHOST : process.env.REACT_APP_WEBHOST;
const getSensorNodes = API_URL + '/authed/data/getSensorNodes'
const getDest = API_URL + '/authed/data/getDestination'
const postDest = API_URL + '/authed/data/postDestination'
const getHistoricalData = API_URL + '/authed/data/getHistoricalData'
const postSignup = API_URL + '/auth/signup'
const postSignin = API_URL + '/auth/signin'
//const postAuthentication = API_URL + '/authed/user'
const getBoats = API_URL + '/authed/data/getBoatCount'

// Get boat destination from database
export function getBoatCount() {
  //Fetching the sailboat latest destination
  return fetch(getBoats).then(res => res.json()).then(
    boatCount => { return boatCount; }
  );
}

// Get boat destination from database
export function getDestination(option) {
  //Fetching the sailboat latest destination
  return fetch(getDest, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json()).then(destination => {
      //console.log("! "+destination[destination.length-1].latitude)
      return destination;
    });
}

// Get boat sensors information from database
export function getSensorData(option) {
  return fetch(getSensorNodes, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json()).then(sensorData => {
      return sensorData;
    });
}

// Post options to get boat sensors information from database
export function getSensorHistData(HistDataOptions) {
    return fetch(getHistoricalData, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(HistDataOptions)
    }).then(res => res.json()).then(HistData => {
        return HistData;
    });
}

// Post the destination set by user
export function sendLocation(location) {
  return fetch(postDest, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(location)
  }).then(res => res.json());
}

// Post the Signup request
export function sendSignup(sgnup) {
    return fetch(postSignup, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(sgnup)
    }).then(res => res.json());
}

// Post the Signin request
export function sendSignin(sgnin) {
    return fetch(postSignin, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(sgnin)
    }).then(res => res.json());
}

export const secret = process.env.REACT_APP_SECRET;
export const notificationSubscription = API_URL + '/notification'