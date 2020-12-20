export default [
  {
    path: '/',
    async(routeTo, routeFrom, resolve, reject) {
      if (localStorage.getItem('loginmobile')!=null && localStorage.getItem('token')!=null) {
        const vueComponent = () => import('../components/home.vue');
        // resolve promise
        var a = false;
        localStorage.setItem("loginOpen",a);
        vueComponent().then((vc) => {
          // resolve with component
          resolve({ component: vc.default })
        });
      }
      else
      {
        const vueComponent = () => import('../components/login.vue');
        // resolve promise
        var a = true;
        localStorage.setItem("loginOpen",a);
        vueComponent().then((vc) => {
          // resolve with component
          resolve({ component: vc.default })
        });
      }
    }
  },
  {
    path: '/login',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/login.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/home',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/home.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/cart',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/cart.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/coupon',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/coupon.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/menus',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/menus.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/notification',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/notification.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/account',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/account.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/payment',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/payment.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/address',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/address.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/orders',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/orders.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
  {
    path: '/select_address',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/select_address.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  },
   {
    path: '/reward_coupons',
    async(routeTo, routeFrom, resolve, reject) {
      // dynamic import component; returns promise
      const vueComponent = () => import('../components/reward.vue');
      // resolve promise
      vueComponent().then((vc) => {
        // resolve with component
        resolve({ component: vc.default })
      });
    }
  }
];
