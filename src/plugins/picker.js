import Vue from 'vue';
import Picker from '../components/Picker';

let $vm;

function init() {
  $vm = new (Vue.extend(Picker))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el);
}

/**
 *
 * @param {Object} options
 * @param {Array} options.groups
 * @param {Function} options.action
 */
export default function(options) {
  if (!$vm) init();

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
