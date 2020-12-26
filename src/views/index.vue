<template>
  <div class="container">
    <!--菜单栏-->
    <asideMenu></asideMenu>
    <keep-alive>
      <component :is="activeTabName"></component>
    </keep-alive>
    <!--查看用户信息-->
    <el-drawer title=""
               direction="ltr"
               size="600px"
               :append-to-body="true"
               :visible.sync="userInfoVisible"
               :before-close="handleCloseUserInfo">
      <userInfo @sendMsg="sendMsg" @close="handleCloseUserInfo"></userInfo>
    </el-drawer>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import {pick} from "lodash";
  import apiChat from "@/api/chat";
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
      return {};
    },
    computed: {
      ...mapState(["userInfoVisible", "userInfo", "activeTabName"])
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
        apiChat.addChatList(data).then(res => {
          this.setTabName("tab-chat");
          this.changeUserInfoVisible(false);
          this.addChatList(res.data.data);
        }).catch(() => {
        });
      },
      ...mapMutations(["changeUserInfoVisible", "addChatList", "setTabName"])
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
