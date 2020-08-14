module.exports = {
  outputDir: "dist/production", // dist
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/element-variables.scss";`
      }
    }
  }
};
