<template>
  <div class="header-menu">
    <p>{{name||""}}</p>
    <i class="el-icon-more" v-if="menu" @click="showDrawer"></i>
    <groupInfo ref="groupInfo"></groupInfo>
  </div>
</template>

<script>
  import groupInfo from "@common/group-info";

  export default {
    name: "header-menu",
    components: {
      groupInfo
    },
    props: {
      name: {
        type: String,
        default: "",
      },
      menu: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      showDrawer() {
        this.visible = true;
        switch (this.menu.type) {
          case "chat":
            this.getInfo(this.menu.data);
            break;
        }
      },
      getInfo(data) {
        switch (data.chatType) {
          case "1":
            break;
          case "2":
            this.$refs.groupInfo.init(data.chatId);
            break;
        }
      },
      handleClose() {
        this.visible = false;
      },
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
      font-size: 16px;
      transition: $transition;
      &:hover {
        cursor: pointer;
        @include color-active;
      }
    }
  }

</style>
