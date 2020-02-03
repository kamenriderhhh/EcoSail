importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
//importScripts('https://www.gstatic.com/firebasejs/7.5.2/firebase-app.js');
//importScripts('https://www.gstatic.com/firebasejs/7.5.2/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyDNz5eT9ET9MniwLiy1jMcipn-u5p6e1lo",
    authDomain: "ecosail-b40e1.firebaseapp.com",
    databaseURL: "https://ecosail-b40e1.firebaseio.com",
    projectId: "ecosail-b40e1",
    storageBucket: "ecosail-b40e1.appspot.com",
    messagingSenderId: "845694912281",
    appId: "1:845694912281:web:61d26daacf6c7517502788",
    measurementId: "G-LBG7V6CTTP"
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', (event) => {
    if (event.action) {
        clients.openWindow(event.action);
    }
    event.notification.close();
}); 