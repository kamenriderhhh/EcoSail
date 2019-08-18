const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'http://52.221.214.117:5000';
const getCurLoc = API_URL + '/authed/data/getCurLocation'
const getDest = API_URL + '/authed/data/getDestination'
const postDest = API_URL + '/authed/data/postDestination'

// Get boat destination from database
export function getDestination() {
    //Fetching the sailboat latest destination
    return fetch(getDest)
        .then(res => res.json())
        .then(destination => {
            //console.log("! "+destination[destination.length-1].latitude)
            return destination;
        });
}

// Get boat current location from database
export function getCurLocation() {
    return fetch(getCurLoc)
        .then(res => res.json())
        .then(curLocation => {
            return curLocation;
        });
}

// POst the destination set by user
export function sendLocation(location) {
  return fetch(postDest, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(location)
  }).then(res => res.json());
}