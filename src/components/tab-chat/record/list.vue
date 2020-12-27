<template>
  <ul class="list">
    <li :class="{'active':activeChat.chatId===item.chatId}"
        v-for="(item,idx) in filterList"
        :key="idx"
        @click="changeActiveChatAction(item)">
      <div class="avatar-con">
        <avatar shape="square" :size="40" :src="item.chatAvatar"></avatar>
      </div>
      <div class="record-msg">
        <div class="l">
          <p class="name">{{item.chatName}}</p>
          <p class="content">
            <template v-if="item.chatType==='2'">
              {{item.fromUsername}}：
            </template>
            {{item.msg}}
          </p>
        </div>
        <div class="r">
          <p class="time">{{item.createTime|formatDate}}</p>
        </div>
      </div>
      <i class="iconfont icon-dot" v-if="item.tips"></i>
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
        return this.chatList.filter(item => item.chatName.indexOf(this.keyword) !== -1);
      },
      ...mapState(["activeChat", "chatList"])
    },
    filters: {
      formatDate(data) {
        if (!data) return "";
        return moment(data).format("HH:mm");
      },
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
      .icon-dot {
        position: absolute;
        right: 2px;
        top: 2px;
        font-size: 12px;
        @include color-tips;
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
