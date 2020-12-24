import axios from "@/utils/axios";

export default {
  // 获取用户信息
  getInfo(data) {
    return axios.post("/user/getInfo", data);
  },
  // 更改用户信息
  update(data) {
    return axios.post("/user/update", data);
  }
};
