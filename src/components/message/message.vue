<template>
  <div class="message">
    <header>
      <p>标题</p>
      <el-dropdown trigger="click">
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">添加好友</el-dropdown-item>
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

  export default {
    name: "message",
    components: {
      list,
      entry
    },
    methods: {
      signOut() {
        this.$router.push("/login");
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
    }

    .entry {
      flex: 0 0 160px;
    }
  }

</style>
