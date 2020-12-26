<template>
  <div class="friend">
    <search v-model="keyword" title="添加好友" @action="showAddFriend"></search>
    <list :keyword="keyword" @showRequest="showAddReq"></list>

    <el-dialog title="添加好友"
               :visible.sync="visibleAdd"
               width="450px"
               :before-close="handleCloseAdd">
      <div class="search-con">
        <el-input placeholder="请输入用户名" prefix-icon="el-icon-search" v-model="searchKeyword" @keyup.enter.native="searchUser"></el-input>
        <el-button type="primary" @click="searchUser" :loading="addBtnLoading">搜索</el-button>
      </div>
      <el-table :data="searchFriendTableData"
                v-if="searchFriendTableData.length"
                border
                style="width: 100%">
        <el-table-column prop="username" label="用户名">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope" v-if="scope.row.username!==username">
            <template v-if="scope.row.friendStatus==='0'">
              <el-button @click="addFriend(scope.row)" type="text" icon="el-icon-plus">添加</el-button>
            </template>
            <span v-else>{{scope.row.friendStatusText}}</span>
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
            <template v-if="scope.row.friendStatus === '3'">
              <el-button @click="refuse(scope.row)" type="text" icon="el-icon-close">拒绝</el-button>
              <el-button @click="agree(scope.row)" type="text" icon="el-icon-check">同意</el-button>
            </template>
            <span v-else>{{scope.row.friendStatusText}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import list from "./list";
  import search from "@common/search";
  import api from "@/api";
  import apiFriend from "@/api/friend";
  import {mapActions, mapMutations} from "vuex";

  export default {
    name: "friend",
    components: {
      list,
      search,
    },
    data() {
      return {
        keyword: "",
        addBtnLoading: false,

        visibleAdd: false,
        searchKeyword: "",
        searchFriendTableData: [],
        visibleAddReq: false,
        addReqTableData: [],
      };
    },
    methods: {
      // 显示好友请求
      showAddReq() {
        this.getFriendRequestList();
        this.visibleAddReq = true;
      },
      // 获取好友请求列表
      getFriendRequestList() {
        apiFriend.requestList().then(res => {
          this.addReqTableData = res.data.list;
        }).catch(e => {
        });
      },
      // 显示添加好友
      showAddFriend() {
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
        this.addBtnLoading = true;
        api.searchUser(params).then(res => {
          this.addBtnLoading = false;
          this.searchFriendTableData = res.data.list;
        }).catch(() => {
          this.addBtnLoading = false;
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
            toUsername: item.username,
            toUserId: item.userId,
            msg: value
          };
          apiFriend.add(params).then(res => {
            this.$message.auto(res.data);
            if (!res.data.flag) return;
            item.friendStatus = res.data.friendStatus;
            item.friendStatusText = res.data.friendStatusText;
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
        apiFriend.refuse({
          toUserId: item.userId,
          toUsername: item.username,
        }).then(res => {
          this.$message.auto(res.data);
          if (!res.data.flag) return;
          item.friendStatus = res.data.friendStatus;
          item.friendStatusText = res.data.friendStatusText;
        }).catch(e => {
        });
      },
      // 同意好友请求
      agree(item) {
        apiFriend.agree({
          toUserId: item.userId,
          toUsername: item.username,
        }).then(res => {
          this.$message.auto(res.data);
          if (!res.data.flag) return;
          item.friendStatus = res.data.friendStatus;
          item.friendStatusText = res.data.friendStatusText;
          this.getFriendList();
        }).catch(e => {
        });
      },
      ...mapMutations(["changeFriendRequest"]),
      ...mapActions(["getUserInfo", "getFriendList"])
    },
    watch: {
      visibleAddReq(n, o) {
        if (n) this.changeFriendRequest(false);
      }
    },
  };
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped lang="scss">
  .friend {
    height: 100%;
    background-color: #ddd;
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
