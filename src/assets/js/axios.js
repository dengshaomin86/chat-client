import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "http://139.9.50.13:3000" : "http://127.0.0.1:3000";

axios.interceptors.request.use(config => {
  // 设置 content-type 防止 post 请求前发送 options 请求
  if ((config.method).toLowerCase() === "post") config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
}, err => {
  return Promise.reject(err);
});

window.axios = axios;
