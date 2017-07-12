import Vue from 'vue';
import Dialog from '../components/Dialog';
import { single } from '../modules/utils';

let getVM = single(function() {
  let $vm = new (Vue.extend(Dialog))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el);

  return $vm;
});

/**
 *
 * @param {Object} options
 * @param {String} options.title
 * @param {String} options.content
 * @param {Array} options.buttons List of button text
 * @param {Function} action
 */
function dialog(options, action) {
  let $vm = getVM();
  if (action) options.action = action;

  Object.assign($vm, {
    // defaults
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
