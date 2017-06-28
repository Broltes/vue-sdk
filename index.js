import './src/scss/_.scss';
import './src/svg'

import http from './src/modules/http';

import toast from './src/plugins/toast';
import dialog from './src/plugins/dialog';
import actionsheet from './src/plugins/actionsheet';
import picker from './src/plugins/picker';
import datePicker from './src/plugins/datePicker';

import vm from './src/components/vm';
import AppView from './src/components/AppView';
import AppHeader from './src/components/AppHeader';
import AppFooter from './src/components/AppFooter';
import Loading from './src/components/Loading';
import Icon from './src/components/Icon';
import Autosize from './src/components/Autosize';
import Popup from './src/components/Popup';
import Crop from './src/components/Crop';

export default {
  install: function (Vue, options) {
    Object.assign(vm, options);

    Vue.component('app-view', AppView);
    Vue.component('app-header', AppHeader);
    Vue.component('app-footer', AppFooter);
    Vue.component('loading', Loading);
    Vue.component('icon', Icon);
    Vue.component('autosize', Autosize);
    Vue.component('popup', Popup);
    Vue.component('crop', Crop);
  }
}

export {
  http,

  toast,
  dialog,
  actionsheet,
  picker,
  datePicker,

  AppView,
  AppHeader
}
