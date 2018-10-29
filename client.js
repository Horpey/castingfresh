const publicVapidKey =
  "BBK56NtjCvNIWAOokt62fJvTKFGutvd62fIS02PDwgUtGcmyfrs3QmCvaNqr0z-Y7UOjYxoH4-9rJw5YBkH4Oos";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register Service Worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  
  await navigator.serviceWorker.ready;  // <---------- WAIT 
  
  console.log("Service Worker Registered...");

  // Register Push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered...");

  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
      console.log("success");
    });

  // let token = JSON.parse(subscription) ;
  let endpoint = subscription.endpoint;
  // let keys = subscription.keys;
  
   let me = (JSON.stringify(subscription) );

   let ko = JSON.parse(me);

 

   let public_key = ko.keys.p256dh ;
   let auth = ko.keys.auth  ;

  
  
  let id = 12 ;
  let form = new FormData();

    form.append('user_id', id);
    form.append('auth', auth);
    form.append('public_key', public_key);
    form.append('endpoint', endpoint);
    

   axios.post( 'http://api.cast.i.ng/push/addtoken' , form ).then(result => {
        console.log(result.data)

        console.log(form);

       }, error => {
        console.error(error);
    });

console.log(JSON.stringify(subscription));

  


  // Send Push Notification 
  console.log("Sending Push...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
