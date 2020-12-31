<template>
  <wrapper v-bind="$attrs">
    <div slot="content">
      <img :src="src" @load="load">
    </div>
  </wrapper>
</template>

<script>
  import wrapper from "./wrapper";

  export default {
    name: "type3",
    components: {
      wrapper,
    },
    computed: {
      item() {
        return this.$attrs.item || {};
      },
      src() {
        return this.baseURL + this.item.msg;
      },
    },
    methods: {
      load() {
        this.$emit("scrollToView");
      },
    },
  };
</script>

<style scoped lang="scss">
  div {
    overflow: hidden;
    img {
      max-width: 300px;
      max-height: 300px;
    }
  }

</style>
