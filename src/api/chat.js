import axios from "@/utils/axios";

export default {
  // 获取聊天列表
  getChatList() {
    return axios.request("/chat/list");
  },

  // 新增聊天列表
  addChatList(data) {
    return axios.request("/chat/add", {
      params: data
    });
  },

  // 获取对话列表
  getMsgList(data) {
    return axios.request("/message/list", {
      params: data
    });
  },

  // 获取群组消息记录
  getGroupRecord(groupId) {
    return axios.get(`/group/record/${groupId}`);
  },
};
