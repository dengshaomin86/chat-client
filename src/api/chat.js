import axios from "@/utils/axios";

export default {
  // 获取聊天列表
  getChatList() {
    return axios.get("/chat/list");
  },

  // 删除会话
  chatRemove(chatId) {
    return axios.delete(`/chat/remove/${chatId}`);
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

  // 获取群聊消息记录
  getGroupRecord(groupId) {
    return axios.get(`/group/record/${groupId}`);
  },

  // 创建群聊
  createGroup(data) {
    return axios.post("/group/create", data);
  },

  // 创建群聊
  groupInfo(groupId) {
    return axios.get(`/group/info/${groupId}`);
  },

  // 修改群聊信息
  groupUpdate(data) {
    return axios.patch("/group/update", data);
  },

  // 移出群成员
  groupRemove(data) {
    return axios.patch("/group/remove", data);
  },

  // 添加群成员
  groupAppend(data) {
    return axios.patch("/group/append", data);
  },

  // 退出群聊
  groupQuit(data) {
    return axios.patch("/group/quit", data);
  },

  // 解散群聊
  groupDisband(groupId) {
    return axios.delete(`/group/disband/${groupId}`);
  },
};
