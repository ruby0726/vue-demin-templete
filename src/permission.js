import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
	NProgress.start()
	document.title = getPageTitle(to.meta.title)
	const hasToken = sessionStorage.getItem('token')
	if (hasToken) {
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			next()
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next(`/login?redirect=${to.path}`)
			NProgress.done()
		}
	}
})

router.afterEach(() => {
  NProgress.done()
})
