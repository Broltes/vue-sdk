import 'babel-polyfill'
import Vue from 'vue'
import sdk from 'vue-sdk'
import appRouter from 'vue-app-router'
import App from './App'
import routes from './views/routes'

import './style/index.scss'
import './assets/svg'

Vue.use(sdk)
Vue.use(appRouter, {
  routes,
  transition: 'slide'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
