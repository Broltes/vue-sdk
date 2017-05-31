import Vue from 'vue';
import Picker from '../components/Picker';
import { single } from '../modules/utils';

let getVM = single(function() {
  let $vm = new (Vue.extend(Picker))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el);

  return $vm;
});

/**
 *
 * @param {Object} options
 * @param {Array} options.groups
 * @param {Function} options.action
 */
export default function(options) {
  let $vm = getVM();

  Object.assign($vm, {
    defaultValue: null
  }, options, {
    show: 1,
    action(value) {
      $vm.show = 0;
      options.action(value);
    },
    cancel() {
      $vm.show = 0;
    }
  });
}
