<template>
  <div class="aside-menu">
    <div class="avatar-con" @click="getUserInfo(userId)">
      <avatar :size="40" shape="square" :src="avatar"></avatar>
    </div>
    <i class="iconfont"
       v-for="(item,idx) in tabList"
       :key="idx"
       :class="{['icon-'+item.value]:true,'active':activeTabName===item.value}"
       :title="item.label"
       @click="setTabName(item.value)">
      <i class="iconfont icon-dot" v-if="item.dot"></i>
    </i>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from "vuex";

  export default {
    name: "aside-menu",
    computed: {
      tabList() {
        return [
          {
            label: "聊天",
            value: "tab-chat",
            dot: this.msgTips,
          },
          {
            label: "好友",
            value: "tab-friend",
            dot: this.friendRequest
          }
        ];
      },
      ...mapState(["friendRequest", "activeTabName", "msgTips"]),
    },
    methods: {
      ...mapActions(["getUserInfo"]),
      ...mapMutations(["setTabName"])
    },
    mounted() {
    }
  };
</script>

<style scoped lang="scss">
  .aside-menu {
    height: 100%;
    background-color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar-con {
      width: 40px;
      margin: 10px auto;
      cursor: pointer;
    }

    .iconfont {
      font-size: 30px;
      color: #999;
      margin-top: 30px;
      cursor: pointer;
      position: relative;
      &.active {
        @include color-active;
      }
      .icon-dot {
        position: absolute;
        top: -6px;
        right: -8px;
        font-size: 12px;
        margin: 0;
        @include color-tips;
      }
    }
  }
</style>
