<template>
  <div class="entry" v-if="activeChat.chatId" @keyup.enter="send">
    <div class="opt">
      <i class="el-icon-picture-outline-round"></i>
      <i class="el-icon-folder"></i>
      <i class="el-icon-crop"></i>
      <i class="el-icon-chat-dot-round"></i>
    </div>
    <textarea v-model="msg"></textarea>
    <div class="sendBtn">
      <el-button @click="send">发送</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";

  export default {
    name: "entry",
    data() {
      return {
        msg: ""
      };
    },
    computed: {
      username() {
        return sessionStorage.getItem("username");
      },
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
      message: function (val) {
        // console.log("收到消息", val);
        this.updateMsgList([val]);
      },
      messageResponse: function (val) {
        // console.log("发送成功响应", val);
        this.updateMsgList([val]);
      }
    },
    methods: {
      init() {
      },
      send() {
        let { chatId, chatType, toUsername, toUserId } = this.activeChat;
        if (toUsername === this.username) {
          toUsername = this.activeChat.fromUsername;
          toUserId = this.activeChat.fromUserId;
        }
        const msg = {
          chatId,
          chatType,
          msg: this.msg,
          msgDate: new Date().getTime(),
          msgType: "1",
          toUsername,
          toUserId
        };
        const typeName = chatType === "1" ? "message" : "messageGroup";
        this.$socket.emit(typeName, msg);
        this.msg = "";
      },
      ...mapActions([
        "updateMsgList"
      ])
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
        cursor: pointer;
        &:hover {
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
