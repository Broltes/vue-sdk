import Vue from 'vue';
import Router from 'vue-router';
import sdk from 'vue-sdk';
import App from './App';
import routes from './views/routes';

import './scss/index.scss';
import './svg';

const router = new Router({
  mode: 'hash',
  routes
});

Vue.use(Router);
Vue.use(sdk);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
