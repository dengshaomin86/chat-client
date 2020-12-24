<template>
  <div class="user-info" v-if="userInfo.username">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="" class="el-form-item-avatar">
        <avatar :size="100" :upload="isSelf && uploadCB" :src="form.avatar"></avatar>
        <template v-if="!isSelf">
          <i class="iconfont icon-friend" v-if="form.friendStatus==='1'" title="好友"></i>
          <i class="iconfont icon-add-friend"
             :class="{'disabled':form.friendStatus==='2'}"
             :title="form.friendStatus|addFriendText"
             v-if="['0','2'].includes(form.friendStatus)"
             @click="addFriend"></i>
        </template>
      </el-form-item>
      <el-form-item label="用户名">
        <span>{{form.username}}</span>
        <i class="iconfont" v-bind="sexAttrs" @click="editSex"></i>
      </el-form-item>
      <el-form-item label="昵称">
        <span>{{form.nickname||"-"}}</span>
        <i class="iconfont icon-edit" v-if="isSelf" @click="edit('昵称', 'nickname')"></i>
      </el-form-item>
      <el-form-item label="爱好">
        <span>{{form.hobby||"-"}}</span>
        <i class="iconfont icon-edit" v-if="isSelf" @click="edit('爱好', 'hobby')"></i>
      </el-form-item>
      <el-form-item label="个性签名">
        <span>{{form.signature||"-"}}</span>
        <i class="iconfont icon-edit" v-if="isSelf" @click="edit('个性签名', 'signature')"></i>
      </el-form-item>
      <el-form-item label="加入时间">
        <span>{{form.createDate|formatDate}}</span>
      </el-form-item>
    </el-form>

    <el-dialog
      title="性别"
      width="420px"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <el-radio-group v-model="sex">
        <el-radio label="1"><i class="iconfont icon-male"></i>男</el-radio>
        <el-radio label="2"><i class="iconfont icon-female"></i>女</el-radio>
        <el-radio label="0"><i class="iconfont icon-sex"></i>保密</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="submitSex">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {cloneDeep} from "lodash";
  import qs from "qs";
  import api from "@/api";
  import apiUser from "@/api/user";
  import {mapState, mapMutations} from "vuex";

  export default {
    name: "user-info",
    data() {
      return {
        dialogVisible: false,
        sex: "0",
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
        map.set("2", "待同意");
        return map.get(status);
      },
    },
    methods: {
      init() {
      },
      // 发起添加好友
      addFriend() {
        if (this.form.friendStatus !== "0") return;
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
            username: item.username,
            userId: item.userId,
            msg: value
          };
          api.addContactFriend(params).then(res => {
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
      ...mapMutations(["changeUserInfo", "setPersonal"])
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
        span {
          vertical-align: middle;
          +.iconfont {
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
        &-avatar {
          .avatar {
            display: inline-block;
          }
          .iconfont {
            font-size: 30px;
            @include color-imp;
            &.icon-add-friend {
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
