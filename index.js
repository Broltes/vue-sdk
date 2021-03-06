import './src/style/index.scss'
import './src/assets/svg'

import toast from './src/plugins/toast'
import dialog from './src/plugins/dialog'
import actionsheet from './src/plugins/actionsheet'
import picker from './src/plugins/picker'
import datePicker from './src/plugins/datePicker'

import AppHeader from './src/components/AppHeader'
import AppFooter from './src/components/AppFooter'
import Loading from './src/components/Loading'
import Icon from './src/components/Icon'
import Autosize from './src/components/Autosize'
import Popup from './src/components/Popup'
import Crop from './src/components/Crop'

export default {
  install: function(Vue, options = {}) {
    if (!options.desktop) {
      Vue.component('app-header', AppHeader)
      Vue.component('app-footer', AppFooter)
    }

    Vue.component('loading', Loading)
    Vue.component('icon', Icon)
    Vue.component('autosize', Autosize)
    Vue.component('popup', Popup)
    Vue.component('crop', Crop)
  }
}

export {
  toast,
  dialog,
  actionsheet,
  picker,
  datePicker
}
