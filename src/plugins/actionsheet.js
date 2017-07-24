import Vue from 'vue';
import ActionSheet from '../components/ActionSheet';
import { once } from '../modules/utils';

let getVM = once(function() {
  let $vm = new (Vue.extend(ActionSheet))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el);

  return $vm;
});

/**
 *
 * @param {Object} options
 * @param {String} options.message The top message, hidden if defined as empty string
 * @param {Array} options.buttons The text list of simple action buttons
 * @param {Array} options.menus The menu list of complex action items with icons
 * @param {String} options.cancelText The text of cancel button, default to '取消', hidden if if defined as empty string
 * @param {Function} action
 */
function actionsheet(options, action) {
  let $vm = getVM();
  if (action) options.action = action;

  Object.assign($vm, {
    // reset to defaults for omitted params
    message: '',
    cancelText: undefined,
    buttons: null,
    menus: null
  }, options, {
    show: 1,
    action(index, menuIndex) {
      $vm.show = 0;

      options.action.apply(this, arguments);
    },
    cancel() {
      $vm.show = 0;
    }
  });
}

export default actionsheet;
