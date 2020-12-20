cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "cordova-plugin-screen-orientation.screenorientation",
      "file": "plugins/cordova-plugin-screen-orientation/www/screenorientation.js",
      "pluginId": "cordova-plugin-screen-orientation",
      "clobbers": [
        "cordova.plugins.screenorientation"
      ]
    },
    {
      "id": "onesignal-cordova-plugin.OneSignal",
      "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
      "pluginId": "onesignal-cordova-plugin",
      "clobbers": [
        "OneSignal"
      ]
    },
    {
      "id": "com.razorpay.cordova.RazorpayCheckout",
      "file": "plugins/com.razorpay.cordova/www/RazorpayCheckout.js",
      "pluginId": "com.razorpay.cordova",
      "clobbers": [
        "RazorpayCheckout"
      ]
    },
    {
      "id": "com.santinowu.cordova.imagedownloader.imagedownloader",
      "file": "plugins/com.santinowu.cordova.imagedownloader/www/imagedownloader.js",
      "pluginId": "com.santinowu.cordova.imagedownloader",
      "clobbers": [
        "imagedownloader"
      ]
    }
  ];
  module.exports.metadata = {
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-screen-orientation": "3.0.2",
    "cordova-plugin-whitelist": "1.3.4",
    "onesignal-cordova-plugin": "2.8.2",
    "com.razorpay.cordova": "0.16.1",
    "com.santinowu.cordova.imagedownloader": "1.0.3"
  };
});