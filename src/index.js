import './scss/index.scss';
import './svg'

import http from './modules/http';

import toast from './plugins/toast';
import dialog from './plugins/dialog';
import actionsheet from './plugins/actionsheet';

import AppView from './components/AppView';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Loading from './components/Loading';
import Icon from './components/Icon';
import Autosize from './components/Autosize';
import Popup from './components/Popup';

export default {
  install: function (Vue, options) {
    Vue.component('app-view', AppView);
    Vue.component('app-header', AppHeader);
    Vue.component('app-footer', AppFooter);
    Vue.component('loading', Loading);
    Vue.component('icon', Icon);
    Vue.component('autosize', Autosize);
    Vue.component('popup', Popup);
  }
}

export {
  http,

  toast,
  dialog,
  actionsheet,

  AppView,
  AppHeader
}
