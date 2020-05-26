import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { Button, Input, Radio, RadioGroup, RadioButton, ColorPicker, Image, Collapse, CollapseItem, Carousel, CarouselItem, Slider, Upload, Select, Option, Form, FormItem, Tooltip, Popover, Dialog, Progress, Message } from 'element-ui'
// bus
import bus from './utils/x-bus'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less' // global css

// global request
import http from './utils/x-request'

import * as filters from './utils/x-filters' // global request
// ui
Vue.use(Button)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(RadioButton)
Vue.use(Collapse)
Vue.use(Image)
Vue.use(CollapseItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Slider)
Vue.use(Upload)
Vue.use(ColorPicker)
Vue.use(Progress)
Vue.prototype.$message = Message
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
// vue bus
Vue.use(bus)
// request
Vue.use(http)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
