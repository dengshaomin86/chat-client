<template>
  <wrapper v-bind="$attrs">
    <div slot="content" class="file-wrapper">
      <i class="iconfont el-icon-document"></i>
      <div class="name">
        <div>{{src|fileName}}</div>
        <span class="dl" @click="download">下载</span>
      </div>
    </div>
  </wrapper>
</template>

<script>
  import path from "path";
  import wrapper from "./wrapper";

  export default {
    name: "type4",
    components: {
      wrapper,
    },
    filters: {
      fileName(val) {
        return path.basename(val);
      },
    },
    computed: {
      item() {
        return this.$attrs.item || {};
      },
      src() {
        return this.baseURL + this.item.msg;
      },
    },
    methods: {
      download() {
        // 将链接地址字符内容转变成blob地址，防止直接打开文件
        fetch(this.src).then(res => res.blob()).then(blob => {
          const a = document.createElement("a");
          a.setAttribute("href", URL.createObjectURL(blob));
          a.setAttribute("download", path.basename(this.src));
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .file-wrapper {
    display: flex;
    align-items: center;
    .iconfont {
      font-size: 40px;
      margin-right: 8px;
      @include font-color;
    }
    .name {
      word-break: break-all;
      .dl {
        font-size: 14px;
        margin-top: 4px;
        &:hover {
          cursor: pointer;
          @include color-active;
        }
      }
    }
  }

</style>
