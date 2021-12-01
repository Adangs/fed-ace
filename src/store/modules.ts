// import advertising from './modules/advertising'
// import app from './modules/app'
// import dictionary from './modules/dictionary'
// import finance from './modules/finance'
// import marketing from './modules/marketing'
// import order from './modules/order'
// import pages from './modules/pages'
// import permission from './modules/permission'
// import product from './modules/product'
// import statistics from './modules/statistics'
// import store from './modules/store'
// import storeManage from './modules/store-manage'
// import user from './modules/user'
//
// export default {
//   advertising,
//   app,
//   dictionary,
//   finance,
//   marketing,
//   order,
//   pages,
//   permission,
//   product,
//   statistics,
//   store,
//   'store-manage': storeManage,
//   user
// }

interface Modules {
  [propName: string]: any
}

const files = import.meta.globEager('./modules/*.ts')
const modules: Modules = {}
for (const key in files) {
  modules[key.replace(/(\.\/modules\/|\.ts)/g, '')] = files[key].default
}

export default modules
