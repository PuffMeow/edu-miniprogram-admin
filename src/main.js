import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from './store'
import http from './service/http'

Vue.config.productionTip = false;
Vue.prototype.$axios = http

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
