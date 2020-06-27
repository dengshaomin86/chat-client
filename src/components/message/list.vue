<template>
  <ul class="list" ref="list">
    <li v-for="(item, idx) in msgList"
        :key="idx" :class="{'r':item.fromUsername===username}">
      <div class="container" v-if="item.fromUsername===username">
        <div class="content">
          <p>{{item.msg}}</p>
        </div>
      </div>

      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>

      <div class="container" v-if="item.fromUsername!==username">
        <template v-if="item.chatType==='2'">
          <p class="username">{{item.fromUsername}}</p>
        </template>
        <div class="content">
          <p>{{item.msg}}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import api from "@/assets/api";

  export default {
    name: "list",
    data() {
      return {};
    },
    computed: {
      username() {
        return sessionStorage.getItem("username");
      },
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
          if (n.length) this.scrollToView();
        }
      }
    },
    methods: {
      getMsgList() {
        this.clearMsgList();
        if (!this.activeChat.chatId) return;
        api.getMsgList({
          chatId: this.activeChat.chatId
        }).then(res => {
          this.updateMsgList(res.data.list);
        }).catch(err => {
          console.log(err);
        });
      },
      scrollToView() {
        this.$nextTick(() => {
          this.$refs.list.children[this.msgList.length - 1].scrollIntoView();
        });
      },
      ...mapActions([
        "updateMsgList",
        "clearMsgList"
      ])
    }
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
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

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
      .container {
        max-width: 60%;

        .username {
          font-size: 12px;
          color: #999;
          margin-bottom: 2px;
        }

        .content {
          background-color: #fff;
          padding: 10px;
          position: relative;
          word-break: break-all;

          &:before {
            content: "";
            display: inline-block;
            border: 5px solid;
            border-color: transparent #fff transparent transparent;
            position: absolute;
            top: 16px;
            left: -10px;
          }
        }
      }

      &.r {
        display: flex;
        justify-content: flex-end;
        .avatar {
          margin-right: 0;
          margin-left: 10px;
        }
        .content {
          background-color: $rightBg;
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
