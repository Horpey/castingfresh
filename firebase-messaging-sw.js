importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "603714482854"

 
});
const messaging = firebase.messaging();

console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
    console.log(JSON.stringify(data) );
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon ,
    image: data.icon,
    requireInteraction: true

 
  //   "actions": [
  //   { "action": "yes", "title": "Yes" },
  //   { "action": "no", "title": "No"}
  // ]


  });
});