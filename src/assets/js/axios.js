import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";

axios.interceptors.request.use(config => {
  // 设置 content-type 防止 post 请求前发送 options 请求
  if ((config.method).toLowerCase() === "post") config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
}, err => {
  return Promise.reject(err);
});

window.axios = axios;
