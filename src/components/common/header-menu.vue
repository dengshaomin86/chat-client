<template>
  <div class="header-menu">
    <p>{{name||""}}</p>
    <template v-if="menu">
      <i class="el-icon-more" v-if="menu.enable" @click="showDrawer"></i>
      <el-dropdown trigger="click" v-else>
        <i class="el-icon-more"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="removeChat">删除会话</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>

    <groupInfo ref="groupInfo"></groupInfo>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";
  import groupInfo from "@common/group-info";
  import apiChat from "@/api/chat";

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
    computed: {
      ...mapState(["activeChat"])
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
      // 删除会话
      removeChat() {
        apiChat.chatRemove(this.activeChat.chatId).then(r => {
          this.$message.auto(r.data);
          if (!r.data.flag) return;
          this.getChatList();
        }).catch(e => {
        });
      },
      ...mapActions(["getChatList"]),
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
    .el-dropdown {
      font-size: 0;
    }
    .el-icon-more {
      font-size: 16px;
      transition: $transition;
      @include font-color;
      &:hover {
        cursor: pointer;
        @include color-active;
      }
    }
  }

</style>
