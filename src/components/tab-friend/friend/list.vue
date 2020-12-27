<template>
  <div class="list">
    <div class="friend-request">
      <el-button size="small" @click="showRequest">好友申请</el-button>
      <i class="iconfont icon-dot" v-if="friendRequest"></i>
    </div>
    <ul>
      <li :class="{'active':false}"
          v-for="(item,idx) in filterList"
          :key="idx"
          @click="showUser(item)">
        <div class="avatar-con" :data-i="item.avatar">
          <avatar shape="square" :size="40" :src="item.avatar"></avatar>
        </div>
        <p class="name">{{item.nickname||item.username}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "friend-list",
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
        if (!this.friendList || !this.friendList.length) return [];
        return this.friendList.filter(item => item.username.indexOf(this.keyword) !== -1);
      },
      ...mapState(["friendRequest", "friendList"]),
    },
    methods: {
      init() {
        this.getFriendList();
      },
      showUser(item) {
        this.getUserInfo(item.userId);
      },
      showRequest() {
        this.$emit("showRequest");
      },
      ...mapActions(["getUserInfo", "getFriendList"])
    },
    mounted() {
    },
    activated() {
      this.init();
    },
  };
</script>

<style scoped lang="scss">
  .list {
    .friend-request {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      position: relative;
      .el-button {
        width: 100%;
      }
      .icon-dot {
        position: absolute;
        top: 11px;
        right: 12px;
        font-size: 12px;
        @include color-tips;
      }
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        padding: 10px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
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
        .name {
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          white-space: nowrap;
        }
      }
    }
  }

</style>
