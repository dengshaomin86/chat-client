<template>
  <div class="record">
    <search v-model="keyword" title="创建群聊" @action="createGroup"></search>
    <list :keyword="keyword"></list>
    <createGroup ref="createGroup"></createGroup>
  </div>
</template>

<script>
  import list from "./list";
  import search from "@common/search";
  import createGroup from "@common/create-group";

  export default {
    name: "record",
    components: {
      list,
      search,
      createGroup,
    },
    data() {
      return {
        keyword: "",
      };
    },
    methods: {
      createGroup() {
        this.$refs.createGroup.init();
      },
    },
  };
</script>

<style scoped lang="scss">
  .record {
    height: 100%;
    overflow: hidden;
    background-color: #ddd;
  }
</style>
