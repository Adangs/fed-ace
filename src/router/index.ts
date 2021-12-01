import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './guards'
import ConstantRoutes from './constant'
import { App } from 'vue'
import sortRouter from './sort'

interface Modules {
  [propName: string]: any
}

const files = import.meta.globEager('./modules/*.ts')
const modulesRouter = Object.keys(files).reduce((modules: Modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = files[modulePath]
  modules[moduleName] = value.default
  return modules
}, {})

// 路由左侧菜单排序根据sort.js文件配置来
export const sortedRoutes: Array<RouteRecordRaw> = []
sortRouter.forEach((item) => {
  if (modulesRouter[item]) {
    sortedRoutes.push(...modulesRouter[item])
  }
})

const router = createRouter({
  routes: ConstantRoutes,
  history: createWebHistory()
})

export function setupRouter(app: App) {
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}

export default router
