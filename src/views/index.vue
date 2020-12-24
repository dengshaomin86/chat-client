<template>
  <div class="container">
    <!--菜单栏-->
    <asideMenu v-model="active"></asideMenu>
    <keep-alive>
      <component :is="active"></component>
    </keep-alive>
    <!--查看用户信息-->
    <el-drawer title=""
               direction="ltr"
               size="600px"
               :append-to-body="true"
               :visible.sync="userInfoVisible"
               :before-close="handleCloseUserInfo">
      <userInfo @sendMsg="sendMsg"></userInfo>
    </el-drawer>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {pick} from "lodash";
  import api from "@/api";
  import asideMenu from "@/components/aside-menu";
  import tabChat from "@/components/tab-chat";
  import tabFriend from "@/components/tab-friend";
  import userInfo from "@common/user-info";

  export default {
    name: "index",
    components: {
      asideMenu,
      tabChat,
      tabFriend,
      userInfo,
    },
    data() {
      return {
        active: "tab-chat"
      };
    },
    computed: {
      ...mapState(["userInfoVisible", "userInfo"])
    },
    methods: {
      init() {
      },
      handleCloseUserInfo(done) {
        this.changeUserInfoVisible(false);
      },
      // 发消息
      sendMsg() {
        const data = pick(this.userInfo, ["username", "userId"]);
        data.type = "1";
        api.addChatList(data).then(res => {
          this.active = "tab-chat";
          this.changeUserInfoVisible(false);
          this.addChatList(res.data.data);
        }).catch(() => {
        });
      },
      ...mapMutations(["changeUserInfoVisible", "addChatList"])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;

    .aside-menu {
      flex: 0 0 60px;
    }
  }
</style>
