import Vue from "vue";
import { Message } from "element-ui";
import directive from "./directive.js";
import "./axios.js";
import avatar from "@/components/common/avatar";

Vue.use(directive);
Vue.component("avatar", avatar);

// 根据返回数据动态提示
Message.auto = (data) => {
  if (!data || !data.message) return;
  Message[data.flag ? "success" : "error"](data.message);
};
