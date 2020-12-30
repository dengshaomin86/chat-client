<template>
  <div class="user-info" v-if="userInfo.username">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="" class="el-form-item-avatar">
        <avatar :size="100" :upload="isSelf && uploadCB" :src="form.avatar"></avatar>
        <template v-if="!isSelf">
          <el-popconfirm
            @onConfirm="removeFriend"
            confirm-button-text='是的'
            cancel-button-text='再想想'
            title="确认解除好友关系吗？">
            <i class="iconfont icon-friend" slot="reference" v-if="form.friendStatus==='1'" title="好友"></i>
          </el-popconfirm>
          <i class="iconfont icon-tab-chat" v-if="form.friendStatus==='1'" title="发消息" @click="sendMsg"></i>
          <i class="iconfont icon-add-friend"
             :class="{'disabled':['2','3'].includes(form.friendStatus)}"
             :title="form.friendStatus|addFriendText"
             v-if="['0','2','3','4'].includes(form.friendStatus)"
             @click="addFriend"></i>
        </template>
        <template v-else>
          <i class="iconfont icon-signout" title="退出" @click="signOutConfirm"></i>
        </template>
      </el-form-item>
      <el-divider><i class="el-icon-monitor"></i></el-divider>
      <el-form-item label="用户名">
        <div class="el-form-item-content">
          <span>{{form.username}}</span>
          <i class="iconfont" v-bind="sexAttrs" @click="editSex"></i>
        </div>
      </el-form-item>
      <el-form-item label="昵称">
        <div class="el-form-item-content">
          <span>{{form.nickname||"-"}}</span>
          <i class="iconfont icon-edit" v-if="isSelf" @click="edit('昵称', 'nickname')"></i>
        </div>
      </el-form-item>
      <el-form-item label="爱好">
        <div class="el-form-item-content">
          <span>{{form.hobby||"-"}}</span>
          <i class="iconfont icon-edit" v-if="isSelf" @click="edit('爱好', 'hobby')"></i>
        </div>
      </el-form-item>
      <el-form-item label="个性签名">
        <div class="el-form-item-content">
          <span>{{form.signature||"-"}}</span>
          <i class="iconfont icon-edit" v-if="isSelf" @click="edit('个性签名', 'signature')"></i>
        </div>
      </el-form-item>
      <el-form-item label="加入时间">
        <div class="el-form-item-content">
          <span>{{form.createDate|formatDate}}</span>
        </div>
      </el-form-item>
    </el-form>

    <!--设置性别-->
    <confirm
      title="性别"
      :visible="dialogVisible"
      @close="dialogVisible=false"
      @submit="submitSex">
      <el-radio-group v-model="sex">
        <el-radio label="1"><i class="iconfont icon-male"></i>男</el-radio>
        <el-radio label="2"><i class="iconfont icon-female"></i>女</el-radio>
        <el-radio label="0"><i class="iconfont icon-sex"></i>保密</el-radio>
      </el-radio-group>
    </confirm>

    <!--退出确认-->
    <confirm
      :visible="signOutVisible"
      @close="closeConfirmSignOut">
      <div>
        <p style="font-size: 16px">您确定要退出吗？</p>
      </div>
      <div slot="footer">
        <el-button size="small" @click="closeConfirmSignOut">再想想</el-button>
        <el-button size="small" type="primary" @click="signOut">退出</el-button>
      </div>
    </confirm>
  </div>
</template>

<script>
  import {cloneDeep} from "lodash";
  import qs from "qs";
  import apiUser from "@/api/user";
  import apiFriend from "@/api/friend";
  import {mapState, mapMutations, mapActions} from "vuex";
  import confirm from "@common/confirm";

  export default {
    name: "user-info",
    components: {
      confirm
    },
    data() {
      return {
        dialogVisible: false,
        sex: "0",
        signOutVisible: false,
      };
    },
    computed: {
      isSelf() {
        return this.username === this.userInfo.username;
      },
      sexAttrs() {
        const sexMap = new Map();
        sexMap.set("0", {
          icon: "sex",
          text: "保密",
        });
        sexMap.set("1", {
          icon: "male",
          text: "男"
        });
        sexMap.set("2", {
          icon: "female",
          text: "女"
        });
        const key = this.userInfo.sex || "0";
        return {
          class: {
            editable: this.isSelf,
            ["icon-" + sexMap.get(key).icon]: true
          },
          title: sexMap.get(key).text
        };
      },
      form: {
        get() {
          return cloneDeep(this.userInfo);
        },
        set() {
        }
      },
      ...mapState(["userInfoVisible", "userInfo"])
    },
    filters: {
      addFriendText(status) {
        const map = new Map();
        map.set("0", "添加好友");
        map.set("1", "已添加");
        map.set("2", "待对方确认");
        map.set("3", "待您确认");
        map.set("4", "添加好友");
        return map.get(status);
      },
    },
    methods: {
      init() {
      },
      // 发起添加好友
      addFriend() {
        if (!["0", "4"].includes(this.form.friendStatus)) return;
        const item = this.form;
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
            friendUserId: item.userId,
            msg: value
          };
          apiFriend.add(params).then(res => {
            this.$message.auto(res.data);
            if (!res.data.flag) return;
            const {friendStatus, friendStatusText} = res.data;
            this.changeUserInfo({
              ...item,
              friendStatus,
              friendStatusText,
            });
          }).catch(err => {
            console.log(err);
          });
        }).catch(() => {
        });
      },
      // 上传头像回调
      uploadCB(src) {
        this.submitEdit("avatar", src);
      },
      // 编辑
      edit(title, label) {
        this.$prompt("", title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入"
        }).then(({value}) => {
          this.submitEdit(label, value);
        }).catch(() => {
        });
      },
      // 编辑性别
      editSex() {
        if (!this.isSelf) return;
        this.sex = this.form.sex;
        this.dialogVisible = true;
      },
      // 提交性别编辑
      submitSex() {
        this.dialogVisible = false;
        this.submitEdit("sex", this.sex);
      },
      // 提交编辑
      submitEdit(label, value) {
        if (!label) {
          this.$message.error("数据有误");
          return;
        }
        apiUser.update(qs.stringify({
          [label]: value
        })).then(res => {
          this.$message.auto(res.data);
          if (res.data.flag) {
            this.changeUserInfo(res.data.data);
            this.setPersonal(res.data.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 发消息
      sendMsg() {
        this.$emit("sendMsg");
      },
      // 删除好友
      removeFriend() {
        apiFriend.remove(this.userInfo.userId).then(r => {
          this.$message.auto(r.data);
          if (r.data.flag) {
            this.$emit("close");
            this.getFriendList();
          }
        }).catch(e => {
        });
      },
      // 退出
      signOut() {
        apiUser.signOut().then(res => {
          this.$router.push("/login");
        }).catch(e => {
        });
      },
      // 退出确认
      signOutConfirm() {
        this.signOutVisible = true;
      },
      // 关闭退出确认
      closeConfirmSignOut() {
        this.signOutVisible = false;
      },
      ...mapMutations(["changeUserInfo", "setPersonal"]),
      ...mapActions(["getFriendList"]),
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .user-info {
    background-color: #fff;
    padding: 10px 30px;

    .el-page-header {
      margin-bottom: 10px;
    }

    .el-form {
      width: 360px;
      margin: auto;

      .el-form-item {
        font-size: 18px;
        .avatar {
          box-shadow: 1px 2px 8px 0 #666;
        }
        &:not(:first-of-type) {
          .el-form-item-content {
            display: flex;
            align-items: flex-start;
          }
          span {
            vertical-align: middle;
            word-break: break-all;
            + .iconfont {
              margin-left: 15px;
              font-size: 18px;
              vertical-align: middle;
              @include color-imp;
              &.icon-female {
                @include color-female;
              }
              &.icon-edit, &.editable {
                &:hover {
                  cursor: pointer;
                  @include color-active;
                }
              }
            }
          }
        }
        &-avatar {
          .avatar {
            display: inline-block;
          }
          .iconfont {
            font-size: 30px;
            margin-right: 10px;
            @include color-imp;
            &:hover {
              cursor: pointer;
              @include color-active;
            }
            &.disabled {
              cursor: not-allowed;
              opacity: 0.5;
            }
          }
        }
      }

      .el-icon-edit {
        cursor: pointer;
      }

      .el-radio-group + .el-icon-edit {
        margin-left: 30px;
        color: #C0C4CC;
      }
    }
  }

  .el-radio {
    .iconfont {
      @include color-imp;
      margin-right: 5px;
      &.icon-female {
        @include color-female;
        position: relative;
        top: 1px;
      }
    }
  }

</style>
