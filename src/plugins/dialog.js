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
 * @param {Array} options.buttons List of button text
 * @param {Function} options.action
 */
function dialog(options) {
  if (!$vm) init();

  Object.assign($vm, {
    // Reset to allow title or content be omitted
    title: '',
    content: ''
  }, options, {
    show: 1,
    action(index) {
      $vm.show = 0;
      options.action && options.action(index);
    }
  });
}

export default dialog;
