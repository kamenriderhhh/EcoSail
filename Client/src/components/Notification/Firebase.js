import firebase from 'firebase/app';
import '@firebase/messaging';

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
        await navigator.serviceWorker.ready.then(// registration function here
            console.log('service worker ready')
        )
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
        messaging.useServiceWorker(registration);
        messaging.onMessage((payload) => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                //icon: payload.notification.icon,
                /*actions: [
                    {
                        action: payload.fcmOptions.link,
                        title: 'More information'
                    }
                ]*/
            };
            //console.log("Service-worker:\n"+payload.notification);
            registration.showNotification(title, options);           
        });
    });
    /*
    window.addEventListener('activate', function(e) {
        window.registration.unregister()
        .then(function() {
            return window.clients.matchAll();
        })
        .then(function(clients) {
            clients.forEach(client => {
                if (client.url && "navigate" in client)
                    client.navigate(client.url)
                })
        });
    });
    */
    /*navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister()
        }
    }).catch(function(err) {
        console.log('Service Worker registration failed: ', err);
    });*/
}

export {
    messaging
};