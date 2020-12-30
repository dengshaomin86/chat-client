<template>
  <div class="entry" v-if="activeChat.chatId">
    <div class="opt">
      <i class="iconfont icon-img"></i>
      <i class="iconfont icon-folder"></i>
      <i class="iconfont icon-cut"></i>
      <i class="iconfont icon-record"></i>
    </div>
    <textarea v-model="msg" @keydown.enter="keydown"></textarea>
    <div class="sendBtn">
      <el-button @click="send">发送</el-button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from "vuex";

  export default {
    name: "entry",
    data() {
      return {
        msg: ""
      };
    },
    computed: {
      ...mapState(["activeChat"])
    },
    sockets: {
      connect(data) {
        console.log("connect", data);
      },
      reconnect(data) {
        console.log("reconnect", data);
      },
      disconnect(data) {
        console.log("disconnect", data);
      },
      res: function (val) {
        // console.log("收到推送", val);
      },
      // 发送消息
      message: function (val) {
        this.updateMsgList([val]);
      },
      // 收到消息
      messageResponse: function (val) {
        this.updateMsgList([val]);
        this.setMsgTips(true);
      },
      // 好友相关
      friendRelated: function (data) {
        switch (data.type) {
          case "request":
            this.changeFriendRequest(true);
            break;
          case "agree":
            this.getFriendList();
            break;
          case "remove":
            this.getFriendList();
            break;
        }
      },
      // 提示
      tips: function (data) {
        if (!data || !data.type || !data.text) return;
        this.$message[data.type](data.text);
      },
      // 群聊相关信息推送
      group: function (data) {
        this.getChatList();

        switch (data.type) {
          case "joinRoom":
            if (data.groupId) this.$socket.emit("joinRoom", data.groupId);
            break;
          case "leaveRoom":
            if (data.groupId) this.$socket.emit("leaveRoom", data.groupId);
            break;
        }
      },
    },
    methods: {
      init() {
      },
      keydown(event) {
        this.send();
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      },
      send() {
        if (!this.msg) {
          this.$message.warning("消息不能为空");
          return;
        }
        const {chatId, chatType, withUsername, withUserId} = this.activeChat;
        const msg = {
          chatId,
          chatType,
          msg: this.msg,
          createTime: new Date().getTime(),
          msgType: "1",
          withUsername,
          withUserId
        };
        const typeName = chatType === "1" ? "messageSingle" : "messageGroup";
        this.$socket.emit(typeName, msg);
        this.msg = "";
      },
      ...mapMutations(["updateMsgList", "changeFriendRequest", "setMsgTips"]),
      ...mapActions(["getFriendList", "getChatList"])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .entry {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    .opt {
      margin-bottom: 5px;
      i {
        font-size: 20px;
        margin-right: 15px;
        &:hover {
          cursor: pointer;
          color: #0077aa;
        }
      }
    }
    article, textarea {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-size: 14px;
      resize: none;
    }
    .sendBtn {
      text-align: right;
      .el-button {
        height: 30px;
        padding: 0 20px;
      }
    }
  }
</style>
