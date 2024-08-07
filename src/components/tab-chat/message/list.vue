<template>
  <ul class="list" ref="list">
    <li v-for="(item, idx) in msgList" :key="idx">
      <div class="msg-date" v-show="showDate(item.createTime, idx)">
        <p>{{formatDate(item.createTime)}}</p>
      </div>
      <components :is="'type'+item.msgType" :item="item" @scrollToView="scrollToView"></components>
    </li>
  </ul>
</template>

<script>
  import {mapState, mapActions, mapMutations} from "vuex";
  import apiChat from "@/api/chat";
  import moment from "moment";
  import type1 from "./types/type1";
  import type2 from "./types/type2";
  import type3 from "./types/type3";
  import type4 from "./types/type4";

  export default {
    name: "list",
    components: {
      type1,
      type2,
      type3,
      type4,
    },
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
          if (!n.chatId) return this.clearMsgList();
          this.getMsgList();
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
      // 获取群聊消息记录
      getGroupRecord() {
        apiChat.getGroupRecord(this.activeChat.chatId).then(res => {
          if (!res.data.flag) return this.$message.auto(res.data);
          const {list, enable} = res.data;
          this.updateMsgList(list);
          this.$emit("enable", enable);
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
          this.$emit("enable", false);
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
      .msg-date {
        text-align: center;
        margin-bottom: 8px;
        p {
          background-color: #cdcdcd;
          display: inline-block;
          font-size: 12px;
          padding: 3px 6px;
          color: #fff;
          border-radius: 4px;
        }
      }
    }
  }

</style>
