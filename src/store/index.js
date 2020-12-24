import Vue from "vue";
import Vuex from "vuex";
import qs from "qs";
import types from "./mutation-types.js";
import api from "@/api";
import apiUser from "@/api/user";
import storage from "@/utils/storage";
import {Message} from "element-ui";
import themes from "@/utils/themes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "", // 主题
    activeChat: {},
    chatList: [],
    msgList: [],
    personal: {}, // 本人信息
    userInfoVisible: false,
    userInfo: {}, // 查看用户的信息
  },
  mutations: {
    [types.SET_THEME](state, theme) {
      theme = theme || themes.default;
      const body = document.getElementsByTagName("body")[0];
      body.setAttribute("data-theme", theme);
      storage.local.set({
        label: "theme",
        value: theme
      });
      state.theme = themes.options.find(item => item.value === theme);
    },
    [types.CHANGE_ACTIVE_CHAT](state, data) {
      data.tips = false;
      state.activeChat = data;
    },
    [types.GET_CHAT_LIST](state, data) {
      state.chatList = data;
    },
    [types.ADD_CHAT_LIST](state, data) {
      const idx = state.chatList.findIndex(item => item.chatId === data.chatId);
      if (idx !== -1) state.chatList.splice(idx, 1);
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
      lastMsg.name = lastMsg.fromUsername === storage.local.get("username") ? lastMsg.toUsername : lastMsg.fromUsername;
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
    },
    [types.SET_PERSONAL](state, data) {
      data = data || {};
      state.personal = data;
      const {avatar, username} = data;
      storage.local.set({
        label: "avatar",
        value: avatar,
        type: "user"
      });
      storage.local.set({
        label: "username",
        value: username,
        type: "user"
      });
    },
    [types.CHANGE_USER_INFO](state, data) {
      state.userInfo = data || {};
    },
    [types.CHANGE_USER_INFO_VISIBLE](state, flag) {
      if (flag) state.userInfo = {};
      state.userInfoVisible = flag;
    },
  },
  actions: {
    [types.CHANGE_ACTIVE_CHAT]({commit}, data) {
      commit(types.CHANGE_ACTIVE_CHAT, data);
    },
    [types.GET_CHAT_LIST]({commit}) {
      api.getChatList().then(res => {
        commit(types.GET_CHAT_LIST, res.data.list);
      }).catch(err => {
        console.log(err);
      });
    },
    [types.ADD_CHAT_LIST]({commit}, data) {
      commit(types.ADD_CHAT_LIST, data);
    },
    [types.UPDATE_MSG_LIST]({commit}, data) {
      commit(types.UPDATE_MSG_LIST, data);
    },
    [types.CLEAR_MSG_LIST]({commit}) {
      commit(types.CLEAR_MSG_LIST);
    },
    getUserInfo({commit}, username) {
      commit(types.CHANGE_USER_INFO_VISIBLE, true);

      const params = {
        username: username || ""
      };
      apiUser.getInfo(qs.stringify(params)).then(res => {
        if (!res.data.flag) {
          Message.auto(res.data);
          return;
        }
        commit(types.CHANGE_USER_INFO, res.data.data);
      }).catch(err => {
        console.log(err);
      });
    },
  },
  modules: {
  }
});
