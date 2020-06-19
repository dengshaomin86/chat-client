<template>
  <div class="entry">
    <div class="opt">
      <i class="el-icon-picture-outline-round"></i>
      <i class="el-icon-folder"></i>
      <i class="el-icon-crop"></i>
      <i class="el-icon-chat-dot-round"></i>
    </div>
    <article contenteditable="true"></article>
    <div class="sendBtn">
      <el-button>发送</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "entry"
  };
</script>

<style scoped lang="scss">
  .entry {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px 30px;
    display: flex;
    flex-direction: column;
    .opt {
      margin-bottom: 5px;
      i {
        font-size: 20px;
        margin-right: 15px;
      }
    }
    article {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-size: 14px;
    }
    .sendBtn {
      text-align: right;
      .el-button {
        height: 30px;
        padding: 0 20px;
      }
    }
  }
</style>
