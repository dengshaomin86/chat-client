module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/element-variables.scss";`
      }
    }
  }
};
