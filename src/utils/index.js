import Vue from "vue";
import Axios from "axios";
import { Message } from "element-ui";
import mixins from "./mixins.js";
import directive from "./directive.js";
import axios from "./axios.js";
import avatar from "@/components/common/avatar";

Vue.mixin(mixins);
Vue.use(directive);
Vue.component("avatar", avatar);

// 根据返回数据动态提示
Message.auto = (data) => {
  if (!data || !data.message) return;
  Message[data.flag ? "success" : "error"](data.message);
};

/**
 * 获取配置项
 * @returns
 */
export const getConfig = async () => {
  let baseURL = process.env.VUE_APP_URL;
  // if (process.env.NODE_ENV === "production") {
  const result = await Axios.get(`/web-config/config.json?t=${Date.now()}`, {
    timeout: 5000,
  }).catch(() => {});
  baseURL = (result && result.data && result.data.server) || baseURL;
  axios.defaults.baseURL = baseURL;
  // }
  return { baseURL };
};
