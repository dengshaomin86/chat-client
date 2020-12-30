<template>
  <el-dialog :title="title" :visible.sync="visible" width="400px" :before-close="close">
    <el-table ref="table" :data="friend" :show-header="false" :max-height="500" @selection-change="selectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column property="username" label="姓名">
        <div class="user" slot-scope="scope">
          <avatar :size="40" :src="scope.row.avatar"></avatar>
          <span>{{scope.row.username}}</span>
        </div>
      </el-table-column>
    </el-table>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small" type="primary" @click="submit" :disabled="!this.selection.length">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import apiFriend from "@/api/friend";
  import apiChat from "@/api/chat";

  export default {
    name: "create-group",
    data() {
      return {
        visible: false,
        friend: [],
        selection: [],
      };
    },
    computed: {
      title() {
        const title = "创建群聊";
        if (!this.selection || !this.selection.length) return title;
        return `${title}(${this.selection.length})`;
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
          // this.friend = new Array(13).fill(r.data.list[0]);
          this.friend = r.data.list;
        }).catch(e => {
        });
      },
      selectionChange(selection) {
        this.selection = selection;
      },
      close() {
        this.visible = false;
        this.$refs.table.clearSelection();
      },
      submit() {
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
          console.log(r);
          this.close();
        }).catch(e => {
          console.log(e);
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
