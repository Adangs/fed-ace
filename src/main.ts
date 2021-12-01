import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from './store'
import { XApplication } from '@/components/x-application'

const appProvider = createApp(XApplication)
// 优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
appProvider.mount('#appProvider', true)

const app = createApp(App)
// 挂载vuex状态管理
setupStore(app)
// 挂载router
setupRouter(app)

// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))
