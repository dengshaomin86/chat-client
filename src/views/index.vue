<template>
  <div>
    <h1>index</h1>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {},
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
