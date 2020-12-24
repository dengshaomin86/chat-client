const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  outputDir: "dist/production",
  publicPath: "./",
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@common", resolve("src/components/common"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@images", resolve("src/assets/images"));
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/element-variables.scss";
        @import '@/assets/scss/variable.scss';
        @import '@/assets/scss/mixins.scss';
        @import '@/assets/scss/theme/themeify.scss';
        @import '@/assets/scss/theme/themeMixins.scss';
        `
      }
    }
  },
  productionSourceMap: false,
  devServer: {
    // 解决不能用 ip 访问
    disableHostCheck: true
    // proxy: 'http://test.com/'
  }
};
