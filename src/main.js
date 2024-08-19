import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from "vue-socket.io";
import { getConfig } from "@/utils";

Vue.use(ElementUI);
Vue.config.productionTip = false;

getConfig()
  .then(({ baseURL }) => {
    Vue.use(
      new VueSocketIO({
        debug: false,
        connection: baseURL,
      })
    );

    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  })
  .catch(() => {});
