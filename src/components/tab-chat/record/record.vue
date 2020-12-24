<template>
  <div class="record">
    <search v-model="keyword" title="创建群聊" @action="createGroup"></search>
    <list :keyword="keyword"></list>
  </div>
</template>

<script>
  import list from "./list";
  import search from "@common/search";

  export default {
    name: "record",
    components: {
      list,
      search,
    },
    data() {
      return {
        keyword: ""
      };
    },
    methods: {
      createGroup() {
        console.log("createGroup");
      },
    },
  };
</script>

<style scoped lang="scss">
  .record {
    height: 100%;
    background-color: #ddd;
  }
</style>
