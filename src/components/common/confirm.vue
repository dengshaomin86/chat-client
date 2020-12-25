<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    :before-close="handleClose"
    :title="title"
    :visible.sync="visible"
    :append-to-body="true"
    :width="dialogConfirm">
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {dialogConfirm} from "@/utils/config";

  export default {
    name: "confirm",
    props: {
      title: {
        type: String,
        default: "提示",
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        dialogConfirm,
      };
    },
    methods: {
      handleClose() {
        this.$emit("before-close");
        this.close();
      },
      close() {
        this.$emit("close");
      },
      submit() {
        this.$emit("submit");
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="scss">

</style>
