<template>
  <div class="container">
    <aside-menu></aside-menu>
    <record></record>
    <message></message>
  </div>
</template>

<script>
  import asideMenu from "@/components/aside-menu";
  import record from "@/components/record/record";
  import message from "@/components/message/message";

  export default {
    name: "index",
    components: {
      asideMenu,
      record,
      message
    },
    data() {
      return {
        list: []
      };
    },
    methods: {
      init() {
        this.getList();
      },
      getList() {
        this.list = this.$router.options.routes.map(item => item.path);
      }
    },
    mounted() {
      this.init();
    }
  };
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    display: flex;

    .aside-menu {
      flex: 0 0 60px;
    }

    .record {
      width: 250px;
    }
  }
</style>
