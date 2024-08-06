const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  // outputDir: "dist/ROOT",
  // publicPath: "./",
  outputDir: "docs",
  publicPath: "/chat-client",
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@common", resolve("src/components/common"))
      .set("@scss", resolve("src/assets/scss"))
      .set("@images", resolve("src/assets/images"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 开启js\css压缩
      return {
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 删除源文件
        })]
      };
    }
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
    disableHostCheck: true,
    proxy: "http://139.9.50.13:3000/"
  }
};
