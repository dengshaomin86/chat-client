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
      state.activeChat = data;
    },
    [types.GET_CHAT_LIST](state, data) {
      state.chatList = data;
    },
    [types.UPDATE_MSG_LIST](state, data) {
      if (data.length && data[0].chatId === state.activeChat.chatId) state.msgList.push(...data);
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
