import axios from "@/utils/axios";

export default {
  // 获取好友列表
  getFriendList(data) {
    return axios.request("/friend/list", {
      params: data
    });
  },
};
