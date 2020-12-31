<template>
  <wrapper v-bind="$attrs">
    <div slot="wrapper" class="tips">
      <p>{{item.msg}}</p>
    </div>
  </wrapper>
</template>

<script>
  import wrapper from "./wrapper";

  export default {
    name: "type2",
    components: {
      wrapper,
    },
    computed: {
      item() {
        return this.$attrs.item || {};
      },
    },
  };
</script>

<style scoped lang="scss">
  .tips {
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

</style>
