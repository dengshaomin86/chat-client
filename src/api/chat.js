import axios from "@/utils/axios";

export default {
  // 获取聊天列表
  getChatList() {
    return axios.request("/chat/getChatList");
  },

  // 新增聊天列表
  addChatList(data) {
    return axios.request("/chat/addChatList", {
      params: data
    });
  },

  // 获取对话列表
  getMsgList(data) {
    return axios.request("/chat/getMsgList", {
      params: data
    });
  },
};
