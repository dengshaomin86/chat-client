<template>
  <div class="wrapper" :class="{'r':item.fromUsername===username}">
    <slot name="wrapper">
      <div class="msg-con">
        <div class="container" v-if="item.fromUsername===username">
          <div class="content">
            <slot name="content">
              <div v-html="item.msg"></div>
            </slot>
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
            <slot name="content">
              <div v-html="item.msg"></div>
            </slot>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "wrapper",
    computed: {
      item() {
        return this.$attrs.item || {};
      },
    },
    methods: {
      viewUser(item) {
        this.getUserInfo(item.fromUserId);
      },
      ...mapActions(["getUserInfo"])
    }
  };
</script>

<style scoped lang="scss">
  $rightBg: rgba(34, 170, 154, 0.6);

  .wrapper {
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
        > div {
          border-radius: inherit;
        }

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
</style>
