<template>
    <div class="dashboard-text">欢迎来到后台管理系统</div>
</template>

<script>
import Storage from '@/utils/storage'
const storage = new Storage(window.sessionStorage)

export default {
  name: 'Dashboard',
  data() {
    return {
      accountName: storage.get('userInfo').accountName
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
