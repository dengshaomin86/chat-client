<template>
  <div class="aside-menu">
    <div class="avatar-con" @click="user">
      <avatar :size="40" shape="square" :src="avatar"></avatar>
    </div>
    <i class="icon el-icon-chat-line-round active" title="聊天"></i>
    <i class="icon el-icon-notebook-1" title="通讯录" @click="showContact"></i>

    <el-dialog title="通讯录"
               :visible.sync="visible"
               width="30%"
               :before-close="handleClose">
      <div class="btn-con">
        <el-badge :value="addReqNum" :hidden="!addReqNum">
          <el-button size="small" @click.stop="showAddReq">好友请求</el-button>
        </el-badge>
        <el-button size="small" type="primary" @click.stop="showAddFriend">添加好友</el-button>
      </div>

      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click="sendMsg(scope.row)" type="text" icon="el-icon-chat-dot-square">发消息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="添加好友"
               :visible.sync="visibleAdd"
               width="30%"
               :before-close="handleCloseAdd">
      <div class="search-con">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="searchKeyword"></el-input>
        <el-button type="primary" @click="searchUser">搜索</el-button>
      </div>
      <el-table :data="searchFriendTableData"
                border
                style="width: 100%">
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.status==='0'">
              <el-button @click="addFriend(scope.row)" type="text" icon="el-icon-plus">添加</el-button>
            </template>
            <span v-else>{{scope.row.statusText}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="好友请求"
               :visible.sync="visibleAddReq"
               width="30%"
               :before-close="handleCloseAddReq">
      <el-table :data="addReqTableData"
                border
                style="width: 100%">
        <el-table-column prop="username"
                         label="用户名">
        </el-table-column>
        <el-table-column prop="msg"
                         label="留言">
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.status === '0'">
              <el-button @click="refuse(scope.row)" type="text" icon="el-icon-close">拒绝</el-button>
              <el-button @click="agree(scope.row)" type="text" icon="el-icon-check">同意</el-button>
            </template>
            <span v-else>{{scope.row.statusText}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import api from "@/api";
  import _ from "lodash";
  import {mapActions} from "vuex";

  export default {
    name: "aside-menu",
    data() {
      return {
        visible: false,
        addReqNum: 0,
        tableData: [],
        visibleAdd: false,
        searchKeyword: "",
        searchFriendTableData: [],
        visibleAddReq: false,
        addReqTableData: []
      };
    },
    computed: {
      username() {
        return sessionStorage.getItem("username");
      },
      avatar() {
        return sessionStorage.getItem("avatar");
      }
    },
    methods: {
      user() {
        this.$router.push("/userInfo");
      },
      getContactList() {
        api.getContactList().then(res => {
          this.addReqNum = res.data.addReqNum;
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
          this.addChatList(res.data.data);
        }).catch(err => {
          console.log(err);
        });
      },
      // 显示好友请求
      showAddReq() {
        this.handleClose();
        this.getAddReqList();
        this.visibleAddReq = true;
      },
      // 获取好友请求列表
      getAddReqList() {
        api.getAddReqList().then(res => {
          this.addReqTableData = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      // 显示添加好友
      showAddFriend() {
        this.handleClose();
        this.visibleAdd = true;
      },
      // 关闭添加好友
      handleCloseAdd() {
        this.visibleAdd = false;
        this.searchKeyword = "";
        this.searchFriendTableData = [];
      },
      // 搜索用户
      searchUser() {
        const params = {
          keyword: this.searchKeyword
        };
        api.searchUser(params).then(res => {
          this.searchFriendTableData = res.data.list;
        }).catch(err => {
          console.log(err);
        });
      },
      // 发起添加好友
      addFriend(item) {
        this.$prompt("", "留言", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入留言",
          inputValue: `我是${this.username}`
        }).then(({value}) => {
          if (!value) {
            this.$message.error("留言不能为空");
            return;
          }
          const params = {
            username: item.username,
            userId: item.userId,
            msg: value
          };
          api.addContactFriend(params).then(res => {
            this.$message[res.data.flag ? "success" : "error"](res.data.message);
            if (!res.data.flag) return;
            item.status = res.data.status;
            item.statusText = res.data.statusText;
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
        });
      },
      // 关闭好友请求对话框
      handleCloseAddReq() {
        this.visibleAddReq = false;
      },
      // 拒绝好友请求
      refuse(item) {
        api.refuseAddFriendReq(item).then(res => {
          this.$message[res.data.flag ? "success" : "error"](res.data.message);
          if (!res.data.flag) return;
          item.status = res.data.status;
          item.statusText = res.data.statusText;
        }).catch(err => {
          console.log(err);
        });
      },
      // 同意好友请求
      agree(item) {
        api.agreeAddFriendReq(item).then(res => {
          this.$message[res.data.flag ? "success" : "error"](res.data.message);
          if (!res.data.flag) return;
          item.status = res.data.status;
          item.statusText = res.data.statusText;
        }).catch(err => {
          console.log(err);
        });
      },
      ...mapActions([
        "getChatList",
        "addChatList"
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

    .avatar-con {
      width: 40px;
      margin: 10px auto;
      cursor: pointer;
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

  ::v-deep .el-dialog {
    .el-dialog__body {
      padding-top: 0;

      .btn-con {
        text-align: right;
        margin-bottom: 10px;

        .el-button {
          margin-left: 20px;
        }
      }

      .search-con {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-button {
          margin-left: 10px;
        }
      }
    }
  }

</style>
