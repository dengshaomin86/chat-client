<template>
  <div class="tab-wrapper tab-chat">
    <record></record>
    <message></message>
  </div>
</template>

<script>
  import record from "./record/record";
  import message from "./message/message";

  export default {
    name: "tab-chat",
    components: {
      record,
      message,
    }
  };
</script>

<style scoped lang="scss">
  .tab-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    .record {
      flex: 0 0 250px;
    }
  }
</style>
