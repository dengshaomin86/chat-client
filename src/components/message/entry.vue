<template>
  <div class="entry">
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
  export default {
    name: "entry",
    data() {
      return {
        msg: ""
      };
    },
    sockets: {
      connect(data) {
        console.log("已连接", data);
      },
      reconnect(data) {
        console.log("reconnect", data);
      },
      disconnect(data) {
        console.log("disconnect", data);
      },
      // 监听连接数量
      users(data) {
        console.log("users", data);
      },
      // socket 队列推送消息
      transferMessage(data) {
        console.log("transferMsg", data);
      },
      res: function (val) {
        console.log("接收到服务端消息", val);
      }
    },
    methods: {
      init() {
        this.$socket.emit("chat", "hello");
      },
      send() {
        this.$socket.emit("chat", this.msg);
        this.msg = "";
      }
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
