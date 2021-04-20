<template>
  <div class="emoji" v-if="visible" v-click-outside="outside">
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <img :src="item.value">
      </li>
    </ul>
  </div>
</template>

<script>
  import emojis from "@/utils/emoji";

  export default {
    name: "emoji",
    props: {
      visible: Boolean,
    },
    data() {
      return {
        list: emojis,
      };
    },
    methods: {
      outside() {
        this.$emit("update:visible", false);
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
      flex-wrap: wrap;
      padding: 15px;
      margin: 0;
      li {
        margin: 3px;
        img {
          width: 36px;
          cursor: pointer;
          transition: 0.3s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }

</style>
