import axios from "@/utils/axios";

export default {
  // 获取用户信息
  getInfo(id) {
    return axios.get(`/user/info/${id}`);
  },
  // 更改用户信息
  update(data) {
    return axios.post("/user/update", data);
  }
};
