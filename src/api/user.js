import axios from "@/utils/axios";

export default {
  /**
   * 登录
   * @param data
   * - username:用户名
   * - password:密码
   * @returns {*}
   */
  signIn(data) {
    return axios.post("/user/signIn", data);
  },
  /**
   * 注册
   * @param data
   * - username:用户名
   * - password:密码
   * - cfPassword:确认密码
   * @returns {*}
   */
  signUp(data) {
    return axios.post("/user/signUp", data);
  },
  // 退出登录
  signOut() {
    return axios.get("/user/signOut");
  },
  // 获取用户信息
  getInfo(id) {
    return axios.get(`/user/info/${id}`);
  },
  // 更改用户信息
  update(data) {
    return axios.post("/user/update", data);
  }
};
