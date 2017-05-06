import Vue from 'vue';
import Dialog from '../components/Dialog';

let $vm;

function init() {
  $vm = new (Vue.extend(Dialog))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el)
}

/**
 *
 * @param {Object} options
 * @param {String} options.title
 * @param {String} options.content
 * @param {Array} options.buttons list of button text
 * @param {Function} options.action
 */
function dialog(options) {
  if (!$vm) init();

  Object.assign($vm, options, {
    show: 1,
    action(index) {
      $vm.show = 0;
      options.action(index);
    }
  });
}

export default dialog;
