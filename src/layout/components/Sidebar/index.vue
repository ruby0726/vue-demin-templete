<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="false"
                :active-text-color="variables.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="route in menu"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/sidebar/variables.scss'
import Storage from '@/utils/storage'
const storage = new Storage(window.sessionStorage)

export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      menu: [],
      permissionMenu: storage.get('userInfo').permissionMenu
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      console.log('route',route)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    // this.menu = this.$router.options.routes
    this.menu = this.$router.options.routes.map(item => this.initMenu(item) ) 
  },
  methods: {
    // 权限过滤菜单
    initMenu(routes) {
      const haveChildren = Array.isArray(routes.children) && routes.children.length > 0;
      return {
        ...routes,
        hidden: this.permissionMenu.find(row => (row === routes.name || routes.noPermission ))?false:true,
        children:haveChildren ? routes.children.map(i => this.initMenu(i)) : []
      }
    }
  }
}
</script>
