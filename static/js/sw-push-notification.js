console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
    console.log(JSON.stringify(data) );
  console.log("Push Recieved...");

  self.registration.showNotification(data.title, {
    body: data.body
    // icon: data.icon ,
    // action: "index.html", //data.url


  });
});



//setTimeout(n.close(), 1 * 1000)
//n.close()
//const n = new Notification('Hey')