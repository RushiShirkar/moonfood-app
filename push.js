document.addEventListener('deviceready', function () {
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  
  var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  window.plugins.OneSignal
    .startInit("417de560-2a88-4db0-a8a9-9c41ce181bdc")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
}, false);