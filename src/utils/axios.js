import axios from "axios";
import {Message} from "element-ui";
import router from "@/router";
import CancelToken from "@/utils/axiosCancelToken";

const $axios = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Cache-Control": "no-cache" // 禁止请求缓存
  }
});

// 添加请求拦截器
$axios.interceptors.request.use(config => {
  config.cancelToken = CancelToken.set();
  return config;
}, err => {
  return Promise.reject(err);
});

// 添加响应拦截器
$axios.interceptors.response.use((response) => {
  // 对响应数据做点什么
  if (response.data.flag === false && response.data.auth === false) {
    CancelToken.cancel(); // 取消其他正在进行的请求
    Message.error(response.data.message);
    router.push("/login");
    return Promise.reject(response);
  }
  CancelToken.remove(response); // 删除请求成功的 cancelToken
  return response;
}, (error) => {
  // 对响应错误做点什么
  console.dir(error);
  if (error.message) Message.error(error.message);
  return Promise.reject(error);
});

window.axios = $axios;
export default $axios;
