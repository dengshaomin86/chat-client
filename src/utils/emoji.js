const context = require.context("@/assets/images/emoji/", false, /.png$/);
const emojis = context.keys().map(key => {
  return {
    label: key.substring(key.indexOf("/") + 1, key.indexOf("_")),
    value: require(`@/assets/images/emoji/${key.substring(key.indexOf("/") + 1)}`),
  };
});

export default emojis;
