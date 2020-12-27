<template>
  <div class="message">
    <headerMenu :name="activeChat.chatName"></headerMenu>
    <list></list>
    <entry></entry>
  </div>
</template>

<script>
  import list from "./list";
  import entry from "./entry";
  import headerMenu from "@common/header-menu";
  import {mapState} from "vuex";

  export default {
    name: "message",
    components: {
      list,
      entry,
      headerMenu,
    },
    data() {
      return {};
    },
    computed: {
      ...mapState(["activeChat"])
    },
    methods: {
    }
  };
</script>

<style scoped lang="scss">
  .message {
    background-color: #eee;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .list {
      height: 100%;
      overflow-x: hidden;
    }

    .entry {
      flex: 0 0 160px;
    }
  }

</style>
