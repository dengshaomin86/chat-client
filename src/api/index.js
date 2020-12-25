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

  // 添加联系人
  addContactFriend(data) {
    return axios.request("/chat/addContactFriend", {
      params: data
    });
  },

  // 获取好友请求列表
  getAddReqList(data) {
    return axios.request("/chat/getAddReqList", {
      params: data
    });
  },

  // 同意好友请求
  agreeAddFriendReq(data) {
    return axios.request("/chat/agreeAddFriendReq", {
      params: data
    });
  },

  // 拒绝好友请求
  refuseAddFriendReq(data) {
    return axios.request("/chat/refuseAddFriendReq", {
      params: data
    });
  },

  // 搜索用户
  searchUser(data) {
    return axios.request("/chat/searchUser", {
      params: data
    });
  },

  // 图片上传
  uploadImg(data) {
    return axios.post("/uploadImg", data);
  }
};
