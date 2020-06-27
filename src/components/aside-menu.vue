<template>
  <div class="aside-menu">
    <div class="avatar" @click="user">
      <img src="@/assets/logo.png">
    </div>
    <i class="icon el-icon-chat-line-round active" title="聊天"></i>
    <i class="icon el-icon-notebook-1" title="通讯录" @click="showContact"></i>

    <el-dialog title="通讯录"
               :visible.sync="visible"
               width="30%"
               :before-close="handleClose">
      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column prop="username"
                         label="姓名">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="sendMsg(scope.row)" type="text" icon="el-icon-chat-dot-square">发消息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import api from "@/assets/api";
  import _ from "lodash";
  import { mapActions } from "vuex";

  export default {
    name: "aside-menu",
    data() {
      return {
        visible: false,
        tableData: []
      };
    },
    methods: {
      user() {
        this.$router.push("/userInfo");
      },
      getContactList() {
        api.getContactList().then(res => {
          this.tableData = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      showContact() {
        this.getContactList();
        this.visible = true;
      },
      handleClose() {
        this.visible = false;
      },
      sendMsg(item) {
        const data = _.pick(item, ["username", "userId"]);
        data.type = "1";
        api.addChatList(data).then(res => {
          this.visible = false;
          this.getChatList();
        }).catch(err => {
          console.log(err);
        });
      },
      ...mapActions([
        "getChatList"
      ])
    },
    mounted() {
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
