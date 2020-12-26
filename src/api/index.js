import axios from "@/utils/axios";

export default {
  // 图片上传
  uploadImg(data) {
    return axios.post("/uploadImg", data);
  }
};
