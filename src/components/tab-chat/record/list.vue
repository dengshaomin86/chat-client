<template>
  <ul class="list">
    <li :class="{'active':activeChat.chatId===item.chatId}"
        v-for="(item,idx) in filterList"
        :key="idx"
        @click="changeActiveChatAction(item)">
      <div class="avatar-con" :data-i="item.avatar">
        <avatar shape="square" :size="40" :src="item.avatar"></avatar>
      </div>
      <div class="record-msg">
        <div class="l">
          <p class="name">{{item.name}}</p>
          <p class="content">
            <template v-if="item.chatType==='2'">
              {{item.fromUsername}}：
            </template>
            {{item.msg}}
          </p>
        </div>
        <div class="r">
          <p class="time">{{renderDate(item.msgDate)}}</p>
        </div>
      </div>
      <i class="tips" v-if="item.tips"></i>
    </li>
  </ul>
</template>

<script>
  import moment from "moment";
  import {mapState, mapActions, mapMutations} from "vuex";

  export default {
    name: "list",
    props: {
      keyword: {
        type: String,
        default: ""
      }
    },
    data() {
      return {};
    },
    computed: {
      filterList() {
        if (!this.chatList || !this.chatList.length) return [];
        return this.chatList.filter(item => item.name.indexOf(this.keyword) !== -1);
      },
      ...mapState(["activeChat", "chatList"])
    },
    watch: {
      chatList: {
        deep: true,
        immediate: true,
        handler(n) {
          // if (n.length) this.changeActiveChatAction(n[0]);
        }
      }
    },
    methods: {
      init() {
        this.getChatList();
      },
      renderDate(date) {
        if (!date) return "";
        return moment(date).format("HH:mm");
      },
      changeActiveChatAction(item) {
        this.changeActiveChat(item);
      },
      ...mapMutations(["changeActiveChat"]),
      ...mapActions(["getChatList"])
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
      transition: 0.2s;
      position: relative;
      &.active, &:hover {
        background-color: #ccc;
      }
      .tips {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #ff914e;
        border-radius: 100%;
        position: absolute;
        right: 4px;
        top: 4px;
      }
      .avatar-con {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        margin-right: 10px;
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
