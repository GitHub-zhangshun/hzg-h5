// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

import App from './App'
import router from './router'
import '@/assets/style/border.css'
import '@/assets/style/reset.css'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import ForgetPwd from '@/components/forget_pwd/ForgetPwd'
import footer from '@/components/footer/footer'
import {
  request
} from '@/libs/request'
import Dialogalert from '@/components/dialog'
import stockDialog from '@/components/stockDialog'
import riskDialog from '@/components/riskDialog'
import riskNoMatch from '@/components/riskNoMatch'
import {
  Dialog,
  Toast,
  Tab,
  Tabs
} from 'vant'
import {
  indexApi
} from '@/api/index'
import VeLine from 'v-charts/lib/line.common'
import VeRing from 'v-charts/lib/ring.common'
import VeMap from 'v-charts/lib/map.common'
import store from './store/index'

Vue.use(Dialog)
Vue.use(Tab).use(Tabs)
Vue.component(VeLine.name, VeLine)
Vue.component(VeRing.name, VeRing)
Vue.component(VeMap.name, VeMap)
Vue.component('ForgetPwd', ForgetPwd)
Vue.component('Dialogalert', Dialogalert)
Vue.component('StockDialog', stockDialog)
Vue.component('RiskDialog', riskDialog)
Vue.component('RiskNoMatch', riskNoMatch)
Vue.component('Footer', footer)
Vue.prototype.$axios = request
Vue.prototype.$Toast = Toast
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach(async (to, from, next) => {
  document.body.scrollTop = 0
  /* 路由发生变化修改页面title */
  let title = to.query.title || to.meta.title || '和掌柜'
  window.document.title = title
  if (!sessionStorage.getItem('dictionaryListByAll')) {
    await indexApi.dictionaryListByAll()
      .then(data => {
        sessionStorage.setItem('dictionaryListByAll', JSON.stringify(data.result))
      })
      .catch(() => {})
  }
  // 验证token，若没有跳到登陆页面，有就继续操作
  if (to.meta.requireAuth && !localStorage.getItem('token')) {
    next({
      path: '/verification_code_login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
