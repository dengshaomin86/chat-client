<template>
  <el-drawer title=""
             direction="rtl"
             size="600px"
             :append-to-body="true"
             :visible.sync="visible"
             :before-close="handleClose">
    <div class="group-info-wrapper" v-if="group&&group.groupId">
      <el-form label-width="80px">
        <el-form-item label="群名称">
          <span>{{group.groupName}}</span>
          <i class="iconfont icon-edit" v-if="isMaster" @click="edit('群名称', 'groupName', group.groupName)"></i>
        </el-form-item>
        <el-form-item label="群公告">
          <span>{{group.announcement||"-"}}</span>
          <i class="iconfont icon-edit" v-if="isMaster" @click="edit('群公告', 'announcement', group.announcement)"></i>
        </el-form-item>
        <el-form-item label="群成员">
          <ul class="members">
            <li v-for="(member, idx) in group.members" :key="idx" @click="getUserInfo(member.userId)">
              <i class="iconfont icon-crown" v-if="group.master===member.userId"></i>
              <i class="iconfont icon-remove" v-if="group.master!==member.userId&&isMaster" @click.stop="remove(member)"></i>
              <avatar :size="60" :src="member.avatar"></avatar>
              <p>{{member.username}}</p>
            </li>
            <li>
              <div class="member-add" title="添加成员" @click="append">
                <i class="iconfont icon-add"></i>
              </div>
            </li>
          </ul>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="group.master===userId" @click="disband">解散群聊</el-button>
          <el-button type="primary" v-else @click="quit">退出群聊</el-button>
        </el-form-item>
      </el-form>
    </div>

    <createGroup ref="createGroup" :config="createGroupConfig" @append="appendSuccess"></createGroup>
  </el-drawer>
</template>

<script>
  import qs from "qs";
  import apiChat from "@/api/chat";
  import {mapActions} from "vuex";
  import createGroup from "@common/create-group";

  export default {
    name: "group-info",
    components: {
      createGroup,
    },
    data() {
      return {
        visible: false,
        group: {},
      };
    },
    computed: {
      isMaster() {
        return this.group.master === this.userId;
      },
      createGroupConfig() {
        return {
          title: "添加成员",
          group: this.group
        };
      },
    },
    methods: {
      init(id) {
        this.visible = true;
        this.getInfo(id);
      },
      // 获取群聊信息
      getInfo(id) {
        apiChat.groupInfo(id).then(r => {
          if (!r.data.flag) return this.$message.auto(r.data);
          this.group = r.data.data;
        }).catch(e => {
        });
      },
      // 编辑
      edit(title, label, value) {
        this.$prompt("", title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPlaceholder: "请输入",
          inputValue: value || "",
        }).then(({value}) => {
          this.submitEdit(label, value);
        }).catch(e => {
        });
      },
      // 提交编辑
      submitEdit(label, value) {
        if (!label) {
          this.$message.error("数据有误");
          return;
        }
        apiChat.groupUpdate(qs.stringify({
          groupId: this.group.groupId,
          [label]: value
        })).then(r => {
          this.$message.auto(r.data);
          if (!r.data.flag) return;
          this.group = r.data.data;
          this.getChatList();
        }).catch(e => {
        });
      },
      // 移出群聊
      remove(member) {
        this.$confirm(`您确认要把&nbsp;<span style="color:red;">${member.username}</span>&nbsp;移出群聊吗？`, "提示", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$socket.emit("messageGroup", {
            chatId: this.group.groupId,
            chatType: "2",
            msg: `${member.username} 被移出群聊`,
            msgType: "2",
            createTime: new Date().getTime(),
          });

          apiChat.groupRemove({
            groupId: this.group.groupId,
            memberId: member.userId,
          }).then(r => {
            this.$message.auto(r.data);
            if (!r.data.flag) return;
            this.group = r.data.data;
          }).catch(e => {
          });
        }).catch(e => {
        });
      },
      // 添加成员
      append() {
        this.$refs.createGroup.init();
      },
      // 添加成员成功回调
      appendSuccess(data) {
        this.group = data;
      },
      // 退出群聊
      quit() {
        this.$confirm("您确定要退出群聊吗？", "提示", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          apiChat.groupQuit({
            groupId: this.group.groupId,
          }).then(r => {
            this.$message.auto(r.data);
            if (!r.data.flag) return;
            this.getChatList();
            this.handleClose();
          }).catch(e => {
          });
        }).catch(e => {
        });
      },
      // 解散群聊
      disband() {
        this.$confirm("您确定要解散群聊吗？", "提示", {
          dangerouslyUseHTMLString: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$socket.emit("messageGroup", {
            chatId: this.group.groupId,
            chatType: "2",
            msg: "群聊已解散",
            msgType: "2",
            createTime: new Date().getTime(),
          });

          apiChat.groupDisband(this.group.groupId).then(r => {
            this.$message.auto(r.data);
            if (!r.data.flag) return;
            this.getChatList();
            this.handleClose();
          }).catch(e => {
          });
        }).catch(e => {
        });
      },
      // 关闭
      handleClose() {
        this.visible = false;
        this.group = {};
      },
      ...mapActions(["getUserInfo", "getChatList"]),
    }
  };
</script>

<style scoped lang="scss">
  .group-info-wrapper {
    padding: 0 30px;
    .icon-edit {
      margin-left: $padding;
      transition: $transition;
      @include color-imp;
      &:hover {
        cursor: pointer;
        @include color-active;
      }
    }
    .members {
      list-style: none;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      padding-left: 0;
      li {
        margin-right: 20px;
        position: relative;
        &:hover {
          cursor: pointer;
          p {
            @include color-active;
          }
          .icon-remove {
            opacity: 1;
          }
        }
        p {
          text-align: center;
          transition: 0.5s;
          @include text-column(1);
        }
        .icon-crown {
          font-size: 24px;
          position: absolute;
          top: -18px;
          right: -10px;
          color: goldenrod;
          transform: rotateZ(45deg);
          + .avatar {
            border: 1px solid goldenrod;
          }
        }
        .icon-remove {
          font-size: 12px;
          position: absolute;
          top: -16px;
          right: -10px;
          transition: 0.5s;
          opacity: 0;
          &:hover {
            cursor: pointer;
            transform: rotate(180deg);
          }
        }
        .member-add {
          width: 60px;
          height: 60px;
          border: 1px solid;
          @include themeify {
            border-color: themed(font-color);
          }
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: $transition;
          i {
            font-size: 24px;
            @include font-color;
            transition: $transition;
          }
          &:hover {
            @include themeify {
              border-color: themed(color-active);
            }
            i {
              @include color-active;
            }
          }
        }
      }
    }
  }

</style>
