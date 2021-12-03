// 页面设置
interface Modules {
  [name: string]: any
}

// 动态读取.vue文件
const files = import.meta.globEager('./**/*.vue')

const component: Modules = {}
for (const key in files) {
  if (/p-preview-/gi.test(key)) {
    const file = files[key]
    component[file.default?.name] = file.default
  }
}

export const components = { ...component }
