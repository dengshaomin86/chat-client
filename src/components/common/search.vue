<template>
  <div class="search">
    <div class="search-wrapper">
      <el-input prefix-icon="el-icon-search" v-bind="$attrs" @input="input" placeholder="搜索" clearable></el-input>
      <i class="el-icon-plus" :title="title" @click="action"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search",
    props: {
      title: {
        type: String,
        default: "",
      }
    },
    data() {
      return {};
    },
    methods: {
      input(value) {
        this.$emit("input", value);
      },
      action() {
        this.$emit("action");
      },
    }
  };
</script>

<!--suppress CssInvalidPseudoSelector -->
<style scoped lang="scss">
  .search {
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    &-wrapper {
      height: 30px;
      display: flex;
      align-items: center;
      .el-input {
        height: 30px;
        ::v-deep .el-input__inner {
          height: 30px;
        }
        ::v-deep .el-input__icon {
          line-height: 30px;
        }
      }

      .el-icon-plus {
        background-color: #fff;
        height: 28px;
        flex: 0 0 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 6px;
        border-radius: 3px;
        font-size: 14px;
        transition: 0.2s;
        &:hover {
          @include bg-color-active;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }

</style>
