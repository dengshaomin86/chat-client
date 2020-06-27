<template>
  <ul class="list">
    <li :class="{'active':activeChat.chatId===item.chatId}"
        v-for="(item,idx) in chatList"
        :key="idx"
        @click="changeActiveChatAction(item)">
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="record-msg">
        <div class="l">
          <p class="name">{{item.name}}</p>
          <p class="content">
            <template v-if="item.type==='2'">
              {{item.lastMsgUser}}：
            </template>
            {{item.lastMsg}}
          </p>
        </div>
        <div class="r">
          <p class="time">{{renderDate(item.lastMsgDate)}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import moment from "moment";
  import { mapState, mapActions } from "vuex";

  export default {
    name: "list",
    data() {
      return {};
    },
    computed: {
      ...mapState(["activeChat", "chatList"])
    },
    watch: {
      chatList: {
        deep: true,
        immediate: true,
        handler(n) {
          if (n.length) this.changeActiveChatAction(n[0]);
        }
      }
    },
    methods: {
      init() {
        this.getChatList();
      },
      renderDate(date) {
        return moment(date).format("HH:ss");
      },
      changeActiveChatAction(item) {
        this.changeActiveChat(item);
      },
      ...mapActions([
        "changeActiveChat",
        "getChatList"
      ])
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      cursor: pointer;
      transition: 0.5s;
      &.active {
        background-color: #ccc;
      }
      .avatar {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        margin-right: 10px;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .record-msg {
        display: flex;
        width: 100%;
        overflow: hidden;
        .l {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .name {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            white-space: nowrap;
          }
          .content {
            color: #aaa;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
            white-space: nowrap;
          }
        }
        .r {
          flex: 0 0 50px;
          text-align: right;
          .time {
            color: #aaa;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
          }
        }
      }
    }
  }

</style>
