<template>
  <ul class="list">
    <li class="active">
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="record-msg">
        <div class="l">
          <p class="name">名字name</p>
          <p class="content">内容content内容</p>
        </div>
        <div class="r">
          <p class="time">12:59</p>
        </div>
      </div>
    </li>
    <li>
      <div class="avatar">
        <img src="@/assets/logo.png">
      </div>
      <div class="record-msg">
        <div class="l">
          <p class="name">名字name名字name名字name</p>
          <p class="content">内容content内容内容content内容内容content内容</p>
        </div>
        <div class="r">
          <p class="time">12:59</p>
        </div>
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
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      display: flex;
      &.active {
        background-color: #ccc;
      }
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
      .record-msg {
        display: flex;
        width: 100%;
        overflow: hidden;
        .l {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          .name {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            white-space: nowrap;
          }
          .content {
            color: #aaa;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
            white-space: nowrap;
          }
        }
        .r {
          flex: 0 0 50px;
          text-align: right;
          .time {
            color: #aaa;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
          }
        }
      }
    }
  }

</style>
