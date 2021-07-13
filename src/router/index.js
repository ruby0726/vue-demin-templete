import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

export const constantRoutes = [
	{
		path: '/login',
		component: () => import(/* webpackChunkName: 'login' */'@/views/login/index'),
		hidden: true,
		oPermission: true
	},

  	// 首页
	{
		path: '/',
		component: Layout,
		redirect: '/dashboard',
		noPermission: true,
		children: [{
			path: 'dashboard',
			name: 'Dashboard',
			noPermission: true,
			component: () => import(/* webpackChunkName: 'dashboard' */'@/views/dashboard/index'),
			meta: { title: '首页', icon: 'home', affix: true}
		}]
	},

	// 渠道中心
	{
		path: '/channelCenter',
		component: Layout,
		redirect: '/channelCenter/channelManagement',
		name: 'ChannelCenter',
		meta: { title: '渠道中心', icon: 'example' },
		children: [
			// 渠道管理
			{
				path: 'channelManagement',
				name: 'ChannelManagement',
				component: () => import(/* webpackChunkName: 'channelCenter' */'@/views/channelCenter/channelManagement'),
				meta: { title: '渠道管理' }
			},
			{
				path: 'channelManagement/:page/:id',
				name: 'ChannelManagementInfo',
				props: true,
				component: () => import(/* webpackChunkName: 'channelCenter' */'@/views/channelCenter/channelManagement/addEdit'),
				meta: {title: '渠道管理', activeMenu: '/channelCenter/channelManagement'},
				hidden: true
			}
		]
	},

	{
		path: '/404',
		component: () => import(/* webpackChunkName: '404' */'@/views/404'),
		hidden: true,
		noPermission: true
	},

	{
		path: '*',
		redirect: '/404',
		hidden: true
	}

]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 清除/重置路由设置
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
