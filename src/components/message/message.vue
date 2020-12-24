<template>
  <div class="message">
    <header>
      <p>{{activeChat.name}}</p>
      <el-dropdown trigger="click">
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <!--<el-dropdown-item icon="el-icon-plus">添加好友</el-dropdown-item>-->
          <el-dropdown-item icon="el-icon-thumb" @click.native="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <list></list>
    <entry></entry>
  </div>
</template>

<script>
  import list from "./list";
  import entry from "./entry";
  import {mapState} from "vuex";

  export default {
    name: "message",
    components: {
      list,
      entry
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(["activeChat"])
    },
    methods: {
      signOut() {
        axios.get("/user/signOut").then(res => {
          this.$router.push("/login");
        }).catch(err => {
          console.log(err);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .message {
    background-color: #eee;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
      box-sizing: border-box;
      padding: 10px 30px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      flex: 0 0 60px;
      font-size: 18px;

      .el-icon-more {
        cursor: pointer;
      }
    }

    .list {
      height: 100%;
      overflow-x: hidden;
    }

    .entry {
      flex: 0 0 160px;
    }
  }

</style>
