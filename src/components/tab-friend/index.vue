<template>
  <div class="tab-wrapper tab-friend">
    <friend></friend>
    <friendInfo></friendInfo>
  </div>
</template>

<script>
  import friend from "./friend/friend";
  import friendInfo from "./friend-info";

  export default {
    name: "tab-friend",
    components: {
      friend,
      friendInfo,
    }
  };
</script>

<style scoped lang="scss">
  .tab-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    .friend {
      flex: 0 0 250px;
    }
  }
</style>
