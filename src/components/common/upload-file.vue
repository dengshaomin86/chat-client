<template>
  <div class="upload-file">
    <input type="file" hidden ref="file" @change="uploadFile">
  </div>
</template>

<script>
  import api from "@/api";

  export default {
    name: "upload-file",
    methods: {
      init() {
        this.$refs.file.value = "";
        this.$refs.file.click();
      },
      uploadFile() {
        const file = this.$refs.file.files[0];
        if (!file) return;
        this.$emit("preview", this.getFileSrc(file));
        const param = new FormData();
        param.append("files", file, file.name);
        const loading = this.$loading({
          lock: true,
          text: "文件上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });

        api.uploadFile(param).then(res => {
          loading.close();
          this.$message.auto(res.data);
          this.$emit("success", {
            url: res.data.url,
            type: file.type.startsWith("image/") ? "3" : "4",
          });
        }).catch(e => {
          loading.close();
        });
      },
      getFileSrc(file) {
        if (!file) return null;
        const windowURL = window.URL || window.webkitURL;
        return windowURL.createObjectURL(file);
      },
    }
  };
</script>

<style scoped lang="scss">
  .upload-file {
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
  }

</style>
