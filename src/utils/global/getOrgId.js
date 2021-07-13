import Storage from '@/utils/storage'

const storage = new Storage(window.sessionStorage)

export function getOrgId() {
  let type = storage.get('userInfo').orgId

  return type === 'sys'
}
