<template>
  <ul class="list" ref="list">
    <li v-for="(item, idx) in msgList"
        :key="idx" :class="{'r':item.fromUsername===username}">
      <div class="msg-date" v-show="showDate(item.createTime, idx)">
        <p>{{formatDate(item.createTime)}}</p>
      </div>
      <div class="msg-con">
        <div class="container" v-if="item.fromUsername===username">
          <div class="content">
            <p>{{item.msg}}</p>
          </div>
        </div>

        <div class="avatar-con" @click="viewUser(item)">
          <avatar shape="square" :size="40" :src="item.fromUserAvatar"></avatar>
        </div>

        <div class="container" v-if="item.fromUsername!==username">
          <template v-if="item.chatType==='2'">
            <p class="username">{{item.fromUsername}}</p>
          </template>
          <div class="content">
            <p>{{item.msg}}</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapState, mapActions, mapMutations} from "vuex";
  import apiChat from "@/api/chat";
  import moment from "moment";

  export default {
    name: "list",
    data() {
      return {};
    },
    computed: {
      ...mapState(["activeChat", "msgList"])
    },
    watch: {
      activeChat: {
        deep: true,
        immediate: true,
        handler(n) {
          if (n.chatId) this.getMsgList();
        }
      },
      msgList: {
        deep: true,
        immediate: true,
        handler(n) {
          this.scrollToView();
        }
      }
    },
    methods: {
      getMsgList() {
        this.clearMsgList();
        if (!this.activeChat.chatId) return;
        switch (this.activeChat.chatType) {
          case "1":
            this.getSingleRecord();
            break;
          case "2":
            this.getGroupRecord();
            break;
        }
      },
      // 获取群组消息记录
      getGroupRecord() {
        apiChat.getGroupRecord(this.activeChat.chatId).then(res => {
          if (!res.data.flag) {
            this.$message.auto(res.data);
            return;
          }
          this.updateMsgList(res.data.list);
        }).catch(e => {
        });
      },
      // 获取单聊消息记录
      getSingleRecord() {
        apiChat.getSingleRecord(this.activeChat.chatId).then(res => {
          if (!res.data.flag) {
            this.$message.auto(res.data);
            return;
          }
          this.updateMsgList(res.data.list);
        }).catch(e => {
        });
      },
      scrollToView() {
        this.$nextTick(() => {
          if (!this.msgList || !this.msgList.length) return;
          if (!this.$refs.list) return;
          this.$refs.list.children[this.msgList.length - 1].scrollIntoView();
        });
      },
      viewUser(item) {
        this.getUserInfo(item.fromUserId);
      },
      formatDate(date) {
        return moment(date).format("YYYY/MM/DD HH:mm:ss");
      },
      showDate(createTime, idx) {
        if (idx === 0) return true;
        return new Date(createTime).getTime() - new Date(this.msgList[idx - 1].createTime).getTime() > 15 * 60 * 1000;
      },
      ...mapMutations(["updateMsgList", "clearMsgList"]),
      ...mapActions(["getUserInfo"])
    },
    activated() {
      this.scrollToView();
    },
  };
</script>

<style scoped lang="scss">
  $rightBg: rgba(34, 170, 154, 0.6);

  ::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rebeccapurple;
  }

  .list {
    width: 100%;
    list-style: none;
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 0;
    li {
      margin-bottom: 10px;

      .msg-date {
        text-align: center;
        p {
          background-color: #cdcdcd;
          display: inline-block;
          font-size: 12px;
          padding: 3px 6px;
          color: #fff;
          border-radius: 4px;
        }
      }

      .msg-con {
        display: flex;
        align-items: flex-start;
      }

      .avatar-con {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        margin-right: 10px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container {
        max-width: 60%;

        .username {
          font-size: 12px;
          color: #999;
          margin-bottom: 6px;
        }

        .content {
          background-color: #fff;
          padding: 10px;
          position: relative;
          word-break: break-all;
          border-radius: 0 50px 50px 50px;

          &:before {
            content: "";
            display: none;
            border: 5px solid;
            border-color: transparent #fff transparent transparent;
            position: absolute;
            top: 16px;
            left: -10px;
          }
        }
      }

      &.r {
        .msg-con {
          display: flex;
          justify-content: flex-end;
        }
        .avatar-con {
          margin-right: 0;
          margin-left: 10px;
        }
        .content {
          background-color: $rightBg;
          border-radius: 50px 0 50px 50px;
          &:before {
            border-color: transparent transparent transparent $rightBg;
            position: absolute;
            top: 16px;
            left: auto;
            right: -10px;
          }
        }
      }
    }
  }

</style>
