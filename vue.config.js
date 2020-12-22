module.exports = {
  outputDir: "dist/production", // dist
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/element-variables.scss";
        `
      }
    }
  }
};
