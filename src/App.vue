<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>
  </f7-app>
</template>

<script>
// Import Routes
import routes from './router/index.js';
//import F7Block from "framework7-vue/src/components/block";
export default {
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes
      }
    }
  },
  props:['flag'],
  /*components: {
    F7Block
  },*/
  created() {
    console.log('flag : ' + this.flag);
    document.addEventListener('backbutton', this.handleBackButton);
  },
  methods:{
    handleBackButton() {
      // If we have a back button, we want it to go back
      const app1 = this.$f7;
      const flag = localStorage.getItem("sheetOpen");
      const check = localStorage.getItem("loginOpen");
      if(flag=='true')
      {
        localStorage.setItem("sheetOpen",'false');
        return app1.sheet.close();
      }
      else if(app1.views.main.router.history.length > 1 && check=='false') 
      {
        return app1.views.main.router.back();
      }
      else
      {
        return window.navigator.app.exitApp();
      }
    }
  }
}
</script>
