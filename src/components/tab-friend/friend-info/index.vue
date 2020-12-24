<template>
  <div class="friend-info">
    <headerMenu></headerMenu>
  </div>
</template>

<script>
  import headerMenu from "@common/header-menu";

  export default {
    name: "friend-info",
    components: {
      headerMenu,
    }
  };
</script>

<style scoped lang="scss">
  .friend-info {
    background-color: #eee;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
