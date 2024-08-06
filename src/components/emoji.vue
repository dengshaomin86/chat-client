<template>
  <div class="emoji" v-if="visible" v-click-outside="outside">
    <ul>
      <li
        v-for="(item, idx) in list"
        :key="idx"
        :data-idx="idx"
        :data-id="item.id"
      >
        <span
          :title="item.label"
          v-html="item.code"
          @click="handleItem(item)"
        ></span>
      </li>
      <li v-for="item in 10" :key="item + 'e'" style="height: 0; margin: 0">
        <span></span>
      </li>
    </ul>
  </div>
</template>

<script>
import emojis from "@/utils/emoji.json";

export default {
  name: "emoji",
  props: {
    visible: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    list() {
      const arr = [];
      for (const item of Object.keys(emojis).slice(72, 72 + 300)) {
        arr.push({ code: `&#x${item};`, id: item, label: emojis[item] });
      }
      return arr;
    },
  },
  methods: {
    outside() {
      this.$emit("update:visible", false);
    },
    handleItem(item) {
      this.$emit("append", item.code);
    },
  },
};
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 3px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #ccc;
}

.emoji {
  width: 500px;
  height: 200px;
  margin-bottom: 8px;
  position: fixed;
  bottom: 200px;
  left: 350px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px 8px 8px 0;
  &:before {
    content: "";
    display: inline-block;
    border: 4px solid;
    border-color: #fff transparent transparent #fff;
    position: absolute;
    bottom: -8px;
    left: 0;
  }
  ul {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    list-style: none;
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 15px;
    margin: 0;
    li {
      margin: 3px;
      span {
        display: inline-block;
        width: 36px;
        transition: 0.15s;
        text-align: center;
        font-size: 16px;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
