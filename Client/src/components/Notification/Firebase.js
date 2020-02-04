import firebase from 'firebase/app';
import '@firebase/messaging';
import Logo from '../Image/logo.png';

const config = {
    apiKey: "AIzaSyDNz5eT9ET9MniwLiy1jMcipn-u5p6e1lo",
    authDomain: "ecosail-b40e1.firebaseapp.com",
    databaseURL: "https://ecosail-b40e1.firebaseio.com",
    projectId: "ecosail-b40e1",
    storageBucket: "ecosail-b40e1.appspot.com",
    messagingSenderId: "845694912281",
    appId: "1:845694912281:web:61d26daacf6c7517502788",
    measurementId: "G-LBG7V6CTTP"
};

firebase.initializeApp(config);

let messaging;

// we need to check if messaging is supported by the browser
if(firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// register service worker & handle push events
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        await navigator.serviceWorker.ready.then(/* registration function here*/
            //console.log('service worker ready')
        )
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
        messaging.useServiceWorker(registration);
        messaging.onMessage((payload) => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                icon: Logo,//payload.notification.icon,
                /*actions: [
                    {
                        action: payload.fcmOptions.link,
                        title: 'Book Appointment'
                    }
                ]*/
            };
            registration.showNotification(title, options);           
        });
    });
}

export {
    messaging
};