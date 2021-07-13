// 获取当前访问域名，并根据域名判断当前环境，然后获取指定环境的服务器地址

const devBaseURL = {
  pro: 'https://yd.gooeto.com', // 正式
  test: 'https://ydtest.gooeto.com', // 测试 https://ydtest.gooeto.com
  dev: 'https://ydtest.gooeto.com', // 测试 192.168.16.146:8090
}

const router = req => {
  const host = req.headers.host
  const prefix = host.slice(0, host.indexOf('.'))
  console.log(prefix,'===============>prefix')
  return devBaseURL[prefix] || devBaseURL.test
}

const proxy = {}
const context = ['/YDAPI']
const proxyServer = new Map()
context.forEach(item => {
  proxyServer.set(item, devBaseURL.test) // 默认测试环境
})

for (const [key, value] of proxyServer.entries()) {
  proxy[key] = {
    logLevel: 'debug', // 查看代理到的真实地址
    target: value,
    secure: false,
    changeOrigin: true,
    router
  }
}

module.exports = proxy
