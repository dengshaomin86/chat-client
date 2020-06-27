import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types.js";
import api from "@/assets/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeChat: {},
    chatList: [],
    msgList: []
  },
  mutations: {
    [types.CHANGE_ACTIVE_CHAT](state, data) {
      data.tips = false;
      state.activeChat = data;
    },
    [types.GET_CHAT_LIST](state, data) {
      state.chatList = data;
    },
    [types.ADD_CHAT_LIST](state, data) {
      state.chatList.unshift(data);
      state.activeChat = data;
    },
    [types.UPDATE_MSG_LIST](state, data) {
      if (!data.length) return;
      if (data[0].chatId === state.activeChat.chatId) {
        // 如果是当前对话则更新上去
        state.msgList.push(...data);
      }

      // 查看是否存在聊天列表
      const chatObjIndex = state.chatList.findIndex(item => item.chatId === data[0].chatId);
      const lastMsg = data[data.length - 1];
      lastMsg.tips = data[0].chatId !== state.activeChat.chatId;
      lastMsg.name = lastMsg.fromUsername === sessionStorage.getItem("username") ? lastMsg.toUsername : lastMsg.fromUsername;
      if (lastMsg.chatType === "2") lastMsg.name = "默认群聊";
      if (chatObjIndex !== -1) {
        // 更新最新消息，红点显示
        state.chatList.splice(chatObjIndex, 1, lastMsg);
      } else {
        // 创建一条记录
        state.chatList.unshift(lastMsg);
      }
    },
    [types.CLEAR_MSG_LIST](state) {
      state.msgList = [];
    }
  },
  actions: {
    [types.CHANGE_ACTIVE_CHAT]({ commit }, data) {
      commit(types.CHANGE_ACTIVE_CHAT, data);
    },
    [types.GET_CHAT_LIST]({ commit }) {
      api.getChatList().then(res => {
        commit(types.GET_CHAT_LIST, res.data.list);
      }).catch(err => {
        console.log(err);
      });
    },
    [types.ADD_CHAT_LIST]({ commit }, data) {
      commit(types.ADD_CHAT_LIST, data);
    },
    [types.UPDATE_MSG_LIST]({ commit }, data) {
      commit(types.UPDATE_MSG_LIST, data);
    },
    [types.CLEAR_MSG_LIST]({ commit }) {
      commit(types.CLEAR_MSG_LIST);
    }
  },
  modules: {
  }
});
