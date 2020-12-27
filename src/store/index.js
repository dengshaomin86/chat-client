import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types.js";
import apiChat from "@/api/chat";
import apiUser from "@/api/user";
import apiFriend from "@/api/friend";
import storage from "@/utils/storage";
import {Message} from "element-ui";
import themes from "@/utils/themes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "", // 主题
    activeTabName: "tab-chat",
    activeChat: {},
    chatList: [],
    msgList: [],
    personal: {}, // 本人信息
    userInfoVisible: false,
    userInfo: {}, // 查看用户的信息
    friendRequest: false, // 好友请求提示
    friendList: [], // 好友列表
    msgTips: false, // 新消息提示
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
    [types.SET_TAB_NAME](state, name) {
      state.activeTabName = name || "tab-chat";
      if (state.activeTabName === "tab-chat") state.msgTips = false;
    },
    [types.CHANGE_ACTIVE_CHAT](state, data) {
      data.tips = false;
      state.activeChat = data;
    },
    [types.SET_CHAT_LIST](state, data) {
      state.chatList = data;
    },
    [types.ADD_CHAT_LIST](state, data) {
      const idx = state.chatList.findIndex(item => item.chatId === data.chatId);
      if (idx !== -1) state.chatList.splice(idx, 1);
      state.chatList.unshift(data);
      state.activeChat = data;
    },
    [types.UPDATE_MSG_LIST](state, data) {
      if (!data || !data.length) return;
      if (data[0].chatId === state.activeChat.chatId) {
        // 如果是当前对话则更新上去
        state.msgList.push(...data);
      }

      // 查看是否存在聊天列表
      const chatObjIndex = state.chatList.findIndex(item => item.chatId === data[0].chatId);
      const lastMsg = data[data.length - 1];
      lastMsg.tips = data[0].chatId !== state.activeChat.chatId;
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
      const {avatar, username, userId} = data;
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
      storage.local.set({
        label: "userId",
        value: userId,
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
    [types.CHANGE_FRIEND_REQUEST](state, flag) {
      state.friendRequest = flag;
    },
    [types.SET_FRIEND_LIST](state, list) {
      state.friendList = list || [];
    },
    [types.SET_MSG_TIPS](state, flag) {
      if (flag && state.activeTabName === "tab-chat") return;
      state.msgTips = flag;
    },
  },
  actions: {
    getChatList({commit}) {
      apiChat.getChatList().then(res => {
        commit(types.SET_CHAT_LIST, res.data.list);
      }).catch(e => {
      });
    },
    getUserInfo({commit}, userId) {
      commit(types.CHANGE_USER_INFO_VISIBLE, true);
      apiUser.getInfo(userId).then(res => {
        if (!res.data.flag) {
          Message.auto(res.data);
          return;
        }
        commit(types.CHANGE_USER_INFO, res.data.data);
      }).catch(e => {
      });
    },
    getFriendList({commit}) {
      apiFriend.list().then(r => {
        if (!r.data.flag) {
          Message.auto(r.data);
          return;
        }
        commit(types.SET_FRIEND_LIST, r.data.list);
      }).catch(e => {
      });
    },
  },
  modules: {}
});
