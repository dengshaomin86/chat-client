<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: rgba(29, 160, 155, 0.64) url("./assets/images/bg/3735.jpg") no-repeat center center;
    background-size: cover;
  }
  #app {
    &:before, &:after {
      display: table;
      content: "";
    }
  }
</style>
