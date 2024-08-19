module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "@vue/standard"
  ],
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: [
    "vue"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [1, "double"],
    semi: [2, "always"],
    "space-before-function-paren": 0,
    "spaced-comment": [0, "never"],
    "no-unreachable": [0, "never"],
    "handle-callback-err": [0, "never"],
    indent: 0,
    "comma-dangle": [0, {
      arrays: "never",
      objects: "ignore",
      imports: "never",
      exports: "never",
      functions: "ignore"
    }],
    "object-curly-spacing": [0, "never"], // 解构赋值和导入/导出说明符
  },
  globals: {
    axios: true
  }
};
