import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from "vue-socket.io";
import "@/utils";

Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: false,
  connection: process.env.VUE_APP_URL
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
