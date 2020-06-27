<template>
  <div class="record">
    <div class="search">
      <el-input prefix-icon="el-icon-search" v-model="keyword" placeholder="搜索" clearable></el-input>
    </div>
    <list :keyword="keyword"></list>
  </div>
</template>

<script>
  import list from "./list";

  export default {
    name: "record",
    components: {
      list
    },
    data() {
      return {
        keyword: ""
      };
    }
  };
</script>

<style scoped lang="scss">
  .record {
    height: 100%;
    background-color: #ddd;

    .search {
      height: 60px;
      padding: 10px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      .el-input {
        height: 30px;
        ::v-deep .el-input__inner {
          height: 30px;
        }
        ::v-deep .el-input__icon {
          line-height: 30px;
        }
      }
    }
  }

</style>
