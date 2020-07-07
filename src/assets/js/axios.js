import axios from "axios";
import { Message } from "element-ui";
import serve from "@/assets/js/serve";
import router from "@/router";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const $axios = axios.create({
  baseURL: serve,
  withCredentials: true,
  timeout: 10000,
  headers: {}
});

$axios.interceptors.request.use(config => {
  // 设置 content-type 防止 post 请求前发送 options 请求
  // if ((config.method).toLowerCase() === "post") config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  config.cancelToken = source.token; // 全局添加cancelToken
  return config;
}, err => {
  return Promise.reject(err);
});

// 添加响应拦截器
$axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.flag === false && response.data.auth === false) {
    source.cancel(); // 取消其他正在进行的请求
    Message.error(response.data.message);
    router.push("/login");
    sessionStorage.removeItem("username");
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  console.dir(error);
  if (error.message) Message.error(error.message);
  // if (axios.isCancel(error)) return new Promise(() => {}); // 取消请求的情况下，终端Promise调用链
  // 对响应错误做点什么
  return Promise.reject(error);
});

window.axios = $axios;
export default $axios;
