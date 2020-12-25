import axios from "@/utils/axios";

export default {
  // 获取好友列表
  list() {
    return axios.get("/friend/list");
  },
  // 获取好友请求列表
  requestList() {
    return axios.get("/friend/requestList");
  },
  // 添加好友
  add(data) {
    return axios.post("/friend/add", {
      toUserId: "", // * 目标id
      toUsername: "", // * 目标用户名
      msg: "", // * 留言
      ...data
    });
  },
  // 同意好友请求
  agree(data) {
    return axios.post("/friend/agree", {
      toUserId: "", // * 目标id
      toUsername: "", // * 目标用户名
      ...data
    });
  },
  // 拒绝好友请求
  refuse(data) {
    return axios.post("/friend/refuse", {
      toUserId: "", // * 目标id
      toUsername: "", // * 目标用户名
      ...data
    });
  },
  // 删除好友
  remove(id) {
    return axios.delete(`/friend/remove/${id}`);
  },
};
