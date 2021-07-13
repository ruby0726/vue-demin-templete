<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
  export default {
    name: 'App',
    beforeCreate() {
      window.$vue = this;
    },
  }
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
