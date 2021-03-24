<template>
  <div id="app" :style="style">
    <router-view/>
  </div>
</template>

<script>
  import {mapMutations} from "vuex";
  import storage from "@/utils/storage";

  export default {
    data() {
      return {
        style: {},
      };
    },
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
        this.setPersonal(storage.local.get("data_user"));
        this.setBackground();
      },
      setBackground() {
        const img = new Image();
        const src = require("@/assets/images/bg/02.jpg");
        img.src = src;
        img.onload = () => {
          this.style = {
            backgroundImage: `url(${src})`,
          };
        };
      },
      ...mapMutations(["setTheme", "setPersonal"])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style lang="scss">
  @import "assets/scss/global";

  #app {
    background-color: rgb(64 158 255);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

</style>
