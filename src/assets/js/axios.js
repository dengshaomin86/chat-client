import axios from "axios";
import { Message } from "element-ui";

const $axios = axios.create({
  // baseURL: process.env.NODE_ENV === "production" ? "http://139.9.50.13:3000" : "http://127.0.0.1:3000",
  baseURL: "http://127.0.0.1:3000",
  // baseURL: "http://139.9.50.13:3000",
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
