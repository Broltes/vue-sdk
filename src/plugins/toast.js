import Vue from 'vue';
import Toast from '../components/Toast';
import { once } from '../modules/utils';

let tid;
let getVM = once(function() {
  let $vm = new (Vue.extend(Toast))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el);

  return $vm;
});

/**
 * toast.show
 * @param {Object} options
 * @param {String} options.message
 * @param {String} options.icon loading | success | warn, default to no
 * @param {Number} options.duration show duration, millisecond, default 2e3
 * @param {Boolean} options.mask use mask to block touch, default false
 */
function show(options) {
  let $vm = getVM();

  if (typeof options === 'string') options = { message: options };

  Object.assign($vm, {
    // defaults
    show: 1,
    message: '',
    icon: '',
    mask: 0,
    duration: 2e3
  }, options);

  clearTimeout(tid);
  tid = setTimeout(() => {
    $vm.show = 0;
  }, $vm.duration);
}

function hide() {
  clearTimeout(tid);
  getVM().show = 0;
}

export default {
  show,
  hide
}
