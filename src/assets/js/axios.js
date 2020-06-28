import axios from "axios";
import { Message } from "element-ui";
import serve from "@/assets/js/serve";

const $axios = axios.create({
  baseURL: serve,
  withCredentials: true,
  timeout: 10000,
  headers: {}
});

$axios.interceptors.request.use(config => {
  // 设置 content-type 防止 post 请求前发送 options 请求
  // if ((config.method).toLowerCase() === "post") config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
}, err => {
  return Promise.reject(err);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  console.dir(error);
  Message.error(error.message);
  // 对响应错误做点什么
  return Promise.reject(error);
});

window.axios = $axios;
export default $axios;
