<template>
  <div class="container">
    <aside-menu></aside-menu>
    <record></record>
    <message></message>
    <el-drawer title=""
               direction="ltr"
               size="600px"
               :append-to-body="true"
               :visible.sync="userInfoVisible"
               :before-close="handleCloseUserInfo">
      <userInfo></userInfo>
    </el-drawer>
  </div>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import asideMenu from "@/components/aside-menu";
  import record from "@/components/record/record";
  import message from "@/components/message/message";
  import userInfo from "@/components/user-info";

  export default {
    name: "index",
    components: {
      asideMenu,
      record,
      message,
      userInfo,
    },
    data() {
      return {
        list: [],
        readonly: true,
      };
    },
    computed: {
      ...mapState(["userInfoVisible", "userInfo"])
    },
    methods: {
      init() {
        this.getList();
      },
      getList() {
        this.list = this.$router.options.routes.map(item => item.path);
      },
      handleCloseUserInfo(done) {
        this.changeUserInfoVisible(false);
      },
      // 上传头像回调
      uploadCB(src) {
        this.$set(this.form, "avatar", src);
      },
      ...mapMutations(["changeUserInfoVisible"])
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

    .record {
      flex: 0 0 250px;
    }
  }
</style>
