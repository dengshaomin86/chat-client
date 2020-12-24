<template>
  <div class="header-menu">
    <p>{{name||""}}</p>
    <el-dropdown trigger="click">
      <i class="el-icon-more"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-thumb" @click.native="signOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "header-menu",
    props: {
      name: {
        type: String,
        default: "",
      }
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
  .header-menu {
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

</style>
