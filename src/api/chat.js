import axios from "@/utils/axios";

export default {
  // 获取聊天列表
  getChatList() {
    return axios.request("/chat/list");
  },

  // 发起会话
  send(params) {
    return axios.get("/single/send", {
      params
    });
  },

  // 获取单聊消息记录
  getSingleRecord(singleId) {
    return axios.get(`/single/record/${singleId}`);
  },

  // 获取群组消息记录
  getGroupRecord(groupId) {
    return axios.get(`/group/record/${groupId}`);
  },
};
