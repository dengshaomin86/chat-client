<template>
  <el-dialog :title="title" :visible.sync="visible" width="400px" :before-close="close" :append-to-body="true">
    <el-table ref="table" :data="friend" :show-header="false" :max-height="500" @selection-change="selectionChange">
      <el-table-column type="selection" width="55" :selectable="selectable"></el-table-column>
      <el-table-column property="username" label="姓名">
        <div class="user" slot-scope="scope">
          <avatar :size="40" :src="scope.row.avatar"></avatar>
          <span>{{scope.row.username}}</span>
        </div>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small" type="primary" @click="submit" :disabled="!disabled">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import apiFriend from "@/api/friend";
  import apiChat from "@/api/chat";

  export default {
    name: "create-group",
    props: {
      config: {
        type: Object,
        default: () => {
        },
      }
    },
    data() {
      return {
        visible: false,
        friend: [],
        selection: [],
      };
    },
    computed: {
      title() {
        const title = (this.config && this.config.title) || "创建群聊";
        if (!this.selection || !this.selection.length) return title;
        return `${title}(${this.selection.length})`;
      },
      disabled() {
        if (!this.config || !this.config.group || !this.config.group.members) return this.selection.length;
        const membersIDs = this.config.group.members.map(item => item.userId);
        return this.selection.filter(item => !membersIDs.includes(item.userId)).length;
      },
    },
    methods: {
      init() {
        this.visible = true;
        this.getFriend();
      },
      getFriend() {
        apiFriend.list().then(r => {
          if (!r.data.flag) return this.$message.auto(r.data);
          this.friend = r.data.list;
          this.toggleRowSelection();
        }).catch(e => {
        });
      },
      toggleRowSelection() {
        this.$nextTick(() => {
          if (!this.config) return;
          const {group} = this.config;
          if (!group) return;
          const {members} = group;
          const membersIDs = members.map(item => item.userId);
          this.friend.forEach(row => {
            this.$refs.table.toggleRowSelection(row, membersIDs.includes(row.userId));
          });
        });
      },
      selectionChange(selection) {
        this.selection = selection;
      },
      selectable(row, index) {
        if (!this.config) return true;
        const {group} = this.config;
        if (!group) return true;
        const {members} = group;
        const membersIDs = members.map(item => item.userId);
        return !membersIDs.includes(row.userId);
      },
      close() {
        this.visible = false;
        this.$refs.table.clearSelection();
      },
      submit() {
        if (this.config && this.config.group) return this.append();
        const members = this.selection.map(item => {
          const {username, userId} = item;
          return {
            username,
            userId,
          };
        });
        const params = {
          members
        };
        apiChat.createGroup(params).then(r => {
          this.$message.auto(r.data);
          if (!r.data.flag) return;
          this.close();
        }).catch(e => {
        });
      },
      append() {
        const membersIDs = this.config.group.members.map(item => item.userId);
        const members = this.selection.filter(item => !membersIDs.includes(item.userId)).map(item => {
          const {username, userId} = item;
          return {
            username,
            userId,
          };
        });
        const params = {
          groupId: this.config.group.groupId,
          members
        };
        apiChat.groupAppend(params).then(r => {
          this.$message.auto(r.data);
          if (!r.data.flag) return;
          this.close();
          this.$emit("append", r.data.data);
          this.$socket.emit("messageGroup", {
            chatId: this.config.group.groupId,
            chatType: "2",
            msg: `${members.map(item => item.username).join("、")} 加入群聊`,
            msgType: "2",
            createTime: new Date().getTime(),
          });
        }).catch(e => {
        });
      },
    },
  };
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped lang="scss">
  .user {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 8px;
    }
  }

  .el-table {
    ::-webkit-scrollbar {
      width: 8px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #ccc;
    }
    &:before {
      background-color: transparent;
    }
    ::v-deep .el-table__row:last-of-type {
      td {
        border-color: transparent;
      }
    }
  }

</style>
