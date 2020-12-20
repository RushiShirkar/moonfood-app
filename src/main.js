// Import Vue
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import StarRating from 'vue-star-rating';
// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';
import routes from './router/index.js'

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import App Component
import App from './app.vue';
Vue.use(VueAxios, axios)
Vue.component('star-rating', StarRating);
// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      },
  // Register App Component
  components: {
    app: App
  }
});
