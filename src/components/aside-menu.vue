<template>
  <div class="aside-menu">
    <div class="avatar" @click="user">
      <img src="@/assets/logo.png">
    </div>
    <i class="icon el-icon-chat-line-round active" title="聊天"></i>
    <i class="icon el-icon-notebook-1" title="通讯录"></i>
  </div>
</template>

<script>
  export default {
    name: "aside-menu",
    methods: {
      user() {
        this.$router.push("/userInfo");
      }
    }
  };
</script>

<style scoped lang="scss">
  .aside-menu {
    height: 100%;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 40px;
      margin: 10px auto;
      cursor: pointer;
      img {
        width: 100%;
      }
    }

    .icon {
      font-size: 30px;
      color: #999;
      margin-top: 30px;
      cursor: pointer;
      &.active {
        color: #3a8ee6;
      }
    }
  }

</style>
