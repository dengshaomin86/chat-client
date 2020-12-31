import axios from "@/utils/axios";

export default {
  // 检查是否在线
  checkOnline() {
    return axios.get("/checkOnline");
  },
  // 图片上传
  uploadImg(data) {
    return axios.post("/uploadImg", data);
  },
  // 文件上传
  uploadFile(data) {
    return axios.post("/uploadFile", data);
  },
};
