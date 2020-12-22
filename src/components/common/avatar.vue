<template>
  <div class="avatar" :style="style" @click="choose">
    <input type="file" hidden ref="file" @change="uploadFile">
  </div>
</template>

<script>
  import api from "@/api";

  export default {
    name: "avatar",
    props: {
      src: {
        type: String,
        default: ""
      },
      size: {
        type: Number,
        default: 60
      },
      shape: {
        type: String,
        default: "circle" // circle / square
      },
      upload: {
        default: false
      }
    },
    computed: {
      style() {
        const radius = this.shape === "circle" ? "100%" : "0px";
        const src = this.src ? axios.defaults.baseURL + this.src : require("@/assets/logo.png");
        const styles = [`width:${this.size}px;height:${this.size}px;background-image: url(${src});border-radius:${radius}`];
        if (this.upload) styles.push("cursor: pointer");
        return styles.join(";");
      }
    },
    methods: {
      choose() {
        if (!this.upload) return;
        this.$refs.file.click();
      },
      uploadFile() {
        const file = this.$refs.file.files[0];
        if (!file) return;
        const param = new FormData(); // 创建form对象
        param.append("avatar", file, file.name); // 通过append向form对象添加数据
        const loading = this.$loading({
          lock: true,
          text: "头像上传中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });

        api.uploadImg(param).then(res => {
          loading.close();
          this.$message.auto(res.data);
          if (this.upload && typeof this.upload === "function") this.upload(res.data.url);
        }).catch(err => {
          loading.close();
          console.log(err);
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .avatar {
    background-color: #ccc;
    background-size: cover;
  }

</style>
