<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*
    no tagview(navbar=50px): min-height: calc(100vh - 50px); 
  */
  min-height: calc(100vh - 85px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background: #f0f3f4;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
