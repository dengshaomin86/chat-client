<template>
  <ul class="list">
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
</template>

<script>
  import ApiFriend from "@/api/friend";
  import {mapActions} from "vuex";

  export default {
    name: "friend-list",
    props: {
      keyword: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        list: [],
      };
    },
    computed: {
      filterList() {
        if (!this.list || !this.list.length) return [];
        return this.list.filter(item => item.username.indexOf(this.keyword) !== -1);
      },
    },
    methods: {
      init() {
        this.getFriendList();
      },
      getFriendList() {
        ApiFriend.getFriendList().then(r => {
          const {list, addReqNum} = r.data;
          this.list = list;
          this.addReqNum = addReqNum;
        }).catch(e => {
        });
      },
      showUser(item) {
        this.getUserInfo(item.username);
      },
      ...mapActions([
        "getUserInfo"
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
      align-items: center;
      cursor: pointer;
      transition: 0.5s;
      position: relative;
      &.active {
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

</style>
