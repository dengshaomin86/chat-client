<template>
  <ul class="list">
    <li>
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="content">
        <p>谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店</p>
      </div>
    </li>
    <li>
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="content">
        <p>谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店</p>
      </div>
    </li>

    <li class="r">
      <div class="content">
        <p>谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店谭鸭血旗舰店</p>
      </div>
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "list"
  };
</script>

<style scoped lang="scss">
  .list {
    width: 100%;
    list-style: none;
    box-sizing: border-box;
    padding: 10px 30px;
    margin: 0;
    li {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;

      .avatar {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        margin-right: 10px;
        background-color: #fff;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        background-color: #fff;
        padding: 10px;
        position: relative;
        word-break: break-all;
        max-width: 60%;

        &:before {
          content: "";
          display: inline-block;
          border: 5px solid;
          border-color: transparent #fff transparent transparent;
          position: absolute;
          top: 16px;
          left: -10px;
        }
      }

      &.r {
        display: flex;
        justify-content: flex-end;
        .avatar {
          margin-right: 0;
          margin-left: 10px;
        }
        .content {
          &:before {
            border-color: transparent transparent transparent #fff;
            position: absolute;
            top: 16px;
            left: auto;
            right: -10px;
          }
        }
      }
    }
  }

</style>
