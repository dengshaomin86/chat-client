<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    sockets: {
      // connect(data) {
      //   console.log("已连接", data);
      // },
      // reconnect(data) {
      //   console.log("reconnect", data);
      // },
      // disconnect(data) {
      //   console.log("disconnect", data);
      // },
      // // 监听连接数量
      // users(data) {
      //   console.log("users", data);
      // },
      // // socket 队列推送消息
      // transferMessage(data) {
      //   console.log("transferMsg", data);
      // },
      // res: function (val) {
      //   console.log("接收到服务端消息", val);
      // }
    }
  };
</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: rgba(29, 160, 155, 0.64) url("./assets/images/bg/3735.jpg") no-repeat center center;
    background-size: cover;
  }

  p {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  #app {
    &:before, &:after {
      display: table;
      content: "";
    }
  }
</style>
