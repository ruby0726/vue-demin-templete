import Storage from '@/utils/storage'
const storage = new Storage(window.sessionStorage)

const vAuth = {
  inserted (el, binding, vnode) {
    const btnKey = binding.arg
    const routeName = vnode.context.$route.name
    const authKey = `${routeName}-${btnKey}`
    // 查看是否有按钮权限
    let permissionBtn = storage.get('userInfo').permissionBtn;
    const flag = permissionBtn.includes(authKey);
    // 如果没有权限则将按钮删除
    !flag && el.parentNode.removeChild(el);
  }
}

export default vAuth
