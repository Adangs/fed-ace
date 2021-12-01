import { createApp } from 'vue'
import App from './App.vue'
import { XApplication } from '@/components/x-application'

const appProvider = createApp(XApplication)
// 优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
appProvider.mount('#appProvider', true)

createApp(App).mount('#app')
