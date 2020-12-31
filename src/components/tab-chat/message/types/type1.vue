<template>
  <wrapper v-bind="$attrs"></wrapper>
</template>

<script>
  import wrapper from "./wrapper";

  export default {
    name: "type1",
    components: {
      wrapper,
    }
  };
</script>

<style scoped>

</style>
