<template>
  <div class="aside-menu">
    <div class="avatar-con" @click="getUserInfo(username)">
      <avatar :size="40" shape="square" :src="avatar"></avatar>
    </div>
    <i class="iconfont"
       v-for="(item,idx) in tabList"
       :key="idx"
       :class="{['icon-'+item.value]:true,'active':value===item.value}"
       :title="item.label"
       @click="changeTab(item.value)"></i>
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "aside-menu",
    props: {
      value: {
        type: String,
        default: "",
      }
    },
    computed: {
      tabList() {
        return [
          {
            label: "聊天",
            value: "tab-chat",
          },
          {
            label: "好友",
            value: "tab-friend",
          }
        ];
      },
    },
    methods: {
      changeTab(name) {
        this.$emit("input", name);
      },
      ...mapActions(["getUserInfo"])
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
      &.active {
        @include color-active;
      }
    }
  }
</style>
