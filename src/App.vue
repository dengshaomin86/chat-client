<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";
  import storage from "@/utils/storage";

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
    },
    methods: {
      init() {
        this.setTheme(storage.local.get("theme"));
      },
      ...mapMutations(["setTheme"])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style lang="scss">
  @import "assets/scss/global";

</style>
