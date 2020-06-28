import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/js/utils.js";
import "@/assets/js/axios.js";
import "@/assets/iconfont/iconfont.css";
import VueSocketIO from "vue-socket.io";
import serve from "@/assets/js/serve";

Vue.use(ElementUI);
Vue.use(new VueSocketIO({
  debug: false,
  connection: serve
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
