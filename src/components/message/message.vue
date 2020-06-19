<template>
  <div class="message">
    <header>
      <p>标题</p>
      <div>
        <i class="el-icon-more"></i>
      </div>
    </header>
    <list></list>
    <entry></entry>
  </div>
</template>

<script>
  import list from "./list";
  import entry from "./entry";

  export default {
    name: "message",
    components: {
      list,
      entry
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

    header {
      box-sizing: border-box;
      padding: 10px 30px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      flex: 0 0 60px;
      font-size: 18px;

      .el-icon-more {
        cursor: pointer;
      }
    }

    .list {
      height: 100%;
    }

    .entry {
      flex: 0 0 160px;
    }
  }

</style>
