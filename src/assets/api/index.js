import axios from "@/assets/js/axios";

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

  // 获取联系人列表
  getContactList(data) {
    return axios.request("/chat/getContactList", {
      params: data
    });
  }
};
