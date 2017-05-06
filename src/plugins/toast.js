import Vue from 'vue';
import Toast from '../components/Toast';

let $vm;
let tid;

function init() {
  $vm = new (Vue.extend(Toast))({
    el: document.createElement('div')
  });

  document.body.appendChild($vm.$el)
}

/**
 *
 * @param {Object} options
 * @param {String} options.message
 * @param {String} options.icon loading | success | warn, default to no
 * @param {Number} options.duration show duration, millisecond, default 2e3
 * @param {Boolean} options.mask use mask to block touch, default false
 */
function show(options) {
  if (!$vm) init();

  Object.assign($vm, {
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
  $vm.show = 0;
}

export default {
  show,
  hide
}
